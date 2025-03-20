import { observer } from "mobx-react";
import { FaEllipsisH } from "react-icons/fa";
import Manager from "../../store/Manager";

type Design = {
  name: string;
  created: string;
  modules: number;
  updated: string;
  image: string;
};

const PortfolioList = observer(() => {
  const manager = new Manager();

  const portfolios = manager.uiStore.portfolios;
  const selectedPortfolioId = manager.uiStore.selectedPortfolioId;

  const filteredDesigns: Design[] = portfolios
    .filter((portfolio) => portfolio.id === selectedPortfolioId)
    .flatMap((portfolio) =>
      portfolio.designs.map((design) => ({
        name: design.name,
        created: new Date(portfolio.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        modules: 3,
        updated: new Date(portfolio.updatedAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        image: design.designImage,
      }))
    );

  return (
    <>
      <div className="flex justify-between font-semibold text-gray-700 border-b pb-2 pr-7 mb-2">
        <p className="w-3/4">Design</p>
        <div className="w-1/4 flex space-x-18 mx-10">
          <p className="">Modules</p>
          <p>Date</p>
        </div>
      </div>

      <div className="mt-5 ">
        <div className="space-y-2">
          {filteredDesigns.map((design, index) => (
            <div
              key={index}
              className="flex justify-between p-2 border border-gray-400 rounded-lg bg-gray-50"
            >
              <div className="w-3/4 flex space-x-4">
                <img
                  src={design.image}
                  alt={design.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium">{design.name}</p>
                  <p className="text-sm text-gray-500">
                    Created: {design.created}
                  </p>
                </div>
              </div>

              <div className="w-1/4 flex space-x-16 items-center">
                <div className="text-center">
                  <p className="font-medium text-center">{design.modules}</p>
                </div>
                <p className="flex text-sm text-gray-500 p-3">
                  {design.updated}
                </p>
                <FaEllipsisH className="h-5 w-5 text-black cursor-pointer ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

export default PortfolioList;
