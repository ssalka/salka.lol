import type * as React from 'react';

import { cn } from '@ssalka/ui/utils';

export interface ReadoutProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  /** Uppercase mono label above the value, e.g. `LAT` */
  label: React.ReactNode;
  /** The live value */
  value: React.ReactNode;
  /** Unit shown after the value, e.g. `°N` */
  unit?: React.ReactNode;
  /** Change since the last reading, e.g. `+0.4 / 24H` */
  delta?: React.ReactNode;
  /** Classes for the value text (e.g. a smaller size) */
  valueClassName?: string;
}

/** A mono instrument value with a label, optional unit and delta, over a ruler-tick strip */
const Readout = ({
  label,
  value,
  unit,
  delta,
  className,
  valueClassName,
  ...props
}: ReadoutProps) => (
  <div className={cn('text-ink inline-flex min-w-38 flex-col gap-1', className)} {...props}>
    <span className="text-ink-muted font-mono text-[11px] leading-4 font-semibold tracking-[0.08em] uppercase">
      {label}
    </span>
    <span className={cn('text-readout font-mono tabular-nums', valueClassName)}>
      {value}
      {unit && (
        <span className="text-ink-muted ml-1 font-mono text-[13px] leading-5 font-normal">
          {unit}
        </span>
      )}
    </span>
    <span
      aria-hidden="true"
      data-ticks
      className="mt-1 block h-2 bg-[repeating-linear-gradient(90deg,var(--ink-muted)_0_1px,transparent_1px_8px)]"
    />
    {delta && <span className="text-ink-muted text-body-sm font-mono">{delta}</span>}
  </div>
);
Readout.displayName = 'Readout';

export { Readout };
