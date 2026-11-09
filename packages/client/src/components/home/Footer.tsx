import { Tag } from '@ssalka/ui/components/tag';

/** Bar widths (in px) for the serial strip; a fixed sequence so it reads like a printed code */
const SERIAL_BARS = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 1, 3, 2, 1, 1, 1, 4, 2, 1, 3, 1, 2, 2, 1];

function SerialStrip() {
  let x = 0;
  const bars = SERIAL_BARS.map((width, i) => {
    const bar = i % 2 === 0 ? { x, width } : null;
    x += width + 1;

    return bar;
  }).filter(bar => bar !== null);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${x} 16`}
      preserveAspectRatio="none"
      className="text-on-gunmetal h-4 w-32"
    >
      {bars.map(bar => (
        <rect key={bar.x} x={bar.x} y={0} width={bar.width} height={16} fill="currentColor" />
      ))}
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-gunmetal text-on-gunmetal px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 font-mono text-[13px] tracking-[0.08em] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span>37.7988°N</span>
          <span aria-hidden="true">/</span>
          <span>122.4505°W</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Tag tone="ok" className="text-on-gunmetal">
            SYS: NOMINAL
          </Tag>
          <span>VER 4.0.0</span>
          <span>SALKA.LOL</span>
          <SerialStrip />
        </div>
      </div>
    </footer>
  );
}
