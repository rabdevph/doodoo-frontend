import { useState } from 'react';
import useTaskContext from '../hooks/useTaskContext';
import { ACTION_TYPES } from '../utils/actionTypes';

const NewTask = ({ toggleNewTaskVisibility }) => {
  const { dispatch, isError, errorFields, errorMessage } = useTaskContext();
  const [description, setDescription] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('low');

  const newTask = { description, priorityLevel };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPES.CREATE_TASK_REQUEST });

    const response = await fetch(`http://localhost:8000/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: ACTION_TYPES.CREATE_TASK_SUCCEED, payload: data });
      setDescription('');
      setPriorityLevel('low');
      toggleNewTaskVisibility();
    } else {
      dispatch({ type: ACTION_TYPES.CREATE_TASK_FAILED, payload: data });
    }
  };

  const handlePriorityLevelClick = (priority) => {
    setPriorityLevel(priority);
  };

  const descriptionClass = 'border-black bg-gray-100';
  const descriptionErrorClass = 'border-red-500 bg-red-100';

  return (
    <div className="new-task-form-wrapper | flex flex-col items-center gap-4 h-[338px] w-full bg-white border-2 border-solid border-black p-4">
      {isError ? (
        <div className="label | font-semibold text-red-500">{errorMessage}</div>
      ) : (
        <div className="label | font-semibold">Create new task</div>
      )}
      <form
        id="newTaskForm"
        onSubmit={handleFormSubmit}
        className="new-task-form | flex flex-col gap-4 w-full h-full"
      >
        <textarea
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={`flex-1 border-2 border-solid ${
            errorFields.includes('description') ? descriptionErrorClass : descriptionClass
          } focus:outline-none resize-none w-full p-2`}
        ></textarea>
        <div className="new-task-control-wrapper | flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-semibold">Priority:</p>
            <div className="flex items-center border-2 border-solid border-black">
              <button
                id="lowPriorityButton"
                type="button"
                onClick={() => handlePriorityLevelClick('low')}
                className={`bg-green-400 border-none h-8 w-16 outline-none ${
                  priorityLevel === 'low' ? 'opacity-100' : 'opacity-50'
                }`}
              >
                Low
              </button>
              <button
                id="mediumPriorityButton"
                type="button"
                onClick={() => handlePriorityLevelClick('medium')}
                className={`bg-yellow-400 border-none h-8 w-16 outline-none ${
                  priorityLevel === 'medium' ? 'opacity-100' : 'opacity-50'
                }`}
              >
                Medium
              </button>
              <button
                id="highPriorityButton"
                type="button"
                onClick={() => handlePriorityLevelClick('high')}
                className={`bg-red-400 border-none h-8 w-16 outline-none ${
                  priorityLevel === 'high' ? 'opacity-100' : 'opacity-50'
                }`}
              >
                High
              </button>
            </div>
          </div>
          <input
            type="submit"
            value="SAVE"
            className="bg-blue-500 border-2 border-solid border-black cursor-pointer font-semibold text-white h-8 w-20 outline-none"
          />
        </div>
      </form>
    </div>
  );
};

export default NewTask;
