import useAuthContext from './useAuthContext';
import { ACTION_TYPES } from '../utils/actionTypes';

const useRegister = () => {
  const { dispatch } = useAuthContext();

  const register = async (name, email, password) => {
    dispatch({ type: ACTION_TYPES.RESET });
    dispatch({ type: ACTION_TYPES.REGISTER_REQUEST });

    const response = await fetch('http://localhost:8000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: ACTION_TYPES.REGISTER_SUCCEED, payload: data });
    } else {
      dispatch({ type: ACTION_TYPES.REGISTER_FAILED, payload: data });
    }
  };

  return { register };
};

export default useRegister;
