import useAuthContext from './useAuthContext';

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
      dispatch({ type: 'LOGOUT' });
    }
  };

  return { logout };
};

export default useLogout;
