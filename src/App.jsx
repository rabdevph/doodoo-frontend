import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Loader from './components/Loader.jsx';

const App = () => {
  const { user, isFetching } = useAuthContext();

  return isFetching ? (
    <Loader />
  ) : (
    <div className="app | flex flex-col items-center font-mono h-screen w-full py-4">
      <div className="wrapper | flex flex-col h-full w-[768px] border-2 border-solid border-black ">
        <div>
          <Navbar />
        </div>
        <div className="pages | flex items-center justify-center flex-1 bg-sky-300">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
