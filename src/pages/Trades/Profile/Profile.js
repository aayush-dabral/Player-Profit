import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import mixpanel from "mixpanel-browser";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import defaultImg from "../../../assets/images/defautltImg.png";
import {
  resetUpdateUser,
  updateUser,
} from "../../../redux/action/updateProfile";
import { userProfile } from "../../../redux/action/userProfile";
import {
  resetUploadPhoto,
  uploadPhoto,
} from "../../../redux/action/uploadPhoto";
import { postKYCFormDetails } from "../../../redux/action/kycForm";
import {
  emailVerificationUser,
  resetEmailVerificationUser,
} from "../../../redux/action/updateProfile";
import { validateEmail } from "../../../utils/constants";
import {
  changePassword,
  resetChangePassword,
} from "../../../redux/action/changePassword";
import moment from "moment";

import { LuArrowDownToLine, LuArrowUpFromLine } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import {
  FaAngleDown,
  FaAngleUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INITIAL_ERRORS_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  city: "",
  state: "",
  password: "",
  userName: "",
  dob: "",
  address: "",
  zipcode: "",
  country: "",
  phone: "",
  newPassword: "",
  confirmPassword: "",
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [file, setFile] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("************");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [dob, setDob] = useState(null);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [isKYCFilled, setKYCfilled] = useState(false);
  const [image, setImage] = useState(null);
  const [id, setId] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showEmailVerification, isShowEmailVerification] = useState(false);
  const [loader, setLoader] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [isSurveyFormShown, setShowSurveyForm] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isProfileActive, setProfileActive] = useState(true);
  const [validationError, setValidationError] = useState(INITIAL_ERRORS_STATE);
  const [showDob, setShowDob] = useState(false);
  const [tempDOB, setTempDOB] = useState(null);
  const [ssnValue, setSsnValue] = useState("");
  const [dlValue, setDlValue] = useState("");
  const [w9Value, setW9Value] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [ndaValue, setNdaValue] = useState("");
  const [dlBody, setDlBody] = useState("");
  const [w9Body, setW9Body] = useState("");
  const [contractBody, setContractBody] = useState("");
  const [ndaBody, setNdaBody] = useState("");
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [validityError, setValidityError] = useState({
    ssn: "",
    dl: "",
    w9: "",
    contract: "",
    nda: "",
  });
  const [selectedInputId, setSelectedInputId] = useState(0);

  const userProfileData = useSelector(
    (state) => state?.userProfileReducer.userProfile
  );
  const updateUserProfile = useSelector(
    (state) => state?.updateProfileReducer?.updateProfile
  );
  const uploadProfilePicture = useSelector(
    (state) => state?.uploadPhotoReducer?.uploadPhoto
  );
  const emailVerificationData = useSelector(
    (state) => state?.emailVerificationUserReducer?.emailVerificationUser
  );
  const changePass = useSelector(
    (state) => state?.changePasswordReducer?.changePassword
  );
  // console.log()

  useEffect(() => {
    if (emailVerificationData?.status) {
      mixpanel.init("cc3cafa268ef11604a52b34edf3443d7");
      mixpanel.track("Change Email Modal", {
        event: "Change Email Address",
        userName: userProfileData?.data?.username,
        userEmail: userProfileData?.data?.email,
      });
      toast.success("Email changed send link successful.");
      setChangeEmail(false);
      dispatch(resetEmailVerificationUser());
      dispatch(userProfile());
      console.log(userProfileData);
    }
  }, [emailVerificationData]);

  const validateEmailInput = () => {
    if (!email) return { email: "Please enter an email address" };
    if (!validateEmail.test(email))
      return { email: "Please enter a valid email address." };
    if (userProfileData?.data?.email === email)
      return { email: "Same email address can't be updated" };
    return null;
  };

  const validatePasswords = () => {
    if (!newPassword) return { newPassword: "Please enter a new password" };
    if (newPassword.length < 8)
      return {
        newPassword:
          "New Password should be greater than or equal to 8 characters",
      };
    if (!confirmPassword)
      return { confirmPassword: "Please enter a confirm password" };
    if (newPassword !== confirmPassword)
      return {
        confirmPassword: "Confirm password and new password should be same",
      };
    return null;
  };

  const updateEmailAddressAPI = () => {
    const emailErrors = validateEmailInput();
    console.log("EMAIL ERROR", emailErrors);
    if (emailErrors) {
      setValidationError(emailErrors);
    } else {
      setValidationError({ email: "" });

      const body = {
        email: email,
        username: userProfileData?.data?.username,
      };
      console.log("EMAIL VER BODY", body);
      dispatch(emailVerificationUser(body));
    }
  };

  function handleImageChange(e) {
    const formData = new FormData();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("SELECTED FILE", selectedFile);
      let calculateSize = selectedFile.size / (1024 * 1024);
      if (calculateSize <= 10) {
        formData.append("avatar", selectedFile);
        setFile(URL.createObjectURL(selectedFile));
        dispatch(uploadPhoto(formData));
      } else {
        alert("File should be less than or equal to 10MB");
      }
    } else {
      setFile(defaultImg); // Or set a default image URL if you have one
    }
  }

  useEffect(() => {
    if (uploadProfilePicture?.status) {
      mixpanel.init("cc3cafa268ef11604a52b34edf3443d7");
      mixpanel.track("Profile Screen", {
        event: "Profile Pic Update",
        userName: userProfileData?.data?.username,
        userEmail: userProfileData?.data?.email,
      });
      window.scrollTo(0, 0);
      toast.success("Profile picture uploaded successfully.");
      dispatch(resetUploadPhoto());
      dispatch(userProfile());
      setLoader(false);
    } else if (
      uploadProfilePicture?.status === false &&
      uploadProfilePicture?.loader === false
    ) {
      setLoader(false);
    }
  }, [uploadProfilePicture]);

  useEffect(() => {
    if (updateUserProfile?.status) {
      mixpanel.init("cc3cafa268ef11604a52b34edf3443d7");
      mixpanel.track("Profile Screen", {
        event: "Profile Details Update",
        userName: userProfileData?.data?.username,
        userEmail: userProfileData?.data?.email,
      });
      window.scrollTo(0, 0);
      toast.success("Profile updated successfully.");
      dispatch(resetUpdateUser());
      dispatch(userProfile());
      setIsEditMode(false);
      setLoader(false);
    } else if (
      updateUserProfile?.status === false &&
      updateUserProfile?.loader === false
    ) {
      setLoader(false);
    }
  }, [updateUserProfile, isProfileActive]);

  useEffect(() => {
    if (isProfileActive) {
      dispatch(userProfile());
    }
  }, [isProfileActive]);

  useEffect(() => {
    if (isFormSubmitted) {
      setProfileActive(false);
      setKYCfilled(true);
    } else {
      setProfileActive(true);
    }
  }, [isFormSubmitted]);

  const changePasswordAPI = () => {
    if (!newPassword) {
      toast.error("Please enter a new password");
      return false;
    }
    if (newPassword.length < 8) {
      toast.error(
        "New Password should be greater than or equal to 8 characters"
      );
      return false;
    }
    if (!confirmPassword) {
      toast.error("Please enter a confirm password");
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Confirm password and new password should be same");
      return false;
    } else {
      setValidationError({ newPassword: "", confirmPassword: "" });

      const body = {
        new_password1: newPassword,
        new_password2: confirmPassword,
      };
      console.log("reset pass body", body);
      dispatch(changePassword(body));
    }
  };

  useEffect(() => {
    if (changePass?.status) {
      mixpanel.init("cc3cafa268ef11604a52b34edf3443d7");
      mixpanel.track("Change Password Modal", {
        event: "Change Password",
        userName: userProfile?.data?.username,
        userEmail: userProfile?.data?.email,
      });
      setNewPassword("");
      setConfirmPassword("");
      window.scrollTo(0, 0);
      toast.success(`${changePass?.data?.detail}`);
      setChangePasswordModal(false);
      dispatch(resetChangePassword());
    }
  }, [changePass]);

  useEffect(() => {
    function convertToOriginalFormat(inputDate) {
      const [year, month, day] = inputDate.split("-");
      return `${month}-${day}-${year}`;
    }

    if (userProfileData?.status) {
      const { data } = userProfileData;
      // console.log("DATA", data)
      setFirstName(data?.first_name);
      setLastName(data?.last_name);
      setEmail(data?.email);
      setGender(data?.gender);
      setCity(data?.city);
      setState(data?.state);
      setId(data?.id);
      setUserName(data?.username ? data?.username : "");
      // setDob(data?.dob && convertToOriginalFormat(data?.dob));
      setAddress(data?.address);
      setZipcode(data?.zipcode);
      setCountry(data?.country);
      setVerifiedUser(data?.is_verified);
      setKYCfilled(data?.is_kyc_filled);
      setFile(data?.avatar);
      setLoader(false);
      setPhone(data?.phone);
    } else if (
      userProfileData?.status === false &&
      userProfileData?.loader === false
    ) {
      setLoader(false);
    }
  }, [userProfileData]);

  const handleUpdateProfileAPI = () => {
    console.log(
      "IN UPDATE PROFILE FUNC",
      firstName,
      userName,
      address,
      city,
      zipcode,
      state,
      country,
      dob
    );
    try {
      if (!firstName.trim()) {
        return setValidationError({
          ...INITIAL_ERRORS_STATE,
          firstName: "Please enter a first name",
        });
      } else if (!userName) {
        return setValidationError({
          ...INITIAL_ERRORS_STATE,
          userName: "Please enter a username",
        });
      } else if (!address) {
        return setValidationError({
          ...INITIAL_ERRORS_STATE,
          address: "Please enter street address",
        });
      } else if (!city) {
        return setValidationError({
          ...INITIAL_ERRORS_STATE,
          city: "Please enter a city",
        });
      } else if (!zipcode) {
        return setValidationError({
          ...INITIAL_ERRORS_STATE,
          zipcode: "Please enter zipcode",
        });
      } else if (!state) {
        return setValidationError({
          ...INITIAL_ERRORS_STATE,
          state: "Please enter state",
        });
      } else if (!country) {
        return setValidationError({
          ...INITIAL_ERRORS_STATE,
          country: "Please enter country",
        });
      } else {
        setValidationError(INITIAL_ERRORS_STATE);
        function convertDateFormat(inputDate) {
          const [month, day, year] = inputDate.split("-");
          return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }

        let body = {
          username: userName,
          first_name: firstName,
          last_name: lastName,
          gender: gender,
          address: address,
          city: city,
          zipcode: zipcode,
          state: state,
          country: country,
          phone: phone,
        };
        if (dob) {
          body.dob = moment(dob).format("YYYY-MM-DD");
        }
        console.log("DATA BODY", body);
        setLoader(true);
        dispatch(updateUser(body));
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const checkValidations = () => {
    if (
      ssnValue?.trim().length !== 0 &&
      dlValue.length !== 0 &&
      contractValue.length !== 0 &&
      w9Value.length !== 0 &&
      ndaValue?.length !== 0
    ) {
      return true;
    } else if (ssnValue?.trim().length === 0) {
      return setValidityError({
        ssn: "Please enter SSN",
        dl: "",
        w9: "",
        contract: "",
        nda: "",
      });
    } else if (dlValue?.trim().length === 0) {
      return setValidityError({
        ssn: "",
        dl: "Please upload Driving License",
        w9: "",
        contract: "",
        nda: "",
      });
    } else if (w9Value?.trim().length === 0) {
      return setValidityError({
        ssn: "",
        dl: "",
        w9: "Please upload W-9",
        contract: "",
        nda: "",
      });
    } else if (contractValue?.trim().length === 0) {
      return setValidityError({
        ssn: "",
        dl: "",
        w9: "",
        contract: "Please upload Contract document",
        nda: "",
      });
    } else if (ndaValue?.trim().length === 0) {
      return setValidityError({
        ssn: "",
        dl: "",
        w9: "",
        contract: "",
        nda: "Please upload Signed NDA",
      });
    }
  };

  const onSubmitClick = () => {
    console.log("Check validation", checkValidations());
    if (checkValidations()) {
      setLoader(true);
      const formData = new FormData();
      formData.append("ssn", ssnValue);
      formData.append("driver_license", dlBody);
      formData.append("contract_agreement", contractBody);
      formData.append("W9_form", w9Body);
      formData.append("nda_signed", ndaBody);
      formData.append("user_status", "False");
      dispatch(postKYCFormDetails(formData));
      setTimeout(() => {
        // setShowSurveyForm(true);
        setIsFundedTraderOpen(false);
      }, 2000);
    }
  };

  const onImageChange = (event) => {
    if (event?.target?.files && event?.target?.files[0]) {
      let calculateSize = event.target.files[0]?.size / (1024 * 1024);
      if (calculateSize <= 23) {
        if (selectedInputId === 1) {
          setDlValue(event.target.files[0].name);
          setDlBody(event.target.files[0]);
        } else if (selectedInputId === 2) {
          setW9Value(event.target.files[0].name);
          setW9Body(event.target.files[0]);
        } else if (selectedInputId === 3) {
          setContractValue(event.target.files[0].name);
          setContractBody(event.target.files[0]);
        } else if (selectedInputId === 4) {
          setNdaValue(event.target.files[0].name);
          setNdaBody(event.target.files[0]);
        }
        setLoader(true);
      } else {
        window.scrollTo(0, 0);
        toast.error("File should be less than or equal to 23MB");
      }
    }
  };

  const RegistrationForm = () => {
    // const [formData, setFormData] = useState({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   sex: "",
    //   city: "",
    //   state: "",
    //   password: "",
    //   username: "",
    //   phone: "",
    //   dob: new Date(),
    //   streetAddress: "",
    //   zipcode: "",
    //   country: "",
    // });

    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   console.log("NAME",name, value)
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [name]: value,
    //   }));
    // };

    const handleDateChange = (date) => {
      console.log("DATE", date);
      let formattedDate = moment(date).format("YYYY-MM-DD");
      setDob(formattedDate);
    };
    console.log("DOB", dob);

    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(formData);
    };

    const handleSaveSubmit = (e) => {
      e.preventDefault();
      // Here you can send formData to your backend or perform other actions
      // console.log(formData);
      setIsEditMode(false); // Exit edit mode after saving changes
    };

    const handleDiscardClick = () => {
      // setFormData(exampleData); // Reset form data to initial values
      setIsEditMode(false); // Exit edit mode without saving changes
    };

    return isEditMode ? (
      <>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col appearance-none mt-4
      md:flex-row md:mt-0"
        >
          {/* <ToastContainer /> */}
          <div
            className="flex flex-col w-full mx-auto 
        md:mx-0 md:w-1/2"
          >
            <label className="mt-4">First Name</label>
            <input
              value={firstName}
              type="text"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Last Name</label>
            <input
              value={lastName}
              type="text"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Email Address</label>
            <input
              value={email}
              type="email"
              name="email"
              onFocus={() => {
                setChangeEmail(true);
                setEmail("");
              }}
              onChange={() => {
                setEmail("");
                setChangeEmail(true);
              }}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Sex</label>
            <select
              value={gender}
              name="sex"
              onChange={(e) => setGender(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            <label className="mt-4">City</label>
            <input
              value={city}
              type="text"
              name="city"
              onChange={(e) => setCity(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">State</label>
            <input
              value={state}
              type="text"
              name="state"
              onChange={(e) => setState(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <div className="flex justify-between w-[70%] mt-4">
              <label className="">Password</label>
              <div
                className="text-[#F11941] cursor-pointer"
                onClick={() => {
                  setChangePasswordModal(true);
                }}
              >
                Change Password
              </div>
            </div>

            <input
              type="password"
              name="password"
              value="***********"
              readOnly
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
          </div>

          <div
            className="flex flex-col w-full mx-auto 
        md:mx-0 md:w-1/2"
          >
            <label className="mt-4">Username</label>
            <input
              value={userName}
              type="text"
              name="username"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Phone</label>
            <input
              value={phone}
              type="tel"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Date Of Birth</label>
            <DatePicker
              selected={dob ? moment(dob) : ""}
              dateFormat="MM-DD-yyyy"
              onChange={(t) => handleDateChange(t)}
              showYearDropdown
              value={dob ? moment(dob) : null}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Street Address</label>
            <input
              value={address}
              type="text"
              name="streetAddress"
              onChange={(e) => setAddress(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Zipcode</label>
            <input
              value={zipcode}
              type="text"
              name="zipcode"
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Country</label>
            <input
              value={country}
              type="text"
              name="country"
              onChange={(e) => setCountry(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
          </div>
        </form>
        <div className="flex w-full mt-8">
          <button
            onClick={handleUpdateProfileAPI}
            className="mr-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-black text-center px-3 py-1 font-bold"
          >
            Save
          </button>
          <button
            onClick={handleDiscardClick}
            className="rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-black text-center px-2 py-1 font-bold"
          >
            Discard Changes
          </button>
        </div>
      </>
    ) : (
      <>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col appearance-none mt-4
          md:flex-row md:mt-0"
        >
          <div
            className="flex flex-col w-full mx-auto 
        md:mx-0 md:w-1/2"
          >
            <label className="mt-4">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              readOnly
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              readOnly
              onChange={(e) => setLastName(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Email Address</label>
            <input
              type="email"
              name="email"
              value={email || userProfileData?.data?.email}
              readOnly
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Sex</label>
            <select
              name="sex"
              value={gender}
              readOnly
              disabled
              onChange={(e) => setGender(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            <label className="mt-4">City</label>
            <input
              type="text"
              name="city"
              value={city}
              readOnly
              onChange={(e) => setCity(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">State</label>
            <input
              type="text"
              name="state"
              value={state}
              readOnly
              onChange={(e) => setState(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              readOnly
              onChange={(e) => setPassword(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
          </div>

          <div
            className="flex flex-col w-full mx-auto 
        md:mx-0 md:w-1/2"
          >
            <label className="mt-4">Username</label>
            <input
              type="text"
              name="username"
              value={userName}
              readOnly
              onChange={(e) => setUserName(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Phone</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              readOnly
              onChange={(e) => setPhone(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Date Of Birth</label>
            <DatePicker
              disabled
              value={dob}
              readOnly
              selected={dob}
              onChange={handleDateChange}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              value={address}
              readOnly
              onChange={(e) => setAddress(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Zipcode</label>
            <input
              type="text"
              name="zipcode"
              value={zipcode}
              readOnly
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
            <label className="mt-4">Country</label>
            <input
              type="text"
              name="country"
              value={country}
              readOnly
              onChange={(e) => setCountry(e.target.value)}
              className="w-full md:w-[70%] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
            />
          </div>
        </form>
        <button
          onClick={() => setIsEditMode(true)}
          className="mt-8 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] w-44 text-black text-center py-1 font-bold"
        >
          Edit Information
        </button>
      </>
    );
  };

  const [openSection, setOpenSection] = useState(null);

  const handleViewMore = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const scrollContainerRef = useRef(null);

  function scrollSidebar(direction) {
    const container = scrollContainerRef.current;

    if (container) {
      const scrollAmount = 100; // Adjust scroll amount as needed

      if (direction === "left") {
        container.scrollLeft -= scrollAmount; // Scroll left
      } else {
        container.scrollLeft += scrollAmount; // Scroll right
      }
    }
  }

  const [isFundedTraderOpen, setIsFundedTraderOpen] = useState(false);

  const handleFundedDiscardClick = () => {
    // Reset form data to initial values
    setIsFundedTraderOpen(!isFundedTraderOpen); // Exit edit mode without saving changes
  };

  return (
    <div
      className="flex flex-col text-white w-full border-b-2 border-b-[#161616]
    xl:flex-row
    "
    >
      {/* Profile settings section */}
      <div
        className="w-[94%] mx-auto min-h-screen xl:h-screen
        xl:block xl:w-[80%] xl:mx-0 pb-16 pt-4 px-10 xl:border-l-2 border-l-[#191919] text-sm"
      >
        <div
          className="flex flex-col justify-betwen
        xl:flex-row
        "
        >
          <div
            className="text-2xl text-center
          xl:px-4"
          >
            Personal Information
          </div>
          <div className="flex justify-center">
            <button
              // onClick={handleFundedDiscardClick}
              className="cursor-pointer rounded-lg border-2 border-[#B8E834 border-[#5c5c5c] text-[#B8E834 text-[#5c5c5c] text-center w-48 px-2 py-1 font-bold
            my-4 
            xl:my-0"
            >
              Funded Trader Information
            </button>
          </div>
        </div>
        <div
          className="flex flex-col
        xl:flex-row xl:justify-between"
        >
          <div
            className="mx-auto
          xl:w-[25%] mt-4 px-4"
          >
            {/* Profile Picture  */}
            <div className="relative rounded-full h-32 w-32 mx-auto overflow-hidden">
              <img
                src={file || defaultImg}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Option to Upload Image */}
            <div
              className="cursor-pointer mt-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] w-44 mx-auto text-black text-center py-1 font-bold"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              <label className="cursor-pointer">Upload Image</label>
            </div>

            <input
              type="file"
              id="imageUpload"
              onChange={handleImageChange}
              className="sr-only"
            />
          </div>

          <div
            className=" w-full
          xl:w-[70%]"
          >
            {/* Profile Details  */}
            {RegistrationForm()}
          </div>
        </div>
      </div>

      {/* Popup  */}
      {isFundedTraderOpen && (
        <div
          className="overflow overflow-y bg-[#0D0D0D] border-2 border-[#252525] rounded-xl
            fixed top-[15%] left-1/2 transform -translate-x-1/2 -transalate-y-1/2
            w-[80%] pb-4
            xl:w-[36%] xl:top-[12%]
            "
        >
          <div>
            <div className="flex justify-between pl-8 pr-3 mt-4">
              <div className="text-xl font-bold">KYC Details</div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setIsFundedTraderOpen(false);
                }}
              >
                X
              </div>
            </div>

            <div
              className="w-[95%] mx-auto mt-4 pt-3 px-4
            xl:mt-2
            "
            >
              <div className="font-semibold underline underline-offset-4">
                Please provide following documents to enter next phase
              </div>

              <div className="flex flex-col">
                <label className="mt-5 -mb-3">SSN</label>
                <input
                  className="border-2 border-[#2a2a2a] rounded-lg bg-transparent text-sm text-[#a9a9a9] w-[93%] mt-4 px-1 py-2 overflow-hidden"
                  onChange={(e) => setSsnValue(e.target.value)}
                />
              </div>

              <div className="mt-5 -mb-3">Driving License</div>
              <div className="flex justify-between">
                {/* Container to display the file name */}
                <div className="border-2 border-[#2a2a2a] rounded-lg text-sm text-[#a9a9a9] w-[60%] mt-4 px-1 py-2 overflow-hidden">
                  {dlValue ? (
                    <p className="">{dlValue}</p>
                  ) : (
                    <p className="">No file selected</p>
                  )}
                </div>

                {/* Option to Upload Image */}
                <div
                  className="cursor-pointer mt-4 rounded-lg bg-[#B8E834] w-[25%] mx-auto text-black text-center pt-2 font-bold"
                  onClick={() => {
                    document.getElementById("drivingLicenseUpload").click();
                    setSelectedInputId(1);
                  }}
                >
                  <label className="cursor-pointer px-1">Upload</label>
                </div>

                {/* Hidden input field for file upload */}
                <input
                  type="file"
                  id="drivingLicenseUpload"
                  onChange={onImageChange}
                  className="sr-only"
                />
              </div>

              <div className="mt-5 -mb-3">W-9</div>
              <div className="flex justify-between">
                {/* Container to display the file name */}
                <div className="border-2 border-[#2a2a2a] rounded-lg text-sm text-[#a9a9a9] w-[60%] mt-4 px-1  py-2 overflow-hidden">
                  {w9Value ? (
                    <p className="">{w9Value}</p>
                  ) : (
                    <p className="">No file selected</p>
                  )}
                </div>

                {/* Option to Upload Image */}
                <div
                  className="cursor-pointer mt-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] w-[25%] mx-auto text-black text-center pt-2 font-bold"
                  onClick={() => {
                    document.getElementById("wNineUpload").click();
                    setSelectedInputId(2);
                  }}
                >
                  <label className="cursor-pointer px-1">Upload</label>
                </div>

                {/* Hidden input field for file upload */}
                <input
                  type="file"
                  id="wNineUpload"
                  onChange={onImageChange}
                  className="sr-only"
                />
              </div>

              <div className="mt-5 -mb-3">Contract Document</div>
              <div className="flex justify-between">
                {/* Container to display the file name */}
                <div className="border-2 border-[#2a2a2a] rounded-lg text-sm text-[#a9a9a9] w-[60%] mt-4 px-1  py-2 overflow-hidden">
                  {contractValue ? (
                    <p className="">{contractValue}</p>
                  ) : (
                    <p className="">No file selected</p>
                  )}
                </div>

                {/* Option to Upload Image */}
                <div
                  className="cursor-pointer mt-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] w-[25%] mx-auto text-black text-center pt-2 font-bold"
                  onClick={() => {
                    document.getElementById("contractDocumentUpload").click();
                    setSelectedInputId(3);
                  }}
                >
                  <label className="cursor-pointer px-1">Upload</label>
                </div>

                {/* Hidden input field for file upload */}
                <input
                  type="file"
                  id="contractDocumentUpload"
                  onChange={onImageChange}
                  className="sr-only"
                />
              </div>

              <div className="mt-5 -mb-3">Signed NDA</div>
              <div className="flex justify-between">
                {/* Container to display the file name */}
                <div className="border-2 border-[#2a2a2a] rounded-lg text-sm text-[#a9a9a9] w-[60%] mt-4 px-1  py-2 overflow-hidden">
                  {ndaValue ? (
                    <p className="">{ndaValue}</p>
                  ) : (
                    <p className="">No file selected</p>
                  )}
                </div>

                {/* Option to Upload Image */}
                <div
                  className="cursor-pointer mt-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] w-[25%] mx-auto text-black text-center pt-2 font-bold"
                  onClick={() => {
                    document.getElementById("signedNDAUpload").click();
                    setSelectedInputId(4);
                  }}
                >
                  <label className="cursor-pointer px-1">Upload</label>
                </div>

                {/* Hidden input field for file upload */}
                <input
                  type="file"
                  id="signedNDAUpload"
                  onChange={onImageChange}
                  className="sr-only"
                />
              </div>

              <div className="flex w-full mt-5">
                <button
                  onClick={onSubmitClick}
                  className="mr-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-black text-center px-3 py-1 font-bold"
                >
                  Save
                </button>
                <button
                  onClick={handleFundedDiscardClick}
                  className="rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-black text-center px-2 py-1 font-bold"
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Change Password Popup */}
      {changePasswordModal && (
        <div
          className="bg-[#0D0D0D] border-2 border-[#252525] rounded-xl
            fixed top-[35%] left-1/2 transform -translate-x-1/2 -transalate-y-1/2
            w-[85%] pb-4
            xl:w-[36%] xl:top-[25%]
            "
        >
          <div>
            <div className="flex justify-between pl-8 pr-3 mt-4">
              <div className="text-xl font-bold">Change Password</div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setChangePasswordModal(false);
                }}
              >
                X
              </div>
            </div>

            <div
              className="w-[95%] mx-auto mt-4 pt-3 px-4
            xl:mt-2
            "
            >
              <div className="flex flex-col">
                <label className="mt-5 -mb-3">New Password</label>
                <input
                  className="border-2 border-[#2a2a2a] rounded-lg bg-transparent text-sm text-[#a9a9a9] w-[93%] mt-4 px-1 py-2 overflow-hidden"
                  onChange={(e) => setNewPassword(e.target.value)}
                  onError={validationError.newPassword}
                />
              </div>

              <div className="flex flex-col">
                <label className="mt-5 -mb-3">Confirm Password</label>
                <input
                  className="border-2 border-[#2a2a2a] rounded-lg bg-transparent text-sm text-[#a9a9a9] w-[93%] mt-4 px-1 py-2 overflow-hidden"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={validationError.confirmPassword}
                />
              </div>

              <div className="flex w-full mt-5">
                <button
                  onClick={changePasswordAPI}
                  className="mr-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-black text-center px-3 py-1 font-bold"
                >
                  Save
                </button>
                <button
                  onClick={() => setChangePasswordModal(false)}
                  className="rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-black text-center px-2 py-1 font-bold"
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Email Popup */}
      {changeEmail && (
        <div
          className="bg-[#0D0D0D] border-2 border-[#252525] rounded-xl
            fixed top-[35%] left-1/2 transform -translate-x-1/2 -transalate-y-1/2
            w-[85%] pb-4
            xl:w-[36%] xl:top-[25%]
            "
        >
          <div>
            <div className="flex justify-between pl-8 pr-3 mt-4">
              <div className="text-xl font-bold">Change Email Address</div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setChangeEmail(false);
                }}
              >
                X
              </div>
            </div>

            <div
              className="w-[95%] mx-auto mt-4 pt-3 px-4
            xl:mt-2
            "
            >
              <div className="flex flex-col">
                <label className="mt-5 -mb-3">Enter Email Address</label>
                <input
                  className="border-2 border-[#2a2a2a] rounded-lg bg-transparent text-sm text-[#a9a9a9] w-[93%] mt-4 px-1 py-2 overflow-hidden"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex w-full mt-5">
                <button
                  onClick={updateEmailAddressAPI}
                  className="mr-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-black text-center px-3 py-1 font-bold"
                >
                  Send verification link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
