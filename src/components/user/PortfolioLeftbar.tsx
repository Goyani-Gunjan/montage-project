import { FaFolder, FaSearch } from "react-icons/fa";

const PortfolioLeftbar = () => {
  return (
    <aside className="w-1/5 bg-gray-50 p-4 h-full shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Portfolios</h2>
        <FaFolder className="text-xl" />
      </div>
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Find a portfolio or design"
          className="w-full p-2 pl-10 border rounded"
        />
      </div>
      <ul>
        <li className="mb-2 cursor-pointer">All Designs</li>
        <li className="mb-2 cursor-pointer">My Designs</li>
      </ul>
    </aside>
  );
};

export default PortfolioLeftbar;
