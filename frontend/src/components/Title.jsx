import React from "react";

const Title = ({ subject }) => {
  return (
    <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
      {subject}
    </div>
  );
};

export default Title;
