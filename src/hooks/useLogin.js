import useAuthContext from './useAuthContext';
import { ACTION_TYPES } from '../utils/actionTypes';

const useLogin = () => {
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    dispatch({ type: ACTION_TYPES.LOGIN_REQUEST });

    const response = await fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: ACTION_TYPES.LOGIN_SUCCEED, payload: data });
    } else {
      dispatch({ type: ACTION_TYPES.LOGIN_FAILED, payload: data });
    }
  };

  return { login };
};

export default useLogin;
