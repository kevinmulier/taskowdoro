import { create } from 'zustand';

const useTaskStore = create((set) => ({
  // State
  tasks: [],
  tasksLists: [],
  currentTask: null,

  // Action
  addTask: (task) => {
    set((state) => ({
      tasks: state.tasks.concat(task),
    }));
  },

  createOrUpdateTasksList: (list) => {
    set((state) => {
      // Check if a list with the same id already exists
      if (
        state.tasksLists.some((existingList) => existingList.id === list.id)
      ) {
        return {
          tasksLists: state.tasksLists.map((taskList) =>
            taskList.id !== list.id
              ? taskList // If not the list we want to update, return it as is
              : {
                  ...taskList,
                  // Combine existing tasks with new tasks, removing duplicates
                  tasks: Array.from(
                    new Set([...taskList.tasks, ...list.tasks]),
                  ),
                },
          ),
        };
      }

      // If no existing list matches the new list's id, add the new list to the state
      return {
        tasksLists: state.tasksLists.concat(list),
      };
    });
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
