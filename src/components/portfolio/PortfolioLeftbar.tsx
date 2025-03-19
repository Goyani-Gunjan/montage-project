import { useEffect, useState } from "react";
import { FaFolder, FaSearch, FaChevronDown } from "react-icons/fa";
import { fetchGet } from "../../utils/FetchApi";
import Cookies from "js-cookie";
import { observer } from "mobx-react-lite";
import UIStore, { Portfolio } from "../../store/UIStore";

const PortfolioLeftBar = observer(
  ({ setIsPopupOpen }: { setIsPopupOpen: (open: boolean) => void }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState("My Portfolios");
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

    const fetchPortfolios = async () => {
      const token: string = Cookies.get("token");
      const response = await fetchGet<{ portFolios: Portfolio[] }>(
        "/portfolios",
        token
      );

      if (response.success && response.data.portFolios) {
        const fetchedPortfolios = response.data.portFolios;
        setPortfolios(fetchedPortfolios);
        UIStore.setPortfolios(fetchedPortfolios);

        if (fetchedPortfolios.length > 0) {
          setSelectedPortfolio(fetchedPortfolios[0].name);
          UIStore.setSelectedPortfolioId(fetchedPortfolios[0].id);
        }
      } else {
        setPortfolios([]);
        UIStore.setPortfolios([]);
      }
    };

    useEffect(() => {
      fetchPortfolios();
    }, []);

    return (
      <div className="w-1/5 bg-gray-50 p-4 h-full shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <button
              className="flex items-center text-lg font-semibold focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedPortfolio} <FaChevronDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {Array.isArray(portfolios) && portfolios.length > 0 ? (
                  <ul>
                    {portfolios.map((portfolio) => (
                      <li
                        key={portfolio.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedPortfolio(portfolio.name);
                          UIStore.setSelectedPortfolioId(portfolio.id);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {portfolio.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-2 text-gray-500">
                    No portfolios found.
                  </p>
                )}
              </div>
            )}
          </div>
          <FaFolder className="text-xl" onClick={() => setIsPopupOpen(true)} />
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
      </div>
    );
  }
);

export default PortfolioLeftBar;
