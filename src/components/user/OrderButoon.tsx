import { observer } from "mobx-react";
import Manager from "../../store/Manager";
import { useState } from "react";
import OrderPopup from "./OrderPopup"; // Assuming OrderPopup is in the same directory

const OrderButton = observer(() => {
  const manager = new Manager();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleOrderNowClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div className="w-85 fixed bottom-0 right-0 bg-gray-100 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-lg font-semibold">
            ${manager.uiStore.totalPrice.toLocaleString()}
          </div>
          <p className="text-gray-700 text-xs">Estimated Construction Cost</p>
        </div>
        <div className="">
          <button
            className="bg-black text-md text-white py-2 px-3 rounded hover:bg-gray-700 cursor-pointer"
            onClick={handleOrderNowClick}
          >
            Order Now
          </button>
        </div>
      </div>
      {isPopupVisible && <OrderPopup onClose={handleClosePopup} />}
    </>
  );
});

export default OrderButton;
