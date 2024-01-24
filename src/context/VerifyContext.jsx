import { createContext, useReducer } from 'react';
import { ACTION_TYPES } from '../utils/actionTypes';

const initialState = {
  email: null,
  isVerified: false,
  isSent: false,
  statusMessage: '',
  isFetching: false,
  isError: false,
  errorMessage: '',
};

const VerifyContext = createContext();

const verifyReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_DETAILS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ACTION_TYPES.GET_DETAILS_SUCCEED:
      return {
        ...state,
        email: action.payload?.email,
        isVerified: action.payload?.isVerified,
        statusMessage: action.payload?.message,
        isFetching: false,
      };
    case ACTION_TYPES.GET_DETAILS_FAILED:
      return {
        ...state,
        email: action.payload?.email,
        isFetching: false,
        isError: true,
        errorMessage: action.payload?.message,
      };
    case ACTION_TYPES.VERIFICATION_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ACTION_TYPES.VERIFICATION_SUCCEED:
      return {
        ...state,
        isVerified: action.payload?.isVerified,
        isFetching: false,
        statusMessage: action.payload?.message,
      };
    case ACTION_TYPES.VERIFICATION_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorMessage: action.payload?.message,
      };
    case ACTION_TYPES.RESEND_VERIFICATION_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ACTION_TYPES.RESEND_VERIFICATION_SUCCEED:
      return {
        ...state,
        email: action.payload?.email,
        isFetching: false,
        isSent: true,
        statusMessage: action.payload?.message,
      };
    case ACTION_TYPES.RESEND_VERIFICATION_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorMessage: action.payload?.message,
      };
    case ACTION_TYPES.RESET:
      return {
        email: null,
        isVerified: false,
        isSent: false,
        statusMessage: '',
        isFetching: false,
        isError: false,
        errorMessage: '',
      };
  }
};

const VerifyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(verifyReducer, initialState);

  return <VerifyContext.Provider value={{ ...state, dispatch }}>{children}</VerifyContext.Provider>;
};

export { VerifyContext, VerifyContextProvider };
