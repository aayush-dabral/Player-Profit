import React from "react";
import tw from "tailwind-styled-components";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import downArrow from "../../assets/images/downArrow.png";
import { Text } from "../../components";

const Input = (props) => {
  return (
    <div className={`${props?.containerStyle}`}>
      {props?.title && (
        <Text
          style={{ fontSize: "16px" }}
          className="font-sans font-medium pb-2"
        >
          {props?.title}
        </Text>
      )}
      {props?.onShowPassword ? (
        <div className={inputWithIcons}>
          <div className="flex flex-1 flex-row w-full">
            <InputEye {...props} />
            <button
              onClick={props?.onShowPassword}
              className={`${props?.buttonStyle} `}
            >
              {props.visible ? (
                <RemoveRedEyeIcon sx={{ color: "#004996" }} />
              ) : (
                <VisibilityOffIcon sx={{ color: "#004996" }} />
              )}
            </button>
          </div>
        </div>
      ) : props?.clickOnDownArrow ? (
        <div className={inputWithIcons}>
          <div className="flex flex-1 flex-row w-full">
            <InputEye {...props} />
            <button
              onClick={props?.onShowPassword}
              className={props?.buttonStyle}
            >
              <img alt="" src={downArrow} style={{ width: 18, height: 10 }} />
            </button>
          </div>
        </div>
      ) : (
        <CustomInput style={{ ...props?.inputStyle }} {...props} />
      )}
      {props?.errorText && (
        <div className="relative">
          {" "}
          <ErrorText>{`${props?.errorText}`}</ErrorText>
        </div>
      )}
    </div>
  );
};

const CustomInput = tw.input`
w-full
p-2
pl-5
focus:outline-none 
border
border-inputBorder
rounded-md`;

const InputEye = tw.input`
w-[90%]
p-1
pl-4
focus:outline-none 
`;

const TextArea = tw.textarea`
w-full
p-2
pl-5
focus:outline-none 
focus:ring-1
focus:border-fbButtonColor
border
border-inputBorder
rounded-md`;

const ErrorText = tw.p`
text-sm
text-red-500`;

const inputWithIcons = `
flex 
flex-row 
items-center 
justify-between`;

export default Input;
