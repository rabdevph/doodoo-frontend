const Loader = () => {
  return (
    <div className="app | flex flex-col items-center font-mono h-screen w-full py-4 text-xs">
      <div className="wrapper | flex flex-col h-full w-[768px] border-2 border-solid border-gray-400 ">
        <div>
          <header className="flex items-center justify-between bg-white border-b-2 border-solid border-gray-400 px-4 py-2">
            <div className="font-bold bg-gray-100 w-[110px] h-[36px]"></div>
            <nav className="flex items-center gap-4">
              <div className="font-bold bg-gray-100 w-[110px] h-[20px]"></div>
              <div className="font-bold bg-gray-100 w-[110px] h-[20px]"></div>
            </nav>
          </header>
        </div>
        <div className="flex items-center justify-center flex-1 bg-sky-100">
          <div
            className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-gray-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
