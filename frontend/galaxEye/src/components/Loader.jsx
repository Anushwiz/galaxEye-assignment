const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-70"></div>
      <p className="mt-2 text-gray-600 text-sm">Loading...</p>
    </div>
  );
};

export default Loader;
