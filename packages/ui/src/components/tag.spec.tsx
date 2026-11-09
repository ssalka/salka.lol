import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tag } from './tag';

describe('Tag', () => {
  it('defaults to the neutral tone', () => {
    render(<Tag>REACT</Tag>);

    expect(screen.getByText('REACT')).toHaveAttribute('data-tone', 'neutral');
    expect(screen.getByText('REACT')).toHaveClass('border-ink-muted');
  });

  it.each(['ok', 'alert'] as const)('gives the %s tone a square marker', tone => {
    render(<Tag tone={tone}>STATUS</Tag>);

    expect(screen.getByText('STATUS').className).toContain('before:content-[""]');
  });

  it('hides redacted text from assistive tech', () => {
    render(<Tag tone="redacted">SECRET</Tag>);

    expect(screen.getByRole('img', { name: 'Redacted' })).toBeInTheDocument();
    expect(screen.getByText('SECRET')).toHaveAttribute('aria-hidden', 'true');
  });
});
