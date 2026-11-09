import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Readout } from './readout';

describe('Readout', () => {
  it('renders the label, value, unit and tick strip', () => {
    const { container } = render(<Readout label="LAT" value="37.7988" unit="°N" />);

    expect(screen.getByText('LAT')).toBeInTheDocument();
    expect(screen.getByText('37.7988')).toBeInTheDocument();
    expect(screen.getByText('°N')).toBeInTheDocument();
    expect(container.querySelector('[data-ticks]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the delta only when given', () => {
    const { rerender } = render(<Readout label="UPTIME" value="99.9" />);
    expect(screen.queryByText('+0.1')).not.toBeInTheDocument();

    rerender(<Readout label="UPTIME" value="99.9" delta="+0.1" />);
    expect(screen.getByText('+0.1')).toBeInTheDocument();
  });
});
