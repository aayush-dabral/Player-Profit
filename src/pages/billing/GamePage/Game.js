import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSportsGame } from "../../../redux/action/sportsGame";
import { placeBet, resetplaceBet } from "../../../redux/action/placeBet";
import { userProfile as userProfileAPI } from "../../../redux/action/userProfile";
import { getChallangeStatus } from "../../../redux/action/challangeStatus";
import { GAMES } from "../../../utils/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mixpanel from "mixpanel-browser";
import moment from "moment";
import tennis from "../../../assets/tennis-ball.png";
import baseball from "../../../assets/baseball-white.svg";
import hockey from "../../../assets/field-hockey.png";
import basketball from "../../../assets/basketball-ball-variant.png";
import mma from "../../../assets/mma.png";
import soccer from "../../../assets/soccer-ball-variant.png";
import americanFootball from "../../../assets/american-football.png";
import BalancePopup from "../BalancePopup";
import { getTeamImage } from "../../../utils/helper-functions";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import whiteFrame from "../../../assets/white_frame.png";
const Game = (gameDetails) => {
  const [groupedOdds, setGroupedOdds] = useState();

  useEffect(() => {
    const grouped = gameDetails.odds.reduce((grouped, odd) => {
      const { market_name } = odd;
      if (!grouped[market_name]) {
        grouped[market_name] = [];
      }
      grouped[market_name].push(odd);
      return grouped;
    }, {});
    const sortedObject = Object.fromEntries(Object.entries(grouped).sort());
    setGroupedOdds(sortedObject);
  }, []);

  const groupedOdd = gameDetails.odds.reduce((grouped, odd) => {
    const { market_name } = odd;
    if (!grouped[market_name]) {
      grouped[market_name] = [];
    }
    grouped[market_name].push(odd);
    return grouped;
  }, {});

  // let homeTeam = getTeamImage(gameDetails.home_team, gameDetails.league);
  // let awayTeam = getTeamImage(gameDetails.away_team, gameDetails.league);

  let homeTeam = getTeamImage(gameDetails?.home_team, gameDetails?.league, gameDetails?.sport);
  if (homeTeam === "No Image") {
    if (gameDetails?.sport === "tennis") {
      homeTeam = {
        id: 1,
        logo: tennis,
      };
    } else if (gameDetails?.sport === "baseball") {
      homeTeam = {
        id: 1,
        logo: baseball,
      };
    } else if (gameDetails?.sport === "basketball") {
      homeTeam = {
        id: 1,
        logo: basketball,
      };
    } else if (gameDetails?.sport === "hockey") {
      homeTeam = {
        id: 1,
        logo: hockey,
      };
    } else if (gameDetails?.sport === "ice hockey") {
      homeTeam = {
        id: 1,
        logo: hockey,
      };
    } else if (gameDetails?.sport === "mma") {
      homeTeam = {
        id: 1,
        logo: mma,
      };
    } else if (gameDetails?.sport === "soccer") {
      homeTeam = {
        id: 1,
        logo: soccer,
      };
    } else if (gameDetails?.sport === "football") {
      homeTeam = {
        id: 1,
        logo: americanFootball,
      };
    } else if (gameDetails?.sport === "american football") {
      homeTeam = {
        id: 1,
        logo: americanFootball,
      };
    }
  }

  let awayTeam = getTeamImage(gameDetails?.away_team, gameDetails?.league, gameDetails?.sport);
  if (awayTeam === "No Image") {
    if (gameDetails?.sport === "tennis") {
      awayTeam = {
        id: 1,
        logo: tennis,
      };
    } else if (gameDetails?.sport === "baseball") {
      awayTeam = {
        id: 1,
        logo: baseball,
      };
    } else if (gameDetails?.sport === "basketball") {
      awayTeam = {
        id: 1,
        logo: basketball,
      };
    } else if (gameDetails?.sport === "hockey") {
      awayTeam = {
        id: 1,
        logo: hockey,
      };
    } else if (gameDetails?.sport === "ice hockey") {
      awayTeam = {
        id: 1,
        logo: hockey,
      };
    } else if (gameDetails?.sport === "mma") {
      awayTeam = {
        id: 1,
        logo: mma,
      };
    } else if (gameDetails?.sport === "soccer") {
      awayTeam = {
        id: 1,
        logo: soccer,
      };
    } else if (gameDetails?.sport === "football") {
      awayTeam = {
        id: 1,
        logo: americanFootball,
      };
    } else if (gameDetails?.sport === "american football") {
      awayTeam = {
        id: 1,
        logo: americanFootball,
      };
    }
  }

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("");
  const [gameList, setGameList] = useState(GAMES);
  const [gameSelect, setGameSelect] = useState(GAMES[0]);
  const [matchList, setMatchList] = useState([]);
  const [league, setLeague] = useState(GAMES[0].league[0]);
  const [matchListLoader, setMatchListLoader] = useState(false);
  const [openPopupIndex, setOpenPopupIndex] = useState(false);
  const [selectMoney, setSelectMoney] = useState({});
  const [oddsData, setOddsData] = useState({});
  const [matchDetails, setMatchDetails] = useState({});
  const [marketName, setMarketName] = useState("");
  const [betDetails, setBetDetails] = useState({});
  const [betValue, setBetValue] = React.useState("");
  const [winningProfit, setWinningProfit] = React.useState("");
  const [selectedPackage, setSelectedPackage] = React.useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));

  const sportsGame = useSelector((state) => state?.sportsGameReducer?.sportsName);
  const placeBetAPIData = useSelector((state) => state?.placeBetReducer?.placeBet);
  const packageList = useSelector((state) => state?.packagesListReducer?.packagesList?.data);
  const [packageListObject, setPackageListObject] = useState({});
  const userProfile = useSelector((state) => state?.userProfile?.userProfile);
  const token = useSelector((state) => state?.userToken?.userToken?.data?.key);
  const [isLoading, setIsLoading] = useState(false);
  const channelId = useSelector((state) => state?.fcmTokenReducer?.fcmData);
  const [isKycDoneForSelectedPackage, setIsKycDoneForSelectedPackage] = useState(false);
  const [isKycRequiredForSelectedPackage, setIsKycRequiredForSelectedPackage] = useState(false);
  const [challengesDetails, setChallengesDetails] = useState();
  const challengesData = useSelector(
    (state) => state?.challangeStatusReducer?.challangeStatusDetails?.data
  );

  useEffect(() => {
    if (challengesData) {
      setIsLoading(true);
      setIsKycDoneForSelectedPackage(false);
      const challengeDetailsArray = Object.entries(challengesData);
      setChallengesDetails(challengeDetailsArray);

      let isKycRequired = false;
      let isKycDone = false;

      for (const [, details] of challengeDetailsArray) {
        if (details[2] && details[2].subscription_id === Number(selectedPackage)) {
          isKycRequired = true;
          if (details[2].is_kyc_done === true) {
            isKycDone = true;
            break;
          }
        }
      }
      setIsKycRequiredForSelectedPackage(isKycRequired);
      setIsKycDoneForSelectedPackage(isKycDone);

      if (challengeDetailsArray.length > 0) {
        setMatchListLoader(false);
      }
    }
  }, [challengesData, selectedPackage]);

  useEffect(() => {
    if (packageList && packageList?.length >= 1) {
      dispatch(getChallangeStatus());
    }
    if (Array.isArray(packageList)) {
      let tempList = {};
      packageList.forEach((item, index) => {
        tempList[item.id] = item;
      });
      setPackageListObject(tempList);
    }
  }, [packageList]);

  useEffect(() => {
    //calling to get the latest status of challenges
    dispatch(getChallangeStatus());
  }, [selectedPackage]);

  useEffect(() => {
    if (placeBetAPIData?.status) {
      dispatch(resetplaceBet());
      setOpenPopupIndex(false);
      setWinningProfit("");
      setBetValue("");
      dispatch(userProfileAPI());
    }
  }, [placeBetAPIData]);

  const handleMatchListAPI = (params) => {
    setMatchListLoader(true);
    dispatch(getSportsGame(params));
  };

  const handlePlaceBetAPI = () => {
    if (selectedPackage === "") {
      window.scrollTo(0, 0);
      toast.error("Please select Package");
    } else if (betValue) {
      if (betValue == 0 || betValue === "") {
        window.scrollTo(0, 0);
        toast.error("Bet amount can't be zero");
        setBetValue("");
      } else if (
        isKycRequiredForSelectedPackage === true &&
        isKycDoneForSelectedPackage === false
      ) {
        window.scrollTo(0, 0);
        toast.error("Please fill the KYC form to bet in this Challenge.\n My Account —> KYC");
        setBetValue("");
      } else {
        let body = {
          game_id: matchDetails?.game_id,
          sport: matchDetails?.sport,
          subscription: selectedPackage,
          league: matchDetails?.league,
          game_start_date: matchDetails?.start_date,
          home_team: matchDetails?.home_team,
          away_team: matchDetails?.away_team,
          sportsbook: betDetails?.sports_book_name,
          win_amount: winningProfit,
          market_name: betDetails?.market_name,
          bet_team: betDetails?.normalized_selection || betDetails?.selection,
          bet_amount: betValue,
          odds_price: betDetails?.price,
          status: "Active",
          bet_name: betDetails?.name,
        };
        mixpanel.init("cc3cafa268ef11604a52b34edf3443d7");
        mixpanel.track("Trading Screen", {
          event: "Place Bet",
          userName: userProfile?.data?.username,
          userEmail: userProfile?.data?.email,
          details: body,
        });

        dispatch(placeBet(body));
      }
    } else {
      window.scrollTo(0, 0);
      toast.error("Please enter bet amount");
    }
  };

  const scrollLeagueRef = useRef(null);

  const [openBalance, setOpenBalance] = useState(false);

  useEffect(() => {
    // Add or remove 'overflow-hidden' className to the body based on the state of openBalance
    if (openBalance && !isLoading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to remove the className when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openBalance, isLoading]);

  const setPopUpValue = (
    // item,
    marketLineName,
    betValue
  ) => {
    if (betValue?.price) {
      setMatchDetails(gameDetails);
      setMarketName(marketLineName);
      setBetDetails(betValue);
      setSelectedPackage("");
      setBetValue("");
      setWinningProfit("");
      setOpenPopupIndex(true);
    }
  };

  const handleWinningLogic = (amount) => {
    let winning = 0;
    if (parseInt(amount) >= 1) {
      if (betDetails?.price < 0) {
        winning = Math.round((100 / Math.abs(betDetails?.price) + 1) * amount - amount, 2);
      } else {
        winning = Math.round((betDetails?.price / 100 + 1) * amount, 2) - amount;
      }
      setWinningProfit(winning);
    } else {
      setWinningProfit(0);
    }
  };

  //Game Details section
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (marketName) => {
    setOpenAccordion(openAccordion === marketName ? null : marketName);
  };

  return (
    <>
      <div
        className="
        hidden 
        xl:flex text-white 
        "
      >
        {/* <ToastContainer /> */}

        <div className="xl:block w-[100%] pb-16">
          <div className="flex mt-6 gap-8 justify-center font-medium bg-[#0d0d0d] rounded-lg py-6">
            <div className="flex flex-row-reverse items-center text-xl gap-2">
              <div>{gameDetails?.home_team}</div>
              <img src={homeTeam?.logo || whiteFrame} alt="Team Logo" className="size-16" />
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="text-[#565656] ">AT</div>
              <div>{moment(gameDetails?.start_date).format("MMM DD | h:mm A")}</div>
            </div>
            <div className="flex items-center text-xl gap-2">
              <img src={awayTeam?.logo || whiteFrame} alt="Team Logo" className="size-14" />
              <div>{gameDetails?.away_team}</div>
            </div>
          </div>

          <div className="flex justify-between min-h-screen">

            <div className={`${openPopupIndex ? "w-[65%]" : "w-[100%]"}`}>
              {/* <TempBetTable /> */}

              {/* <GameDetails groupedOdds={groupedOdds}/> */}
              <div className="mt-8">
                {groupedOdds &&
                  Object.entries(groupedOdds).map(([marketName, oddsArray]) => (
                    <div
                      key={marketName}
                      className="w-[98%] p-[2px] hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] rounded-lg my-2"
                    >
                      <div
                        className={` mx-auto bg-[#0D0D0D] border-[3px border-[#1F1F1F hover:border-[#F11941] rounded-lg py-1 px-4 cursor-pointer`}
                      >
                        <div
                          onClick={() => handleAccordionToggle(marketName)}
                          className={`flex justify-between py-2 px-2 rounded-lg ${
                            openAccordion === marketName
                              ? "border-b-[3px] border-b-[#1F1F1F] pb-4"
                              : ""
                          }`}
                        >
                          <div className="flex">{marketName}</div>
                          <div className="my-auto">
                            {openAccordion === marketName ? (
                              <FaChevronUp size={15} />
                            ) : (
                              <FaChevronDown size={15} />
                            )}
                          </div>
                        </div>
                        {openAccordion === marketName && (
                          <div className="mt-2">
                            <div className="grid grid-cols-2 py-4 gap-4 justify-between bg-[#0d0d0d]  rounded-lg text-sm lg:text-base">
                              {oddsArray.length > 2
                                ? oddsArray.map((item, index) => (
                                    <div
                                      key={index}
                                      onClick={() => setPopUpValue(marketName, item)}
                                      className="flex justify-between items-center py-1 rounded-md group bg-[#1F1F1F] text-[#F11941] hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] w-[32% px-3"
                                    >
                                      <div className="text-white group-hover:text-black w-[75% overflow-hidden whitespace-nowrap overflow-ellipsis">
                                        {item.name}
                                      </div>
                                      <div className="">
                                        {item.price > 0 ? "+" + item.price : item.price}
                                      </div>
                                    </div>
                                  ))
                                : oddsArray.map((item, index) => (
                                    <div
                                      key={index}
                                      onClick={() => setPopUpValue(marketName, item)}
                                      className="flex justify-between items-center py-1 rounded-md group bg-[#1F1F1F] text-[#F11941] hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] w-[48% px-3"
                                    >
                                      <div className="text-white group-hover:text-black overflow-hidden whitespace-nowrap overflow-ellipsis">
                                        {item.name}
                                      </div>
                                      <div className="]">
                                        {item.price > 0 ? "+" + item.price : item.price}
                                      </div>
                                    </div>
                                  ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {openPopupIndex && (
              <div
                className={`bg-[#0D0D0D] w-[30%] border-2 border-[#252525] rounded-xl sticky top-24 right-0 mt-12 h-[660px]`}
              >
                <div className=" mt-4 pl-4 w-[95%] mx-auto text-[1.15rem]">Bet Slip</div>
                <select
                  name="package"
                  className="rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] 
                  mt-4 ml-2 pl-4 w-[95%] py-1 h-10 max-w-full"
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  value={selectedPackage}
                >
                  {" "}
                  <option value="">Select Package</option>
                  {challengesDetails?.length >= 0 &&
                    packageList &&
                    challengesDetails.map((item, index) => {
                      const challengeDetails = item[1];
                      const challengeArrayLength = challengeDetails.length - 1;
                      const subscriptionId =
                        challengeDetails[challengeArrayLength]?.subscription_id;
                      const pkg = packageListObject?.[subscriptionId];

                      if (pkg?.is_active && pkg?.payment_status) {
                        const balanceAmount =
                          challengeDetails[challengeArrayLength]?.balance_amount;
                        if (balanceAmount !== null) {
                          return (
                            <option
                              value={`${subscriptionId}`}
                              key={subscriptionId}
                              className="text-wrap  bg-black text-white"
                            >
                              {`${subscriptionId}, $${pkg?.plan_name}, $${balanceAmount}`}
                            </option>
                          );
                        }
                      }
                    })}
                </select>
                <div
                  className="bg-[#141414] border-2 border-[#202020] rounded-xl
                  w-[95%] mx-auto mt-4 pt-3 px-4"
                >
                  <div className="relative">
                    <div>{gameDetails.home_team}</div>
                    <div className="text-[#5A5A5A] font-bold">vs</div>
                    <div>{gameDetails.away_team}</div>
                    <div
                      onClick={() => {
                        setSelectedPackage("");
                        setBetValue("");
                        setWinningProfit(0);
                        setOpenPopupIndex(false);
                      }}
                      className="absolute right-0 top-0 cursor-pointer"
                    >
                      X
                    </div>
                  </div>
                  <div className="rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] p-[1px] mt-4">
                    <div className="flex rounded-lg bg-[#141414] text-[#F11941] px-2 py-1">
                      {betDetails.name}
                    </div>
                  </div>
                  <div className="flex justify-between my-4 border-y-[2.5px] py-2 border-y-[#202020]">
                    <div className="text-[#898989] font-semibold">{marketName}</div>
                    {/* <div className="text-[#B8E834]">{betDetails.price}</div> */}

                    {marketName != "Moneyline" ? (
                      <div className="">{betDetails.bet_points}</div>
                    ) : (
                      <div className="text-[#F11941]">{betDetails.price}</div>
                    )}
                  </div>
                  {betDetails?.price && (
                    <div className="flex justify-between my-4 border-y-[2.5px] py-2 border-y-[#202020]">
                      <div className="text-[#898989] font-semibold">Odds</div>
                      {/* <div className="white">{betDetails.bet_points}</div> */}
                      <div className="text-[#F11941]">{betDetails.price}</div>
                    </div>
                  )}

                  <div className="mt-2 text-lg font-semibold">Stake</div>

                  <div
                    className="flex border-[2.5px] border-[#202020] w-full rounded-md 
                    mt-2 py-2 "
                  >
                    <input
                      className="my-auto w-[80%] text-[#676767] placeholder:text-[#676767] font-bold bg-transparent px-2 ml-2 outline-none focus:border-transparent"
                      placeholder="Enter Stake"
                      onChange={(e) => {
                        if (!isNaN(e.target.value) && e.target.value !== " ") {
                          setBetValue(e.target.value);
                          handleWinningLogic(e.target.value);
                        }
                      }}
                      value={betValue}
                    />
                    <div className="text-[#202020] text-xl font-semibold mx-3 my-auto">|</div>
                    <div className="text-[#898989] font-semibold my-auto pr-1">USD</div>
                  </div>

                  <div className="flex justify-center my-5">
                    <div className="mr-2">Proj. Return:</div>
                    <div>
                      <span className="text-[#F11941] ml-2 mr-1">
                        {winningProfit ? winningProfit : 0}
                      </span>
                      <span className="text-[#898989]">USD</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center my-4 px-1">
                  <div className="flex flex-col mr-6">
                    <div className="border-b-2 border-b-[#252525] pb-1 text-center">
                      Total Stake
                    </div>
                    <div className="text-center mt-3">
                      <span className="mr-1 text-[#F11941]">{betValue ? betValue : 0}</span>
                      <span className="text-[#868686] ">USD</span>
                    </div>
                  </div>
                  <div className="flex flex-col ml-6">
                    <div className="border-b-2 border-b-[#252525] pb-1 text-center">
                      Project Return
                    </div>
                    <div className="text-center mt-3">
                      <span className="mr-1 text-[#F11941]">
                        {winningProfit ? winningProfit : 0}
                      </span>
                      <span className="text-[#868686] ">USD</span>
                    </div>
                  </div>
                </div>

                <div
                  onClick={handlePlaceBetAPI}
                  className="flex cursor-pointer justify-center w-[95%] mx-auto mt-2 mb-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-center py-3 text-black"
                >
                  <div className="font-extrabold my-auto mr-2">Place Bet</div>
                  <FaArrowRight className="my-auto" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* For small devices  */}

      <div
        className="text-white mt-6 border-b-2 border-b-[#161616]
      xl:hidden "
      >
        {openBalance && !isLoading && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 "
            onClick={() => setOpenBalance(false)}
          ></div>
        )}{" "}
        <div
          className="pb-16 text-sm
        
        sm:w-[96%] sm:mx-auto sm:text-base
        xl:hidden xl:border-l-2 xl:border-l-[#191919] xl:pl-16"
        >

          {openBalance && !isLoading && <BalancePopup challenges={challengesDetails} />}

          <div className="flex ">

            {openPopupIndex && (
              <div
                className={`bg-[#0D0D0D] w-[83%] border-2 border-[#252525] rounded-xl mt-4
              fixed bottom-2 left-1/2 transform -translate-x-1/2`}
              >
                <div className=" flex flex-col overflow-y-auto h-[75vh]">
                  <div className="mt-4 pt-3 px-6 font-extrabold pb-1 text-[1.5rem]">Bet Slip</div>
                  <div
                    className="bg-[#141414] border-2 border-[#202020] rounded-xl
                  w-[95%] mx-auto mt-4 pt-3 px-4"
                  >
                    <div className="relative">
                      <div>{matchDetails.home_team}</div>
                      <div className="text-[#5A5A5A] font-bold">vs</div>
                      <div>{matchDetails.away_team}</div>
                      <div
                        onClick={() => {
                          setBetValue("");
                          setWinningProfit(0);
                          setOpenPopupIndex(false);
                        }}
                        className="absolute right-0 top-0 cursor-pointer"
                      >
                        X
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <select
                        name="package"
                        className="rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] 
                  mt-4 px-4 w-[95%] py-1 h-10 mx-auto"
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        value={selectedPackage}
                      >
                        <option value="">Select Package</option>
                        {packageList &&
                          packageList?.length >= 0 &&
                          packageList?.map((item, index) => {
                            if (item?.is_active === true && item?.payment_status === "True") {
                              return (
                                challengesDetails &&
                                challengesDetails?.length > 0 &&
                                challengesDetails[index][1][challengesDetails[index][1].length - 1]
                                  .balance_amount !== null && (
                                  <option
                                    value={`${item?.plan},${item?.id}`}
                                    key={item?.id}
                                    className="text-wrap"
                                  >
                                    {item?.id +
                                      ", $" +
                                      item?.plan_name +
                                      ", $" +
                                      challengesDetails[index][1][
                                        challengesDetails[index][1].length - 1
                                      ].balance_amount}
                                  </option>
                                )
                              );
                            }
                          })}
                      </select>
                    </div>
                    <div className="rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] p-[1px] mt-4">
                      <div className="flex rounded-lg bg-[#141414] text-[#F11941] px-2 py-1">
                        {betDetails.name}
                      </div>
                    </div>
                    <div className="flex justify-between my-4 border-y-[2.5px] py-2 border-y-[#202020]">
                      <div className="text-[#898989] font-semibold">{marketName}</div>
                      {/* <div className="text-[#B8E834]">{betDetails.price}</div> */}
                      {marketName != "Moneyline" ? (
                        <div className="">{betDetails.bet_points}</div>
                      ) : (
                        <div className="text-[#F11941]">{betDetails.price}</div>
                      )}
                    </div>
                    {betDetails?.price && (
                      <div className="flex justify-between my-4 border-y-[2.5px] py-2 border-y-[#202020]">
                        <div className="text-[#898989] font-semibold">Odds</div>
                        {/* <div className="white">{betDetails.bet_points}</div> */}
                        <div className="text-[#F11941]">{betDetails.price}</div>
                      </div>
                    )}

                    <div className="mt-2 text-lg font-semibold">Stake</div>

                    <div
                      className="flex border-[2.5px] border-[#202020] w-full rounded-md 
                    mt-2 py-2 "
                    >
                      <input
                        className="my-auto w-[80%] text-[#676767] placeholder:text-[#676767] font-bold bg-transparent px-2 ml-2 outline-none focus:border-transparent"
                        placeholder="Enter Stake"
                        onChange={(e) => {
                          if (!isNaN(e.target.value) && e.target.value !== " ") {
                            setBetValue(e.target.value);
                            handleWinningLogic(e.target.value);
                          }
                        }}
                        value={betValue}
                      />
                      <div className="text-[#202020] text-xl font-semibold mx-3 my-auto">|</div>
                      <div className="text-[#898989] font-semibold my-auto pr-1">USD</div>
                    </div>

                    <div className="flex justify-center my-5">
                      <div className="mr-2">Proj. Return:</div>
                      <div>
                        <span className="text-[#F11941] ml-2 mr-1">
                          {winningProfit ? winningProfit : 0}
                        </span>
                        <span className="text-[#898989]">USD</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center my-4 px-1">
                    <div className="flex flex-col mr-6">
                      <div className="border-b-2 border-b-[#252525] pb-1 text-center">
                        Total Stake
                      </div>
                      <div className="text-center mt-3">
                        <span className="mr-1 text-[#F11941]">{betValue ? betValue : 0}</span>
                        <span className="text-[#868686] ">USD</span>
                      </div>
                    </div>
                    <div className="flex flex-col ml-6">
                      <div className="border-b-2 border-b-[#252525] pb-1 text-center">
                        Project Return
                      </div>
                      <div className="text-center mt-3">
                        <span className="mr-1 text-[#F11941]">
                          {winningProfit ? winningProfit : 0}
                        </span>
                        <span className="text-[#868686] ">USD</span>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={handlePlaceBetAPI}
                    className="flex cursor-pointer justify-center w-[95%] mx-auto mt-2 mb-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-center py-3 text-black"
                  >
                    <div className="font-extrabold my-auto mr-2">Place Bet</div>
                    <FaArrowRight className="my-auto" />
                  </div>
                </div>

                {/* <div className="flex justify-between py-4 pr-4">
                <div className=" my-auto pl-4 w-[95%] mx-auto text-[1.15rem]">
                  Bet Slip
                </div>
                {betSlip ? (
                  <FaChevronDown size={15} onClick={() => setBetSlip(false)} className="my-auto" />
                ) : (
                  <FaChevronUp size={15} onClick={() => setBetSlip(true)} className="my-auto" />
                )}
              </div> */}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-col gap-4 justify-between px-6 font-medium bg-[#0d0d0d] rounded-lg pt-5 pb-5">
              <div className="flex gap-12 justify-center">
                <div className="flex flex-row-reverse w-1/2 items-center text-[18px] gap-2">
                  <div className="w-[110px overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {gameDetails?.home_team}
                  </div>
                  <img
                    src={homeTeam?.logo || whiteFrame}
                    alt="Team Logo"
                    className="size-12 sm:size-16"
                  />
                </div>
                <div className="flex w-1/2 items-center text-[18px] gap-2">
                  <img
                    src={awayTeam?.logo || whiteFrame}
                    alt="Team Logo"
                    className="size-10 sm:size-14"
                  />
                  <div className="w-[110px overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {gameDetails?.away_team}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="text-[#565656] ">AT</div>
                <div>{moment(gameDetails?.start_date).format("MMM DD | h:mm A")}</div>
              </div>
            </div>

            <div className="flex justify-between min-h-screen">
              {/* {openBalance && !isLoading && (
              <BalancePopup challenges={challengesDetails} />
            )} */}

              <div className="w-[100%]">
                {/* <TempBetTable /> */}

                {/* <GameDetails groupedOdds={groupedOdds} /> */}
                <div className="mt-8">
                  {groupedOdds &&
                    Object.entries(groupedOdds).map(([marketName, oddsArray]) => (
                      <div
                        key={marketName}
                        className={`w-[98%] mx-auto bg-[#0D0D0D] border-[3px] border-[#1F1F1F] rounded-lg py-1 mb-2 mt-2 px-4 cursor-pointer`}
                      >
                        <div
                          onClick={() => handleAccordionToggle(marketName)}
                          className={`flex justify-between py-2 px-2 rounded-lg ${
                            openAccordion === marketName
                              ? "border-b-[3px] border-b-[#1F1F1F] pb-4"
                              : ""
                          }`}
                        >
                          <div className="flex">{marketName}</div>
                          <div className="my-auto">
                            {openAccordion === marketName ? (
                              <FaChevronUp size={15} />
                            ) : (
                              <FaChevronDown size={15} />
                            )}
                          </div>
                        </div>
                        {openAccordion === marketName && (
                          <div className="mt-2">
                            <div className="grid grid-cols-1 py-4 gap-4 justify-between bg-[#0d0d0d] rounded-lg text-sm lg:text-base">
                              {oddsArray.length > 2
                                ? oddsArray.map((item, index) => (
                                    <div
                                      key={index}
                                      onClick={() => setPopUpValue(marketName, item)}
                                      className="flex justify-between items-center py-1 rounded-md bg-[#1F1F1F] w-[32% px-3"
                                    >
                                      <div className="text-white w-[75% overflow-hidden whitespace-nowrap overflow-ellipsis">
                                        {item.name}
                                      </div>
                                      <div className="text-[#F11941]">
                                        {item.price > 0 ? "+" + item.price : item.price}
                                      </div>
                                    </div>
                                  ))
                                : oddsArray.map((item, index) => (
                                    <div
                                      key={index}
                                      onClick={() => setPopUpValue(marketName, item)}
                                      className="flex justify-between items-center py-1 rounded-md bg-[#1F1F1F] w-[48% px-3"
                                    >
                                      <div className="text-white w-[75% overflow-hidden whitespace-nowrap overflow-ellipsis">
                                        {item.name}
                                      </div>
                                      <div className="text-[#F11941]">
                                        {item.price > 0 ? "+" + item.price : item.price}
                                      </div>
                                    </div>
                                  ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {openPopupIndex && (
                <div
                  className={`hidden bg-[#0D0D0D] w-[30%] border-2 border-[#252525] rounded-xl sticky top-24 right-0 mt-12 h-[660px]`}
                >
                  <div className=" mt-4 pl-4 w-[95%] mx-auto text-[1.15rem]">Bet Slip</div>
                  <select
                    name="package"
                    className="rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] 
                  mt-4 ml-2 pl-4 w-[95%] py-1 h-10 max-w-full"
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    value={selectedPackage}
                  >
                    {" "}
                    <option value="">Select Package</option>
                    {challengesDetails?.length >= 0 &&
                      packageList &&
                      challengesDetails.map((item, index) => {
                        const challengeDetails = item[1];
                        const challengeArrayLength = challengeDetails.length - 1;
                        const subscriptionId =
                          challengeDetails[challengeArrayLength]?.subscription_id;
                        const pkg = packageListObject?.[subscriptionId];

                        if (pkg?.is_active && pkg?.payment_status) {
                          const balanceAmount =
                            challengeDetails[challengeArrayLength]?.balance_amount;
                          if (balanceAmount !== null) {
                            return (
                              <option
                                value={`${subscriptionId}`}
                                key={subscriptionId}
                                className="text-wrap  bg-black text-white"
                              >
                                {`${subscriptionId}, $${pkg?.plan_name}, $${balanceAmount}`}
                              </option>
                            );
                          }
                        }
                      })}
                  </select>
                  <div
                    className="bg-[#141414] border-2 border-[#202020] rounded-xl
                  w-[95%] mx-auto mt-4 pt-3 px-4"
                  >
                    <div className="relative">
                      <div>{matchDetails.home_team}</div>
                      <div className="text-[#5A5A5A] font-bold">vs</div>
                      <div>{matchDetails.away_team}</div>
                      <div
                        onClick={() => {
                          setBetValue("");
                          setWinningProfit(0);
                          setOpenPopupIndex(false);
                        }}
                        className="absolute right-0 top-0 cursor-pointer"
                      >
                        X
                      </div>
                    </div>
                    <div className="flex justify-between my-4 border-y-[2.5px] py-2 border-y-[#202020]">
                      <div className="text-[#898989] font-semibold">{marketName}</div>
                      {/* <div className="text-[#B8E834]">{betDetails.price}</div> */}
                      {(betDetails?.name + "").includes("Over") ||
                      (betDetails?.name + "").includes("Under") ? (
                        <div className="">{betDetails?.bet_points}</div>
                      ) : (
                        <div className="text-[#B8E834]">{betDetails?.price}</div>
                      )}
                    </div>
                    {betDetails?.price && (
                      <div className="flex justify-between my-4 border-y-[2.5px] py-2 border-y-[#202020]">
                        <div className="text-[#898989] font-semibold">Odds</div>
                        {/* <div className="white">{betDetails.bet_points}</div> */}
                        <div className="text-[#B8E834]">{betDetails.price}</div>
                      </div>
                    )}

                    <div className="mt-2 text-lg font-semibold">Stake</div>

                    <div
                      className="flex border-[2.5px] border-[#202020] w-full rounded-md 
                    mt-2 py-2 "
                    >
                      <input
                        className="my-auto w-[80%] text-[#676767] placeholder:text-[#676767] font-bold bg-transparent px-2 ml-2 outline-none focus:border-transparent"
                        placeholder="Enter Stake"
                        onChange={(e) => {
                          if (!isNaN(e.target.value) && e.target.value !== " ") {
                            setBetValue(e.target.value);
                            handleWinningLogic(e.target.value);
                          }
                        }}
                        value={betValue}
                      />
                      <div className="text-[#202020] text-xl font-semibold mx-3 my-auto">|</div>
                      <div className="text-[#898989] font-semibold my-auto pr-1">USD</div>
                    </div>

                    <div className="flex justify-center my-5">
                      <div className="mr-2">Proj. Return:</div>
                      <div>
                        <span className="text-[#B8E834] ml-2 mr-1">
                          {winningProfit ? winningProfit : 0}
                        </span>
                        <span className="text-[#898989]">USD</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center my-4 px-1">
                    <div className="flex flex-col mr-6">
                      <div className="border-b-2 border-b-[#252525] pb-1 text-center">
                        Total Stake
                      </div>
                      <div className="text-center mt-3">
                        <span className="mr-1 text-[#B8E834]">{betValue ? betValue : 0}</span>
                        <span className="text-[#868686] ">USD</span>
                      </div>
                    </div>
                    <div className="flex flex-col ml-6">
                      <div className="border-b-2 border-b-[#252525] pb-1 text-center">
                        Project Return
                      </div>
                      <div className="text-center mt-3">
                        <span className="mr-1 text-[#B8E834]">
                          {winningProfit ? winningProfit : 0}
                        </span>
                        <span className="text-[#868686] ">USD</span>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={handlePlaceBetAPI}
                    className="flex cursor-pointer justify-center w-[95%] mx-auto mt-2 mb-4 rounded-lg bg-[#B8E834] text-center py-3 text-black"
                  >
                    <div className="font-extrabold my-auto mr-2">Place Bet</div>
                    <FaArrowRight className="my-auto" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
