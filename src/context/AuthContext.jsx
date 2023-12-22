import { createContext, useReducer, useEffect, useState } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'CHECK_SESSION':
      console.log(`dispatch 'CHECK_SESSION' action`);
      return { user: action.payload._id, hasAccessToken: action.payload.hasAccessToken };
    case 'LOGOUT':
      console.log(`dispatch 'LOGOUT' action`);
      return { user: null, hasAccessToken: false };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    hasAccessToken: false,
    isFetching: false,
  });
  const [isFetching, setIsFetching] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setIsFetching(true);
      const response = await fetch('http://localhost:8000/api/users/hasAccessToken', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Successfully fetched data.`);
        dispatch({ type: 'CHECK_SESSION', payload: data });
        setIsFetching(false);
      } else {
        console.log(`Error fetching data.`);
        setIsFetching(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isFetching }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
