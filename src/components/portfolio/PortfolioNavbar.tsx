const PortfolioNavbar = () => {
  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center shadow w-full">
      <h1 className="text-xl font-bold">Montage</h1>
      <div className="flex items-center gap-4">
        <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">
          View Plans
        </button>
        <button className="bg-gray-300 text-black px-4 py-2 rounded-full cursor-pointer">
          TM
        </button>
      </div>
    </nav>
  );
};

export default PortfolioNavbar;
