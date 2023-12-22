import { useState } from 'react';
import useRegister from '../hooks/useRegister';
import Visible from '../assets/icons/visible.svg';
import Invisible from '../assets/icons/invisible.svg';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [visible, setVisible] = useState(false);
  const { register, isLoading, error } = useRegister();

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { name, email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('form submitted');
    await register(name, email, password);
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex flex-col gap-6 items-center bg-yellow-300 border-2 border-solid border-black p-8 shadow-common">
      <h3 className="text-3xl font-bold">REGISTER</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64 text-sm">
        <div className="flex flex-col gap-0.5">
          <p className="font-semibold text-xs">NAME:</p>
          <div className="border-[1px] bg-white border-solid border-black p-2">
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              autoComplete="off"
              onChange={handleInputChange}
              className="border-[1px] bg-transparent border-none outline-none w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-semibold text-xs">EMAIL:</p>
          <div className="border-[1px] bg-white border-solid border-black p-2">
            <input
              id="email"
              type="text"
              name="email"
              value={email}
              autoComplete="off"
              onChange={handleInputChange}
              className="border-[1px] bg-transparent border-none outline-none w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-semibold text-xs">PASSWORD:</p>
          <div className="flex gap-1 border-[1px] bg-white border-solid border-black p-2">
            <input
              id="password"
              type={visible ? 'text' : 'password'}
              name="password"
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
          value="SUBMIT"
          className="border-[1px] bg-blue-500 border-solid border-black text-white font-semibold p-2"
        />
        {error ? (
          <div className="bg-white border-solid border-[1px] border-red-500 text-red-500 text-[10px] px-2 py-0.5">
            {error}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Register;
