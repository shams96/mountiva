import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Container({
  as: As = 'div',
  className,
  children
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <As className={cn('container', className)}>{children}</As>;
}
