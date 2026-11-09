'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@ssalka/ui/utils';

export type SwitchProps = React.ComponentProps<typeof SwitchPrimitives.Root>;

const Switch = ({ className, ...props }: SwitchProps) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer border-input focus-visible:outline-ring data-[state=checked]:bg-ink data-[state=unchecked]:bg-surface-300 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-none border p-px transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40',
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'bg-surface-100 border-ink-muted pointer-events-none block aspect-square h-full rounded-none border transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
);
Switch.displayName = SwitchPrimitives.Root.displayName!;

export { Switch };
