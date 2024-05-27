import React, { useState, useEffect } from "react";
import { DocusealForm } from "@docuseal/react";
import { Loader } from "../../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getChallangeStatus } from "../../redux/action/challangeStatus.js";
import { getUserKycInfo } from "../../redux/action/getUserKycInfo.js";
import { countryAndCodes } from "../../utils/countryAndCodes.js";

const kycPhase = 3;
const setKycStatus = true;

function KYC() {
  const [countryCode, setCountryCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("userData")).email || "");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const challengesData = useSelector(
    (state) => state?.challangeStatusReducer?.challangeStatusDetails?.data
  );
  const userKycDetails = useSelector((state) => state?.getUserKycInfoReducer?.userKycInfo?.data);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(null);
  const [userEmail, setUserEmail] = useState(
    JSON.parse(localStorage.getItem("userData")).email || ""
  );
  const [kycChallenge, setKycChallenge] = useState(0); // subscription_id
  const [isKycDoneForSelected, setIsKycDoneForSelected] = useState(false); //checks weather kyc is done for selected subscription
  const [challengesForKyc, setChallengesForKyc] = useState([]); // all challenges(phase 3) for kyc
  const [isLoading, setIsLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [isFormCompleted, setFormCompleted] = useState(false);

  const handleKycFormComplete = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_REACT_APP_BACKEND_API_URL + "additional_registration/challenge/kyc/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("accessToken") || "",
          },
          body: JSON.stringify({
            subscription_id: kycChallenge,
            is_kyc_done: setKycStatus,
          }),
        }
      );
      if (res.status === 200 || res.status === 201) {
        const response = await res.json();
        setFormCompleted(true);
        toast.success(response?.status);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Error in signing the document");
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (userKycDetails && Object.keys(userKycDetails).length > 0) {
      setActiveStep(1);
    }
  }, [userKycDetails]);

  const signInit = async () => {
    setIsLoading(true);
    if (userEmail) {
      try {
        const res = await fetch(
          import.meta.env.VITE_REACT_APP_BACKEND_API_URL +
            "additional_registration/challenge/docuseal/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "token " + localStorage.getItem("accessToken") || "",
            },
            body: JSON.stringify({
              template_id: Number(import.meta.env.VITE_REACT_APP_DOCUSEAL_TEMPLATE_ID),
              email: userEmail,
            }),
          }
        );
        if (res.status === 200 || res.status === 201) {
          const { slug } = await res.json();
          setSlug(slug);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);

        toast.error("Error in signing the document");
      }
    } else {
      toast.error("User email not found. Please try again later");
    }
  };

  useEffect(() => {
    if (
      activeStep === 1 &&
      !isKycDoneForSelected &&
      challengesForKyc &&
      challengesForKyc.length > 0
    ) {
      signInit();
    }
    window.scrollTo(0, 0);
  }, [activeStep, challengesForKyc]);

  const submitKycUserInfo = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_REACT_APP_BACKEND_API_URL + "users/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "token " + localStorage.getItem("accessToken") || "",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone_no: phoneNumber,
          email: email,
          street_address: streetAddress,
          city: city,
          zipcode: zipCode,
          country: country,
          country_code: countryCode,
        }),
      });
      if (res.status === 200 || res.status === 201) {
        const response = await res.json();
        setActiveStep(1);
        toast.success(response?.status);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setActiveStep(0);
      toast.error("Something went wrong in submitting the form");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    submitKycUserInfo();
  };

  console.log();
  useEffect(() => {
    if (kycChallenge) {
      setFormCompleted(false);
      Object.entries(challengesData).map(([challenge, details]) => {
        if (details[details.length - 1].subscription_id === kycChallenge) {
          setIsKycDoneForSelected(details[details.length - 1].is_kyc_done || false);
        }
      });
    }
  }, [kycChallenge]);

  useEffect(() => {
    dispatch(getChallangeStatus());
    dispatch(getUserKycInfo());
  }, []);

  useEffect(() => {
    if (challengesData && Object.entries(challengesData).length > 0) {
      const challengesForKyc = Object.entries(challengesData).filter(([challenge, details]) => {
        return details.length === kycPhase;
      });
      setChallengesForKyc(challengesForKyc);
      setIsLoading(false);
      if (challengesForKyc.length > 0) {
        const firstChallengeDetails = challengesForKyc[0][1][0];
        setKycChallenge(firstChallengeDetails.subscription_id);
        setIsKycDoneForSelected(firstChallengeDetails.is_kyc_done);
        setIsLoading(false);
      }
    }
  }, [challengesData]);

  return (
    <div className="flex flex-col p-6 text-white w-full border-l-2 border-b-2 border-[#161616] min-h-[60vh]">
      {isLoading ? (
        <Loader height="3.5%" width="3.5%" />
      ) : challengesForKyc && challengesForKyc.length > 0 ? (
        <>
          <div className="flex gap-4 align-center justify-between my-4">
            <h1 className="text-2xl xl:text-3xl my-4">KYC</h1>
            <select
              value={kycChallenge}
              onChange={(e) => {
                setKycChallenge(Number(e.target.value));
              }}
              className="bg-black border w-2/3 border-gray-500 text-white text-md rounded-md outline-none xl:w-1/3 p-4"
            >
              {challengesForKyc.map((challenge, index) => (
                <option key={index} value={challenge[1][0].subscription_id}>
                  {challenge[0]}
                </option>
              ))}
            </select>
          </div>
          {/* Headings */}
          <div className="flex items-center justify-center xl:justify-start text-sm xl:text-lg gap-2 xl:gap-10">
            <div
              className={`flex gap-2 xl:gap-4 items-center ${
                activeStep === 0 ? "text-white" : "text-[#4D4D4D]"
              }`}
            >
              <span className="py-2 px-4 rounded-full bg-[#FFFFFF1A]">1</span>
              <h2>Confirm Information</h2>
            </div>
            <div
              className={`flex gap-2 xl:gap-4 items-center ${
                activeStep === 1 ? "text-white" : "text-[#4D4D4D]"
              }`}
            >
              <span className="py-2 px-4 rounded-full bg-[#FFFFFF1A]">2</span>
              <h2>E-Signature</h2>
            </div>
            {/* <div
                className={`flex gap-4 items-center ${
                  activeStep === 2 ? "text-white" : "text-[#4D4D4D]"
                }`}
              >
                <span className="py-2 px-4 rounded-full bg-[#FFFFFF1A]">3</span>
                <h2>Confirm Withdraw</h2>
              </div> */}
          </div>
          {isLoading && <Loader height="3.5%" width="3.5%" />}
          {activeStep === 0 && !isLoading && (
            <form
              onSubmit={handleFormSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full xl:w-[60%] my-10 text-[#454545]"
            >
              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="firstName" className="font-bold text-[#cacaca]">
                  First Name
                </label>
                <input
                  className="pl-3 placeholder-[#454545] outline-none bg-black border text-white border-[#363434] w-full rounded-md p-1 py-3"
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col font-bold gap-2 items-start">
                <label htmlFor="lastName" className="font-bold text-[#cacaca]">
                  Last Name
                </label>
                <input
                  className="pl-3 placeholder-[#454545] outline-none bg-black border text-white border-[#363434] w-full p-1 py-3 rounded-md"
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="country" className="font-bold text-[#cacaca]">
                  Country
                </label>
                <select
                  id="country"
                  className="pl-3 placeholder-[#454545] outline-none bg-black border text-white border-[#363434] w-full p-1 py-3 rounded-md"
                  value={country}
                  onChange={(e) => {
                    const selectedCountry = countryAndCodes.find(
                      (country) => country.NAME === e.target.value
                    );
                    setCountry(e.target.value);
                    setCountryCode("+" + selectedCountry.ISD);
                  }}
                  required
                >
                  <option value="">Select your country</option>
                  {countryAndCodes.map((country, index) => (
                    <option key={index} value={country.NAME}>
                      {country.NAME}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="email" className="font-bold text-[#cacaca]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email Id"
                  className="pl-3 placeholder-[#454545] outline-none bg-black border text-white border-[#363434] w-full p-1 py-3 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="streetAddress" className="font-bold text-[#cacaca]">
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  placeholder="Street Address"
                  className="placeholder-[#454545] bg-black border border-[#363434] text-white w-full p-1 py-3 rounded-md"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="city" className="font-bold text-[#cacaca]">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter your city"
                  className="pl-3 placeholder-[#454545] outline-none bg-black border text-white border-[#363434] w-full p-1 py-3 rounded-md"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="zipCode" className="font-bold text-[#cacaca]">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  placeholder="Enter your zip code"
                  className="pl-3 placeholder-[#454545] outline-none bg-black border text-white border-[#363434] w-full p-1 py-3 rounded-md"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="phoneNumber" className="font-bold text-[#cacaca]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  className="pl-3 placeholder-[#454545] outline-none bg-black border text-white border-[#363434] w-full p-1 py-3 rounded-md"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="country_code" className="font-bold text-[#cacaca]">
                  Country Code
                </label>
                <select
                  id="country_code"
                  className="pl-3 placeholder-[#454545] outline-none bg-black border text-white border-[#363434] w-full p-1 py-3 rounded-md"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  required
                >
                  <option value="">Select your country code</option>
                  {countryAndCodes &&
                    countryAndCodes.map((country, index) => {
                      return (
                        <option key={index} value={"+" + country.ISD}>
                          {"+" + country.ISD}
                        </option>
                      );
                    })}
                </select>
              </div>
              <br />
              <div className="w-full flex gap-4">
                <button className="rounded-lg border border-[#808080] bg-transparent w-1/2 text-white text-center py-2 font-bold">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] w-full text-black text-center py-2 font-bold"
                >
                  Confirm Information
                </button>
              </div>
            </form>
          )}
          {activeStep === 1 && (
            <div className="mt-4">
              {slug && !isFormCompleted && !isKycDoneForSelected ? (
                <DocusealForm
                  src={`https://docuseal.co/s/${slug}`}
                  onComplete={handleKycFormComplete}
                />
              ) : null}
            </div>
          )}
          {(isFormCompleted || isKycDoneForSelected) && activeStep === 1 && (
            <>
              <div class="flex flex-col items-center space-y-2 gap-2 my-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class=" w-24 h-24"
                  fill="black"
                  viewBox="0 0 24 24"
                  stroke="#B8E834"
                  strokeWidth="1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h1 class="text-4xl font-bold">Thank You !</h1>
                <p className="text-center">
                  You have successfully signed the document. You can now start Trading.
                </p>
                <a
                  href="/trading"
                  class="cursor-pointer inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E9193F] to-[#831126] text-white rounded-full focus:outline-none focus:ring"
                >
                  <span class="text-md font-medium text-black">Start Trading</span>
                </a>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex align-center justify-center">
          <h1 className="text-3xl my-4">No KYC required</h1>
        </div>
      )}
    </div>
  );
}

export default KYC;
