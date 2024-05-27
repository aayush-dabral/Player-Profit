import React from "react";

const Text = (props) => {
  return (
    <div
      style={{ ...props.style }}
      className={`${props.className}  tracking-[0.16px] `}
    >
      {props.children}
    </div>
  );
};
const HeadingText = (props) => {
  return (
    <div
      style={{ ...props.style }}
      className={`${props.className} tracking-[0.16px]  lg:tracking-[0.17px] `}
    >
      {props.children}
    </div>
  );
};

export { Text, HeadingText };
