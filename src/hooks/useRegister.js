import { useState } from 'react';
import useAuthContext from './useAuthContext';

const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

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
      console.log(response);
      dispatch({ type: 'CHECK_SESSION', payload: data });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(data.message);
    }
  };

  return { register, isLoading, error };
};

export default useRegister;
