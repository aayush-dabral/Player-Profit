import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import {
  Text,
  HeadingText,
  Input,
  Button,
  HeaderSection,
  Root,
} from "../../components";
import { isEmail, isPassword, isPhoneNumber } from "../../utils";
import { registerUser } from "../../redux/authentication/actions";
import { getPrivacyData } from "../../redux/settings/actions";
// import Log1 from "@assets/images/log1.png";
// import Log2 from "@assets/images/log2.png";
// import Log3 from "@assets/images/log3.png";
// import RightArrow from "@assets/images/rightArrow.png";
import mobSignupBg from "../../assets/images/signupCover.png";
import PrivacyPolicyModal from "../checkout/widgets/privacyPolicyModal";

import Ellipse from "../../assets/images/EllipseSignup.png";

const styles = {
  loginBgStyleApp: {
    backgroundImage: `url(${mobSignupBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
    backgroundPosition: "bottom",
  },
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
    address: "",
    isLoading: false,
    passwordVisible: false,
    checked: false,
    specialOffers: false,
    clicked: false,
    confirmPasswordVisible: false,
    privacyPolicyModal: false,
  });

  const { privacyData } = useSelector((store) => store.settingsReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPrivacyData());
  }, []);

  let isValidateEmail = state.email === "" ? true : isEmail(state.email);
  let isValidatePassword =
    state.password === "" ? true : isPassword(state.password);
  let isValidatePhoneNumber =
    state.phoneNumber === "" ? true : isPhoneNumber(state.phoneNumber);
  const isValidateCreateAccount = !(
    isValidatePhoneNumber &&
    isValidateEmail &&
    isValidatePassword &&
    state.fName &&
    state.address &&
    state.lName &&
    state.email &&
    state.password &&
    state.phoneNumber &&
    state.checked &&
    state.specialOffers
  );

  const onChangeText = (e, type) => {
    setState((prev) => ({ ...prev, [type]: e.target.value }));
  };
  const handleNumber = (e, type) => {
    const data = ("" + e.target.value).replace(/\D/g, "");
    setState((prev) => ({ ...prev, [type]: data }));
  };
  const handleName = (e, type) => {
    const newName = e.target.value.trim(); // Trim whitespace from the input
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (newName === "" || nameRegex.test(newName)) {
      setState((prev) => ({ ...prev, [type]: newName }));
    }
  };
  const privacyPolicyData = privacyData?.data?.attributes?.content;

  const onCreateAccount = () => {
    if (!isValidateCreateAccount) {
      if (state.password === state.address) {
        setState((prev) => ({ ...prev, isLoading: true }));
        const lastFourDigits = state.phoneNumber.slice(7, 11);
        const data = {
          firstName: state.fName,
          lastName: state.lName,
          email: state.email,
          phone: state.phoneNumber,
          password: state.password,
          username: state.email.split("@")[0],
        };
        dispatch(registerUser(data)).then((res) => {
          if (res?.payload?.status === 200 && res?.payload?.data) {
            toast.warning("Account Created successfully", {
              icon: <CheckCircleIcon className="text-darkYellow" />,
            });
            navigate("/login");
          } else {
            const error = res?.payload?.response?.data?.error?.message;
            toast.error(error || "!Error to create account");
          }
          setState((prev) => ({ ...prev, isLoading: false }));
        });
      } else {
        toast.error("Confirm Password is not matching");
      }
    } else {
      setState((prev) => ({ ...prev, clicked: true }));
    }
  };

  return (
    <div className="relative">
      {/* <HeaderSection />
      <Root>
        <div className={Wrapeer}>
          <div
            style={styles.loginBgStyleApp}
            className="rounded-lg bg-[#B8E9F3]"
          >
            <div className="grid xl:grid-cols-3 grid-cols-2">
              <div className="flex flex-col flex-1 xl:py-12 pt-8 px-6 col-span-2 xl:col-span-1">
                <div>
                  <Text className="text-[22px] font-bold text-center font-sans">
                    Benefits of becoming a member
                  </Text>
                  <Text className="text-[16px] text-center py-7 font-sans leading-[22px]">
                    Register with us today and earn loyalty points to use
                    against your bookings and purchases, avail of faster
                    checkout times and receive attractive marketing offers
                    during the year!!
                  </Text>
                </div>
                <div className="flex flex-row items-center pt-3 ">
                  <img
                    src={RightArrow}
                    width={36}
                    height={36}
                    className="self-start "
                  />
                  <Text className="text-[16px] pl-4 font-sans">
                    Earn loyalty points to use against your orders
                  </Text>
                </div>
                <div className="flex flex-row items-center pt-5">
                  <img
                    src={RightArrow}
                    width={36}
                    height={36}
                    className="self-start "
                  />
                  <Text className="text-[16px] pl-4  font-sans">
                    On-line booking amendments
                  </Text>
                </div>
                <div className="flex flex-row items-center pt-5">
                  <img
                    src={RightArrow}
                    width={36}
                    height={36}
                    className="self-start "
                  />
                  <Text className="text-[16px] pl-4  font-sans">
                    Save money on your next trip
                  </Text>
                </div>
                <div className="flex flex-row items-center pt-5">
                  <img
                    src={RightArrow}
                    width={36}
                    height={36}
                    className="self-start "
                  />
                  <Text className="text-[16px] pl-4  font-sans">
                    Receive notification of promotions
                  </Text>
                </div>
                <div className="flex flex-row items-center pt-5">
                  <img
                    src={RightArrow}
                    width={36}
                    height={36}
                    className="self-start "
                  />
                  <Text className="text-[16px] pl-4  font-sans">
                    Faster Checkout Times
                  </Text>
                </div>
              </div>
              <div className="col-span-2 flex flex-col justify-center items-center">
                <div className="lg:mt-12 mt-8 lg:pb-12 pb-8 xl:border-l border-[#BABABA] w-[100%]">
                  <HeadingText className={Title}>Create Account</HeadingText>
                  <Text className={Description}>
                    Register and get accesss to all things golf
                  </Text>
                  <div className={ImagesContainer}>
                    <img
                      src={Log1}
                      width={140}
                      height={38}
                      className="self-end "
                    />
                    <img
                      src={Log2}
                      width={140}
                      height={38}
                      className="self-center "
                    />
                    <img
                      src={Log3}
                      width={140}
                      height={38}
                      className="self-start "
                    />
                  </div>
                </div>
                <div className={Container}>
                  <div className={InputWrapper}>
                    <Input
                      type={"text"}
                      title={"*First Name"}
                      onChange={(e) => handleName(e, "fName")}
                      className={InputStyle}
                      errorText={
                        state.clicked && !state.fName
                          ? "Please enter a First Name."
                          : null
                      }
                      value={state.fName}
                      placeholder="First Name"
                    />
                    <Input
                      title={"*Last Name"}
                      onChange={(e) => handleName(e, "lName")}
                      className={InputStyle}
                      errorText={
                        state.clicked && !state.lName
                          ? "Please enter a Last Name"
                          : null
                      }
                      value={state.lName}
                      placeholder="Last Name"
                    />
                    <Input
                      title={"*Email"}
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
                      placeholder="Email"
                    />
                    <Input
                      title={"*Phone Number"}
                      value={state.phoneNumber}
                      onChange={(e) => handleNumber(e, "phoneNumber")}
                      required
                      errorText={
                        (state.clicked && !state.phoneNumber) ||
                        isValidatePhoneNumber
                          ? state.clicked && !state.phoneNumber
                            ? "Enter a valid phone number."
                            : null
                          : "Enter a valid phone number."
                      }
                      maxlength="15"
                      className={InputStyle}
                      placeholder="Phone number"
                    />
                    <div className="relative">
                      <Input
                        title={"*Password"}
                        visible={state.passwordVisible}
                        onShowPassword={() => {
                          setState((prev) => ({
                            ...prev,
                            passwordVisible: !prev.passwordVisible,
                          }));
                        }}
                        buttonStyle={ButtonStyle}
                        onChange={(e) => onChangeText(e, "password")}
                        type={state.passwordVisible ? "text" : "password"}
                        required
                        errorText={
                          (state.clicked && !state.password) ||
                          isValidatePassword
                            ? state.clicked && !state.password
                              ? "Enter minmum 8 charchter."
                              : null
                            : "Enter minmum 8 charchter."
                        }
                        className={InputWithImage}
                        maxlength="15"
                        placeholder="Password"
                      />
                    </div>
                    <div className="relative">
                      <Input
                        title={"*Confirm Password"}
                        visible={state.confirmPasswordVisible}
                        onShowPassword={() => {
                          setState((prev) => ({
                            ...prev,
                            confirmPasswordVisible:
                              !prev.confirmPasswordVisible,
                          }));
                        }}
                        buttonStyle={ButtonStyle}
                        onChange={(e) => onChangeText(e, "address")}
                        type={
                          state.confirmPasswordVisible ? "text" : "password"
                        }
                        required
                        errorText={
                          state.clicked && !state.address
                            ? "Please enter confirm password"
                            : null
                        }
                        className={InputWithImage}
                        maxlength="15"
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>
                  <div className={TextWrapper}>
                    <div className="flex flex-row pt-4">
                      {state.checked ? (
                        <Button
                          variant="primary"
                          onClick={() => {
                            setState((prev) => ({
                              ...prev,
                              checked: !prev.checked,
                            }));
                          }}
                        >
                          <CheckBoxOutlinedIcon
                            sx={{ color: "#000000", width: 30, height: 30 }}
                          />
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => {
                            setState((prev) => ({
                              ...prev,
                              checked: !prev.checked,
                            }));
                          }}
                        >
                          <CheckBoxOutlineBlankOutlinedIcon
                            sx={{ color: "#000000", width: 30, height: 30 }}
                          />
                        </Button>
                      )}
                      <Text className="text-black  text-[14px] px-4 font-sans pt-1">
                        {"I accept ClubstoHire's"}
                        <button
                          onClick={() =>
                            setState((prev) => ({
                              ...prev,
                              privacyPolicyModal: true,
                            }))
                          }
                          className="pl-2 text-[#004996] underline"
                        >
                          {"Privacy Policy"}
                        </button>
                      </Text>
                    </div>
                    {!state?.checked && state?.clicked && (
                      <Text className="text-[red] font-sans text-[14px] py-1">
                        Please cheked Privacy Policy
                      </Text>
                    )}
                    <div className="flex flex-row pt-4">
                      {state.specialOffers ? (
                        <Button
                          variant="primary"
                          onClick={() => {
                            setState((prev) => ({
                              ...prev,
                              specialOffers: !prev.specialOffers,
                            }));
                          }}
                        >
                          <CheckBoxOutlinedIcon
                            sx={{ color: "#000000", width: 30, height: 30 }}
                          />
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => {
                            setState((prev) => ({
                              ...prev,
                              specialOffers: !prev.specialOffers,
                            }));
                          }}
                        >
                          <CheckBoxOutlineBlankOutlinedIcon
                            sx={{ color: "#000000", width: 30, height: 30 }}
                          />
                        </Button>
                      )}
                      <Text className="text-black  text-[14px] px-4 font-sans pt-1">
                        {
                          "I wish to receive special offers and information from ClubstoHire.com"
                        }
                      </Text>
                    </div>
                    {!state?.specialOffers && state?.clicked && (
                      <Text className="text-[red] font-sans text-[14px] py-1">
                        Please cheked terms and conditions
                      </Text>
                    )}
                    <div className="flex gap-x-4 lg:pt-6 pt-4 ">
                      <Button
                        variant="primary"
                        className={primaryButton}
                        isLoading={state.isLoading}
                        onClick={() => navigate("/")}
                      >
                        <Text className="text-sans text-[red] font-bold text-[18px]">
                          Cancel
                        </Text>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={onCreateAccount}
                        text="Create "
                        isLoading={state.isLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <PrivacyPolicyModal
              privacyPolicyData={privacyPolicyData}
              openModal={state.privacyPolicyModal}
              closeModal={() =>
                setState((prev) => ({ ...prev, privacyPolicyModal: false }))
              }
            />
          </div>
        </div>
      </Root> */}

      <div className="bg-black flex justify-center items-center pb-12">
        <div
          className="  
        w-[99%]
        md:w-[60%]
        xl:w-[40%] 
        xl2:w-[32%]"
        >
          {/* //Login Box  */}
          <div className="text-3xl text-white text-center">Sign Up</div>

          <div className="bg-[#080808] pt-6 pb-12 my-6 mx-4 border-2 border-[#0F0F0F] rounded-xl">
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

              <div className="text-white text-[0.925rem] mb-2 mt-4">
                {" "}
                Password{" "}
              </div>
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
                  maxlength="15"
                />
              </div>

              <div className="relative ">
                <div className="flex items-center text-white mt-7">
                  <label>
                    <input
                      type="checkbox"
                      className="accent-[#B8E834] h-4 w-4 "
                    />
                    <span className="ml-2 text-sm text-[#5f5f5f]">
                      I am 21+ years old
                    </span>
                  </label>
                </div>

                <div className="flex items-center mt-3">
                  <label>
                    <input
                      type="checkbox"
                      className="accent-[#B8E834] bg-black h-4 w-4 "
                    />
                    <span className="ml-2 m text-sm text-[#5f5f5f]">
                      Remember Me
                    </span>
                  </label>
                </div>

                <Button
                  className="text-white text-lg w-full bg-[#B8E834] mt-8 py-2 h-12 rounded-lg"
                  // onClick={onPressLogin}
                  variant="secondary"
                  isLoading={state.isLoading}
                  text="Sign Up"
                ></Button>

                <div className="text-sm text-center text-[#737373] mt-8">
                  Or log in with
                </div>

                <div className="flex justify-center space-x-5 mt-2">
                  {/* icons */}

                  <div>
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
                        d="M24.9125 20.0628C24.9378 22.7868 27.3022 23.6933 27.3284 23.7048C27.3084 23.7688 26.9506 24.9966 26.0827 26.265C25.3325 27.3615 24.5538 28.454 23.3272 28.4766C22.122 28.4988 21.7344 27.7619 20.3565 27.7619C18.979 27.7619 18.5484 28.454 17.4075 28.4988C16.2235 28.5436 15.3219 27.3131 14.5654 26.2206C13.0197 23.9858 11.8384 19.9057 13.4246 17.1515C14.2125 15.7838 15.6207 14.9177 17.1491 14.8955C18.3118 14.8733 19.4091 15.6777 20.1199 15.6777C20.8301 15.6777 22.1637 14.7104 23.5656 14.8525C24.1525 14.8769 25.7999 15.0895 26.8578 16.6379C26.7725 16.6908 24.8921 17.7855 24.9125 20.0628ZM22.6474 13.374C23.276 12.6131 23.699 11.5539 23.5836 10.5C22.6776 10.5364 21.582 11.1038 20.9321 11.8642C20.3496 12.5376 19.8396 13.6155 19.9772 14.6485C20.9871 14.7267 22.0188 14.1353 22.6474 13.374Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  <div>
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

                  <div>
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
                </div>

                <div className="text-white flex justify-center mt-4">
                  Already have an account?
                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                    variant="primary"
                  >
                    <Text className={`${ForgotText} pl-2`}>
                      <span className="text-[#737373] hover:text-[#B8E834] underline">
                        Log In
                      </span>
                    </Text>
                  </Button>
                </div>
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
    </div>
  );
};

const Wrapeer = `
lg:py-20 
py-14
`;

const Container = `
flex 
flex-1
flex-col 
items-center
w-[100%]
xl:mb-[140px]
lg:mb-[250px]
md:mb-[180px]
mb-[100px]
xl:border-l
border-[#BABABA]
`;

const InputStyle = `
border
focus:border-[black]
bg-white
w-full 
py-2
text-black 
px-3 
rounded-lg  
placeholder:text-gray-300
`;
const InputWithImage = `
border
focus:border-[black]
bg-white
w-full
py-2
text-black 
px-3  
rounded-lg  
placeholder:text-gray-300
`;
const primaryButton = `
bg-white 
w-[130px] 
h-[40px] 
rounded-lg  
mt-2
hover:opacity-80
hover:cursor-pointer
border-[white]`;

const ButtonStyle = `
absolute
right-0
appearance-none
text-white
bg-[#080808]
p-1
m-1`;

const Title = `
font-sans
text-[black] 
text-[36px] 
lg:text-[28px] 
text-center 
font-bold`;

const ImagesContainer = `
flex 
flex-1 
justify-center 
lg:gap-x-16  
gap-x-10 
lg:gap-y-6  
gap-y-4  
flex-wrap 
pt-4 `;

const InputWrapper = `
w-[100%] 
grid  
grid-cols-1  
lg:grid-cols-2   
lg:gap-x-6 
gap-x-4
lg:gap-y-6
gap-y-4
px-6
lg:px-8
`;

const TextWrapper = `
px-6
lg:px-8 
w-[100%] 
xl:w-[100%]  
`;

const ForgotText = `
hover:underline
hover:text-[#194996]
text-center 
// text-black
font-sans 
font-medium 
text-[16px]`;

const Description = `
font-sans
text-black  
text-[18px] 
lg:text-[20px]
text-center 
py-2`;

export default Signup;
