import React, { useRef, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSportsGame } from "../../redux/action/sportsGame";
import { getSports } from "../../redux/action/sports";
import { placeBet, resetplaceBet } from "../../redux/action/placeBet";
import { getPackagesList } from "../../redux/action/packagesList";
import { getChallangeStatus } from "../../redux/action/challangeStatus";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mixpanel from "mixpanel-browser";
import moment from "moment";
import { Loader } from "../../components";
import tennis from "../../assets/tennis-ball.png";
import baseball from "../../assets/baseball-white.svg";
import hockey from "../../assets/field-hockey.png";
import basketball from "../../assets/basketball-ball-variant.png";
import mma from "../../assets/mma.png";
import soccer from "../../assets/soccer-ball-variant.png";
import americanFootball from "../../assets/american-football.png";
import ellipse from "../../assets/Ellipse-bg.png";
import ellipsePhone from "../../assets/Ellipse-bg-phone.png";
import BalancePopup from "./BalancePopup";
import "./styles.css";
import { getTeamImage } from "../../utils/helper-functions";
import { IoSearch } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight, FaArrowAltCircleLeft, FaArrowRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

import { RiArrowDownFill } from "react-icons/ri";

import "./styles.css";

import Game from "./GamePage/Game";

const Trading = ({ route }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("");
  const [allData, setAllData] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [gameSelect, setGameSelect] = useState("");
  const [matchList, setMatchList] = useState([]);
  const [league, setLeague] = useState("");
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

  const [showMarketNamePopup, setShowMarketNamePopup] = useState(false);
  const [marketNamePopup, setMarketNamePopup] = useState(null);
  const [packageListObject, setPackageListObject] = useState({});

  const [betInProgress, setBetInProgress] = useState(false);

  //To trigger individual game section
  const [selectedGame, setSelectedGame] = useState(false);

  const [selectedLeague, setSelectedLeague] = useState();

  const [matchSearch, setMatchSearch] = useState("");
  const [filteredMatches, setFilteredMatches] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isKycDoneForSelectedPackage, setIsKycDoneForSelectedPackage] = useState(false);
  const [isKycRequiredForSelectedPackage, setIsKycRequiredForSelectedPackage] = useState(false);

  const sportsGame = useSelector((state) => state?.sportsGameReducer?.sportsName);
  const sports = useSelector((state) => state?.sportsReducer?.sportsName);
  const placeBetAPIData = useSelector((state) => state?.placeBetReducer?.placeBet);
  const packageList = useSelector((state) => state?.packagesListReducer?.packagesList?.data);

  const token = useSelector((state) => state?.userToken?.userToken?.data?.key);
  const channelId = useSelector((state) => state?.fcmTokenReducer?.fcmData);
  const data = useSelector((state) => state?.userProfileReducer?.userProfile?.data);

  useEffect(() => {
    dispatch(getSports());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (Array.isArray(packageList)) {
      let tempList = {};
      packageList.forEach((item, index) => {
        tempList[item.id] = item;
      });
      setPackageListObject(tempList);
    }
  }, [packageList]);

  useEffect(() => {
    if (gameList && gameSelect && league) {
      let params = "?sport=" + gameSelect?.sport_name?.toLowerCase() + "&league=" + league;
      handleMatchListAPI(params);
    }
  }, [gameList, league]);

  useEffect(() => {
    if (sportsGame?.status) {
      const currentTime = new Date();
      const filteredData = sportsGame?.data?.data.filter((item) => {
        const itemStartTime = new Date(item.start_date);
        return currentTime < itemStartTime;
      });
      setMatchList(filteredData);
      setFilteredMatches(filteredData);
      dispatch(getPackagesList());
      setMatchListLoader(false);
    }
  }, [sportsGame]);

  useEffect(() => {
    if (sports?.status && matchSearch.length > 0) {
      let tempArray = [...matchList];
      tempArray = tempArray.filter((match) => {
        return (
          match.home_team.toLowerCase().includes(matchSearch.toLowerCase()) ||
          match.away_team.toLowerCase().includes(matchSearch.toLowerCase())
        );
      });
      setFilteredMatches(tempArray);
    }
    if (matchSearch.length === 0) {
      setFilteredMatches(matchList);
    }
  }, [matchSearch]);

  useEffect(() => {
    if (sports?.status && sports?.data?.length > 0) {
      sortSports();
    }
  }, [sports]);

  const sortSports = async () => {
    let data = sports.data;
    const arr = data.sort(function (a, b) {
      return a.sport_name === b.sport_name ? 0 : a.sport_name > b.sport_name ? 1 : -1;
    });
    setGameList(arr);
    setGameSelect(arr[0]);
    setLeague(arr[0].leagues[0]);
  };

  const [challengesDetails, setChallengesDetails] = useState();
  const challengesData = useSelector(
    (state) => state?.challangeStatusReducer?.challangeStatusDetails?.data
  );

  useEffect(() => {
    if (challengesData) {
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
  
      if (challengeDetailsArray !== null && challengeDetailsArray.length > 0) {
        setMatchListLoader(false);
      }
    }
  }, [challengesData, selectedPackage]);

  useEffect(() => {
    if (packageList && packageList?.length >= 1) {
      dispatch(getChallangeStatus());
    }
  }, [packageList]);

  useEffect(() => {
    //calling to get the latest status of challenges
    dispatch(getChallangeStatus());
  }, [selectedPackage]);

  useEffect(() => {
    if (placeBetAPIData?.status) {
      toast.success("Bet placed successfully.");
      dispatch(resetplaceBet());
      setOpenPopupIndex(false);
      setWinningProfit("");
      setBetValue("");
      setSelectedPackage("");
    }
  }, [placeBetAPIData, data]);

  const handleMatchListAPI = (params) => {
    setMatchListLoader(true);
    dispatch(getSportsGame(params));
  };

  const handlePlaceBetAPI = () => {
    const button1 = document.getElementById("bet-button1");
    const button2 = document.getElementById("bet-button2");

    button1.setAttribute("disabled", "");
    button2.setAttribute("disabled", "");
    if (selectedPackage === "") {
      window.scrollTo(0, 0);
      toast.error("Please select Package");
      button1.removeAttribute("disabled");
      button2.removeAttribute("disabled");
    } else if (betValue) {
      if (betValue == 0 || betValue === "") {
        window.scrollTo(0, 0);
        toast.error("Bet amount can't be zero");
        setBetValue("");
        button1.removeAttribute("disabled");
        button2.removeAttribute("disabled");
      }
      else if(isKycRequiredForSelectedPackage === true && isKycDoneForSelectedPackage===false){
        window.scrollTo(0, 0);
        toast.error("Please fill the KYC form to bet in this Challenge.\n My Account —> KYC");
        setBetValue("");
        button1.removeAttribute("disabled");
        button2.removeAttribute("disabled");
      }
       else {
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
          userName: data?.username,
          userEmail: data?.email,
          details: body,
        });
        dispatch(placeBet(body, button1, button2));
      }
    } else {
      window.scrollTo(0, 0);
      toast.error("Please enter bet amount");
      button1.removeAttribute("disabled");
      button2.removeAttribute("disabled");
    }
  };

  const scrollLeagueRef = useRef(null);

  function scrollLeagueSidebar(direction) {
    const container = scrollLeagueRef.current;

    if (container) {
      const scrollAmount = 100; // Adjust scroll amount as needed

      if (direction === "left") {
        container.scrollLeft -= scrollAmount; // Scroll left
      } else {
        container.scrollLeft += scrollAmount; // Scroll right
      }
    }
  }

  const [openBalance, setOpenBalance] = useState(false);

  useEffect(() => {
    // Add or remove 'overflow-hidden' className to the body based on the state of openBalance
    if (openBalance && !matchListLoader) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to remove the className when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openBalance, matchListLoader]);

  function TabHeader() {
    return (
      <div className="flex font-sans ">
        <div
          className="flex flex-col mt-6 xl:mt-[40px] w-full
            xl:flex-row"
        >
          {/* Larger screens  */}
          <div
            className="hidden mt-8 w-full
            xl:flex flex-col xl:mt-0"
          >
            {/* <button className="bg-[#b8e834]/20 text-[#b8e834] font-normal px-6 py-2 rounded text-sm ">
              NBA
            </button> */}
            <div className="hidden w-full xl:flex justify-between ">
              <div
                className={`text-[30px] font-semibold ${
                  gameSelect?.sport_name === "mma" ? "uppercase" : "capitalize"
                }`}
              >
                {gameSelect.sport_name}
              </div>
              <div
                className="flex flex-col justify-end cursor-pointer bg-gradient-to-r from-[#E9193F] to-[#831126] p-[2px]"
                onClick={() => setOpenBalance(!openBalance)}
              >
                <div className="flex gap-2 justify-end items-center text-[#808080]">
                  <div>Total Account Balance: </div>
                  <RiArrowDownFill className="text-sm text-black rounded-full bg-gradient-to-r from-[#E9193F] to-[#831126]" />
                </div>
                <div className="text-right text-lg">
                  {data?.balance_amount
                    ? "$" +
                      Number(data?.balance_amount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "-"}
                </div>
              </div>
            </div>
            <div>
              {gameSelect?.leagues &&
                gameSelect?.leagues?.length >= 1 &&
                gameSelect.leagues.map((leagueName, index) => (
                  <button
                    className={
                      league === leagueName
                        ? "bg-[#F11941]/20 text-[#F11941] font-normal px-6 mr-2 mb-2 py-[12px] rounded text-sm"
                        : "border-2 border-[#191919] font-normal px-6 py-[12px] mr-2 mb-2 rounded text-sm"
                    }
                    onClick={() => {
                      setOpenPopupIndex(false);
                      setLeague(leagueName);
                      setSelectedGame(false);
                      let params =
                        "?sport=" + gameSelect?.sport_name?.toLowerCase() + "&league=" + leagueName;
                      handleMatchListAPI(params);
                    }}
                  >
                    {leagueName}
                  </button>
                ))}
            </div>
          </div>

          {/* Smaller screens  */}
          <div className="flex xl:hidden relative ">
            <FaChevronLeft
              size={15}
              className={`my-auto ${gameSelect?.leagues?.length > 4 ? "w-[75px]" : ""}`}
              onClick={() => scrollLeagueSidebar("left")}
            />

            <div className="overflow-x-auto whitespace-nowrap text-lg mx-2 " ref={scrollLeagueRef}>
              <div className="flex ">
                {/* <div className="inline-block text-[#b8e834] bg-[#121705] px-4 py-1">
                  NBA
                </div>
                <div className="inline-block px-4 py-1">NCAAB</div> */}

                {gameSelect?.leagues &&
                  gameSelect?.leagues?.length >= 1 &&
                  gameSelect.leagues.map((leagueName, index) => (
                    <button
                      className={
                        league === leagueName
                          ? "g-[#F11941]/20 bg-gradient-to-r from-[#E9193F] to-[#831126] text-[#b8e834 text-white font-semibold px-6 py-[12px] rounded text-sm ml-"
                          : "border-2 border-[#191919] font-normal px-6 py-[12px] rounded text-sm ml-4"
                      }
                      onClick={() => {
                        setLeague(leagueName);
                        setSelectedGame(false);
                        let params =
                          "?sport=" +
                          gameSelect?.sport_name?.toLowerCase() +
                          "&league=" +
                          leagueName;
                        handleMatchListAPI(params);
                      }}
                    >
                      {leagueName}
                    </button>
                  ))}
              </div>
            </div>

            <FaChevronRight
              size={15}
              className={`my-auto ${gameSelect?.leagues?.length > 4 ? "w-[75px]" : ""}`}
              onClick={() => scrollLeagueSidebar("right")}
            />
          </div>
        </div>
      </div>
    );
  }

  const setPopUpValue = (item, marketLineName, betValue) => {
    if (betValue?.price) {
      setMatchDetails(item);
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

  function scrollSportSidebar(direction) {
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
  const [selectedGameDetails, setSelectedGameDetails] = useState(null);

  const initiateGamePage = (item) => {
    setSelectedGame(true);
    setSelectedGameDetails(item);
  };

  function BetTable({ item, index }) {
    let spread1 = {};
    let spread2 = {};
    let moneyLine1 = {};
    let moneyLine2 = {};
    let totalPoint1 = {};
    let totalPoint2 = {};

    let marketLineName = {
      name1: "",
      name2: "",
      name3: "",
    };

    if (item?.sport === "football") {
      marketLineName.name1 = "Moneyline";
      marketLineName.name2 = "Spread";
      marketLineName.name3 = "T Points";
    } else if (item?.sport === "american football") {
      marketLineName.name1 = "Moneyline";
      marketLineName.name2 = "Spread";
      marketLineName.name3 = "T Points";
    } else if (item?.sport === "baseball") {
      marketLineName.name1 = "Moneyline";
      marketLineName.name2 = "Run Line";
      marketLineName.name3 = "Total Runs";
    } else if (item?.sport === "basketball") {
      marketLineName.name1 = "Moneyline";
      // marketLineName.name2 = "Spread";
      marketLineName.name2 = "Point Spread";
      // marketLineName.name3 = "T Points";
      marketLineName.name3 = "Total Points";
    } else if (item?.sport === "soccer") {
      marketLineName.name1 = "Moneyline";
      // marketLineName.name2 = "Asian";
      marketLineName.name2 = "Asian Handicap";
      // marketLineName.name3 = "T Goals";
      marketLineName.name3 = "Total Goals";
      // marketLineName.name1 = "moneyline";
      // marketLineName.name2 = "asian_handicap";
      // marketLineName.name3 = "total_goals";
    } else if (item?.sport === "hockey") {
      marketLineName.name1 = "Moneyline";
      // marketLineName.name2 = "P Line";
      marketLineName.name2 = "Puck Line";
      // marketLineName.name3 = "T Goals";
      marketLineName.name3 = "Total Goals";
    } else if (item?.sport === "ice hockey") {
      marketLineName.name1 = "Moneyline";
      // marketLineName.name2 = "P Line";
      marketLineName.name2 = "Puck Line";
      // marketLineName.name3 = "T Goals";
      marketLineName.name3 = "Total Goals";
    } else if (item?.sport === "tennis") {
      marketLineName.name1 = "Moneyline";
      // marketLineName.name2 = "Spread";
      marketLineName.name2 = "Game Spread";
      // marketLineName.name3 = "T Points";
      marketLineName.name3 = "Total Games";
    } else if (item?.sport === "mma") {
      marketLineName.name1 = "Moneyline";
      // marketLineName.name2 = "Spread";
      marketLineName.name2 = "Game Spread";
      // marketLineName.name3 = "T Points";
      marketLineName.name3 = "Total Points";
    }

    item?.odds &&
      item?.odds?.length &&
      item.odds.map((obj) => {
        if (
          (obj?.name + "").includes(item?.home_team) &&
          (obj?.name + "").includes(item?.away_team)
        ) {
          if (obj?.selection === item?.home_team) {
            if (obj?.market_name === "Moneyline") {
              moneyLine1 = obj;
              marketLineName.name1 = obj?.market_name;
            }
            if (
              obj?.market_name === "Point Spread" ||
              obj?.market_name === "Run Line" ||
              obj?.market_name === "Puck Line" ||
              obj?.market_name === "Asian Handicap" ||
              obj?.market_name === "To Win 1st Set" ||
              obj?.market_name === "2nd Set Moneyline" ||
              obj?.market_name === "Game Spread"
            ) {
              spread1 = obj;
              marketLineName.name2 = obj?.market_name;
            }
          } else if (obj?.selection === item?.away_team) {
            if (obj?.market_name === "Moneyline") {
              moneyLine2 = obj;
              marketLineName.name1 = obj?.market_name;
            }
            if (
              obj?.market_name === "Point Spread" ||
              obj?.market_name === "Run Line" ||
              obj?.market_name === "Puck Line" ||
              obj?.market_name === "Asian Handicap" ||
              obj?.market_name === "To Win 1st Set" ||
              obj?.market_name === "2nd Set Moneyline" ||
              obj?.market_name === "Game Spread"
            ) {
              spread2 = obj;
              marketLineName.name2 = obj?.market_name;
            }
          } else {
            if (item?.sport === "soccer") {
              if (obj?.market_name === "Total Goals") {
                if ((obj?.name + "").includes("Over")) {
                  totalPoint1 = obj;
                  marketLineName.name3 = obj?.market_name;
                }
                if ((obj?.name + "").includes("Under")) {
                  totalPoint2 = obj;
                  marketLineName.name3 = obj?.market_name;
                }
              }
            } else if (item?.sport === "hockey") {
              if (obj?.market_name === "Total Goals") {
                if ((obj?.name + "").includes("Over")) {
                  totalPoint1 = obj;
                  marketLineName.name3 = obj?.market_name;
                }
                if ((obj?.name + "").includes("Under")) {
                  totalPoint2 = obj;
                  marketLineName.name3 = obj?.market_name;
                }
              }
            } else if (item?.sport === "baseball") {
              if (obj?.market_name === "Total Runs") {
                if ((obj?.name + "").includes("Over")) {
                  totalPoint1 = obj;
                  marketLineName.name3 = obj?.market_name;
                  return false;
                }
                if ((obj?.name + "").includes("Under")) {
                  totalPoint2 = obj;
                  marketLineName.name3 = obj?.market_name;
                  return false;
                }
              }
            } else if (item?.sport === "basketball") {
              if (obj?.market_name === "Total Points") {
                if ((obj?.name + "").includes("Over")) {
                  totalPoint1 = obj;
                  marketLineName.name3 = obj?.market_name;
                }
                if ((obj?.name + "").includes("Under")) {
                  totalPoint2 = obj;
                  marketLineName.name3 = obj?.market_name;
                }
              }
            } else {
              if ((obj?.name + "").includes("Over")) {
                totalPoint1 = obj;
                marketLineName.name3 = obj?.market_name;
              }
              if ((obj?.name + "").includes("Under")) {
                totalPoint2 = obj;
                marketLineName.name3 = obj?.market_name;
              }
            }
          }
        } else {
          let name = obj?.name.toLowerCase();
          let homeTeam = item?.home_team.toLowerCase();
          let awayTeam = item?.away_team.toLowerCase();

          //New Logic
          if (obj.market_name === marketLineName.name1) {
            if (name.includes(homeTeam)) {
              moneyLine1 = obj;
            } else if (name.includes(awayTeam)) {
              moneyLine2 = obj;
            }
          } else if (obj.market_name === marketLineName.name2) {
            if (obj.selection.length !== 0) {
              if (obj.selection.toLowerCase().includes(homeTeam)) {
                spread1 = obj;
              } else if (obj.selection.toLowerCase().includes(awayTeam)) {
                spread2 = obj;
              }
            } else if ((obj?.name + "").includes("Over")) {
              spread1 = obj;
            } else if ((obj?.name + "").includes("Under")) {
              spread2 = obj;
            }
          } else if (obj.market_name === marketLineName.name3) {
            if (obj.selection.length !== 0) {
              if (obj.selection.toLowerCase().includes(homeTeam)) {
                totalPoint1 = obj;
              } else if (obj.selection.toLowerCase().includes(awayTeam)) {
                totalPoint2 = obj;
              }
            } else if ((obj?.name + "").includes("Over")) {
              totalPoint1 = obj;
            } else if ((obj?.name + "").includes("Under")) {
              totalPoint2 = obj;
            }
          }
        }
      });

    let homeTeam = getTeamImage(item.home_team, item.league, item.sport);
    if (homeTeam === "No Image") {
      if (item.sport === "tennis") {
        homeTeam = {
          id: 1,
          logo: tennis,
        };
      } else if (item.sport === "baseball") {
        homeTeam = {
          id: 1,
          logo: baseball,
        };
      } else if (item.sport === "basketball") {
        homeTeam = {
          id: 1,
          logo: basketball,
        };
      } else if (item.sport === "hockey") {
        homeTeam = {
          id: 1,
          logo: hockey,
        };
      } else if (item.sport === "ice hockey") {
        homeTeam = {
          id: 1,
          logo: hockey,
        };
      } else if (item.sport === "mma") {
        homeTeam = {
          id: 1,
          logo: mma,
        };
      } else if (item.sport === "soccer") {
        homeTeam = {
          id: 1,
          logo: soccer,
        };
      } else if (item.sport === "football") {
        homeTeam = {
          id: 1,
          logo: americanFootball,
        };
      } else if (item.sport === "american football") {
        homeTeam = {
          id: 1,
          logo: americanFootball,
        };
      }
    }

    let awayTeam = getTeamImage(item.away_team, item.league, item.sport);
    if (awayTeam === "No Image") {
      if (item.sport === "tennis") {
        awayTeam = {
          id: 1,
          logo: tennis,
        };
      } else if (item.sport === "baseball") {
        awayTeam = {
          id: 1,
          logo: baseball,
        };
      } else if (item.sport === "basketball") {
        awayTeam = {
          id: 1,
          logo: basketball,
        };
      } else if (item.sport === "hockey") {
        awayTeam = {
          id: 1,
          logo: hockey,
        };
      } else if (item.sport === "ice hockey") {
        awayTeam = {
          id: 1,
          logo: hockey,
        };
      } else if (item.sport === "mma") {
        awayTeam = {
          id: 1,
          logo: mma,
        };
      } else if (item.sport === "soccer") {
        awayTeam = {
          id: 1,
          logo: soccer,
        };
      } else if (item.sport === "football") {
        awayTeam = {
          id: 1,
          logo: americanFootball,
        };
      } else if (item.sport === "american football") {
        awayTeam = {
          id: 1,
          logo: americanFootball,
        };
      }
    }

    return (
      <>
        {/* Bigger Screens  */}
        {index === 0 && (
          <div className="hidde flex text-sm xl:text-base xl:flex w-full justify-between mt-2 pl-2 xl:px-0 xl:pr-4">
            <div className="w-[30%] xl:w-[30%] xl:ml-4"></div>
            <div
              className={`lg: flex w-[65%] mx-auto xl:mx-0 xl:w-[55%]
              ${
                (moneyLine1?.price || moneyLine2?.price) &&
                (spread1?.price || spread2?.price) &&
                (totalPoint1?.price || totalPoint2?.price)
                  ? "justify-end gap-1 xl:justify-between xl:gap-4"
                  : " justify-start gap-4"
              }
            `}
            >
              {/* {(moneyLine1?.price || moneyLine2?.price) && ( */}
              <div
                className="lg:block w-[30%] xl: mt-2 xl:ml-2 text-white text-center text-[12px] xl:text-base overflow-hidden whitespace-nowrap overflow-ellipsis h-max font-semibold py-1 pl- 2 xl:px-2"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setShowMarketNamePopup(!showMarketNamePopup);
                  setMarketNamePopup(marketLineName.name1);
                }}
              >
                {marketLineName.name1}
              </div>
              {/* )} */}
              {/* {(spread1?.price || spread2?.price) && ( */}
              <div
                className="lg: block w-[30%] xl:ml-2 xl: mt-2 text-white text-center text-[12px] xl:text-base overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold py-1 pl- 2 xl:px-2"
                style={
                  {
                    // alignItems: "center",
                    // justifyContent: "center",
                  }
                }
                onClick={() => {
                  setShowMarketNamePopup(!showMarketNamePopup);
                  setMarketNamePopup(marketLineName.name2);
                }}
              >
                {marketLineName.name2}
              </div>
              {/* )} */}
              {/* {(totalPoint1?.price || totalPoint2?.price) && ( */}
              <div
                className="lg: block w-[30%] xl:mr-2 xl: mt-2 text-white text-[12px] xl:text-base overflow-hidden whitespace-nowrap overflow-ellipsis text-center h-max font-semibold py-1 pl- 2 xl:px-2"
                style={
                  {
                    // alignItems: "center",
                    // justifyContent: "center",
                  }
                }
                onClick={() => {
                  setShowMarketNamePopup(!showMarketNamePopup);
                  setMarketNamePopup(marketLineName.name3);
                }}
              >
                {marketLineName.name3}
              </div>
              {/* )} */}
            </div>
          </div>
        )}
        <div className="borderStyle hidden xl:block bg-transparent border-4 border-[#1A1B19]  mt-4 rounded-lg text-sm lg:text-base">
          <div
            className="flex flex-col mt-2 xl:mt- justify-between pr-4
              xl:flex-row xl:pb-2 xl:justify-between
              "
          >
            <div
              className="w-[90%] mt-2 mx-auto xl:w-[30%] xl:ml-4 y-auto cursor-pointer"
              onClick={() => {
                initiateGamePage(item);
                window.scrollTo(0, 0);
              }}
            >
              <div
                className="h-12"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* <div className="h-8 w-8 bg-gray-100 rounded-2xl mr-6" /> */}
                <img src={homeTeam?.logo} className="size-4 xl:size-8 mr-6" />
                <div>{item.home_team}</div>
              </div>
              <div
                className="h-12"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                {/* <div className="h-8 w-8 bg-gray-100 rounded-2xl mr-6" /> */}
                <img src={awayTeam?.logo} className="size-4 xl:size-8 mr-6" />
                <div>{item.away_team}</div>
              </div>
            </div>
            <div
              //  style={{backgroundColor:'red'}}
              // onClick={() => handleBetPopup(index)}
              className={`
                ${
                  (moneyLine1?.price || moneyLine2?.price) &&
                  (spread1?.price || spread2?.price) &&
                  (totalPoint1?.price || totalPoint2?.price)
                    ? "justify-between gap-3"
                    : " justify-start gap-3"
                }
                cursor-pointer flex w-[90%] mx-aut items-stretc
                xl:w-[55%] xl:pr- xl:ml-4 xl:mt-2
              `}
            >
              {moneyLine1?.price || moneyLine2?.price ? (
                <div className="mr-1 mt-8 w-[33%] xl:mt-2 xl:mr-0">
                  <div
                    className="lg:bloc hidden text-[#4C4C4C] text-center h-max font-bold border-b-2 border-b-[#191919] py-1 px-2"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setShowMarketNamePopup(!showMarketNamePopup);
                      setMarketNamePopup(marketLineName.name1);
                    }}
                  >
                    {marketLineName.name1}
                  </div>
                  <div className="gap-3" style={{ display: "flex", flexDirection: "column" }}>
                    <button
                      onClick={() => setPopUpValue(item, marketLineName.name1, moneyLine1)}
                      className={`${
                        moneyLine1?.selection !== "Draw" ? "text-[#F11941]" : "text-white"
                      } bg-[#1a1b19 bg-white bg-opacity-5 hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md`}
                      style={{
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {moneyLine1.selection !== "Draw"
                        ? moneyLine1?.price > 0
                          ? "+" + moneyLine1?.price
                          : moneyLine1?.price
                        : "-"}
                    </button>
                    <button
                      onClick={() => setPopUpValue(item, marketLineName.name1, moneyLine2)}
                      className={`${
                        moneyLine2?.selection !== "Draw" ? "text-[#F11941]" : "text-white"
                      }  bg-[#1a1b19 bg-white bg-opacity-5 hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md`}
                      style={{
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* {moneyLine2.price} */}
                      {moneyLine2.selection !== "Draw"
                        ? moneyLine2?.price > 0
                          ? "+" + moneyLine2?.price
                          : moneyLine2?.price
                        : "-"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mr-1 mt-8 w-[33%] xl:mt-2 xl:mr-0">
                  <div
                    className="lg:bloc hidden text-[#4C4C4C] text-center h-max font-bold border-b-2 border-b-[#191919] py-1 px-2"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setShowMarketNamePopup(!showMarketNamePopup);
                      setMarketNamePopup(marketLineName.name1);
                    }}
                  >
                    {marketLineName.name1}
                  </div>
                  <div className="gap-3" style={{ display: "flex", flexDirection: "column" }}>
                    <button
                      onClick={() => setPopUpValue(item, marketLineName.name1, moneyLine1)}
                      className="text-[#b8e834 text-white bg-[#1a1b19 bg-white bg-opacity-5 hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md"
                      style={{
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => setPopUpValue(item, marketLineName.name1, moneyLine2)}
                      className="text-[#b8e834 text-white bg-[#1a1b19 bg-white bg-opacity-5 hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md"
                      style={{
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* {moneyLine2.price} */}-
                    </button>
                  </div>
                </div>
              )}
              {spread1?.price || spread2?.price ? (
                <div className="mr- mt-8 w-[33%] xl:mt-2 xl:mr-0 xl:ml-">
                  <div
                    className="lg:bloc hidden text-[#4C4C4C] text-center overflow-hidden whitespace-nowrap overflow-ellipsis font-bold border-b-2 border-b-[#252525]  py-1 px-2"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setShowMarketNamePopup(!showMarketNamePopup);
                      setMarketNamePopup(marketLineName.name2);
                    }}
                  >
                    {marketLineName.name2}
                  </div>
                  <div className="gap-3" style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name2, spread1)}
                      className="
                      h-10 bg-[#1a1b19 bg-white bg-opacity-5 text-[#F11941] hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md text-center 
                      flex flex-col lg:flex-row items-center justify-center
                    "
                    >
                      {/* {spread1.bet_points !== 0 && ( */}
                      <div className="text-white">
                        {/* {spread1.bet_points} */}
                        {/* {spread1?.bet_points >= 0 ? "+" + spread1?.bet_points : spread1?.bet_points} */}
                        {`${String(spread1?.bet_points).length ? spread1?.bet_points : ""}${String(spread1?.bet_points2).length ? ", " + spread1?.bet_points2 : ""}`}
                      </div>
                      {/* )} */}
                      {/* {spread1.bet_points && spread1.price ? ( */}
                      <div className="hidden lg:block text-[#3a3a3a] mx-2 text-xl font-semibold">
                        |
                      </div>
                      {/* ) : null} */}
                      <div className="text-[#b8e834">
                        {spread1.price &&
                        // spread1.price
                        spread1?.price > 0
                          ? "+" + spread1?.price
                          : spread1?.price}
                      </div>
                    </div>
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name2, spread2)}
                      className="
                      h-10 text-center text-[#F11941] hover:text-white hover:font-semibold bg-[#1a1b19 bg-white bg-opacity-5 hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md
                      flex flex-col lg:flex-row items-center justify-center
                    "
                    >
                      {/* {spread2.bet_points !== 0 && ( */}
                      <div className="text-white">
                        {/* {spread2.bet_points} */}
                        {/* {spread2?.bet_points >= 0 ? "+" + spread2?.bet_points : spread2?.bet_points} */}
                        {`${String(spread2?.bet_points).length ? spread2?.bet_points : ""}${String(spread2?.bet_points2).length ? ", " + spread2?.bet_points2 : ""}`}
                      </div>
                      {/* )} */}
                      {/* {spread2.bet_points && spread2.price ? ( */}
                      <div className="hidden lg:block text-[#3a3a3a] mx-2 text-xl font-semibold">
                        {" "}
                        |{" "}
                      </div>
                      {/* ) : null} */}
                      <div className="text-[#b8e834">
                        {spread2.price &&
                        // spread2.price
                        spread2?.price > 0
                          ? "+" + spread2?.price
                          : spread2?.price}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mr- mt-8 w-[33%] xl:mt-2 xl:mr-0 xl:ml-">
                  <div className="gap-3" style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name2, spread1)}
                      className="
                  h-10 bg-[#1a1b19 bg-white bg-opacity-5 text-[#F11941] hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md text-center 
                  flex flex-col lg:flex-row items-center justify-center
                "
                    >
                      {spread1.bet_points !== 0 && (
                        <div className="text-white">{/* {spread1.bet_points} */}-</div>
                      )}
                    </div>
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name2, spread2)}
                      className="
                  h-10 text-center text-[#F11941] hover:text-white hover:font-semibold bg-[#1a1b19 bg-white bg-opacity-5 hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md
                  flex flex-col lg:flex-row items-center justify-center
                "
                    >
                      {spread2.bet_points !== 0 && (
                        <div className="text-white">{/* {spread2.bet_points} */}-</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {totalPoint1?.price || totalPoint2?.price ? (
                <div className="mt-8 w-[33%] xl:mt-2 xl:ml-">
                  <div
                    className="lg:bloc hidden text-[#4C4C4C] overflow-hidden whitespace-nowrap overflow-ellipsis text-center h-max whitespace-nowra font-bold border-b-2 border-b-[#252525] py-1 px-2"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setShowMarketNamePopup(!showMarketNamePopup);
                      setMarketNamePopup(marketLineName.name3);
                    }}
                  >
                    {marketLineName.name3}
                  </div>
                  <div className="gap-3" style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name3, totalPoint1)}
                      className="
                      h-10 text-[#F11941] hover:text-white hover:font-semibold bg-[#1a1b19 bg-white bg-opacity-5 hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md text-center
                      flex flex-col lg:flex-row items-center justify-center
                    "
                    >
                      {totalPoint1?.price ? (
                        <>
                          <div className="whitespace-nowrap text-white">
                            O {totalPoint1.bet_points}
                          </div>
                          <div className="hidden lg:block text-[#3a3a3a] mx-2 text-xl font-semibold">
                            |
                          </div>
                          <div className="text-[#b8e834">
                            {
                              totalPoint1?.price && totalPoint1?.price > 0
                                ? "+" + totalPoint1?.price
                                : totalPoint1?.price
                              // totalPoint1.price
                            }
                          </div>
                        </>
                      ) : (
                        <div className="whitespace-nowrap text-white">-</div>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        setPopUpValue(item, marketLineName.name3, totalPoint2);
                      }}
                      className="
                      h-10 text-[#F11941] hover:text-white hover:font-semibold bg-[#1a1b19 bg-white bg-opacity-5 hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md text-center mt-
                      flex flex-col lg:flex-row items-center justify-center
                    "
                    >
                      {totalPoint1?.price ? (
                        <>
                          <div className="whitespace-nowrap text-white">
                            U {totalPoint2.bet_points}
                          </div>
                          <div className="hidden lg:block text-[#3a3a3a] mx-2 text-xl font-semibold">
                            {" "}
                            |{" "}
                          </div>
                          <div className="text-[#b8e834">
                            {
                              // totalPoint2.price
                              totalPoint2?.price && totalPoint2?.price > 0
                                ? "+" + totalPoint2?.price
                                : totalPoint2?.price
                            }
                          </div>
                        </>
                      ) : (
                        <div className="whitespace-nowrap text-white">-</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 w-[33%] xl:mt-2 xl:ml-">
                  <div
                    className="lg:bloc hidden text-[#4C4C4C] overflow-hidden whitespace-nowrap overflow-ellipsis text-center h-max whitespace-nowra font-bold border-b-2 border-b-[#252525] py-1 px-2"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setShowMarketNamePopup(!showMarketNamePopup);
                      setMarketNamePopup(marketLineName.name3);
                    }}
                  >
                    {marketLineName.name3}
                  </div>
                  <div className="gap-3" style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name3, totalPoint1)}
                      className="
                      h-10 text-[#F11941] hover:text-white hover:font-semibold bg-[#1a1b19 bg-white bg-opacity-5 hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md text-center
                      flex flex-col lg:flex-row items-center justify-center
                    "
                    >
                      <div className="whitespace-nowrap text-white">-</div>
                    </div>
                    <div
                      onClick={() => {
                        setPopUpValue(item, marketLineName.name3, totalPoint2);
                      }}
                      className="
                      h-10 text-[#F11941] hover:text-white hover:font-semibold bg-[#1a1b19 bg-white bg-opacity-5 hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816] rounded-md text-center mt-
                      flex flex-col lg:flex-row items-center justify-center
                    "
                    >
                      <div className="whitespace-nowrap text-white">-</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            onClick={() => {
              initiateGamePage(item);
              window.scrollTo(0, 0);
            }}
            className="flex justify-between items-center font-medium pb-2 text-white hover:text-blac "
          >
            <div className="flex w-[30%] items-center h-10 pl-4 text-[#565656] text-center">
              {item?.start_date && moment(item?.start_date).format("MMM DD | h:mm A")}
            </div>
            <div className="flex w-[55%] justify-center items-center">
              <div className="flex items-center px-4 mr-6 rounded-md h-10 cursor-pointer bg-[#1a1b19  bg-white bg-opacity-5 hover:text-white hover:font-semibold hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816]">
                More Picks
              </div>
              {/* <FaAngleDown size={18} className="my-auto" /> */}
            </div>
          </div>
        </div>

        {/* Smaller Screens  */}
        <div className="borderStyle xl:hidden bg-whit bg-opacity- bg-transparent mt-4 rounded-lg text-sm xl:text-base">
          <div className="hidden pt-2 xl:pt-4 mt-6 text-[#565656] text-center">
            {item?.start_date && moment(item?.start_date).format("MMM DD | h:mm A")}
          </div>

          {/* <div className="w-full h-[2px] bg-[#191919] mt-2" /> */}

          <div
            className="flex flex- mt-2 xl:mt-4 justify-between px-2 xl:pr-4
            xl:flex-row xl:pb-4 xl:justify-normal
            "
          >
            <div className="w-[32%] mt-  mx-auto xl:w-[30%] xl:ml-4 xl:mt-10 y-auto cursor-pointer">
              <div
                className="h-12 gap-4"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* <div className="h-8 w-8 bg-gray-100 rounded-2xl mr-6" /> */}
                <img src={homeTeam?.logo} className="size-4 xl:size-8" />
                <div
                  className="w-[90%] overflow-hidden whitespace-nowrap overflow-ellipsis "
                  onClick={() => {
                    setShowMarketNamePopup(!showMarketNamePopup);
                    setMarketNamePopup(item.home_team);
                  }}
                >
                  {item.home_team}
                </div>
              </div>
              <div
                className="h-12 gap-4"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                {/* <div className="h-8 w-8 bg-gray-100 rounded-2xl mr-6" /> */}
                <img src={awayTeam?.logo} className="size-4 xl:size-8" />
                <div
                  className="w-[90%] overflow-hidden whitespace-nowrap overflow-ellipsis"
                  onClick={() => {
                    setShowMarketNamePopup(!showMarketNamePopup);
                    setMarketNamePopup(item.away_team);
                  }}
                >
                  {item.away_team}
                </div>
              </div>
            </div>
            <div
              //  style={{backgroundColor:'red'}}
              // onClick={() => handleBetPopup(index)}
              className={`
              ${
                (moneyLine1?.price || moneyLine2?.price) &&
                (spread1?.price || spread2?.price) &&
                (totalPoint1?.price || totalPoint2?.price)
                  ? "justify-end gap-1 xl:justify-between xl:gap-4"
                  : " justify-start gap-4"
              }
              cursor-pointer flex w-[65%] mx-auto items-stretc
              xl:w-[70%] xl:pr-4 xl:ml-4
            `}
            >
              {moneyLine1?.price || moneyLine2?.price ? (
                <div className="mr- mt- w-[30%] xl:mt-2 xl:mr-0">
                  <div
                    className="hidden text-[#4C4C4C text-white text-center h-max overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold border-b- border-b-[#191919] py-2 px-2"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setShowMarketNamePopup(!showMarketNamePopup);
                      setMarketNamePopup(marketLineName.name1);
                    }}
                  >
                    {marketLineName.name1}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }} className="gap-1">
                    <button
                      onClick={() => setPopUpValue(item, marketLineName.name1, moneyLine1)}
                      className={`
                      ${
                        moneyLine1?.selection !== "Draw" ? "text-[#F11941]" : "text-white"
                      } hover:text-black hover:font-semibold border-b- border-b-[#252525]
                      bg-white bg-opacity-5 rounded-md
                      `}
                      style={{
                        height: 48,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {moneyLine1.selection !== "Draw"
                        ? moneyLine1?.price > 0
                          ? "+" + moneyLine1?.price
                          : moneyLine1?.price
                        : "-"}
                    </button>
                    <button
                      onClick={() => setPopUpValue(item, marketLineName.name1, moneyLine2)}
                      className={`
                      ${
                        moneyLine1?.selection !== "Draw" ? "text-[#F11941]" : "text-white"
                      } hover:text-black hover:font-semibold 
                      bg-white bg-opacity-5 rounded-md
                      `}
                      style={{
                        height: 48,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* {moneyLine2.price} */}
                      {moneyLine2.selection !== "Draw"
                        ? moneyLine2?.price > 0
                          ? "+" + moneyLine2?.price
                          : moneyLine2?.price
                        : "-"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mr- mt- w-[30%] xl:mt-2 xl:mr-0">
                  <div
                    className="hidden text-[#4C4C4C text-white text-center h-max overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold border-b- border-b-[#191919] py-2 px-2"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setShowMarketNamePopup(!showMarketNamePopup);
                      setMarketNamePopup(marketLineName.name1);
                    }}
                  >
                    {marketLineName.name1}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }} className="gap-1">
                    <button
                      onClick={() => setPopUpValue(item, marketLineName.name1, moneyLine1)}
                      className="
                      text-[#b8e834 text-white hover:text-black hover:font-semibold border-b- border-b-[#252525]
                      bg-white bg-opacity-5 rounded-md
                      "
                      style={{
                        height: 48,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => setPopUpValue(item, marketLineName.name1, moneyLine2)}
                      className="
                      text-[#b8e834 text-white hover:text-black hover:font-semibold 
                      bg-white bg-opacity-5 rounded-md
                      "
                      style={{
                        height: 48,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* {moneyLine2.price} */}-
                    </button>
                  </div>
                </div>
              )}
              {spread1?.price || spread2?.price ? (
                <div className="mr- mt- w-[30%] xl:mt-2 xl:mr-0 xl:ml-">
                  <div
                    className="hidden text-[#4C4C4C text-white text-center overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold border-b- border-b-[#252525] py-2 px-2"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setShowMarketNamePopup(!showMarketNamePopup);
                      setMarketNamePopup(marketLineName.name2);
                    }}
                  >
                    {marketLineName.name2}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }} className="gap-1">
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name2, spread1)}
                      className="
                        h-12 border-b- border-b-[#252525] text-center 
                        flex flex-col lg:flex-row items-center justify-center
                        bg-white bg-opacity-5 text-white rounded-md
                      "
                    >
                      {/* {spread1.bet_points !== 0 && ( */}
                      <div>
                        {/* {spread1.bet_points} */}
                        {/* {spread1?.bet_points > 0 ? "+" + spread1?.bet_points : spread1?.bet_points} */}
                        {`${String(spread1?.bet_points).length ? spread1?.bet_points : ""}${String(spread1?.bet_points2).length ? ", " + spread1?.bet_points2 : ""}`}
                      </div>
                      {/* )} */}
                      {/* {spread1.bet_points && spread1.price ? ( */}
                      <div className="hidden lg:block text-[#3a3a3a] mx-2 text-xl font-semibold">
                        |
                      </div>
                      {/* ) : null} */}
                      <div className="text-[#F11941]">
                        {spread1.price &&
                        // spread1.price
                        spread1?.price > 0
                          ? "+" + spread1?.price
                          : spread1?.price}
                      </div>
                    </div>
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name2, spread2)}
                      className="
                        h-12 text-center mt-
                        flex flex-col lg:flex-row items-center justify-center
                        bg-white bg-opacity-5 text-white rounded-md
                      "
                    >
                      {/* {spread2.bet_points !== 0 && ( */}
                      <div>
                        {/* {spread2.bet_points} */}
                        {/* {spread2?.bet_points > 0 ? "+" + spread2?.bet_points : spread2?.bet_points} */}
                        {`${String(spread2?.bet_points).length ? spread2?.bet_points : ""}${String(spread2?.bet_points2).length ? ", " + spread2?.bet_points2 : ""}`}
                      </div>
                      {/* )} */}
                      {/* {spread2.bet_points && spread2.price ? ( */}
                      <div className="hidden lg:block text-[#3a3a3a] mx-2 text-xl font-semibold">
                        {" "}
                        |{" "}
                      </div>
                      {/* ) : null} */}
                      <div className="text-[#F11941]">
                        {spread2.price &&
                        // spread2.price
                        spread2?.price > 0
                          ? "+" + spread2?.price
                          : spread2?.price}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mr- mt- w-[30%] xl:mt-2 xl:mr-0 xl:ml-">
                  <div style={{ display: "flex", flexDirection: "column" }} className="gap-1">
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name2, spread1)}
                      className="
                          h-12 border-b- border-b-[#252525] text-center 
                          flex flex-col lg:flex-row items-center justify-center
                          bg-white bg-opacity-5 text-white rounded-md
                        "
                    >
                      {/* {spread1.bet_points !== 0 && ( */}
                      <div>{/* {spread1.bet_points} */}-</div>
                      {/* )} */}
                    </div>
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name2, spread2)}
                      className="
                          h-12 text-center mt-
                          flex flex-col lg:flex-row items-center justify-center
                          bg-white bg-opacity-5 text-white rounded-md
                        "
                    >
                      {/* {spread2.bet_points !== 0 && ( */}
                      <div>{/* {spread2.bet_points} */}-</div>
                      {/* )} */}
                    </div>
                  </div>
                </div>
              )}
              {totalPoint1?.price || totalPoint2?.price ? (
                <div className="mt- w-[30%] xl:mt-2 xl:ml-">
                  <div
                    className="hidden text-[#4C4C4C text-white overflow-hidden whitespace-nowrap overflow-ellipsis text-center h-max whitespace-nowra font-semibold border-b- border-b-[#252525] py-2 px-2"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setShowMarketNamePopup(!showMarketNamePopup);
                      setMarketNamePopup(marketLineName.name3);
                    }}
                  >
                    {marketLineName.name3}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }} className="gap-1">
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name3, totalPoint1)}
                      className="
                    h-12 border-b-  border-b-[#252525] text-center
                    flex flex-col lg:flex-row items-center justify-center
                    bg-white bg-opacity-5 text-white rounded-md
                  "
                    >
                      {totalPoint1?.price ? (
                        <>
                          <div className="whitespace-nowrap">O {totalPoint1.bet_points}</div>
                          <div className="hidden lg:block text-[#3a3a3a] mx-2 text-xl font-semibold">
                            |
                          </div>
                          <div className="text-[#F11941]">
                            {
                              totalPoint1?.price && totalPoint1?.price > 0
                                ? "+" + totalPoint1?.price
                                : totalPoint1?.price
                              // totalPoint1.price
                            }
                          </div>
                        </>
                      ) : (
                        <div className="whitespace-nowrap">-</div>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        setPopUpValue(item, marketLineName.name3, totalPoint2);
                      }}
                      className="
                    h-12 text-center mt-
                    flex flex-col lg:flex-row items-center justify-center
                    bg-white bg-opacity-5 text-white rounded-md
                  "
                    >
                      {totalPoint2?.price ? (
                        <>
                          <div className="whitespace-nowrap">U {totalPoint2.bet_points}</div>
                          <div className="hidden lg:block text-[#3a3a3a] mx-2 text-xl font-semibold">
                            {" "}
                            |{" "}
                          </div>
                          <div className="text-[#F11941]">
                            {
                              // totalPoint2.price
                              totalPoint2?.price && totalPoint2?.price > 0
                                ? "+" + totalPoint2?.price
                                : totalPoint2?.price
                            }
                          </div>
                        </>
                      ) : (
                        <div className="whitespace-nowrap">-</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt- w-[30%] xl:mt-2 xl:ml-">
                  <div style={{ display: "flex", flexDirection: "column" }} className="gap-1">
                    <div
                      onClick={() => setPopUpValue(item, marketLineName.name3, totalPoint1)}
                      className="
                          h-12 border-b-  border-b-[#252525] text-center
                          flex flex-col lg:flex-row items-center justify-center
                          bg-white bg-opacity-5 text-white rounded-md
                        "
                    >
                      <div className="whitespace-nowrap text-white">-</div>
                    </div>
                    <div
                      onClick={() => {
                        setPopUpValue(item, marketLineName.name3, totalPoint2);
                      }}
                      className="
                          h-12 text-center mt-
                          flex flex-col lg:flex-row items-center justify-center
                          bg-white bg-opacity-5 text-white rounded-md
                        "
                    >
                      <div className="whitespace-nowrap">-</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => {
              initiateGamePage(item);
              window.scrollTo(0, 0);
            }}
            className="flex justify-between items-center mt-1 font-medium pb-2 text-white hover:text-blac "
          >
            <div className="flex w-[35%] items-center h-10 pl-4 text-[#565656] text-center">
              {item?.start_date && moment(item?.start_date).format("MMM DD | h:mm A")}
            </div>
            <div className="flex w-[55%] justify-center items-center">
              <div className="flex items-center px-4 mr-6 rounded-md h-10 cursor-pointer bg-[#1a1b19  bg-white bg-opacity-5 hover:text-black hover:font-semibold hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:border hover:border-[#520816]">
                More Picks
              </div>
              {/* <FaAngleDown size={18} className="my-auto" /> */}
            </div>
          </div>
        </div>
      </>
    );
  }

  function BetFunction({ match }) {
    if (match?.length == 0) {
      return (
        <Loader />
      );
    }
    if (match && match?.length >= 0) {
      return (
        <div className="min-h-[30vh]">
          {match.length > 0 ? (
            match.map((item, index) => <BetTable item={item} index={index} />)
          ) : (
            <div className="text-2xl text-[#808080] flex justify-center items-center pt-24 xl:-ml-12">
              <div>No active matches</div>
            </div>
          )}
        </div>
      );
    }
  }

  const onGameClick = (item) => {
    setMatchSearch("");
    setSelectedGame(false);
    //Setting dropdown to default
    if (gameSelect.leagues && gameSelect.leagues.length > 0) {
      const firstLeague = gameSelect.leagues[0];
      setSelectedLeague(firstLeague);
    }
    setLeague(item?.leagues[0]);
    setGameSelect(item);
    window.scrollTo(0, 0);
    setOpenPopupIndex(false);
    let params = "?sport=" + item?.sport_name?.toLowerCase() + "&league=" + item?.leagues[0];
    handleMatchListAPI(params);
  };

  const onGameClickHandler = (item, index) => {
    onGameClick(item);
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const selectedItem = scrollContainer.children[index];
      if (selectedItem) {
        const containerWidth = scrollContainer.offsetWidth;
        const itemOffsetLeft = selectedItem.offsetLeft;
        const itemWidth = selectedItem.offsetWidth;
        const scrollLeft = itemOffsetLeft - (containerWidth - itemWidth) / 2;
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
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

  if (showMarketNamePopup) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = ""; // reset to default value
  }

  function toggleBodyScrolling(enableScrolling) {
    if (enableScrolling) {
      document.body.style.overflow = "auto"; // Enable scrolling
    } else {
      document.body.style.overflow = "hidden"; // Disable scrolling
    }
  }

  // useEffect(() => {
  //   toggleBodyScrolling(!openPopupIndex);
  // }, [openPopupIndex]);

  return (
    <>
      {/* Market name popup  */}
      {showMarketNamePopup && marketNamePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="flex items-center border border-[#646464] text-white px-4 py-2 bg-black z-50">
            {marketNamePopup}
            <MdCancel size={20} onClick={() => setShowMarketNamePopup(false)} className="ml-1" />
          </div>
          <div
            className="fixed inset-0 bg-black opacity-60 z-40"
            onClick={() => setShowMarketNamePopup(false)}
          />
        </div>
      )}
      <div
        className="
          hidden 
          xl:fle xl:block text-white border-b-2 border-b-[#161616] bg-cover
        "
        style={{
          // backgroundImage: `url(${ellipse})`,
          // backgroundAttachment: "fixed",
          // backgroundPositionY: "38%",
          // backgroundPositionX: "50%",
          // backgroundSize: "20%",
          background: 'radial-gradient(circle , #420812 , black 67%)',
          backgroundAttachment : "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // backgroundSize: "50%",
          // backgroundSize: "cover",
        }}
      >
        {/* <div 
          className="absolute h-full w-full top-1/2 left-1/2 bg-center transform -translate-x-1/2 -translate-y-[40%]  z-10"
          style={{backgroundImage: `url(${ellipse})`}}
        > */}
        {/* <img src={ellipse} className="sticky top-0 left-1/2 h-[1440px w-[1158px h-[250%] w-full"/> */}
        {/* </div> */}

        {/* <ToastContainer /> */}
        <div
          className="flex justify-between
            hidde
            lg:bloc w-[18% pl-16 pr-8 pt-8
          "
        >
          {" "}
          {/* New Topbar  */}
          <div className="flex items-center gap-2">
            <div className="bg-[#161616] p-[1px] rounded-md group bg-gradient-to-r from-[#E9193F] to-[#831126]">
              <div className="flex justify-between items-center gap-4 rounded-md bg-black border-[#3a741f px-3 py-[6px]">
                <div
                  className={`font-semibold ${
                    gameSelect?.sport_name === "mma" ? "uppercase" : "capitalize"
                  }`}
                >
                  {gameSelect.sport_name}
                </div>
                <select
                  className="w-1/ font-semibold rounded-md outline-none bg-transparent px-1 text-white bg-gradient-to-r from-[#E9193F] to-[#831126]"
                  value={selectedLeague ? selectedLeague : gameSelect?.leagues?.[0]?.leagueName}
                  onChange={(e) => {
                    setMatchSearch("");
                    setOpenPopupIndex(false);
                    setSelectedLeague(e.target.value);
                    setLeague(e.target.value);
                    setSelectedGame(false);
                    let params =
                      "?sport=" +
                      gameSelect?.sport_name?.toLowerCase() +
                      "&league=" +
                      e.target.value;
                    handleMatchListAPI(params);
                  }}
                >
                  {gameSelect?.leagues &&
                    gameSelect?.leagues?.length >= 1 &&
                    gameSelect.leagues.map((leagueName, index) => (
                      <option
                        className="appearance-none bg-black text-white hover:text-black hover:shadow-[0 0 10px 100px #1882A8 inset] hover:text-semibold hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126]"
                        key={index}
                        onClick={() => {
                          // setOpenPopupIndex(false);
                          // setLeague(leagueName);
                          // setSelectedGame(false);
                          // let params =
                          //   "?sport=" +
                          //   gameSelect?.sport_name?.toLowerCase() +
                          //   "&league=" +
                          //   leagueName;
                          // handleMatchListAPI(params);
                        }}
                      >
                        {leagueName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              {gameList?.length > 0 &&
                gameList.map((item, index) => {
                  if (item?.sport_name === gameSelect?.sport_name) {
                    return;
                  }
                  return (
                    <div className="bg-[#161616] p-[1px] rounded-md group hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126]">
                      <div
                        style={{
                          color: gameSelect?.sport_name === item.sport_name && "#BFEB00",
                        }}
                        onClick={() => onGameClick(item)}
                        className={`cursor-pointer rounded-md bg-[#161616] border-2 border-[#161616] px-3 py-1 group-hover:text-[#F11941] ${
                          item?.sport_name === "mma" ? "uppercase" : "capitalize"
                        }`}
                      >
                        {item?.sport_name}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className="flex flex-col justify-end cursor-pointer  bg-gradient-to-r from-[#E9193F] to-[#831126] rounded-md p-[2px]"
            onClick={() => setOpenBalance(!openBalance)}
          >
            <div className="flex gap-2 justify-end items-center text-[#808080] bg-black px-2 pt-1">
              <div>Total Account Balance: </div>
              <RiArrowDownFill className="text-black rounded-full bg-gradient-to-r from-[#E9193F] to-[#831126]" />
            </div>
            <div className="text-right text-lg bg-black px-2 pb-1">
              {data?.balance_amount
                ? "$" +
                  Number(data?.balance_amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "-"}
            </div>
          </div>
          {/* Old Sidebar */}
          <div className="hidden ml-8 sticky left-0 top-24">
            {gameList?.length > 0 &&
              gameList.map((item, index) => (
                <div
                  style={{
                    color: gameSelect?.sport_name === item.sport_name && "#BFEB00",
                  }}
                  onClick={() => onGameClick(item)}
                  className={`pt-10 cursor-pointer hover:text-[#F11941] ${
                    item?.sport_name === "mma" ? "uppercase" : "capitalize"
                  }`}
                >
                  {item?.sport_name}
                </div>
              ))}
          </div>
        </div>
        {selectedGame && selectedGameDetails ? (
          <div className="xl:block w-[80% w-full border-l-2 border-l-[#191919] flex p-8 pl-16">
            <div
              className="flex mx-auto gap-2 cursor-pointer"
              onClick={() => setSelectedGame(false)}
            >
              <FaArrowAltCircleLeft size={25} className="text-[#0D0D0D] bg-white rounded-full" />
              <div>Back to Games</div>
            </div>
            <Game {...selectedGameDetails} />
          </div>
        ) : (
          <div
            className=" 
            xl:block w-[80% w-full pb-16 border-l-2 border-l-[#191919] flex p-8 pl-16"
          >
            {/* <div className="w-[90%] h-auto bg-[#191919] rounded overflow-hidden p-2">
            <button style={{ float: "right" }}>
              <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
            <div className="p-8">
              <div className="text-2xl">Announcement</div>
              <div className="text-sm text-[#b2b2b2] font-thin mt-2">
                We are searching for experienced traders who are able to predict
                how the market will move.
              </div>
              <button className="flex flex-row bg-[#b8e834] text-black font-extrabold py-2 px-6 rounded mt-4 text-sm">
                Button
                <ArrowRightIcon
                  className="h-5 w-5 text-black ml-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div> */}
            {openBalance && !matchListLoader && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 "
                onClick={() => setOpenBalance(false)}
              ></div>
            )}
            {/* <TabHeader /> */}
            {/* <SearchFilter /> */}
            <div className="flex flex-row justify-between mt-8">
              <div className="flex w-full border-2 border-[#161616] rounded-md py-2 xl:w-[60%] min-w-[200px]">
                <IoSearch size={15} className="my-auto ml-4 text-[#4C4C4C]" />
                <input
                  className="my-auto w-[80%] text-[#4C4C4C] placeholder:text-[#676767] font-bold bg-transparent px-2 ml-2 outline-none focus:border-transparent"
                  placeholder="Search in all fields"
                  value={matchSearch}
                  onChange={(e) => setMatchSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between min-h-screen">
              {openBalance && !matchListLoader && <BalancePopup challenges={challengesDetails} />}
              <div className={`${matchDetails && betDetails ? "w-[70%]" : "w-[90%]"}`}>
                {matchListLoader ? (
                  <div>
                    <Loader />
                  </div>
                ) : (
                  <BetFunction match={filteredMatches ? filteredMatches : matchList} />
                )}
              </div>

              {openPopupIndex && (
                <div
                  className={`bg-[#0D0D0D bg-transparent w-[25%] border-2 border-[#252525] rounded-xl sticky top-24 right-0 mt-12 h-[660px]`}
                >
                  <div className=" mt-2 pl-4 w-[95%] mx-auto text-[1.15rem]">Bet Slip</div>
                  <select
                    name="package"
                    className="rounded-lg border-[3px] border-[#1C1C1C] bg-[#1C1C1C bg-transparent text-[#c9c9c9] 
                  mt-2 ml-2 pl-4 w-[95%] py-1 h-10 max-w-full"
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    value={selectedPackage}
                  >
                    {" "}
                    <option value="" className="bg-black text-white">
                      Select Package
                    </option>
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
                    className="bg-[#141414 bg-white bg-opacity-[0.03] border-2 border-[#202020] rounded-xl
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
                          setSelectedPackage("");
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
                        <div className="">
                          {/* {betDetails.bet_points} */}
                          {betDetails?.name?.includes("Over") || betDetails?.name?.includes("Under")
                            ? betDetails.name
                            : betDetails?.bet_points >= 0
                            ? "+" + betDetails?.bet_points
                            : betDetails?.bet_points}
                        </div>
                      ) : (
                        <div className="text-[#F11941]">
                          {/* {betDetails.price} */}
                          {betDetails?.price >= 0 ? "+" + betDetails?.price : betDetails?.price}
                        </div>
                      )}
                    </div>
                    {(betDetails.bet_points || betDetails.bet_points === 0) && (
                      <div className="flex justify-between my-4 border-y-[2.5px] py-2 border-y-[#202020]">
                        <div className="text-[#898989] font-semibold">Odds</div>
                        {/* <div className="white">{betDetails.bet_points}</div> */}
                        <div className="text-[#F11941]">
                          {betDetails.price > 0 ? "+" + betDetails.price : betDetails.price}
                        </div>
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

                    <div className="flex justify-center mt-2 mb-2">
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
                        <span className="mr-1 text-[#B8E834 text-[#F11941]">
                          {winningProfit ? winningProfit : 0}
                        </span>
                        <span className="text-[#868686] ">USD</span>
                      </div>
                    </div>
                  </div>

                  <button
                    id="bet-button1"
                    onClick={handlePlaceBetAPI}
                    className="bet-button flex cursor-pointer justify-center w-[95%] mx-auto mt-2 mb-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-center py-3 text-black
                      disabled:cursor-not-allowed disabled:pointer-events-none
                    "
                    // disabled
                  >
                    <div className="font-extrabold my-auto mr-2">Place Bet</div>
                    <FaArrowRight className="my-auto" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* For small devices  */}

      <div
        className="text-white pt-4 border-b-2 border-b-[#161616]
          xl:hidden 
        "
        style={{
          // backgroundImage: `url(${ellipsePhone})`,
          // backgroundAttachment: "fixed",
          // backgroundPositionY: "38%",
          // backgroundPositionX: "50%",
          // backgroundSize: "110%",
          background: 'radial-gradient(#420812 , black 77%)',
          backgroundAttachment : "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {openBalance && !matchListLoader && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 "
            onClick={() => setOpenBalance(false)}
          ></div>
        )}{" "}
        <div
          className="pb-16 pt px-3 text-sm
        
        sm:w-[96%] sm:mx-auto sm:text-base
        xl:hidden xl:border-l-2 xl:border-l-[#191919] xl:pl-16"
        >
          {/* <div className="w-[96%] h-auto bg-[#191919] rounded overflow-hidden p-2">
            <button style={{ float: "right" }}>
              <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
            <div className="p-8">
              <div className="text-2xl">Announcement</div>
              <div className="text-sm text-[#b2b2b2] font-thin mt-2">
                We are searching for experienced traders who are able to predict
                how the market will move.
              </div>
              <button className="flex flex-row bg-[#b8e834] text-black font-extrabold py-2 px-6 rounded mt-4 text-sm">
                Button
                <ArrowRightIcon
                  className="h-5 w-5 text-black ml-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div> */}

          <div className="flex flex-col justify-end" onClick={() => setOpenBalance(!openBalance)}>
            <div className="flex justify-end items-center gap-2 text-right text-[#808080] cursor-pointer">
              <div>Total Account Balance: </div>
              <RiArrowDownFill className="text-black rounded-full bg-gradient-to-r from-[#E9193F] to-[#831126]" />
            </div>
            <div className="text-right text-lg">
              {data?.balance_amount
                ? "$" +
                  Number(data?.balance_amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "-"}
            </div>
          </div>

          <div className="flex xl:hidden relative mt-4">
            <FaChevronLeft
              size={15}
              className="my-auto"
              onClick={() => scrollSportSidebar("left")}
            />

            <div
              className="overflow-x-auto whitespace-nowrap text-lg mx-2"
              ref={scrollContainerRef}
            >
              <div className="flex">
                {/* <div className="inline-block bg-[#191919] px-4 py-1">
                  Basketball
                </div>
                <div className="inline-block px-4 py-1">Football</div>
                <div className="inline-block px-4 py-1">Baseball</div>
                <div className="inline-block px-4 py-1">Hockey</div> */}
                {gameList?.length > 0 &&
                  gameList.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        color: gameSelect?.sport_name === item.sport_name && "#F11941",
                      }}
                      className={`inline-block px-4 py-1 ${
                        item?.sport_name === "mma" ? "uppercase" : "capitalize"
                      }`}
                      onClick={() => onGameClickHandler(item, index)}
                    >
                      {item?.sport_name}
                    </div>
                  ))}
              </div>
            </div>

            <FaChevronRight
              size={15}
              className="my-auto"
              onClick={() => scrollSportSidebar("right")}
            />
          </div>

          {openBalance && !matchListLoader && <BalancePopup challenges={challengesDetails} />}

          <TabHeader />

          {selectedGame && selectedGameDetails ? (
            <div className="">
              <div
                className="flex mx-auto mt-8 gap-2 cursor-pointer"
                onClick={() => setSelectedGame(false)}
              >
                <FaArrowAltCircleLeft size={25} className="text-[#0D0D0D] bg-white rounded-full" />
                <div>Back to Games</div>
              </div>
              <Game {...selectedGameDetails} />
            </div>
          ) : (
            <>
              <div className="flex flex-row justify-between mt-8">
                <div className="flex w-full border-2 border-[#161616] rounded-md py-2 xl:w-[60%] min-w-[200px]">
                  <IoSearch size={15} className="my-auto ml-4 text-[#4C4C4C]" />
                  <input
                    className="my-auto w-[80%] text-[#4C4C4C] placeholder:text-[#676767] font-bold bg-transparent px-2 ml-2 outline-none focus:border-transparent"
                    placeholder="Search in all fields"
                    value={matchSearch}
                    onChange={(e) => setMatchSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex">
                <div className={`w-full min-h-screen`}>
                  {matchListLoader ? (
                    <Loader />
                  ) : (
                    <BetFunction match={filteredMatches ? filteredMatches : matchList} />
                  )}
                </div>

                {openPopupIndex && (
                  <div
                    className={`fixed top-0 w-full h-screen bg-black bg-opacity-40 z-30 overflow-hidden`}
                  />
                )}

                {openPopupIndex && (
                  <div
                    className={`bg-[#0D0D0D] w-[83%] border-2 border-[#252525] rounded-xl mt-4
                      fixed z-40 bottom-2 left-1/2 transform -translate-x-1/2`}
                  >
                    <div className=" flex flex-col overflow-y-auto h-[75vh]">
                      <div className="mt-4 pt-3 px-6 font-extrabold pb-1 text-[1.5rem]">
                        Bet Slip
                      </div>
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
                              setSelectedPackage("");
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
                        </div>
                        <div className="flex rounded-lg text-[#F11941] mt-4 border border-[#F11941] px-2 py-1">
                          {betDetails.name}
                        </div>
                        <div className="flex justify-between my-4 border-y-[2.5px] py-2 border-y-[#202020]">
                          <div className="text-[#898989] font-semibold">{marketName}</div>
                          {/* <div className="text-[#B8E834]">{betDetails.price}</div> */}
                          {marketName != "Moneyline" ? (
                            <div className="">
                              {/* {betDetails.bet_points} */}
                              {betDetails?.name?.includes("Over") ||
                              betDetails?.name?.includes("Under")
                                ? betDetails.name
                                : betDetails?.bet_points >= 0
                                ? "+" + betDetails?.bet_points
                                : betDetails?.bet_points}
                            </div>
                          ) : (
                            <div className="text-[#F11941]">
                              {/* {betDetails.price} */}
                              {betDetails?.price >= 0 ? "+" + betDetails?.price : betDetails?.price}
                            </div>
                          )}
                        </div>
                        {betDetails.bet_points && (
                          <div className="flex justify-between my-4 border-y-[2.5px] py-2 border-y-[#202020]">
                            <div className="text-[#898989] font-semibold">Odds</div>
                            {/* <div className="white">{betDetails.bet_points}</div> */}
                            <div className="text-[#F11941]">
                              {betDetails.price > 0 ? "+" + betDetails.price : betDetails.price}
                            </div>
                          </div>
                        )}

                        <div className="mt-2 text-lg font-semibold">Stake</div>

                        <div
                          className="flex border-[2.5px] border-[#202020] w-full rounded-md 
                            mt-2 py-2 "
                        >
                          <input
                            className="my-auto w-[80%] text-base text-[#676767] placeholder:text-[#676767] font-bold bg-transparent px-2 ml-2 outline-none focus:border-transparent"
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

                      <button
                        id="bet-button2"
                        onClick={handlePlaceBetAPI}
                        className={`bet-button flex cursor-pointer justify-center w-[95%] mx-auto mt-2 mb-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-center py-3 text-black
                           disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-[#a32a40]
                        `}
                        // disabled
                      >
                        <div className="font-extrabold my-auto mr-2">Place Bet</div>
                        <FaArrowRight className="my-auto" />
                      </button>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Trading;
