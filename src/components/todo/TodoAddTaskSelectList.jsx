import useTaskStore from '../../stores/useTaskStore';

const TodoAddTaskSelectList = () => {
  const lists = useTaskStore((state) => state.tasksLists);
  const selectedList = useTaskStore((state) => state.selectedList);
  const setSelectedList = useTaskStore((state) => state.setSelectedList);

  const handleSelectTask = (event) => {
    setSelectedList(event.target.value);
  };

  return (
    <label className="w-full max-w-xs form-control">
      <div className="label">
        <span
          className="label-text"
          htmlFor="todo">
          Add to tasks list
        </span>
      </div>
      <select
        type="text"
        id="listSelect"
        name="listSelect"
        className="w-full select select-bordered"
        value={selectedList}
        onChange={(e) => handleSelectTask(e)}>
        <option value="all">Create a new list</option>
        {lists.map((list) => {
          return (
            <option
              key={list.id}
              value={list.id}>
              {list.name}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default TodoAddTaskSelectList;
