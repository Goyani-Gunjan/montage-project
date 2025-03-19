type ButtonProps = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, icon, onClick }) => {
  return (
    <button
      className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      {icon} {label}
    </button>
  );
};

export default Button;
