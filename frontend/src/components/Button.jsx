const Button = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-white bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 text-center"
    >
      {label}
    </button>
  );
};

export default Button;
