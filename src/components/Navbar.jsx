import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="flex items-center justify-between bg-white border-b-2 border-solid border-black px-4 py-2">
      <Link to="/" className="text-3xl font-bold">
        doodoo
      </Link>
      <nav className="text-sm">
        {user ? (
          <div className="flex items-center gap-4">
            <p>email address</p>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-gray-300 border-solid border-[1px] border-black px-2 py-0.5"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
