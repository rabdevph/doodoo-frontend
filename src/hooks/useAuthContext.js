import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside AuthContextProvider');
  }

  return context;
};

export default useAuthContext;
