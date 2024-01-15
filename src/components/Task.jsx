import { formatDistanceToNow } from 'date-fns';
import useTaskContext from '../hooks/useTaskContext';
import { ACTION_TYPES } from '../utils/actionTypes';
import Delete from '../assets/icons/delete.svg';

const Task = ({ task }) => {
  const { dispatch } = useTaskContext();

  const handleClickCheckbox = async () => {
    const taskProgress = task.progress === 'pending' ? 'completed' : 'pending';

    const updatedProgress = { progress: taskProgress };

    const response = await fetch(`http://localhost:8000/api/tasks/${task._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProgress),
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: ACTION_TYPES.UPDATE_TASK, payload: data });
    }
  };

  const handleClickDelete = async () => {
    const response = await fetch(`http://localhost:8000/api/tasks/${task._id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: ACTION_TYPES.DELETE_TASK, payload: data });
    }
  };

  const taskBgColor = () => {
    switch (task.priorityLevel) {
      case 'low':
        return 'bg-green-300';
      case 'medium':
        return 'bg-yellow-300';
      case 'high':
        return 'bg-red-300';
    }
  };

  const taskTextClass =
    task.progress === 'pending' ? '' : 'line-through decoration-solid decoration-2';

  const taskCheckboxBg = task.progress === 'pending' ? 'bg-white' : 'bg-gray-800';

  return (
    <div
      className={`task-wrapper | grid grid-cols-[max-content,1fr,max-content] grid-rows-[max-content,max-content] gap-x-2 gap-y-1 ${taskBgColor()} p-2 border-2 border-solid border-black shadow-common`}
    >
      <button
        id="checkbox"
        type="button"
        onClick={handleClickCheckbox}
        className={`${taskCheckboxBg} self-start border-2 border-solid border-black w-3.5 h-3.5 rounded-full`}
      ></button>

      <div className="description-wrapper | flex items-center">
        <p className={`${taskTextClass} whitespace-pre-line break-all`}>{task.description}</p>
      </div>

      <button
        id="delete"
        type="button"
        className="opacity-75 hover:opacity-100 self-start w-4 h-4"
        onClick={handleClickDelete}
      >
        <img src={Delete} alt="" />
      </button>

      <div className="create-at-wrapper col-start-2">
        <p className="text-[10px] leading-3">
          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default Task;
