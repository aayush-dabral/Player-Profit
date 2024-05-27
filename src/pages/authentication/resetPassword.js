import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Root, Text, Input, Button } from "../../components";
import { isPassword } from "../../utils";
import Ellipse from "../../assets/images/EllipseLogin.png";
import { resetConfirmPassword, resetConfirmData } from "../../redux/action/resetConfirmPassword";

const styles = {
  loginBgStyle: {
    backgroundImage: `url(${Ellipse})`,
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100% ",
    backgroundPosition: "center",
  },
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    passwordVisible: false,
    confirmPasswordVisible: false,
  });
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");

  const resetConfirm = useSelector(
    (state) => state?.resetConfirmPasswordReducer?.resetConfirmPassword
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params) {
      const paramLength = params?.get("token")?.split("-");
      setUid(paramLength[paramLength?.length - 1]);
      paramLength.pop();
      setToken(paramLength.join("-"));
    }
  }, []);

  useEffect(() => {
    if (resetConfirm?.status) {
      setState((prevState) => ({ ...prevState, password: "", confirmPassword: "" }));
      // setLoader(false);
      window.scrollTo(0, 0);
      if (resetConfirm?.data?.hasOwnProperty("detail")) {
        toast.success(`${resetConfirm?.data?.detail}`);
      } else {
        toast.success("Password reset successful.");
      }
      dispatch(resetConfirmData());
      navigate("/login");
    }
  }, [resetConfirm]);

  let isValidatePassword = state.password === "" ? true : isPassword(state.password);

  const onChangeText = (e, type) => {
    setState((prev) => ({ ...prev, [type]: e.target.value }));
  };

  const onContinue = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      const body = {
        new_password1: state.password,
        new_password2: state.confirmPassword,
        token: token,
        uid: uid,
      };
      dispatch(resetConfirmPassword(body));
    } else {
      toast.error("New Password and Confirm Password do not match!", {});
    }
  };

  return (
    <div>
      <Root>
        <div className="flex flex-1 justify-center items-center">
          <div className="mt-16 mb-20 lg:w-[60%] w-[95%]">
            <div
              style={styles.loginBgStyle}
              className="rounded-lg mb-10 pb-[200px] border-2 border-[#0F0F0F] lg:px-10 px-6"
            >
              <Text className="text-2xl xl:text-[36px] text-white font-bold text-center  font-sans pb-6 lb:pb-9  pt-6 lg:pt-12">
                Reset Password
              </Text>
              <form
                onSubmit={onContinue}
                className="flex flex-col flex-1  justify-center items-center"
              >
                <div className="lg:w-[60%] w-[90%] pb-4 lg:pb-6 relative">
                  <div className="relative">
                    <Input
                      visible={state.passwordVisible}
                      onShowPassword={(e) => {
                        e.preventDefault();
                        setState((prev) => ({
                          ...prev,
                          passwordVisible: !prev.passwordVisible,
                        }));
                      }}
                      buttonStyle={ButtonStyle}
                      title={"New Password"}
                      onChange={(e) => onChangeText(e, "password")}
                      type={state.passwordVisible ? "text" : "password"}
                      className={InputStyle}
                      required
                      maxlength="20"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="pt-4 relative">
                    <Input
                      visible={state.confirmPasswordVisible}
                      onShowPassword={(e) => {
                        e.preventDefault();
                        setState((prev) => ({
                          ...prev,
                          confirmPasswordVisible: !prev.confirmPasswordVisible,
                        }));
                      }}
                      errorText={
                        (state.clicked && !state.confirmPassword) || isValidatePassword
                          ? state.clicked && !state.confirmPassword
                            ? "Enter minmum 8 characters."
                            : null
                          : "Enter minmum 8 characters."
                      }
                      buttonStyle={ButtonStyle}
                      title={"Confirm Password"}
                      required
                      onChange={(e) => onChangeText(e, "confirmPassword")}
                      type={state.confirmPasswordVisible ? "text" : "password"}
                      className={InputStyle}
                      maxlength="20"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
                <Button
                  variant="secondary"
                  text="Save "
                  isLoading={state.isLoading}
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </Root>
    </div>
  );
};

const InputStyle = `
border
focus:border-[#000000]
bg-white
w-full 
py-2
text-black 
px-3 
rounded-lg  
placeholder:text-gray-300
`;
const ButtonStyle = `
absolute
right-0
p-1
m-1
`;

export default ResetPassword;
