const RightBar = () => {
  return (
    <div className="w-80 bg-white p-4 shadow-lg border-l border-gray-200 h-screen overflow-y-auto fixed right-0 ">
      <div className="flex items-center  justify-center mb-4 mt-3">
        <h2 className="text-lg font-semibold text-center">
          0 Bed 0.5 Bath 256 sqft
        </h2>
      </div>
      <div className="w-full  h-50 bg-gray-200 rounded"></div>
      <div className="mb-6 text-center mt-3">
        <h3 className="text-lg font-medium mb-3">Exterior Accent</h3>
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
          <div className="w-10 h-10 bg-black rounded-lg"></div>
        </div>
        <p className="text-xs mt-3">Chalk Included</p>
      </div>
      <div className="mb-6 text-center mt-3">
        <h3 className="text-lg font-medium mb-3">Exterior Accent</h3>
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
          <div className="w-10 h-10 bg-black rounded-lg"></div>
        </div>
        <p className="text-xs mt-3">Chalk Included</p>
      </div>

      <div className="w-full  h-50 bg-gray-200 rounded"></div>
      <div className="mb-6 text-center mt-3">
        <h3 className="text-lg font-medium mb-3">Exterior Accent</h3>
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
          <div className="w-10 h-10 bg-black rounded-lg"></div>
        </div>
        <p className="text-xs mt-3">Chalk Included</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">$64,000</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default RightBar;
