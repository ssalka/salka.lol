import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@ssalka/ui/utils';

const CORNERS = {
  tl: '-top-px -left-px border-t-2 border-l-2',
  tr: '-top-px -right-px border-t-2 border-r-2',
  bl: '-bottom-px -left-px border-b-2 border-l-2',
  br: '-right-px -bottom-px border-r-2 border-b-2',
} as const;

const cornerVariants = cva('pointer-events-none absolute size-3', {
  variants: {
    accent: {
      true: 'border-brand',
      false: 'border-ink',
    },
  },
  defaultVariants: {
    accent: false,
  },
});

export interface PanelProps
  extends Omit<React.ComponentProps<'section'>, 'title'>, VariantProps<typeof cornerVariants> {
  /** Uppercase mono header, e.g. `01 // PROFILE` */
  title?: React.ReactNode;
  /** Secondary header text on the right, e.g. `SEC.01 ACTIVE` */
  meta?: React.ReactNode;
  /** Classes for the body wrapper */
  bodyClassName?: string;
}

/**
 * A ruled instrument panel: hairline border, surface-200 fill and four 12px corner brackets.
 * Set `accent` on the single panel per view that needs attention; its brackets turn `brand`.
 */
const Panel = ({
  accent,
  title,
  meta,
  className,
  bodyClassName,
  children,
  ...props
}: PanelProps) => {
  const hasHeader = !!title || !!meta;

  return (
    <section
      data-accent={accent ? 'true' : undefined}
      className={cn('border-hairline bg-surface-200 text-ink relative border font-sans', className)}
      {...props}
    >
      {Object.entries(CORNERS).map(([corner, position]) => (
        <span
          key={corner}
          data-corner={corner}
          aria-hidden="true"
          className={cn(cornerVariants({ accent }), position)}
        />
      ))}
      {hasHeader && (
        <header className="border-hairline text-label flex items-center justify-between gap-4 border-b px-4 py-2 font-mono uppercase">
          <span>{title}</span>
          {meta && <span className="text-ink-muted font-normal">{meta}</span>}
        </header>
      )}
      <div className={cn('text-body p-4', bodyClassName)}>{children}</div>
    </section>
  );
};
Panel.displayName = 'Panel';

export { Panel };
