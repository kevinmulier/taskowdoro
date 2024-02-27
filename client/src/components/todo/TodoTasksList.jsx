import useTaskStore from '../../stores/useTaskStore';
import TodoTask from './TodoTask';

const TodoTasksList = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="w-full overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="text-center uppercase">
            <th className="w-2/12">Actions</th>
            <th className="w-9/12">Task</th>
            <th className="w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TodoTask
              key={task.id}
              task={task}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTasksList;
