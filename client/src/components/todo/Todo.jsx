import useTaskStore from '../../stores/useTaskStore';
import TodoForm from './TodoForm';
import TodoTasksList from './TodoTasksList';
import TodoSelectList from './TodoSelectList';
import { Plus } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Todo = () => {
  const createTaskOpen = useTaskStore((state) => state.createTaskOpen);
  const selectedTasks = useTaskStore((state) => state.selectedTasks);
  const tasks = useTaskStore((state) => state.tasks);
  const tasksLists = useTaskStore((state) => state.tasksLists);

  const toggleCreateTaskForm = useTaskStore(
    (state) => state.toggleCreateTaskForm,
  );
  const setInitialTasksLists = useTaskStore(
    (state) => state.setInitialTasksLists,
  );
  const setInitialTasks = useTaskStore((state) => state.setInitialTasks);
  const clearTasksFocusTime = useTaskStore(
    (state) => state.clearTasksFocusTime,
  );

  const firstRender = useRef(true);

  useEffect(() => {
    const tasksListsData = localStorage.getItem('tasksLists');
    const tasksData = localStorage.getItem('tasks');

    if (tasksListsData && tasksData) {
      setInitialTasksLists(JSON.parse(tasksListsData));
      setInitialTasks(JSON.parse(tasksData));
    }
  }, [setInitialTasks, setInitialTasksLists]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      const saveData = () => {
        localStorage.setItem('tasksLists', JSON.stringify(tasksLists));
        localStorage.setItem('tasks', JSON.stringify(tasks));
      };

      saveData();

      const dateRecorded = localStorage.getItem('dateRecorded');
      const actualDate = new Date();

      if (Number(dateRecorded) !== actualDate.getDate()) {
        clearTasksFocusTime();
        localStorage.setItem('dateRecorded', actualDate.getDate());
      }
    }
  }, [tasksLists, tasks, clearTasksFocusTime]);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 px-2 py-8 rounded-lg sm:px-8 bg-base-300 h-fit">
      <h2 className="text-3xl font-bold">Todo</h2>
      {tasks.length > 0 && <TodoSelectList />}
      {tasks.length === 0 && (
        <p className="font-bold">Your task list is empty</p>
      )}
      {selectedTasks.length > 0 && <TodoTasksList />}
      {!createTaskOpen && (
        <button
          className="btn btn-circle btn-outline"
          onClick={toggleCreateTaskForm}>
          <Plus size={32} />
        </button>
      )}
      {createTaskOpen && <TodoForm />}
    </div>
  );
};

export default Todo;
