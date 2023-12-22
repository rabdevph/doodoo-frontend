import { useState } from 'react';
import useAuthContext from './useAuthContext';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

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
      console.log(data);
      dispatch({ type: 'CHECK_SESSION', payload: data });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(data.message);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
