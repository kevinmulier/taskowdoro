import { useEffect } from 'react';
import useTaskStore from '../../stores/useTaskStore';

const TodoSelectList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const lists = useTaskStore((state) => state.tasksLists);
  const selectedList = useTaskStore((state) => state.selectedList);

  const setSelectedList = useTaskStore((state) => state.setSelectedList);

  const handleSelectTask = (event) => {
    setSelectedList(event.target.value);
  };

  useEffect(() => {
    setSelectedList(useTaskStore.getState().selectedList);
  }, [tasks, setSelectedList]);

  return (
    <label className="w-full max-w-xs form-control">
      <div className="label">
        <span
          className="label-text"
          htmlFor="todo">
          Select an existing task list
        </span>
      </div>
      <select
        type="text"
        id="existingListSelect"
        name="existingListSelect"
        className="w-full select select-bordered"
        value={selectedList}
        onChange={(e) => handleSelectTask(e)}>
        <option value="all">All tasks</option>
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
