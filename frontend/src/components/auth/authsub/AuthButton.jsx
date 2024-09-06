import React from "react";

const AuthButton = ({ name, alt, altop }) => {
  return (
    <div>
      <button
        type="button"
        className="w-full text-white bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 text-center"
      >
        {name}
      </button>
      <p className="text-sm font-light text-gray-900">
        {alt}?{" "}
        <a
          href={altop}
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          {altop}
        </a>
      </p>
    </div>
  );
};

export default AuthButton;
