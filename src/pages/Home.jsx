import { useEffect, useState } from 'react';
import useTaskContext from '../hooks/useTaskContext.js';
import { ACTION_TYPES } from '../utils/actionTypes.js';
import NewTask from '../components/NewTask.jsx';
import Loader from '../components/Loader.jsx';
import Task from '../components/Task.jsx';

const Home = () => {
  const [isNewTaskVisible, setIsNewTaskVisible] = useState(false);
  const { dispatch, tasks, isFetching } = useTaskContext();

  const toggleNewTaskVisibility = () => {
    setIsNewTaskVisible(!isNewTaskVisible);
    dispatch({ type: ACTION_TYPES.RESET_ERROR });
  };

  useEffect(() => {
    const getTasks = async () => {
      dispatch({ type: ACTION_TYPES.RESET });
      dispatch({ type: ACTION_TYPES.GET_TASKS_REQUEST });

      const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: ACTION_TYPES.GET_TASKS_SUCCEED, payload: data });
      } else {
        dispatch({ type: ACTION_TYPES.GET_DETAILS_FAILED, payload: data });
      }
    };

    getTasks();
  }, [dispatch]);

  if (isFetching) return <Loader />;

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4 text-xs">
      {isNewTaskVisible ? (
        <NewTask toggleNewTaskVisibility={toggleNewTaskVisibility} />
      ) : (
        <div className="flex flex-col h-[338px] w-full overflow-y-auto bg-white border-2 border-solid border-black gap-4 p-4">
          {tasks ? tasks.map((task) => <Task key={task._id} task={task} />) : null}
        </div>
      )}
      <button
        id="toggleVisibilityButton"
        type="button"
        onClick={toggleNewTaskVisibility}
        className={`${
          isNewTaskVisible ? 'bg-red-500' : 'bg-blue-500'
        } border-2 border-solid border-black cursor-pointer w-full text-white font-semibold p-2`}
      >
        {isNewTaskVisible ? 'Cancel' : 'New task'}
      </button>
    </div>
  );
};

export default Home;
