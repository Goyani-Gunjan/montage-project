import { FaEllipsisH } from "react-icons/fa";

type Design = {
  name: string;
  created: string;
  modules: number;
  updated: string;
  image: string;
};

export default function PortfolioList() {
  const designs: Design[] = [
    {
      name: "Home-Model-1",
      created: "01 June 2023",
      modules: 3,
      updated: "08 June 2023",
      image: "/assets/cineapp.png",
    },
  ];

  return (
    <>
      <div className="flex justify-between text-center font-semibold text-gray-700 border-b pb-2 mb-2">
        <p>Design</p>
        <div className="flex space-x-8 mr-5">
          <p className="">Modules</p>
          <p>Date</p>
        </div>
      </div>

      <div className="f-full bg-white mt-5 rounded-lg shadow-md ">
        <div className="space-y-2">
          {designs.map((design, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
            >
              <div className="flex items-center space-x-4">
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

              <div className="flex items-center space-x-5">
                <div className="text-center">
                  <p className="font-medium">{design.modules}</p>
                </div>
                <p className="flex text-sm text-gray-500 p-3">
                  {design.updated}
                  <FaEllipsisH className="h-5 w-5 text-black cursor-pointer ml-2" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
