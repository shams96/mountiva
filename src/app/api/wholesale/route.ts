import { NextResponse } from 'next/server';
import { wholesaleEnquirySchema } from '@/lib/wholesale-schema';

export const runtime = 'nodejs';

/**
 * Wholesale enquiry intake.
 *
 * Validates against the shared zod schema, drops obvious bots via the
 * honeypot, then forwards the payload to WHOLESALE_WEBHOOK_URL when set
 * (Zapier / Make / a CRM inbound hook / an email relay). With no webhook
 * configured it logs a structured record server-side and still returns 200
 * so the brochure site is usable before the CRM is wired up.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = wholesaleEnquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { website, ...enquiry } = parsed.data;
  if (website) {
    // Honeypot tripped — accept silently, do nothing.
    return NextResponse.json({ ok: true });
  }

  const record = {
    type: 'wholesale_enquiry',
    receivedAt: new Date().toISOString(),
    ...enquiry
  };

  const webhook = process.env.WHOLESALE_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(record)
      });
      if (!res.ok) {
        console.error('[wholesale] webhook responded', res.status);
        return NextResponse.json({ ok: false, error: 'forward_failed' }, { status: 502 });
      }
    } catch (err) {
      console.error('[wholesale] webhook error', err);
      return NextResponse.json({ ok: false, error: 'forward_failed' }, { status: 502 });
    }
  } else {
    console.info(
      `[wholesale] enquiry from ${record.company} (${record.email}) — configure WHOLESALE_WEBHOOK_URL to route this.`,
      record
    );
  }

  return NextResponse.json({ ok: true });
}
