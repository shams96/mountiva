'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { site } from '@/lib/site';
import { endpoints } from '@/lib/endpoints';
import { Field, fieldClasses } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  company: z.string().trim().optional().or(z.literal('')),
  message: z.string().trim().min(10),
  consent: z.literal(true),
  website: z.string().max(0).optional().or(z.literal(''))
});

type Errors = Record<string, string | undefined>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const initial = { name: '', email: '', company: '', message: '', consent: false, website: '' };

export function ContactForm() {
  const t = useTranslations('form');
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as string]) setErrors((e) => ({ ...e, [key as string]: undefined }));
  }

  function messageFor(key: string): string {
    if (key === 'email') return t('validation.email');
    if (key === 'consent') return t('validation.consent');
    if (key === 'message') return t('validation.minMessage');
    return t('validation.required');
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = messageFor(key);
      }
      setErrors(next);
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrors({});
    try {
      const res = await fetch(endpoints.contact, {
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
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
      {status === 'error' && Object.keys(errors).length > 0 && (
        <div role="alert" className="rounded-sm border border-red-600/40 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-medium">{t('errorHeading')}</p>
          <p className="mt-1">{t('errorBody', { email: site.contact.generalEmail })}</p>
        </div>
      )}

      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="cf-name" label={t('fields.name')} error={errors.name}>
          <input
            id="cf-name"
            className={fieldClasses(!!errors.name)}
            autoComplete="name"
            placeholder={t('placeholders.name')}
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
          />
        </Field>
        <Field id="cf-email" label={t('fields.email')} error={errors.email}>
          <input
            id="cf-email"
            type="email"
            inputMode="email"
            className={fieldClasses(!!errors.email)}
            autoComplete="email"
            placeholder={t('placeholders.email')}
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </Field>
      </div>

      <Field id="cf-company" label={t('fields.company')} optional={t('optional')} error={errors.company}>
        <input
          id="cf-company"
          className={fieldClasses(!!errors.company)}
          autoComplete="organization"
          placeholder={t('placeholders.company')}
          value={values.company}
          onChange={(e) => set('company', e.target.value)}
        />
      </Field>

      <Field id="cf-message" label={t('fields.message')} error={errors.message}>
        <textarea
          id="cf-message"
          rows={5}
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
