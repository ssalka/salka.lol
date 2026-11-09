import * as SliderPrimitive from '@radix-ui/react-slider';
import { useEffect, useId, useRef, useState } from 'react';

import { Button } from '@ssalka/ui/components/button';
import { Panel } from '@ssalka/ui/components/panel';
import { Readout } from '@ssalka/ui/components/readout';
import { Switch } from '@ssalka/ui/components/switch';
import { Tag } from '@ssalka/ui/components/tag';

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
  key: keyof Pick<GlitchParams, 'enabled' | 'colorShift' | 'doublePulse' | 'cssGlitch'>;
  label: string;
}[] = [
  { key: 'enabled', label: 'SIGNAL' },
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
    <div className="flex flex-col gap-2">
      <Readout
        label={label}
        value={localValue.toFixed(step < 1 ? 1 : 0)}
        unit={unit}
        className="min-w-0"
        valueClassName="text-xl leading-6"
      />
      <SliderPrimitive.Root
        aria-label={label}
        className="relative flex h-4 w-full touch-none items-center select-none"
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
        <SliderPrimitive.Track className="bg-ink-muted relative h-px grow">
          <SliderPrimitive.Range className="bg-ink absolute h-0.5 -translate-y-px" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="bg-surface-100 border-ink focus-visible:outline-ring block size-3 border-2 focus-visible:outline-2 focus-visible:outline-offset-2" />
      </SliderPrimitive.Root>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  const id = useId();

  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={id} className="text-label text-ink-muted font-mono uppercase">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <span className="text-ink-muted w-7 text-right font-mono text-[11px]">
          {checked ? 'ON' : 'OFF'}
        </span>
        <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    </div>
  );
}

export function GlitchControlPanel() {
  const [open, setOpen] = useState(false);
  const store = useGlitchStore();
  const { setParam, resetDefaults, randomize } = store.actions;

  if (!open) {
    return (
      <Button
        variant="outline"
        size="xs"
        onClick={() => setOpen(true)}
        className="bg-surface-100 fixed right-4 bottom-4 z-50"
      >
        [SIG_CTRL]
      </Button>
    );
  }

  return (
    <Panel
      aria-label="Signal control"
      title="SIGNAL_CTRL"
      meta={<Tag tone={store.enabled ? 'ok' : 'neutral'}>{store.enabled ? 'LIVE' : 'STANDBY'}</Tag>}
      className="fixed right-4 bottom-4 z-50 w-72"
      bodyClassName="flex flex-col gap-4 p-4"
    >
      <div className="flex flex-col gap-4">
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

      <div className="bg-hairline h-px" />

      <div className="flex flex-col gap-3">
        {TOGGLES.map(({ key, label }) => (
          <ToggleRow
            key={key}
            label={label}
            checked={store[key]}
            onCheckedChange={v => setParam(key, v)}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="xs" onClick={() => randomize()}>
          RND
        </Button>
        <Button variant="outline" size="xs" onClick={() => resetDefaults()}>
          RST
        </Button>
        <Button variant="ghost" size="xs" className="ml-auto" onClick={() => setOpen(false)}>
          CLOSE
        </Button>
      </div>
    </Panel>
  );
}
