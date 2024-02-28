import { useState } from 'react';
import useTaskStore from '../../stores/useTaskStore';
import TodoSelectList from './TodoSelectList';

const TodoForm = () => {
  const [addTaskList, setAddTaskList] = useState('addnewlist');

  const addTask = useTaskStore((state) => state.addTask);
  const createOrUpdateTasksList = useTaskStore(
    (state) => state.createOrUpdateTasksList,
  );
  const lists = useTaskStore((state) => state.tasksLists);

  const handleAddTask = (event) => {
    event.preventDefault();

    const taskContent = event.target.todo.value.trim();
    const taskId = crypto.randomUUID();
    const listId = createOrUpdateList(event, taskId);

    if (taskContent) {
      const newTaskObject = {
        content: taskContent,
        completed: false,
        list: listId,
        id: taskId,
      };

      clearFormFields(event);
      addTask(newTaskObject);
    }
  };

  const createOrUpdateList = (event, taskId) => {
    let list = {};

    if (event.target.newlist) {
      list = {
        name: event.target.newlist.value.trim(),
        tasks: [taskId],
        id: crypto.randomUUID(),
      };
    } else {
      list = {
        tasks: [taskId],
        id: addTaskList,
      };
    }

    createOrUpdateTasksList(list);

    return list.id;
  };

  const clearFormFields = (event) => {
    event.target.todo.value = '';
    event.target.newlist.value = '';
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
      <TodoSelectList
        lists={lists}
        setAddTaskList={setAddTaskList}
        addTaskList={addTaskList}
      />
      {addTaskList === 'addnewlist' && (
        <label className="w-full max-w-xs form-control">
          <div className="label">
            <span
              className="label-text"
              htmlFor="newlist">
              New list name
            </span>
          </div>
          <input
            type="text"
            id="newlist"
            name="newlist"
            placeholder="New list name"
            className="w-full input input-bordered"
            required
          />
        </label>
      )}
      <button
        type="submit"
        className="btn btn-outline">
        Add task
      </button>
    </form>
  );
};

export default TodoForm;
