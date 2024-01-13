const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 bg-sky-300 text-xs text-gray-500">
      <div
        className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-gray-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <p>Please wait...</p>
    </div>
  );
};

export default Loader;
