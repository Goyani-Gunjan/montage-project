import { observer } from "mobx-react";
import { FaSave } from "react-icons/fa";
import Manager from "../../store/Manager";

const Navbar = observer(() => {
  const manager = new Manager();
  const selectedPortfolioId = manager.uiStore.selectedPortfolioId;
  const portfolios = manager.uiStore.portfolios;

  const selectedPortfolio = portfolios.find(
    (portfolio) => portfolio.id == selectedPortfolioId
  );

  const portfolioName = selectedPortfolio
    ? selectedPortfolio.name
    : "my portfolio";

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 shadow-md bg-white z-10">
      <div className="flex items-center space-x-5">
        <img src="assets/Montage-Logo.svg" />
        <button className="text-xl cursor-pointer hover:bg-gray-300">
          <FaSave className="p-1" size={30} />
        </button>
        <span className="font-semibold">{portfolioName}</span>
        <span>|</span>
        <input
          type="text"
          placeholder="Design Name"
          value={manager.uiStore.currentDesignName}
          onChange={(e) => manager.uiStore.setCurrentDesignName(e.target.value)}
          className="p-1"
        />
      </div>
      <div className="space-x-4">
        <button className="bg-gray-200 px-4 py-2 rounded">Share</button>
        <button className="bg-gray-200 px-4 py-2 rounded">View Plans</button>
      </div>
    </div>
  );
});

export default Navbar;
