import { range } from 'lodash-es';

import { cn } from '@ssalka/ui/utils';

const SIZE = 400;
const C = SIZE / 2;
const RINGS = [48, 96, 144, 192];
const TICKS = range(0, 360, 5);

/** A contact on the scope, in polar coordinates (bearing in degrees, range in px) */
const CONTACTS = [
  { bearing: 42, distance: 118 },
  { bearing: 213, distance: 160 },
  { bearing: 297, distance: 70 },
];

const polar = (bearing: number, distance: number) => {
  const rad = ((bearing - 90) * Math.PI) / 180;

  return { x: C + distance * Math.cos(rad), y: C + distance * Math.sin(rad) };
};

/** Range rings, bearing ticks and a rotating sweep. Decorative; hidden from assistive tech */
export function RadarSweep({ className }: { className?: string }) {
  const wedgeEnd = polar(-30, RINGS.at(-1)!);
  const lineEnd = polar(0, RINGS.at(-1)!);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      className={cn('text-hairline aspect-square overflow-visible', className)}
      fill="none"
      strokeLinecap="square"
    >
      {/* Range rings */}
      {RINGS.map(r => (
        <circle key={r} cx={C} cy={C} r={r} stroke="currentColor" strokeWidth={1} />
      ))}

      {/* Crosshair */}
      <path
        d={`M${C} ${C - 196}V${C + 196}M${C - 196} ${C}H${C + 196}`}
        stroke="currentColor"
        strokeWidth={1}
      />

      {/* Bearing ticks: long every 30°, short every 5° */}
      {TICKS.map(bearing => {
        const long = bearing % 30 === 0;
        const outer = polar(bearing, 192);
        const inner = polar(bearing, long ? 180 : 186);

        return (
          <line
            key={bearing}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            className={long ? 'stroke-ink-muted' : 'stroke-hairline'}
            strokeWidth={1}
          />
        );
      })}

      {/* Bearing labels */}
      {[0, 90, 180, 270].map(bearing => {
        const { x, y } = polar(bearing, 210);

        return (
          <text
            key={bearing}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-ink-muted font-mono text-[11px]"
          >
            {String(bearing).padStart(3, '0')}
          </text>
        );
      })}

      {/* Contacts */}
      {CONTACTS.map(({ bearing, distance }) => {
        const { x, y } = polar(bearing, distance);

        return (
          <rect key={bearing} x={x - 3} y={y - 3} width={6} height={6} className="fill-patina" />
        );
      })}

      {/* Sweep */}
      <g className="origin-center [transform-box:view-box] motion-safe:animate-[spin_8s_linear_infinite]">
        <path
          d={`M${C} ${C}L${wedgeEnd.x} ${wedgeEnd.y}A192 192 0 0 1 ${lineEnd.x} ${lineEnd.y}Z`}
          className="fill-steel opacity-15"
        />
        <line
          x1={C}
          y1={C}
          x2={lineEnd.x}
          y2={lineEnd.y}
          className="stroke-ink"
          strokeWidth={1.5}
        />
      </g>

      <circle cx={C} cy={C} r={3} className="fill-ink" />
    </svg>
  );
}
