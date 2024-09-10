import React from "react";

const InputBox = ({ name, type, placeholder, onChange }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputBox;
