import PropTypes from 'prop-types';
import useTaskStore from '../../stores/useTaskStore';

const TodoTask = ({ task }) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <li key={task.content}>
      {task.content} <button onClick={() => deleteTask(task.id)}></button>
    </li>
  );
};

export default TodoTask;

TodoTask.propTypes = {
  task: PropTypes.object.isRequired,
};
