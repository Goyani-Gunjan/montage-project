type ButtonProps = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ label, icon, onClick }) => {
  return (
    <button
      className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      {icon} {label}
    </button>
  );
};

export const GrayButton: React.FC<ButtonProps> = ({ label, icon, onClick }) => {
  return (
    <button
      className="bg-gray-200 px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      {icon} {label}
    </button>
  );
};

export const CanvasButton: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
}) => {
  return (
    <button
      className="bg-gray-200 px-4 py-2 rounded flex items-center gap-2 cursor-pointer group relative hover:bg-gray-400"
      onClick={onClick}
    >
      {icon}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-10  whitespace-nowrap bg-gray-700 text-white text-sm px-2 py-1 rounded ">
        {label}
      </span>
    </button>
  );
};

export const SidebarButton: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
}) => {
  return (
    <button
      className="bg-gray-200 px-4 py-2 rounded flex items-center  cursor-pointer group relative hover:bg-gray-400"
      onClick={onClick}
    >
      {icon}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-9  whitespace-nowrap bg-gray-700 text-white text-sm px-2 py-1 rounded ">
        {label}
      </span>
    </button>
  );
};

export const RightSidebarButton: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
}) => {
  return (
    <button
      className="bg-gray-200 px-4 py-2 rounded flex items-center  cursor-pointer group relative hover:bg-gray-400"
      onClick={onClick}
    >
      {icon}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-9 right-6 whitespace-nowrap bg-gray-700 text-white text-sm px-2 py-1 rounded ">
        {label}
      </span>
    </button>
  );
};
