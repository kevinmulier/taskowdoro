import { create } from 'zustand';

const useTaskStore = create((set) => ({
  // State
  tasks: [],
  selectedTasks: [],
  tasksLists: [],
  selectedList: 'all',
  currentTask: null,
  createTaskOpen: false,

  // Action
  setInitialTasksLists: (tasksLists) => {
    set(() => ({
      tasksLists: tasksLists,
      selectedList: 'all',
    }));
  },

  setInitialTasks: (tasks) => {
    set(() => ({
      tasks: tasks,
      selectedTasks: tasks,
    }));
  },

  toggleCreateTaskForm: () => {
    set((state) => ({
      createTaskOpen: !state.createTaskOpen,
    }));
  },

  addTask: (task) => {
    set((state) => ({
      tasks: state.tasks.concat(task),
      createTaskOpen: false,
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
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      const updatedSelectedTasks = state.selectedTasks.filter(
        (task) => task.id !== id,
      );
      const updatedTasksLists = state.tasksLists
        .map((tasksList) =>
          !tasksList.tasks.includes(id)
            ? tasksList
            : {
                ...tasksList,
                tasks: tasksList.tasks.filter((task) => task !== id),
              },
        )
        .filter((tasksList) => tasksList.tasks.length > 0);

      return {
        tasks: updatedTasks,
        selectedTasks: updatedSelectedTasks,
        selectedList:
          updatedSelectedTasks.length > 0 ? state.selectedList : 'all',
        tasksLists: updatedTasksLists,
        currentTask: state.currentTask
          ? state.currentTask.id !== id
            ? state.currentTask
            : null
          : null,
      };
    });
  },

  checkTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id !== id ? task : { ...task, completed: !task.completed },
      );
      return {
        tasks: updatedTasks,
      };
    });
  },

  updateTaskFocusTime: (time) => {
    set((state) => {
      return {
        tasks: state.tasks.map((task) =>
          task.id !== state.currentTask.id
            ? task
            : { ...task, focusTime: Math.floor(task.focusTime + time) },
        ),
      };
    });
  },

  clearTasksFocusTime: () => {
    set((state) => {
      return {
        tasks: state.tasks.map((task) => ({ ...task, focusTime: 0 })),
      };
    });
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

  setSelectedList: (listId) => {
    set((state) => {
      if (listId === 'all') {
        return {
          selectedList: 'all',
          selectedTasks: state.tasks,
        };
      } else {
        const newSelectedTasks = state.tasks.filter(
          (task) => task.list === listId,
        );
        return {
          selectedList: listId,
          selectedTasks: newSelectedTasks,
        };
      }
    });
  },
}));

export default useTaskStore;
