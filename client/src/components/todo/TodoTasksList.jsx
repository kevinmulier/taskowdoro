import useTaskStore from '../../stores/useTaskStore';
import TodoTask from './TodoTask';

const TodoTasksList = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <ul>
      {tasks.map((task) => (
        <TodoTask
          key={task.id}
          task={task}
        />
      ))}
    </ul>
  );
};

export default TodoTasksList;
