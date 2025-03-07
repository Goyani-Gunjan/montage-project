const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 shadow-md bg-white z-10">
      <div className="flex items-center space-x-4">
        <img src="assets/cineapp.png" alt="Logo" className="w-8 h-8" />
        <button className="text-xl">☰</button>
        <span className="font-semibold">My Portfolio</span>
        <span className="text-gray-500">Untitled-1</span>
      </div>
      <div className="space-x-4">
        <button className="bg-gray-200 px-4 py-2 rounded">Share</button>
        <button className="bg-gray-200 px-4 py-2 rounded">View Plans</button>
      </div>
    </div>
  );
};

export default Navbar;
