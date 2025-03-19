import { MdContentCopy, MdDelete, MdLock } from "react-icons/md";

const DropdownMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    isOpen && (
      <div className="absolute left-0 top-10 w-screen bg-white shadow-lg border border-gray-200 rounded-md p-2 z-50">
        <p className="text-sm text-gray-500 px-2">View Module details</p>

        <button className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded cursor-pointer ">
          <MdContentCopy size={18} className="mr-2 " />
          Duplicate
          <span className="ml-auto text-xs text-gray-500 p-1 bg-gray-200 rounded cursor-pointer">
            Ctrl + C
          </span>
        </button>

        <button className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
          <MdDelete size={18} className="mr-2 " />
          Delete
          <span className="ml-auto text-xs text-gray-500 p-1 bg-gray-200 rounded cursor-pointer">
            Delete
          </span>
        </button>

        <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
          <MdLock size={18} className="mr-2" />
          Lock
          <span className="ml-auto text-xs text-gray-500 p-1 bg-gray-200 rounded cursor-pointer">
            Ctrl+Alt+L
          </span>
        </button>
      </div>
    )
  );
};

export default DropdownMenu;
