import PropTypes from 'prop-types';

const TodoSelectList = ({ addTaskList, setAddTaskList, lists }) => {
  const handleSelectTask = (event) => {
    setAddTaskList(event.target.value);
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
        value={addTaskList}
        onChange={(e) => handleSelectTask(e)}>
        <option value="addnewlist">Create a new list</option>
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

export default TodoSelectList;

TodoSelectList.propTypes = {
  addTaskList: PropTypes.string.isRequired,
  setAddTaskList: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
  createOption: PropTypes.bool,
};
