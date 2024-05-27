import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import loginBg from "../../assets/images/loginBg.png";
import { HeaderSection, Root, Text, Input, Button } from "../../components";
import { isEmail } from "../../utils";
import { resetPassword, resetStatePassword } from "../../redux/action/resetPassword";
import "react-toastify/dist/ReactToastify.css";

import Ellipse from "../../assets/images/EllipseLogin.png";

const styles = {
  loginBgStyle: {
    backgroundImage: `url(${loginBg})`,
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100% ",
    backgroundPosition: "center",
  },
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
  });

  const forgotPassword = useSelector(
    state => state?.resetPasswordReducer?.resetPassword,
  );


  console.log("FORGET PASSSSSSS",forgotPassword)

  useEffect(() => {
    window.scrollTo(0, 0);
      let token = localStorage.getItem("accessToken")
      if (token) {
        navigate("/trading");
      }  
      if(forgotPassword?.status){
        toast.success("password reset link send. Please check your email")
      }
  }, [forgotPassword]);
  let isValidateEmail = state.email === "" ? true : isEmail(state.email);

  const onChangeText = (e, type) => {
    setState((prev) => ({ ...prev, [type]: e.target.value }));
  };

  const onContinue = (e) => {
    if(!state.email){
      toast.error("Enter Email Address")
    }
    if (isValidateEmail && state.email) {
      const body = {
        email: state.email?.toLowerCase(),
      };
      dispatch(resetPassword(body));
    }
  };

  return (
    <div className="relative bg-black 
    pb-24 
    xl:mt-0
    xl3:h-screen xl3:mt-24">
      {/* <ToastContainer /> */}
      <div className="flex justify-center items-center pb-12">
        <div
          className="  
        w-[99%] 
        md:w-[60%]
        xl:w-[40%] 
        xl2:w-[32%]"
        >
          {/* //Login Box  */}
          <div className="text-3xl text-white text-center">
            Forgot Password?
          </div>

          <div
            className="bg-[#080808] pt-6 pb-12 my-6 mx-4 border-2 border-[#0F0F0F] rounded-xl
          "
          >
            {/* Form */}
            <div
              className="text-white text-center 
            w-[85%] my-2 mx-auto"
            >
              Enter the email address associated with your account, we'll send
              you a link to reset your password.
            </div>
            <div className="mt-8 mx-4"
            >
              <Input
                onChange={(e) => onChangeText(e, "email")}
                className={InputStyle}
                type={"email"}
                required
                errorText={
                  (state.clicked && !state.email) || isValidateEmail
                    ? state.clicked && !state.email
                      ? "Enter a valid email."
                      : null
                    : "Enter a valid email."
                }
                placeholder="Email address"
              />
            </div>

            <div className="flex justify-center">
              <Button
                variant="secondary"
                className="bg-gradient-to-r from-[#E9193F] to-[#831126] rounded-lg px-2 py-1 mx-auto
                mt-6"
                onClick={onContinue}
                text="Continue "
                // disabled={isValidateCreateAccount}
                isLoading={state.isLoading}
              />
            </div>

            <Text className=" text-white text-center
            pt-8 lg:pt-10">
              {"Didn’t receive the link?"}
              <br/>
              <button onClick={onContinue}>
                <span className="px-1 text-[#737373] hover:text-[#F11941] underline">Resend</span>
              </button>
            </Text>
          </div>
        </div>
      </div>

      <img
        src={Ellipse}
        className="w-full pointer-events-none select-none absolute -bottom-8 z-0
        hidden
        lg:block"
      />
    </div>
  );
};

const InputStyle = `
border-2 
border-[#3a3a3a]
text-[#c9c9c9]
bg-transparent
w-full 
py-2
px-3 
rounded-lg  
placeholder:text-gray-300
`;

export default ForgotPassword;
