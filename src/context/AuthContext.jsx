import { createContext, useReducer, useEffect } from 'react';
import { ACTION_TYPES } from '../utils/actionTypes';

const initialState = {
  user: null,
  email: null,
  hasSessionToken: false,
  isFetching: false,
  statusMessage: '',
  isError: false,
  errorFields: [],
  errorMessage: '',
};

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ACTION_TYPES.REGISTER_SUCCEED:
      return {
        ...state,
        isFetching: false,
        statusMessage: action.payload?.message,
      };
    case ACTION_TYPES.REGISTER_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorFields: action.payload?.errorFields,
        errorMessage: action.payload?.message,
      };
    case ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ACTION_TYPES.LOGIN_SUCCEED:
      return {
        ...state,
        user: action.payload?.userId,
        email: action.payload?.email,
        isFetching: false,
      };
    case ACTION_TYPES.LOGIN_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorFields: action.payload?.errorFields,
        errorMessage: action.payload?.message,
      };
    case ACTION_TYPES.GET_DETAILS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ACTION_TYPES.GET_DETAILS_SUCCEED:
      return {
        ...state,
        user: action.payload.userId,
        email: action.payload.email,
        hasSessionToken: action.payload.hasSessionToken,
        isFetching: false,
      };
    case ACTION_TYPES.GET_DETAILS_FAILED:
      return {
        ...state,
        isFetching: false,
        hasSessionToken: action.payload.hasSessionToken,
      };
    case ACTION_TYPES.RESET:
      return {
        user: null,
        email: null,
        hasSessionToken: false,
        isFetching: false,
        statusMessage: '',
        isError: false,
        errorFields: [],
        errorMessage: '',
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const getUser = async () => {
      dispatch({ type: ACTION_TYPES.RESET });
      dispatch({ type: ACTION_TYPES.GET_DETAILS_REQUEST });

      const response = await fetch('http://localhost:8000/api/users/session-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: ACTION_TYPES.GET_DETAILS_SUCCEED, payload: data });
      } else {
        dispatch({ type: ACTION_TYPES.GET_DETAILS_FAILED, payload: data });
      }
    };

    getUser();
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
