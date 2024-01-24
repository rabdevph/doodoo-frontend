import { useContext } from 'react';
import { VerifyContext } from '../context/VerifyContext.jsx';

const useVerifyContext = () => {
  const context = useContext(VerifyContext);

  if (!context) {
    throw new Error('useVerifyContext must be used inside VerifyContextProvider');
  }

  return context;
};

export default useVerifyContext;
