import { create } from 'zustand';
import formatTime from '../utils/formatTime';

const endRestSound = new Audio('/sounds/timer_bip.mp3');

const useFlowStore = create((set) => ({
  // State
  time: 0,
  savedTime: 0,
  startTime: null,
  endTime: null,
  formattedTime: '00:00',
  mode: null,
  pause: false,
  progressStyle: {
    '--value': '100',
    '--size': '12rem',
    '--thickness': '1rem',
  },
  settingsOpen: false,
  focusBreakRatio: 5,
  automaticRest: true,
  alarmRest: false,

  // Action
  toggleMode: () => {
    set((state) => {
      if (state.mode === 'focus') {
        const focusBreakRatio =
          state.focusBreakRatio != 0 ? state.focusBreakRatio : 1;
        const newRestTime = Math.floor(state.time / focusBreakRatio);

        if (!state.automaticRest && !state.pause) {
          return {
            formattedTime: formatTime(newRestTime * 1000),
            pause: true,
          };
        }

        if (newRestTime > 0) {
          return {
            time: newRestTime,
            savedTime: newRestTime,
            formattedTime: formatTime(newRestTime * 1000),
            mode: 'rest',
            pause: false,
          };
        }

        state.resetTimeAndUI();
        return { mode: null };
      }

      state.resetTimeAndUI();
      return state.mode === 'rest' ? { mode: null } : { mode: 'focus' };
    });
  },

  toggleSettings: () => {
    set((state) => ({
      settingsOpen: !state.settingsOpen,
    }));
  },

  setFocusBreakRatio: (ratio) => {
    set(() => ({
      focusBreakRatio: ratio,
    }));
  },

  setAutomaticRest: (forceFalse = true) => {
    set((state) => {
      if (forceFalse) {
        return { automaticRest: false };
      }

      return {
        automaticRest: !state.automaticRest,
      };
    });
  },

  setAlarmRest: (forceTrue = false) => {
    set((state) => {
      if (forceTrue) {
        return { alarmRest: true };
      }

      return {
        alarmRest: !state.alarmRest,
      };
    });
  },

  resetTimeAndUI: (resetMode = false, endOfRest = false) => {
    set((state) => {
      if (endOfRest && state.alarmRest) {
        endRestSound.play();
      }

      if (resetMode) {
        return {
          mode: null,
          time: 0,
          startTime: null,
          endTime: null,
          formattedTime: '00:00',
          progressStyle: {
            ...state.progressStyle,
            '--value': '100',
          },
        };
      }

      return {
        pause: false,
        time: 0,
        startTime: null,
        endTime: null,
        formattedTime: '00:00',
        progressStyle: {
          ...state.progressStyle,
          '--value': '100',
        },
      };
    });
  },

  updateTime: (increment) => {
    set((state) => {
      if (!state.endTime && state.mode === 'rest') {
        return {
          endTime: Date.now() + state.time * 1000,
          startTime: null,
        };
      }
      if (!state.startTime) {
        return {
          startTime: Date.now(),
        };
      }
      return {
        startTime: state.startTime,
      };
    });

    set((state) => {
      const now = Date.now();

      const newTime = increment ? now - state.startTime : state.endTime - now;
      const timeInMilliseconds = newTime > 0 ? Math.floor(newTime) : 0;

      return {
        time: newTime / 1000,
        formattedTime: formatTime(timeInMilliseconds),
      };
    });
  },

  updateProgress: () => {
    set((state) => {
      if (state.time <= 0.01) {
        state.resetTimeAndUI(true, true);
        return {
          progressStyle: {
            ...state.progressStyle,
            '--value': '100',
          },
        };
      }
      return {
        progressStyle: {
          ...state.progressStyle,
          '--value': (((state.time - 0.01) / state.savedTime) * 100).toString(),
        },
      };
    });
  },
}));

export default useFlowStore;
