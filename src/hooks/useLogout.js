import useAuthContext from './useAuthContext';
import { ACTION_TYPES } from '../utils/actionTypes';

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    const response = await fetch('http://localhost:8000/api/users/logout', {
      method: 'GET',
      headers: {
        'Context-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      dispatch({ type: ACTION_TYPES.RESET });
    }
  };

  return { logout };
};

export default useLogout;
