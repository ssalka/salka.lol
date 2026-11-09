import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface SettingsActions {
  setTrackingEnabled: (enabled: boolean) => void;
  toggleDarkMode(): void;
  toggleSettingsPanel(): void;
  updateGlobalSettings(settings: Partial<GlobalSettings>): void;
}

export interface GlobalSettings {
  /** Whether dark mode is enabled */
  darkMode: boolean;
  settingsOpen: boolean;
  trackingEnabled: boolean;
}

interface SettingsStore extends GlobalSettings {
  actions: SettingsActions;
}

// Helper to apply dark mode class to document
const applyDarkMode = (darkMode: boolean) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', darkMode);
  }
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    immer(set => ({
      settingsOpen: false,
      // index.html sets the initial theme class before first paint
      darkMode:
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
      trackingEnabled: false,

      actions: {
        setTrackingEnabled(enabled) {
          set({ trackingEnabled: enabled });
        },

        toggleDarkMode() {
          set(state => {
            state.darkMode = !state.darkMode;
            applyDarkMode(state.darkMode);
          });
        },

        toggleSettingsPanel() {
          set(state => {
            state.settingsOpen = !state.settingsOpen;
          });
        },

        updateGlobalSettings(settings) {
          set(settings);
        },
      },
    })),
    {
      name: 'app-settings',
      partialize: state => ({ darkMode: state.darkMode }),
      onRehydrateStorage: () => state => {
        // Apply the persisted theme on initial load
        if (state) {
          applyDarkMode(state.darkMode);
        }
      },
    },
  ),
);
