import { createContext, useReducer } from 'react';
import { ACTION_TYPES } from '../utils/actionTypes';

const initialState = {
  tasks: null,
  isFetching: false,
  isError: false,
  errorMessage: '',
};

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        isFetching: false,
      };
    case ACTION_TYPES.CREATE_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        isFetching: false,
      };
    case ACTION_TYPES.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t._id === action.payload._id) {
            return { ...t, ...action.payload };
          }
          return t;
        }),
        isFetching: false,
      };
    case ACTION_TYPES.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t._id !== action.payload._id),
        isFetching: false,
      };
    case ACTION_TYPES.FETCH_START:
      return {
        ...state,
        isFetching: true,
      };
    case ACTION_TYPES.FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorMessage: action.payload.message,
      };
    case ACTION_TYPES.RESET:
      return {
        tasks: null,
        isFetching: false,
        isError: false,
        errorMessage: '',
      };
    default:
      return state;
  }
};

const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return <TaskContext.Provider value={{ ...state, dispatch }}>{children}</TaskContext.Provider>;
};

export { TaskContext, TaskContextProvider };
