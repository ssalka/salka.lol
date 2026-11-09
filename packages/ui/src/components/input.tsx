import React, { useId } from 'react';

import { cn } from '@ssalka/ui/utils';

export interface InputProps extends React.ComponentProps<'input'> {
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>, value: string) => void;
}

const Input = ({ className, type, onKeyDown: onKeyDownProp, onEnter, ...props }: InputProps) => {
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    onKeyDownProp?.(e);

    if (e.key === 'Enter') {
      onEnter?.(e, (e.target as HTMLInputElement).value);
    }
  }

  return (
    <input
      type={type}
      className={cn(
        'border-input bg-surface-100 text-ink flex h-10 w-full min-w-0 rounded-sm border px-3 py-2 font-mono text-[13px] leading-5',
        'file:border-0 file:bg-transparent file:font-mono file:text-[13px]',
        'placeholder:text-ink-muted',
        'focus-visible:outline-brand-text focus-visible:outline-2 focus-visible:outline-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
};
Input.displayName = 'Input';

export interface FieldProps extends InputProps {
  /** Uppercase mono label */
  label: React.ReactNode;
  /** Helper text below the input, linked with `aria-describedby` */
  hint?: React.ReactNode;
  /** Classes for the wrapper; `className` goes to the input */
  wrapperClassName?: string;
}

/** An `Input` with a label and an optional hint */
const Field = ({ label, hint, id: idProp, wrapperClassName, ...props }: FieldProps) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={cn('flex flex-col gap-1 font-sans', wrapperClassName)}>
      <label
        htmlFor={id}
        className="text-ink-muted font-mono text-[11px] leading-4 font-semibold tracking-[0.08em] uppercase"
      >
        {label}
      </label>
      <Input id={id} aria-describedby={hintId} {...props} />
      {hint && (
        <span id={hintId} className="text-ink-muted text-body-sm">
          {hint}
        </span>
      )}
    </div>
  );
};
Field.displayName = 'Field';

export { Field, Input };
