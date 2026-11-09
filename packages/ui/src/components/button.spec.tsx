import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renders the chamfered brand fill by default', () => {
    render(<Button>EXPORT</Button>);

    const button = screen.getByRole('button', { name: 'EXPORT' });
    expect(button).toHaveClass('bg-primary', 'rounded-none', 'font-mono', 'uppercase');
    expect(button.className).toContain('clip-path');
  });

  it('renders ghost buttons in brand-text', () => {
    render(<Button variant="ghost">VIEW</Button>);

    expect(screen.getByRole('button', { name: 'VIEW' })).toHaveClass('text-brand-text');
  });
});
