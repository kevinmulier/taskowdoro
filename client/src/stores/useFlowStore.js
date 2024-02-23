import { create } from 'zustand';
import formatTime from '../utils/formatTime';

const useFlowStore = create((set) => ({
  // State
  time: 0,
  savedTime: 0,
  formattedTime: '00:00',
  mode: null,
  progressStyle: {
    '--value': '100',
    '--size': '12rem',
    '--thickness': '1rem',
  },

  // Action
  toggleMode: () => {
    set((state) => {
      if (state.mode === 'focus') {
        const newRestTime = Math.floor(state.time / 5);

        if (newRestTime > 0) {
          return {
            time: newRestTime,
            savedTime: newRestTime,
            formattedTime: formatTime(newRestTime * 1000),
            mode: 'rest',
          };
        }

        state.resetTimeAndUI();
        return { mode: null };
      }

      state.resetTimeAndUI();
      return state.mode === 'rest' ? { mode: null } : { mode: 'focus' };
    });
  },

  resetTimeAndUI: (resetMode = false) => {
    set((state) => {
      if (resetMode) {
        return {
          mode: null,
          time: 0,
          formattedTime: '00:00',
          progressStyle: {
            ...state.progressStyle,
            '--value': '100',
          },
        };
      }

      return {
        time: 0,
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
      const newTime = increment
        ? state.time + 0.01
        : Math.max(state.time - 0.01, 0);
      const timeInMilliseconds = newTime > 0 ? Math.ceil(newTime) * 1000 : 0;
      return { time: newTime, formattedTime: formatTime(timeInMilliseconds) };
    });
  },

  updateProgress: (time, savedTime) => {
    set((state) => ({
      progressStyle: {
        ...state.progressStyle,
        '--value': (((time - 0.01) / savedTime) * 100).toString(),
      },
    }));
  },
}));

export default useFlowStore;
