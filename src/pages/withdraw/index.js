import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChallangeStatus } from "../../redux/action/challangeStatus";
import { Loader } from "../../components";
import { toast } from "react-toastify";
import RangeSlider from "../../components/rangeSlider";
import { currenyFormatter } from "../../utils/helper-functions";
import { set } from "lodash";

const withDrawPhase = 3;

function Withdrawal() {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState({}); // data for popup
  const [withdrawSelect, setWithdrawSelect] = useState(0); //selected challenge id for withdrawal
  const [isLoading, setIsLoading] = React.useState(true);
  const challengesData = useSelector(
    (state) => state?.challangeStatusReducer?.challangeStatusDetails?.data
  );
  const [sliderValue, setSliderValue] = useState(0); // amount to withdraw
  const [eligibleChallenges, setEligibleChallenges] = useState([]); // all eligible challenges for withdrawal
  const [challengesForWithdraw, setChallengesForWithdraw] = useState([]); // all challenges for withdrawal with challenge name

  const [selectedWithdrawChallenge, setSelectedWithdrawChallenge] = React.useState(""); //selected challenge for withdrawal

  const getWithdrawChallenges = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_REACT_APP_BACKEND_API_URL + "withdrawl/challenge/detail",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("accessToken") || "",
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        const response = await res.json();
        if (response.length > 0) {
          setEligibleChallenges(response);
        } else {
          setWithdrawSelect(0);
          setChallengesForWithdraw([]);
          setSelectedWithdrawChallenge("");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setActiveStep(0);
      toast.error("Something went wrong!!");
    }
  };
  const getWithdrawTaxAmount = async () => {
    if (sliderValue > 0) {
      try {
        const res = await fetch(
          import.meta.env.VITE_REACT_APP_BACKEND_API_URL + "withdrawl/challenge/detail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "token " + localStorage.getItem("accessToken") || "",
            },
            body: JSON.stringify({
              id: withdrawSelect,
              amount: Number(sliderValue),
            }),
          }
        );
        if (res.status === 200 || res.status === 201) {
          const response = await res.json();
          setPopupData(response); // set data for popup
          setPopup(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Something went wrong!!");
      }
    } else {
      toast.error("Please select amount to withdraw!!");
    }
  };

  useEffect(() => {
    dispatch(getChallangeStatus());
    getWithdrawChallenges();
  }, []);

  useEffect(() => {
    if (eligibleChallenges.length > 0 && challengesData && Object.keys(challengesData).length > 0) {
      const challenges = Object.entries(challengesData)
        .filter(([challenge, details]) => details.length > 2)
        .map(([challenge, details]) => {
          return {
            challengeName: challenge,
            subscription_id: details[withDrawPhase - 1].subscription_id,
            challenge_id: details[withDrawPhase - 1].challenge_id,
            total_equity: details[withDrawPhase - 1].equity,
          };
        });
      const updatedChallengesForWithdraw = eligibleChallenges.map((item, index) => {
        const matchingChallenge = challenges.find(
          (challenge) => challenge.challenge_id === item.id
        );
        if (matchingChallenge) {
          return {
            ...item,
            challenge_name: matchingChallenge.challengeName,
            subscription_id: matchingChallenge.subscription_id,
            total_equity: matchingChallenge.total_equity,
          };
        }
      });
      if (updatedChallengesForWithdraw.length > 0) {
        setChallengesForWithdraw(updatedChallengesForWithdraw);
        setSelectedWithdrawChallenge(updatedChallengesForWithdraw[0]);
        setWithdrawSelect(updatedChallengesForWithdraw[0].id);
        setIsLoading(false);
      }
    }
  }, [challengesData, eligibleChallenges]);

  const finalWithdraw = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_REACT_APP_BACKEND_API_URL + "withdrawl/challenge/withdraw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("accessToken") || "",
          },
          body: JSON.stringify({
            id: withdrawSelect,
            amount: Number(sliderValue),
          }),
        }
      );
      if (res.status === 200 || res.status === 201) {
        const response = await res.json();
        if (response.message === "success") {
          toast.success("Please visit the withdraw transaction tab to claim the Amount.");
          setPopup(false);
          setSliderValue(0);
          getWithdrawChallenges();
        } else {
          toast.error("Withdraw not successful!! Please try again later.");
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong!!");
    }
  };

  return (
    <div className="flex flex-col p-6 text-white w-full border-l-2 border-b-2 border-[#161616] min-h-[60vh]">
      {isLoading ? (
        <Loader height="3.5%" width="3.5%" />
      ) : challengesForWithdraw.length > 0 && selectedWithdrawChallenge ? (
        <>
          <div className="flex gap-4 align-center justify-between my-4">
            <h1 className="text-2xl xl:text-3xl my-4">Withdraw</h1>
            <select
              value={withdrawSelect}
              onChange={(e) => {
                setWithdrawSelect(Number(e.target.value));
                setSelectedWithdrawChallenge(
                  challengesForWithdraw.find((challenge) => challenge.id === Number(e.target.value))
                );
              }}
              className="bg-black border w-2/3 border-gray-500 text-white text-md rounded-md outline-none xl:w-1/3 p-4"
            >
              {challengesForWithdraw.map((challenge, index) => (
                <option key={index} value={challenge.id}>
                  {challenge.challenge_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-[#4D4D4D]">Available Balance</p>
              <h1 className="text-2xl xl:text-3xl">
                {currenyFormatter.format(selectedWithdrawChallenge.amount)}
              </h1>
              <p className="text-[#4D4D4D]">
                {currenyFormatter.format(selectedWithdrawChallenge.total_equity)} Total balance
              </p>
            </div>
            <RangeSlider
              maxAmount={selectedWithdrawChallenge.amount}
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
            />
            <div className="w-full xl:w-1/2 flex gap-6 items-center justify-between">
              <button className="rounded-lg border border-[#808080] bg-transparent w-1/3 text-white text-center py-2 font-bold">
                Cancel
              </button>
              <button
                onClick={getWithdrawTaxAmount}
                className="rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] w-1/2  xl:w-1/3 text-black text-center py-2 font-bold"
              >
                Confirm Withdraw
              </button>
            </div>
          </div>
          {popup && popupData && (
            <>
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div
                className="bg-[#0D0D0D] border-2 border-[#252525] rounded-xl
              fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              w-[85%] pb-4
              xl:w-[36%]
              animate-scale-up-center"
              >
                <div className="p-4">
                  <div className="flex justify-between p-4">
                    <div className="text-xl font-bold">Withdraw summary</div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setPopup(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 space-y-6">
                    <div className="space-4 p-4">
                      <div className="space-y-2 mb-2">
                        <dl className="flex items-center justify-between gap-4">
                          <dt className=" dark:text-gray-400">Withdraw Amount</dt>
                          <dd className="text-base font-medium  dark:text-white">
                            {currenyFormatter.format(popupData?.asked_amount)}
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className=" dark:text-gray-400">30% profit split</dt>
                          <dd className="text-base font-medium text-green-500">
                            -{currenyFormatter.format(popupData?.convenience_charges)}
                          </dd>
                        </dl>
                      </div>

                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-lg font-bold  dark:text-white">Total</dt>
                        <dd className="text-lg font-bold  dark:text-white">
                          {currenyFormatter.format(popupData?.withrawl_amount)}
                        </dd>
                      </dl>
                    </div>
                    <button
                      onClick={finalWithdraw}
                      className="rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] w-full text-black text-center py-2 font-bold"
                    >
                      Confirm Withdraw
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex align-center justify-center">
          <h2 className="text-2xl my-4">No Withdraw Available</h2>
        </div>
      )}
    </div>
  );
}

export default Withdrawal;
