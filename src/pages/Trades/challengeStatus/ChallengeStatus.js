import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPackagesList } from "../../../redux/action/packagesList";
import Accordion from "../../../components/challengeAccordion/Accordion";
import { Loader } from "../../../components";
import { getBettingHistory } from "../../../redux/action/bettingHistory";
import { getChallangeStatus } from "../../../redux/action/challangeStatus";

const ChallengeStatus = () => {
  const dispatch = useDispatch();
  const [challengesDetails, setChallengesDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const challengesData = useSelector(
    (state) => state?.challangeStatusReducer?.challangeStatusDetails?.data
  );
  const bettingHistoryAPIState = useSelector(
    (state) => state?.getBettingHistoryReducer?.bettingHistoryDetails
  );
  const [bettingData, setBettingData] = useState([]);

  useEffect(() => {
    dispatch(getChallangeStatus());
    dispatch(getPackagesList());
    dispatch(getBettingHistory(""));
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (bettingHistoryAPIState?.status) {
      setBettingData(bettingHistoryAPIState?.data);
    }
  }, [bettingHistoryAPIState]);

  useEffect(() => {
    if (challengesData) {
      const challengeDetailsArray = Object.entries(challengesData).map(([challenge, details]) => [
        challenge,
        details,
      ]);
      if(challengeDetailsArray.length > 0) {
      setChallengesDetails(challengeDetailsArray);
      setIsLoading(false);
    }
    }
  }, [challengesData]);

  return (
    <div className="flex flex-col text-white border-b-2 border-b-[#161616] min-h-screen xl:flex-row">
      <div className="text-base pb-16 w-[90%] mx-auto border-0 xl:w-[80% xl:w-[100%]">
        <div className="text-2xl pt-8 xl:w-[90%] mx-auto">Challenge Status</div>
        <div className="mt-4 xl:w-[90%] mx-auto">
          {isLoading ? (
            <Loader height="3.5%" width="3.5%" />
          ) : challengesDetails && challengesDetails.length === 0 ? (
            <div>No challenges found</div>
          ) : (
            challengesDetails.map((item, index) => (
              <Accordion
                key={index}
                keyIndex={index}
                bettingData={bettingData}
                heading={item[0]}
                challengeData={item[1]}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeStatus;
