import { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import Manager from "../../store/Manager";

interface Design {
  id: string;
  name: string;
  version: string;
  designImage: string;
  monogramImage: string;
}

interface Portfolio {
  portfolioId: string;
  id: string;
  name: string;
  status: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdById: string;
  subscriptionId: string;
  designs: Design[];
}

const PortFolioGrid = observer(() => {
  const manager = new Manager();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    setPortfolios(manager.uiStore.portfolios);
  }, [manager.uiStore.portfolios]);

  const filteredDesigns =
    portfolios.find(
      (portfolio) => portfolio.id === manager.uiStore.selectedPortfolioId
    )?.designs || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {filteredDesigns.map((design) => (
        <div
          key={design.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden relative"
        >
          <div className="relative h-56 w-full group">
            <img
              src={design.designImage}
              alt={design.name}
              className="absolute inset-0 h-full w-full p-4 object-cover transition-opacity duration-300 group-hover:opacity-0"
            />

            <img
              src={design.monogramImage}
              alt={design.name}
              className="absolute inset-0 h-full w-full p-4 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
          <div className="flex justify-between items-center p-3">
            <div>
              <h3 className="text-l font-medium">{design.name}</h3>
              <p className="text-sm text-gray-500">{design.name}</p>
            </div>
            <FaEllipsisH className="cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
});

export default PortFolioGrid;
