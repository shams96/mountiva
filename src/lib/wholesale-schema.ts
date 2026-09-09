import { z } from 'zod';
import { products } from './products';

const formatSlugs = products.map((p) => p.slug) as [string, ...string[]];

export const businessTypes = [
  'hotel',
  'restaurant',
  'corporate',
  'institution',
  'distributor',
  'retail',
  'events',
  'other'
] as const;

/** Shared by the client form and the API route so validation cannot drift. */
export const wholesaleEnquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  role: z.string().trim().max(120).optional().or(z.literal('')),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(40),
  country: z.string().trim().min(2).max(80),
  city: z.string().trim().min(2).max(120),
  businessType: z.enum(businessTypes),
  formats: z.array(z.enum(formatSlugs)).min(1).max(formatSlugs.length),
  monthlyVolume: z
    .union([z.number(), z.string()])
    .transform((v) => (typeof v === 'string' ? Number(v.replace(/[^0-9.]/g, '')) : v))
    .pipe(z.number().positive().max(10_000_000)),
  privateLabel: z.boolean().default(false),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  consent: z.literal(true),
  // Honeypot — must stay empty.
  website: z.string().max(0).optional().or(z.literal(''))
});

export type WholesaleEnquiry = z.infer<typeof wholesaleEnquirySchema>;
