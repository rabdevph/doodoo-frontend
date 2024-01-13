import { createContext, useReducer, useEffect } from 'react';
import { ACTION_TYPES } from '../utils/actionTypes';

const initialState = {
  user: null,
  email: null,
  hasSessionToken: false,
  isFetching: false,
  isError: false,
  errorMessage: '',
};

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return {
        ...state,
        isFetching: true,
      };
    case ACTION_TYPES.FETCH_SUCCESS:
      return {
        user: action.payload._id,
        email: action.payload.email,
        hasSessionToken: action.payload.hasSessionToken,
        isFetching: false,
        isError: false,
        errorMessage: '',
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
        user: null,
        email: null,
        hasSessionToken: false,
        isFetching: false,
        isError: false,
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
      dispatch({ type: ACTION_TYPES.FETCH_START });

      const response = await fetch('http://localhost:8000/api/users/session-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        dispatch({ type: ACTION_TYPES.FETCH_FAILED });
      }

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data });
      } else {
        dispatch({ type: ACTION_TYPES.FETCH_FAILED });
      }
    };

    getUser();
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
