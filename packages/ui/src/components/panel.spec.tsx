import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Panel } from './panel';

describe('Panel', () => {
  it('renders a section with four corner brackets and its children', () => {
    const { container } = render(<Panel>Body copy</Panel>);

    expect(container.querySelector('section')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-corner]')).toHaveLength(4);
    expect(screen.getByText('Body copy')).toBeInTheDocument();
  });

  it('renders the title and meta header', () => {
    render(<Panel title="01 // PROFILE" meta="SEC.01 ACTIVE" />);

    expect(screen.getByText('01 // PROFILE').closest('header')).toBeInTheDocument();
    expect(screen.getByText('SEC.01 ACTIVE')).toHaveClass('text-ink-muted');
  });

  it('omits the header when there is no title or meta', () => {
    const { container } = render(<Panel>Body</Panel>);

    expect(container.querySelector('header')).not.toBeInTheDocument();
  });

  it('turns the brackets brand when accented', () => {
    const { container } = render(<Panel accent>Body</Panel>);

    for (const corner of container.querySelectorAll('[data-corner]')) {
      expect(corner).toHaveClass('border-brand');
    }
  });
});
