import { useState } from 'react';
import useLogin from '../hooks/useLogin';
import Email from '../assets/icons/email.svg';
import Password from '../assets/icons/password.svg';
import Visible from '../assets/icons/visibility_on.svg';
import Invisible from '../assets/icons/visibility_off.svg';
import useAuthContext from '../hooks/useAuthContext';
import Loader from '../components/Loader.jsx';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [visible, setVisible] = useState(false);
  const { isFetching, isError, errorMessage } = useAuthContext();
  const { login } = useLogin();

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return isFetching ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-4 items-center bg-yellow-300 border-2 border-solid border-black p-8">
      <h3 className="text-2xl font-bold">LOGIN</h3>
      <form id="loginForm" onSubmit={handleSubmit} className="flex flex-col gap-3 w-64 text-sm">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 border-[1px] bg-white border-solid border-black p-2">
            <img src={Email} alt="" className="w-auto h-5" />
            <input
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              autoComplete="off"
              onChange={handleInputChange}
              className="border-[1px] bg-transparent border-none outline-none w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 border-[1px] bg-white border-solid border-black p-2">
            <img src={Password} alt="" className="w-auto h-5" />
            <input
              id="password"
              type={visible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={password}
              autoComplete="off"
              onChange={handleInputChange}
              className="border-[1px] bg-transparent border-none outline-none w-full"
            />
            <button type="button" onClick={toggleVisible} className="border-none outline-none">
              <img src={visible ? Invisible : Visible} alt="" className="w-auto h-5" />
            </button>
          </div>
        </div>
        <input
          type="submit"
          value="LOGIN"
          className="border-[1px] bg-blue-500 border-solid border-black cursor-pointer text-white font-semibold p-2"
        />
        {isError ? (
          <div className="bg-white border-solid border-[1px] border-red-500 text-red-500 font-semibold text-[11px] px-2 py-0.5">
            {errorMessage}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Login;
