import * as SliderPrimitive from '@radix-ui/react-slider';
import { useEffect, useRef, useState } from 'react';

import { Switch } from '@ssalka/ui/components/switch';
import { cn } from '@ssalka/ui/utils';

import { useGlitchStore, type GlitchParams } from '@/state/glitch';

const SLIDERS: {
  key: keyof Pick<GlitchParams, 'glitchInterval' | 'displacement' | 'blurIntensity'>;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}[] = [
  { key: 'glitchInterval', label: 'INTERVAL', min: 1, max: 10, step: 0.5, unit: 's' },
  { key: 'displacement', label: 'DISPLACE', min: 0, max: 10, step: 0.5, unit: 'px' },
  { key: 'blurIntensity', label: 'BLUR_INT', min: 0, max: 8, step: 0.5, unit: 'px' },
];

const TOGGLES: {
  key: keyof Pick<GlitchParams, 'colorShift' | 'doublePulse' | 'cssGlitch'>;
  label: string;
}[] = [
  { key: 'colorShift', label: 'COLOR_SHIFT' },
  { key: 'doublePulse', label: 'DBL_PULSE' },
  { key: 'cssGlitch', label: 'CSS_GLITCH' },
];

function GlitchSlider({
  label,
  storeValue,
  min,
  max,
  step,
  unit,
  onCommit,
}: {
  label: string;
  storeValue: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onCommit: (value: number) => void;
}) {
  const [localValue, setLocalValue] = useState(storeValue);
  const dragging = useRef(false);

  // Sync from store when value changes externally (e.g. reset)
  useEffect(() => {
    if (!dragging.current) setLocalValue(storeValue);
  }, [storeValue]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-warm-500 w-[72px] shrink-0 text-[10px] tracking-widest">{label}</span>
      <SliderPrimitive.Root
        className="relative flex h-4 flex-1 touch-none items-center select-none"
        min={min}
        max={max}
        step={step}
        value={[localValue]}
        onValueChange={([v]: number[]) => {
          dragging.current = true;
          setLocalValue(v);
        }}
        onValueCommit={([v]: number[]) => {
          dragging.current = false;
          onCommit(v);
        }}
      >
        <SliderPrimitive.Track className="bg-warm-800 relative h-[2px] grow">
          <SliderPrimitive.Range className="bg-magenta-500/70 absolute h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="bg-magenta-500 block size-2.5 rounded-full shadow-[0_0_6px_hsl(330_100%_48%/0.4)] outline-none" />
      </SliderPrimitive.Root>
      <span className="text-acid-500 w-10 text-right font-mono text-[10px]">
        {localValue.toFixed(step < 1 ? 1 : 0)}
        {unit}
      </span>
    </div>
  );
}

export function GlitchControlPanel() {
  const [open, setOpen] = useState(false);
  const store = useGlitchStore();
  const { setParam, resetDefaults } = store.actions;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-warm-500 hover:text-magenta-500 hover:border-magenta-500/40 border-warm-700/60 bg-warm-900/90 fixed right-4 bottom-4 z-50 border px-2.5 py-1.5 font-mono text-[10px] tracking-widest backdrop-blur-md transition-colors"
      >
        [SIG_CTRL]
      </button>
    );
  }

  return (
    <div className="crosshair border-warm-700/60 bg-warm-900/95 fixed right-4 bottom-4 z-50 w-72 border backdrop-blur-md">
      {/* Header */}
      <div className="border-warm-700/40 flex items-center justify-between border-b px-3 py-2">
        <span className="text-magenta-500 font-mono text-[10px] tracking-widest">SIGNAL_CTRL</span>
        <div className="flex gap-2">
          <button
            onClick={() => resetDefaults()}
            className="text-warm-500 hover:text-acid-500 font-mono text-[10px] tracking-widest transition-colors"
          >
            [RST]
          </button>
          <button
            onClick={() => setOpen(false)}
            className="text-warm-500 hover:text-foreground font-mono text-[10px] tracking-widest transition-colors"
          >
            [X]
          </button>
        </div>
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-3 px-3 pt-3 pb-2">
        {SLIDERS.map(({ key, label, min, max, step, unit }) => (
          <GlitchSlider
            key={key}
            label={label}
            storeValue={store[key]}
            min={min}
            max={max}
            step={step}
            unit={unit}
            onCommit={v => setParam(key, v)}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="bg-warm-700/40 mx-3 h-px" />

      {/* Toggles */}
      <div className="flex flex-col gap-2.5 px-3 pt-2 pb-3">
        {TOGGLES.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-warm-500 text-[10px] tracking-widest">{label}</span>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'font-mono text-[9px] tracking-widest',
                  store[key] ? 'text-acid-500' : 'text-warm-600',
                )}
              >
                {store[key] ? 'ON' : 'OFF'}
              </span>
              <Switch
                checked={store[key]}
                onCheckedChange={v => setParam(key, v)}
                className="data-[state=checked]:bg-magenta-500/80 data-[state=unchecked]:bg-warm-700 h-4 w-7"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
