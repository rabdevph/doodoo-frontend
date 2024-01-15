import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { ACTION_TYPES } from '../utils/actionTypes';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const { dispatch, user, email, isFetching } = useAuthContext();
  const { logout } = useLogout();

  const handleLinkClick = () => {
    dispatch({ type: ACTION_TYPES.RESET });
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="flex items-center justify-between bg-orange-300 border-b-2 border-solid border-black h-[54px] px-4">
      {isFetching ? (
        <>
          <div className="w-28 h-8 bg-gray-100"></div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-6 bg-gray-100"></div>
            <div className="w-20 h-6 bg-gray-100"></div>
          </div>
        </>
      ) : (
        <>
          <Link to="/" onClick={handleLinkClick} className="text-3xl font-bold">
            doodoo
          </Link>
          <nav className="text-sm">
            {user ? (
              <div className="flex items-center gap-4">
                <p>{email}</p>
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
                <Link to="/login" onClick={handleLinkClick}>
                  Login
                </Link>
                <Link to="/register" onClick={handleLinkClick}>
                  Register
                </Link>
              </div>
            )}
          </nav>
        </>
      )}
    </header>
  );
};

export default Navbar;
