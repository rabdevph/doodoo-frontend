import { useState } from 'react';
import useRegister from '../hooks/useRegister';
import Name from '../assets/icons/name.svg';
import Email from '../assets/icons/email.svg';
import Password from '../assets/icons/password.svg';
import Visible from '../assets/icons/visibility_on.svg';
import Invisible from '../assets/icons/visibility_off.svg';
import useAuthContext from '../hooks/useAuthContext';
import Loader from '../components/Loader.jsx';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [visible, setVisible] = useState(false);
  const { register } = useRegister();
  const { isFetching, isError, errorFields, errorMessage } = useAuthContext();

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { name, email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(name, email, password);
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const inputWrapperClass = 'border-black bg-white';
  const inputErrorWrapperClass = 'border-red-500 bg-red-100';

  return isFetching ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-6 items-center bg-yellow-300 border-2 border-solid border-black p-8">
      <h3 className="text-2xl font-bold">REGISTER</h3>
      <form id="registerForm" onSubmit={handleSubmit} className="flex flex-col gap-3 w-64 text-sm">
        <div className="flex flex-col gap-0.5">
          <div
            className={`flex items-center gap-2 border-[1px] ${
              errorFields.includes('name') ? inputErrorWrapperClass : inputWrapperClass
            } border-solid p-2`}
          >
            <img src={Name} alt="" className="w-auto h-5" />
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              autoComplete="off"
              onChange={handleInputChange}
              className="border-[1px] bg-transparent border-none outline-none w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div
            className={`flex items-center gap-2 border-[1px] ${
              errorFields.includes('email') ? inputErrorWrapperClass : inputWrapperClass
            } border-solid p-2`}
          >
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
          <div
            className={`flex items-center gap-2 border-[1px] ${
              errorFields.includes('password') ? inputErrorWrapperClass : inputWrapperClass
            } border-solid p-2`}
          >
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
          value="REGISTER"
          disabled={isFetching}
          className="border-[1px] bg-blue-500 border-solid border-black cursor-pointer text-white font-semibold p-2"
        />
        {isError ? (
          <div className="bg-red-100 border-solid border-[1px] border-red-500 text-red-500 font-semibold text-[11px] px-2 py-0.5">
            {errorMessage}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Register;
