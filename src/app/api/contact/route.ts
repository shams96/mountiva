import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal(true),
  website: z.string().max(0).optional().or(z.literal(''))
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { website, ...contact } = parsed.data;
  if (website) return NextResponse.json({ ok: true });

  const record = { type: 'contact_message', receivedAt: new Date().toISOString(), ...contact };
  const webhook = process.env.WHOLESALE_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(record)
      });
      if (!res.ok) {
        console.error('[contact] webhook responded', res.status);
        return NextResponse.json({ ok: false, error: 'forward_failed' }, { status: 502 });
      }
    } catch (err) {
      console.error('[contact] webhook error', err);
      return NextResponse.json({ ok: false, error: 'forward_failed' }, { status: 502 });
    }
  } else {
    console.info(`[contact] message from ${record.name} (${record.email})`, record);
  }

  return NextResponse.json({ ok: true });
}
