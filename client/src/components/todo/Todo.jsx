import useTaskStore from '../../stores/useTaskStore';
import TodoForm from './TodoForm';
import TodoTasksList from './TodoTasksList';

const Todo = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 px-2 py-8 mx-auto rounded-lg sm:px-8 bg-base-300">
      <h2 className="text-3xl font-bold">Todo</h2>
      {tasks.length > 0 && <TodoTasksList />}
      <TodoForm />
    </div>
  );
};

export default Todo;