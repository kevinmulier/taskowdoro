import { create } from 'zustand';

const useTaskStore = create((set) => ({
  // State
  tasks: [],

  // Action
  addTask: (task) => {
    set((state) => ({
      tasks: state.tasks.concat(task),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
}));

export default useTaskStore;
