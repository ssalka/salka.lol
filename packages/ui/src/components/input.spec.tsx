import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Field } from './input';

describe('Field', () => {
  it('labels the input', () => {
    render(<Field label="CALLSIGN" />);

    expect(screen.getByLabelText('CALLSIGN')).toBeInstanceOf(HTMLInputElement);
  });

  it('links the hint with aria-describedby', () => {
    render(<Field label="CALLSIGN" hint="Four letters" />);

    expect(screen.getByLabelText('CALLSIGN')).toHaveAccessibleDescription('Four letters');
  });

  it('uses a given id', () => {
    render(<Field id="callsign" label="CALLSIGN" />);

    expect(screen.getByLabelText('CALLSIGN')).toHaveAttribute('id', 'callsign');
  });
});
