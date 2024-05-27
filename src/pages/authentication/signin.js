import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Log1 from "@assets/images/log1.png";
// import Log2 from "@assets/images/log2.png";
// import Log3 from "@assets/images/log3.png";
// import loginBg from "@assets/images/loginBg.png";
// import { useGoogleLogin } from "@react-oauth/google";
// import { BASE_URL } from "../../api/Config";
// import { googleSignIn, facebookSignIn } from "../../api/Endpoints";
// import axios from "axios";
import { Button, Text, Input } from "../../components";
import mixpanel from "mixpanel-browser";
import { isEmail, isPassword } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { login, resetlogin } from "../../redux/action/login";
import { userToken } from "../../redux/action/userToken";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import Ellipse from "../../assets/images/EllipseLogin.png";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
    passwordVisible: false,
    checked: false,
    clicked: false,
    caPasswordVisible: false,
    isAgeConfirm: false,
  });

  const loginState = useSelector((state) => state?.loginReducer?.login);
  // const token = useSelector(state => state?.userTokenReducer?.userToken?.data?.key);

  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/trading");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loginState?.status) {
      mixpanel.init("cc3cafa268ef11604a52b34edf3443d7");
      mixpanel.track("Login Screen", {
        event: "User Login",
        userName: "",
        userEmail: state.email,
      });
      setState((prev) => ({ ...prev, isLoading: false }));
      toast.success("Login Successful!");
      dispatch(userToken(loginState));
      dispatch(resetlogin());
      navigate(0);
    }
    if (!loginState?.status) {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [loginState]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   console.log("GOOGLE RESPONSE IN USE EEFFECT", googleResponse);
  //   if (googleResponse?.status === 200 || googleResponse?.status === 201) {
  //     window.scrollTo(0, 0);
  //     toast.success("Google sign-in successfully !!!");
  //     localStorage.setItem("accessToken", googleResponse?.data?.key);
  //     dispatch(userProfile());
  //     dispatch(userToken(googleResponse));
  //     navigate("/trading");
  //   } else if (googleResponse?.status === 400) {
  //     window.scrollTo(0, 0);
  //     if (googleResponse?.data?.hasOwnProperty("non_field_errors")) {
  //       toast.error(`${googleResponse?.data["non_field_errors"][0]}`);
  //     } else {
  //       toast.error("Something went wrong");
  //     }
  //   }
  // }, [googleResponse]);

  let isValidateEmail = state.email === "" ? true : isEmail(state.email);
  let isValidatePassword = state.password === "" ? true : isPassword(state.password);
  const isValidateLogin = isValidateEmail && isValidatePassword && state.email && state.password;
  // &&
  // state.password.length >= 8

  const onChangeText = (e, type) => {
    setState((prev) => ({ ...prev, [type]: e.target.value }));
  };

  // const loginUsingGoogle = useGoogleLogin({
  //   onSuccess: (codeResponse) => {
  //     console.log("CODE", codeResponse);
  //     if (codeResponse?.access_token) {
  //       const body = {
  //         access_token: codeResponse?.access_token,
  //       };
  //       let data = JSON.stringify(body);
  //       let config = {
  //         method: "post",
  //         url: `${BASE_URL}${googleSignIn}`,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         data: data,
  //       };
  //       axios
  //         .request(config)
  //         .then((response) => {
  //           console.log("GOOGLE LOGIN RES", response);
  //           setGoogleResponse(response);
  //         })
  //         .catch((error) => {
  //           window.scrollTo(0, 0);
  //           if (error?.response?.status === 400) {
  //             window.scrollTo(0, 0);
  //             if (error?.response?.data?.hasOwnProperty("non_field_errors")) {
  //               toast.error(`${error?.response?.data["non_field_errors"][0]}`);
  //             } else {
  //               toast.error("Something went wrong");
  //             }
  //           }
  //         });
  //     } else {
  //       window.scrollTo(0, 0);
  //       toast.error("Something Went Wrong!!!");
  //     }
  //   },
  //   onError: (error) => {
  //     toast.error("Login Failed");
  //   },
  // });

  // const responseFacebook = (response) => {
  //   console.log("FB RES", response);
  //   if (response?.accessToken) {
  //     const body = {
  //       access_token: response?.accessToken,
  //     };
  //     let data = JSON.stringify(body);
  //     let config = {
  //       method: "post",
  //       url: `${BASE_URL}${facebookSignIn}`,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: data,
  //     };
  //     axios
  //       .request(config)
  //       .then((facebookResponse) => {
  //         console.log("FACEBOOK RESPONSE", facebookResponse);
  //         window.scrollTo(0, 0);
  //         if (
  //           facebookResponse?.status === 200 ||
  //           facebookResponse?.status === 201
  //         ) {
  //           window.scrollTo(0, 0);
  //           toast.success("Facebook sign-in successfully !!!");
  //           localStorage.setItem("accessToken", facebookResponse?.data?.key);
  //           dispatch(userProfile());
  //           dispatch(userToken(facebookResponse));
  //           navigate("/trading");
  //         } else if (facebookResponse?.status === 400) {
  //           window.scrollTo(0, 0);
  //           if (facebookResponse?.data?.hasOwnProperty("non_field_errors")) {
  //             toast.error(`${facebookResponse?.data["non_field_errors"][0]}`);
  //           } else {
  //             toast.error("Something went wrong");
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         window.scrollTo(0, 0);
  //         if (error?.response?.status === 400) {
  //           window.scrollTo(0, 0);
  //           if (error?.response?.data?.hasOwnProperty("non_field_errors")) {
  //             toast.error(`${error?.response?.data["non_field_errors"][0]}`);
  //           } else {
  //             toast.error("Something went wrong");
  //           }
  //         }
  //       });
  //   } else {
  //     toast.error("Something went wrong");
  //   }
  // };

  const onPressLogin = () => {
    if (!state.isAgeConfirm) {
      alert("Confirm your age");
      return false;
    }
    if (!state.password) {
      toast.error("Enter Password");
      return false;
    }
    if (isValidateLogin) {
      setState((prev) => ({ ...prev, isLoading: true }));
      const data = {
        email: state.email,
        password: state.password,
      };
      dispatch(login(data));
    }
  };

  return (
    <div className="relative">
      {/* <ToastContainer /> */}
      <div className="bg-black flex justify-center items-center pb-12 min-h-screen">
        <div
          className=" 
        w-[99%]
        md:w-[60%]
        xl:w-[40%] xl:mt-0 
        xl2:w-[32%] "
        >
          {/* //Login Box  */}
          <div className="text-3xl pb-4 text-white text-center">Log In</div>

          <div className="pt-6 pb-12 py-6 mx-4 border-2 border-[#0F0F0F] rounded-xl">
            {/* Form */}

            <div className="px-8">
              <div className="text-white text-[0.925rem] mb-2 "> Name </div>
              <Input
                onChange={(e) => onChangeText(e, "email")}
                className="border-2 border-[#1C1C1C] bg-transparent text-[#c9c9c9]"
                errorText={
                  (state.clicked && !state.email) || isValidateEmail
                    ? state.clicked && !state.email
                      ? "Enter a valid email."
                      : null
                    : "Enter a valid email."
                }
                type={"email"}
                required
              />

              <div className="text-white text-[0.925rem] mb-2 mt-4"> Password </div>
              <div className="relative">
                <Input
                  visible={state.passwordVisible}
                  onShowPassword={() => {
                    setState((prev) => ({
                      ...prev,
                      passwordVisible: !prev.passwordVisible,
                    }));
                  }}
                  errorText={
                    (state.clicked && !state.password) || isValidatePassword
                      ? state.clicked && !state.password
                        ? "Enter minmum 8 characters."
                        : null
                      : "Enter minmum 8 characters."
                  }
                  required
                  buttonStyle={ButtonStyle}
                  onChange={(e) => onChangeText(e, "password")}
                  type={state.passwordVisible ? "text" : "password"}
                  className="border-2 border-[#1C1C1C] w-full pl-5 py-2 rounded-md bg-transparent text-[#c9c9c9] "
                />
              </div>

              <div className="relative ">
                <Button
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                  variant="primary"
                >
                  <Text className="absolute right-1 top-2 text-sm text-[#737373] hover:text-[#F11941]">
                    Forgot Password?
                  </Text>
                </Button>

                <div className="flex items-center text-white mt-7">
                  <label>
                    <input
                      type="checkbox"
                      className="accent-[#F11941] h-4 w-4 bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          isAgeConfirm: !state.isAgeConfirm,
                        }))
                      }
                    />
                    <span className="ml-3 text-sm text-[#7c7c7c]">I am 18+ years old</span>
                  </label>
                </div>

                <div className="flex items-center mt-3">
                  <label>
                    <input type="checkbox" className="accent-[#F11941] bg-black h-4 w-4 " />
                    <span className="ml-3 m text-sm text-[#7c7c7c]">Remember Me</span>
                  </label>
                </div>

                <Button
                  className="text-white text-lg w-full bg-gradient-to-r from-[#E9193F] to-[#831126] mt-8 py-2 h-12 rounded-lg"
                  onClick={onPressLogin}
                  variant="secondary"
                  isLoading={state.isLoading}
                  text="Log In"
                ></Button>

                {/* <div className="text-sm text-center text-[#737373] mt-8">
                  Or log in with
                </div>

                <div className="flex justify-center space-x-5 mt-2">
                  <div>
                    <FacebookLogin
                      appId="6292855117474364"
                      fields="name,email,picture"
                      callback={responseFacebook}
                      render={(renderProps) => (
                        <div onClick={renderProps.onClick}>
                          <svg
                            width="40"
                            height="39"
                            viewBox="0 0 40 39"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1"
                              y="0.5"
                              width="38"
                              height="38"
                              rx="7.5"
                              stroke="white"
                              stroke-opacity="0.1"
                            />
                            <path
                              d="M21.4154 28.4994V22.1719H23.5253L23.9269 19.5543H21.4154V17.8559C21.4154 17.1399 21.766 16.442 22.8908 16.442H24.0323V14.2138C24.0323 14.2138 22.9962 14.0373 22.0053 14.0373C19.9369 14.0373 18.5851 15.2907 18.5851 17.5603V19.555H16.2858V22.1725H18.5851V28.5C14.2562 27.8209 10.9453 24.0747 10.9453 19.555C10.9453 14.554 14.9994 10.5 20.0003 10.5C25.0012 10.5 29.0553 14.554 29.0553 19.555C29.0553 24.0747 25.7437 27.8209 21.4154 28.5V28.4994Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      )}
                    />
                  </div>

                  <div onClick={() => loginUsingGoogle()}>
                    <svg
                      width="40"
                      height="39"
                      viewBox="0 0 40 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="0.5"
                        width="38"
                        height="38"
                        rx="7.5"
                        stroke="white"
                        stroke-opacity="0.1"
                      />
                      <g clip-path="url(#clip0_282_836)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.1514 15.4645C12.5183 14.6571 13.037 13.9523 13.6457 13.3146C15.0225 11.872 16.689 10.9481 18.6619 10.6329C21.4233 10.192 23.8947 10.8428 26.0305 12.6818C26.1654 12.7978 26.1987 12.866 26.0523 13.0095C25.2986 13.7478 24.5565 14.4981 23.8101 15.244C23.7337 15.3204 23.6819 15.4137 23.5461 15.2895C21.666 13.5665 18.5966 13.5863 16.5986 15.4446C15.9125 16.0828 15.4248 16.8471 15.1057 17.7236C15.0593 17.6931 15.01 17.6661 14.966 17.6322C14.0276 16.9104 13.0897 16.1877 12.1519 15.4649L12.1514 15.4645Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15.0829 21.2416C15.3526 21.9261 15.6872 22.5735 16.1851 23.1231C17.4508 24.5213 19.02 25.1241 20.8997 24.9288C21.7732 24.8379 22.569 24.5421 23.3125 24.0876C23.3841 24.1514 23.4517 24.2196 23.5272 24.2786C24.3974 24.9578 25.269 25.6361 26.1397 26.3143C25.1791 27.2266 24.0449 27.8338 22.7691 28.1563C19.7612 28.9167 16.9886 28.4362 14.5264 26.4932C13.5088 25.6897 12.7077 24.6977 12.1436 23.5234C13.123 22.763 14.1029 22.002 15.0824 21.2416H15.0829Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M26.1404 26.3148C25.2692 25.6366 24.3981 24.9583 23.5279 24.2791C23.4525 24.2201 23.3848 24.1519 23.3132 24.0881C23.903 23.638 24.3952 23.1058 24.7181 22.4294C24.8467 22.1597 24.9376 21.8773 25.0232 21.5921C25.0821 21.3953 25.0638 21.319 24.8206 21.3209C23.3708 21.333 21.9209 21.3272 20.4711 21.3267C20.2664 21.3267 20.1639 21.2208 20.1636 21.0091C20.1636 20.0262 20.1684 19.0439 20.1593 18.061C20.1573 17.8715 20.1907 17.7985 20.4044 17.7995C23.0783 17.8072 25.7527 17.8058 28.4266 17.8019C28.5712 17.8019 28.6616 17.8125 28.6867 17.988C29.0193 20.3269 28.7529 22.5614 27.5284 24.6257C27.1537 25.2576 26.7031 25.8348 26.1394 26.3148H26.1404Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15.0831 21.2416C14.1036 22.002 13.1237 22.7625 12.1442 23.5234C11.6656 22.6339 11.3901 21.6786 11.261 20.6832C11.0381 18.9588 11.2832 17.2996 12.0147 15.7178C12.0548 15.6308 12.1056 15.5491 12.1515 15.4645C13.0894 16.1867 14.0273 16.9095 14.9656 17.6312C15.0096 17.6651 15.0584 17.6922 15.1053 17.7226C14.7123 18.893 14.7321 20.0663 15.0831 21.2411V21.2416Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_282_836">
                          <rect
                            width="17.6369"
                            height="18"
                            fill="white"
                            transform="translate(11.1816 10.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <img
        src={Ellipse}
        className="w-full pointer-events-none select-none absolute -bottom-8 z-0
        hidden
        lg:block"
      />

      {/* </Root> */}
    </div>
  );
};

