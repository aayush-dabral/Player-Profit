import React from "react";
import { Text } from "../../components";

const PrimaryButton = ({ props }) => {
  return (
    <button {...props} onClick={props.onClick} className={`${props.className}`}>
      {props.children}
    </button>
  );
};

const SecondaryButton = ({ props }) => {
  return (
    <button
      className={
        props?.disabled ? `${secondaryButton} opacity-70` : `${secondaryButton}`
      }
      onClick={props?.onClick}
      disabled={props?.disabled}
      {...props}
    >
      {props.isLoading ? (
        <div className="flex justify-center">
          <div className=" w-6 h-6 border-4 border-white/10 border-t-white border-solid rounded-full animate-spin" />
        </div>
      ) : (
        <Text
          className={`${TextClassName} ${
            props?.style?.backgroundColor === "black"
              ? "text-white"
              : "text-black"
          }`}
        >
          {props.text}
        </Text>
      )}
    </button>
  );
};

const TernaryButton = ({ props }) => {
  return (
    <button {...props} onClick={props.onClick} className={`${props.className}`}>
      {props.isLoading ? (
        <div className="flex justify-center">
          <div className=" w-6 h-6 border-4 border-white/10 border-t-white border-solid rounded-full animate-spin" />
        </div>
      ) : (
        props.children
      )}
    </button>
  );
};

const Button = (props) => {
  switch (props.variant) {
    case "primary":
      return <PrimaryButton props={props} />;
    case "secondary":
      return <SecondaryButton props={props} />;
    case "ternary":
      return <TernaryButton props={props} />;
    default:
      return null;
  }
};

export default Button;

const secondaryButton = `
bg-[#B8E833] 
w-[130px] 
h-[40px] 
rounded-lg  
mt-2
hover:opacity-80
hover:cursor-pointer
border-[white]`;

const TextClassName = `
font-sans
font-bold 
text-[18px] 
`;
