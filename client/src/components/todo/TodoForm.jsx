import useTaskStore from '../../stores/useTaskStore';

const TodoForm = () => {
  const addTask = useTaskStore((state) => state.addTask);

  const handleAddTask = (event) => {
    event.preventDefault();
    const content = event.target.todo.value;

    const newTaskObject = {
      content: content,
      completed: false,
      id: crypto.randomUUID(),
    };

    addTask(newTaskObject);
  };

  return (
    <form
      onSubmit={handleAddTask}
      className="flex flex-col items-center justify-center gap-3">
      <h3 className="text-xl font-bold">Add a new task</h3>
      <label className="w-full max-w-xs form-control">
        <div className="label">
          <span
            className="label-text"
            htmlFor="todo">
            Task title
          </span>
        </div>
        <input
          type="text"
          id="todo"
          name="todo"
          placeholder="Type here..."
          className="w-full input input-bordered"
          required
        />
      </label>
      <button
        type="submit"
        className="btn btn-outline">
        Add task
      </button>
    </form>
  );
};

export default TodoForm;
