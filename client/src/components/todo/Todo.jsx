import useTaskStore from '../../stores/useTaskStore';
import TodoForm from './TodoForm';
import TodoTasksList from './TodoTasksList';
import TodoSelectList from './TodoSelectList';
import { Plus } from 'lucide-react';

const Todo = () => {
  const createTaskOpen = useTaskStore((state) => state.createTaskOpen);

  const toggleCreateTaskForm = useTaskStore(
    (state) => state.toggleCreateTaskForm,
  );
  const selectedTasks = useTaskStore((state) => state.selectedTasks);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 px-2 py-8 rounded-lg md:max-w-2xl sm:px-8 bg-base-300">
      <h2 className="text-3xl font-bold">Todo</h2>
      <TodoSelectList />
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
