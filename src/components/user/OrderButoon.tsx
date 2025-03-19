import { observer } from "mobx-react";
import UIStore from "../../store/UIStore"; // Import the UIStore

const OrderButton = observer(() => {
  return (
    <div className="w-85 fixed bottom-0 right-0 bg-gray-100 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
      <div className="flex flex-col">
        <div className="text-lg font-semibold">
          ${UIStore.totalPrice.toLocaleString()}
        </div>
        <p className="text-gray-700 text-xs">Estimated Construction Cost</p>
      </div>
      <div className="">
        <button className="bg-black text-md text-white py-2 px-3 rounded cursor-pointer">
          Order Now
        </button>
      </div>
    </div>
  );
});

export default OrderButton;
