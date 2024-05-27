import React from "react";

const Root = ({ children }) => {
  return (
    <div className="mx-4 flex justify-center">
      <div className="w-full xl:w-[1140px]">{children}</div>
    </div>
  );
};

export default Root;
