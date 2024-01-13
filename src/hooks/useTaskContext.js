import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext.jsx';

const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext must be inside TaskContextProvider');
  }

  return context;
};

export default useTaskContext;
