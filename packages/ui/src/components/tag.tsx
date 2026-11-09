import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@ssalka/ui/utils';

const tagVariants = cva(
  [
    'inline-flex items-center gap-1.5 rounded-none border px-2 py-0.5',
    'font-mono text-[11px] leading-4 font-semibold tracking-[0.08em] uppercase',
  ],
  {
    variants: {
      tone: {
        neutral: 'border-ink-muted text-ink-muted bg-transparent',
        brand: 'border-brand bg-brand text-on-accent',
        hazard: 'border-hazard bg-hazard text-on-accent',
        // Status tones get a square marker so status isn't shown by colour alone
        ok: 'border-patina text-ink before:bg-patina before:size-1.5 before:content-[""]',
        alert:
          'border-signal-red text-ink before:bg-signal-red before:size-1.5 before:content-[""]',
        redacted: 'border-ink bg-ink text-transparent select-none',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  },
);

export type TagTone = NonNullable<VariantProps<typeof tagVariants>['tone']>;

export interface TagProps extends React.ComponentProps<'span'>, VariantProps<typeof tagVariants> {}

/** Uppercase mono tag. `ok` and `alert` carry a square marker; `redacted` hides its text */
const Tag = ({ tone, className, children, ...props }: TagProps) => {
  if (tone === 'redacted') {
    return (
      <span
        role="img"
        aria-label="Redacted"
        className={cn(tagVariants({ tone }), className)}
        {...props}
      >
        <span aria-hidden="true">{children}</span>
      </span>
    );
  }

  return (
    <span data-tone={tone ?? 'neutral'} className={cn(tagVariants({ tone }), className)} {...props}>
      {children}
    </span>
  );
};
Tag.displayName = 'Tag';

export { Tag, tagVariants };
