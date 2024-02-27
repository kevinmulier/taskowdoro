import { create } from 'zustand';

const useTaskStore = create((set) => ({
  // State
  tasks: [],
  currentTask: null,

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

  checkTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id !== id ? task : { ...task, completed: !task.completed },
      ),
    }));
  },

  setCurrentTask: (id = null) => {
    set((state) => {
      if (!id) {
        return {
          currentTask: null,
        };
      }
      return {
        currentTask: {
          id: id,
          task: state.tasks.find((task) => task.id === id).content,
        },
      };
    });
  },
}));

export default useTaskStore;
