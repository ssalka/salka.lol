import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface GlitchParams {
  /** How often glitch fires (seconds) */
  glitchInterval: number;
  /** Character movement distance (px) */
  displacement: number;
  /** Max blur during bursts (px) */
  blurIntensity: number;
  /** Magenta/cyan color flicker */
  colorShift: boolean;
  /** Second mini blur burst */
  doublePulse: boolean;
  /** ::before/::after chromatic split */
  cssGlitch: boolean;
}

export const GLITCH_DEFAULTS: GlitchParams = {
  glitchInterval: 4,
  displacement: 3,
  blurIntensity: 4,
  colorShift: true,
  doublePulse: true,
  cssGlitch: true,
};

interface GlitchActions {
  setParam: <K extends keyof GlitchParams>(key: K, value: GlitchParams[K]) => void;
  resetDefaults: () => void;
  randomize: () => void;
}

interface GlitchStore extends GlitchParams {
  actions: GlitchActions;
}

export const useGlitchStore = create<GlitchStore>()(
  persist(
    immer(set => ({
      ...GLITCH_DEFAULTS,

      actions: {
        setParam(key, value) {
          set(state => {
            (state as Record<string, unknown>)[key] = value;
          });
        },

        resetDefaults() {
          set(GLITCH_DEFAULTS);
        },

        randomize() {
          const rand = (min: number, max: number, step: number) => {
            const steps = Math.round((max - min) / step);
            return min + Math.round(Math.random() * steps) * step;
          };
          set({
            glitchInterval: rand(1, 10, 0.5),
            displacement: rand(0, 10, 0.5),
            blurIntensity: rand(0, 8, 0.5),
            colorShift: Math.random() > 0.5,
            doublePulse: Math.random() > 0.5,
            cssGlitch: Math.random() > 0.5,
          });
        },
      },
    })),
    {
      name: 'glitch-params',
      partialize: ({ actions: _, ...params }) => params,
    },
  ),
);