const Gradient = `
  bg-gradient-to-b from-transparent to-white
`;

const Flex = `
flex 
items-center
justify-center`;

const LoginBox = `
flex 
flex-col 
py-12 
lg:pb-[220px]
pb-[200px]
lg:px-[150PX]
px-4`;

const Wrapeer = `
flex
flex-1 
justify-center
items-center
lg:py-14 
py-8
lg:mt-8
mt-4

bg-black
`;

const Container = `
flex 
justify-center
items-center
gap-y-10`;

const FirstGridBox = `
flex
justify-center
items-center`;

const ImagesContainer = `
grid 
grid-cols-2  
xl2:grid-cols-3 
gap-y-6 
gap-x-4  
pb-4`;

const Description = `
font-sans
text-[black] 
text-[18px] 
lg:text-[20px] 
text-center 
`;
const Title = `
font-sans
text-[26px] 
lg:text-[30px] 
text-center 
text-white
font-bold`;

const InputStyle = ` 
focus:border-[black]
border-[#FFFFFF1A]
bg-transparent 
text-white
lg:mt-1 
mt-4 
w-full 
border 
py-2
px-3 
rounded-lg`;

const InputStyleWithImage = `
border
focus:border-[black]
border-[#FFFFFF1A]
bg-transparent   
w-full 
py-2   
text-white 
px-3    
focus:outline-none 
rounded-lg  
placeholder:text-gray-300`;

const ForgotText = `
hover:underline
hover:text-[#194996]
text-center 
// text-black
font-sans 
font-medium 
text-[16px]`;

const ButtonStyle = `
absolute
right-0
pr-1
pt-1
m-1
text-white
`;

export default Signin;
