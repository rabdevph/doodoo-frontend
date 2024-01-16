import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-6 bg-white border-solid border-2 border-black p-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-7xl">404</p>
        <p className="text-sm">Requested page not found.</p>
      </div>
      <Link
        to="/"
        className="border-[1px] bg-blue-500 border-solid border-black cursor-pointer font-semibold text-sm text-white p-2"
      >
        GO TO HOME
      </Link>
    </div>
  );
};

export default NotFound;
