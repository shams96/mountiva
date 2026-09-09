'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { products } from '@/lib/products';
import { businessTypes, wholesaleEnquirySchema } from '@/lib/wholesale-schema';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';
import { Field, fieldClasses } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';

type Errors = Record<string, string | undefined>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const initial = {
  name: '',
  company: '',
  role: '',
  email: '',
  phone: '',
  country: 'Pakistan',
  city: '',
  businessType: '' as (typeof businessTypes)[number] | '',
  formats: [] as string[],
  monthlyVolume: '',
  privateLabel: false,
  message: '',
  consent: false,
  website: '' // honeypot
};

export function WholesaleForm() {
  const t = useTranslations('form');
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const businessTypeOptions = useMemo(
    () => businessTypes.map((key) => ({ key, label: t(`businessTypes.${key}`) })),
    [t]
  );

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as string]) setErrors((e) => ({ ...e, [key as string]: undefined }));
  }

  function toggleFormat(slug: string) {
    setValues((v) => ({
      ...v,
      formats: v.formats.includes(slug)
        ? v.formats.filter((s) => s !== slug)
        : [...v.formats, slug]
    }));
    if (errors.formats) setErrors((e) => ({ ...e, formats: undefined }));
  }

  function messageFor(key: string): string {
    if (key === 'email') return t('validation.email');
    if (key === 'consent') return t('validation.consent');
    if (key === 'monthlyVolume') return t('validation.number');
    return t('validation.required');
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = wholesaleEnquirySchema.safeParse({
      ...values,
      businessType: values.businessType || undefined
    });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = messageFor(key);
      }
      setErrors(next);
      setStatus('error');
      document.getElementById('wholesale-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setStatus('submitting');
    setErrors({});
    try {
      const res = await fetch('/api/wholesale', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
      setValues(initial);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-sm border border-northern/30 bg-northern-pale/50 p-8 text-center"
      >
        <h3 className="text-title text-ink">{t('successHeading')}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate">
          {t('successBody', { phone: site.contact.phoneDisplay })}
        </p>
      </div>
    );
  }

  return (
    <form id="wholesale-form" noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
      {status === 'error' && Object.keys(errors).length > 0 && (
        <div role="alert" className="rounded-sm border border-red-600/40 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-medium">{t('errorHeading')}</p>
          <p className="mt-1">{t('errorBody', { email: site.contact.email })}</p>
        </div>
      )}

      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="wf-website">Website</label>
        <input
          id="wf-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="wf-name" label={t('fields.name')} error={errors.name}>
          <input
            id="wf-name"
            className={fieldClasses(!!errors.name)}
            autoComplete="name"
            placeholder={t('placeholders.name')}
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
          />
        </Field>
        <Field id="wf-company" label={t('fields.company')} error={errors.company}>
          <input
            id="wf-company"
            className={fieldClasses(!!errors.company)}
            autoComplete="organization"
            placeholder={t('placeholders.company')}
            value={values.company}
            onChange={(e) => set('company', e.target.value)}
          />
        </Field>
        <Field id="wf-role" label={t('fields.role')} optional={t('optional')} error={errors.role}>
          <input
            id="wf-role"
            className={fieldClasses(!!errors.role)}
            autoComplete="organization-title"
            placeholder={t('placeholders.role')}
            value={values.role}
            onChange={(e) => set('role', e.target.value)}
          />
        </Field>
        <Field id="wf-email" label={t('fields.email')} error={errors.email}>
          <input
            id="wf-email"
            type="email"
            inputMode="email"
            className={fieldClasses(!!errors.email)}
            autoComplete="email"
            placeholder={t('placeholders.email')}
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </Field>
        <Field id="wf-phone" label={t('fields.phone')} error={errors.phone}>
          <input
            id="wf-phone"
            type="tel"
            className={fieldClasses(!!errors.phone)}
            autoComplete="tel"
            placeholder={t('placeholders.phone')}
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </Field>
        <Field id="wf-country" label={t('fields.country')} error={errors.country}>
          <input
            id="wf-country"
            className={fieldClasses(!!errors.country)}
            autoComplete="country-name"
            value={values.country}
            onChange={(e) => set('country', e.target.value)}
          />
        </Field>
        <Field id="wf-city" label={t('fields.city')} error={errors.city}>
          <input
            id="wf-city"
            className={fieldClasses(!!errors.city)}
            autoComplete="address-level2"
            placeholder={t('placeholders.city')}
            value={values.city}
            onChange={(e) => set('city', e.target.value)}
          />
        </Field>
        <Field id="wf-business" label={t('fields.businessType')} error={errors.businessType}>
          <select
            id="wf-business"
            className={cn(fieldClasses(!!errors.businessType), 'appearance-none')}
            value={values.businessType}
            onChange={(e) => set('businessType', e.target.value as typeof values.businessType)}
          >
            <option value="" disabled>
              —
            </option>
            {businessTypeOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="wf-formats" label={t('fields.formats')} error={errors.formats}>
        <div className="grid gap-2 sm:grid-cols-2">
          {products.map((p) => {
            const checked = values.formats.includes(p.slug);
            return (
              <label
                key={p.slug}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-sm border px-3.5 py-2.5 text-sm transition-colors',
                  checked ? 'border-ink bg-ink/[0.03]' : 'border-stone hover:border-ash'
                )}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-ink"
                  checked={checked}
                  onChange={() => toggleFormat(p.slug)}
                />
                {t(`formatOptions.${p.slug}`)}
              </label>
            );
          })}
        </div>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="wf-volume" label={t('fields.monthlyVolume')} error={errors.monthlyVolume}>
          <input
            id="wf-volume"
            inputMode="numeric"
            className={fieldClasses(!!errors.monthlyVolume)}
            placeholder={t('placeholders.monthlyVolume')}
            value={values.monthlyVolume}
            onChange={(e) => set('monthlyVolume', e.target.value)}
          />
        </Field>
        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-3 py-2.5 text-sm text-ink">
            <input
              type="checkbox"
              className="h-4 w-4 accent-ink"
              checked={values.privateLabel}
              onChange={(e) => set('privateLabel', e.target.checked)}
            />
            {t('fields.privateLabel')}
          </label>
        </div>
      </div>

      <Field id="wf-message" label={t('fields.message')} optional={t('optional')} error={errors.message}>
        <textarea
          id="wf-message"
          rows={4}
          className={fieldClasses(!!errors.message)}
          placeholder={t('placeholders.message')}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-slate">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-ink"
          checked={values.consent}
          onChange={(e) => set('consent', e.target.checked)}
        />
        <span>
          {t('fields.consent')}
          {errors.consent && (
            <span className="mt-1 block text-xs text-red-700">{errors.consent}</span>
          )}
        </span>
      </label>

      <div>
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? t('submitting') : t('submit')}
        </Button>
      </div>
    </form>
  );
}
