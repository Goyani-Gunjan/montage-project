const RightBar = () => {
  return (
    <div className=" w-64 bg-white p-4 shadow-md h-[calc(100vh-4rem)] overflow-y-auto mt-3">
      <h2 className="text-lg font-semibold">Exterior Finish</h2>
      <div className="mt-2 flex space-x-2">
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
      </div>
      <h2 className="mt-4 text-lg font-semibold">Exterior Accent</h2>
      <div className="mt-2 flex space-x-2">
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
      </div>
      <div className="mt-4 text-xl font-bold">$64,000</div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
        Order Now
      </button>
    </div>
  );
};

export default RightBar;
