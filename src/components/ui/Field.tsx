'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

const inputBase =
  'w-full rounded-sm border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ash/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-northern focus-visible:ring-offset-1 focus-visible:ring-offset-paper';

export function fieldClasses(hasError?: boolean) {
  return cn(inputBase, hasError ? 'border-red-600/60 bg-red-50/40' : 'border-stone hover:border-ash');
}

export function Field({
  id,
  label,
  error,
  hint,
  optional,
  children
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional && <span className="ms-1.5 text-xs font-normal text-ash">({optional})</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-ash">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
