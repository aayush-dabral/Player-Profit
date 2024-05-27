import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { LuArrowDownToLine, LuArrowUpFromLine } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import { getBettingHistory } from "../../../redux/action/bettingHistory";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import "./styles.css";

import Analytics from "../../../components/analytics";
import { Loader } from "../../../components";

const TradingHistory = () => {
  const dispatch = useDispatch();
  const [openSection, setOpenSection] = useState(null);
  const bettingHistoryAPIState = useSelector(
    (state) => state?.getBettingHistoryReducer?.bettingHistoryDetails
  );
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState("0");
  const [challengeList, setChallengeList] = useState([]);
  const [tradeData, setTradeData] = useState([]);

  useEffect(() => {
    if (bettingHistoryAPIState?.status) {
      setData(bettingHistoryAPIState?.data);
      setIsLoading(false);
    }
  }, [bettingHistoryAPIState]);

  useEffect(() => {
    if (data) {
      const challengeSet = new Set(
        data
          .map((obj) => obj?.subscription_combined_value?.split("-")[0])
          .filter((value) => value !== null && value !== undefined)
      );
      setChallengeList([...challengeSet]);
      setTradeData(data);
    }
  }, [data]);

  useEffect(() => {
    dispatch(getBettingHistory(""));
    window.scroll(0, 0);
  }, []);

  const handleViewMore = (index) => {
    setOpenSection(openSection === index ? null : index);
  };


  //Filter and Sort section
  const [openFilterSort, setOpenFilterSort] = useState("none");

  useEffect(() => {
    setSelectedChallenges(appliedChallenges);
    setSelectedPhases(appliedPhases);
    setSelectedStatus(appliedStatus);
  }, [openFilterSort]);

  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [selectedPhases, setSelectedPhases] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const [appliedChallenges, setAppliedChallenges] = useState([]);
  const [appliedPhases, setAppliedPhases] = useState([]);
  const [appliedStatus, setAppliedStatus] = useState([]);

  // Function to handle changes in challenge selection
  const handleChallengeChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedChallenges([...selectedChallenges, value]);
    } else {
      setSelectedChallenges(selectedChallenges.filter((challenge) => challenge !== value));
    }
  };

  // Function to handle changes in phase selection
  const handlePhaseChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedPhases([...selectedPhases, value]);
    } else {
      setSelectedPhases(selectedPhases.filter((phase) => phase !== value));
    }
  };

  // Function to handle changes in status selection
  const handleStatusChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedStatus([...selectedStatus, value]);
    } else {
      setSelectedStatus(selectedStatus.filter((status) => status !== value));
    }
  };

  const handleFilter = () => {
    if (
      selectedChallenges.length === 0 &&
      selectedPhases.length === 0 &&
      selectedStatus.length === 0
    ) {
      setIsLoading(true);
      setTradeData(data);
      setIsLoading(false);
    } else {
      setAppliedChallenges(selectedChallenges);
      setAppliedPhases(selectedPhases);
      setAppliedStatus(selectedStatus);

      if (selectedChallenges && selectedChallenges.length > 0) {
        setTradeData(
          data.filter((trade) =>
            selectedChallenges.includes(trade?.subscription_combined_value?.split("-")[0])
          )
        );
      }

      if (selectedPhases && selectedPhases.length > 0) {
        setTradeData(data.filter((trade) => selectedPhases.includes(trade.phase)));
      }

      if (selectedStatus && selectedStatus.length > 0) {
        setTradeData(
          data.filter((trade) => {
            if (trade.status === "settled") {
              return selectedStatus.includes(trade.result);
            } else {
              return selectedStatus.includes(trade.status);
            }
          })
        );
      }

      setOpenFilterSort("none");
    }
  };

  const handleRemoveFilter = () => {
    setTradeData(data);
    setAppliedChallenges([]);
    setAppliedPhases([]);
    setAppliedStatus([]);
    setSelectedChallenges([]);
    setSelectedPhases([]);
    setSelectedStatus([]);
    setOpenBets(false);
    setOpenFilterSort("none");
  };

  const [openBets, setOpenBets] = useState(false);

  const showOpenBets = (option) => {
    if (option) {
      // setSelectedStatus(...selectedStatus, "Active");
      // setAppliedStatus(selectedStatus);

      setTradeData(tradeData.filter((trade) => trade.status === "Active"));
    } else {
      handleFilter();
    }

    setOpenFilterSort("none");
  };

  const [sortOption, setSortOption] = useState("DateNew");

  const handleSort = (option) => {
    if (option === "DateOld") {
      setTradeData(tradeData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
    } else {
      setTradeData(tradeData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    }
    setOpenFilterSort("none");
  };

  return (
    <div className="min-h-[60vh]">
      {isLoading ? (
        <Loader />
      ) : data.length === 0 ? (
        <div className="text-[#868686] text-center mt-8">No Trading History Found</div>
      ) : (
        <div className="flex flex-col text-white border-b-2 border-b-[#161616] min-h-screen xl:flex-row">
          {/* For larger screens */}
          <div className="hidden xl:block w-[100%] pt-8 pb-16 border-l-2 border-l-[#191919] text-sm">
            <Analytics phase={phase} setPhase={setPhase} data={data} />

            <div className="text-3xl w-[90%] mx-auto">Bets</div>
            <div className="flex text-white mx-auto w-[90%] mt-4">
              {/* Import/Export Bets  */}
              <div className="border-2 border-[#191919] rounded-md px-3 py-2 flex">
                <div>Import Bets</div>
                {/* Import Icon */}
                <LuArrowDownToLine size={15} className="my-auto ml-2" />
              </div>
              <div className="border-2 border-[#191919] rounded-md ml-2 px-3 py-2 flex">
                <div>Export Bets</div>
                {/* Export Icon  */}
                <LuArrowUpFromLine size={15} className="my-auto ml-2" />
              </div>
            </div>

            {/* For lg-xl devices  */}
            <div className=" w-[90%] mx-auto mt-3 mb-6 flex lg:justify-between ">
              {/* Search, sort and filters  */}
              <div className="w-[38%]">
                <div className="flex w-full border-2 border-[#161616] rounded-md py-2">
                  <IoSearch size={15} className="my-auto ml-4" />
                  <input
                    className="my-auto bg-transparent px-2 ml-2"
                    placeholder="Search in all fields"
                  />
                </div>
              </div>

              <div className="flex">
                <div
                  className={`border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer
                ${openBets ? "bg-[#F11941] text-white border-black font-semibold" : ""}
              `}
                  onClick={() => {
                    setOpenBets(!openBets);
                    showOpenBets(!openBets);
                  }}
                >
                  Show Open Bets
                </div>
                <div
                  className="flex border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer"
                  onClick={() =>
                    openFilterSort === "sort"
                      ? setOpenFilterSort("none")
                      : setOpenFilterSort("sort")
                  }
                >
                  <div>Sort</div>
                  <BiSort size={15} className="my-auto ml-2" />
                </div>
                <div
                  className="flex border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer"
                  onClick={() =>
                    openFilterSort === "filter"
                      ? setOpenFilterSort("none")
                      : setOpenFilterSort("filter")
                  }
                >
                  <div>Filters</div>
                  <IoFilter size={15} className="my-auto ml-2" />
                </div>
              </div>

              {/* When the filters button is clicked, we have to show a number of filters  */}
            </div>

            {/* Filter */}
            {openFilterSort === "filter" && (
              <div className="absolute border rounded-xl right-[6%] w-[255px] bg-[#0D0D0D] drop-shadow-2xl px-2 py-2">
                <div className="overflow-y-auto scrollbar max-h-[325px] ">
                  {/* Challenge Name */}
                  <div className="">
                    <div className="">Challenge Name</div>
                    {challengeList.map((challenge, index) => (
                      <div key={index} className="flex">
                        <div className="flex gap-2 text-black">
                          <input
                            type="checkbox"
                            id="some_id"
                            className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                            checked={selectedChallenges.includes(challenge)}
                            value={challenge}
                            onChange={handleChallengeChange}
                          />
                          <svg
                            className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div className="ml-2">{challenge}</div>
                      </div>
                    ))}
                    {/* <div className="flex">
                  <div className="flex gap-2 text-black">
                    <input
                      type="checkbox"
                      id="some_id"
                      className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#b8e834] checked:border-0
                      "
                      value="Challenge 1"
                      onChange={handleChallengeChange}
                    />
                    <svg
                      className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="ml-2">Challenge 1</div>
                </div> */}
                    {/* <div className="flex">
                  <div className="flex gap-2 text-black">
                    <input
                      type="checkbox"
                      id="some_id"
                      className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#b8e834] checked:border-0
                      "
                      value="Challenge 2"
                      onChange={handleChallengeChange}
                    />
                    <svg
                      className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="ml-2">Challenge 2</div>
                </div>
                <div className="flex">
                  <div className="flex gap-2 text-black">
                    <input
                      type="checkbox"
                      id="some_id"
                      className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#b8e834] checked:border-0
                      "
                      value="Challenge 3"
                      onChange={handleChallengeChange}
                    />
                    <svg
                      className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="ml-2">Challenge 3</div>
                </div>
                <div className="flex">
                  <div className="flex gap-2 text-black">
                    <input
                      type="checkbox"
                      id="some_id"
                      className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#b8e834] checked:border-0
                      "
                      value="Challenge 4"
                      onChange={handleChallengeChange}
                    />
                    <svg
                      className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="ml-2">Challenge 4</div>
                </div> */}
                  </div>
                  {/* Phase */}
                  <div className="mt-4">
                    <div className="">Phase</div>
                    <div className="flex"></div>
                    <div className="flex items-center">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedPhases.includes("phase 1")}
                          value="phase 1"
                          onChange={handlePhaseChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="ml-2">Phase 1</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedPhases.includes("phase 2")}
                          value="phase 2"
                          onChange={handlePhaseChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="ml-2">Phase 2</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedPhases.includes("phase 3")}
                          value="phase 3"
                          onChange={handlePhaseChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="ml-2">Phase 3</div>
                    </div>
                  </div>
                  {/* Status */}
                  <div className="mt-4">
                    <div className="">Status</div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("win")}
                          value="win"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Win</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("loss")}
                          value="loss"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Loss</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("half won")}
                          value="half won"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Half Won</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("half lost")}
                          value="half lost"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Half Lost</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("Active")}
                          value="Active"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Active</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("Refunded")}
                          value="Refunded"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Refunded</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 w-full mt-4">
                  <button
                    className="border border-[#F11941] text-[#F11941] font-semibold rounded-lg px-4 py-1"
                    onClick={handleRemoveFilter}
                  >
                    Remove Filter
                  </button>
                  <button
                    className="bg-[#F11941] text-black font-semibold rounded-lg px-4 py-1"
                    onClick={handleFilter}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {/* Sort */}
            {openFilterSort === "sort" && (
              <div className="absolute border rounded-xl right-[6%] w-[255px] bg-[#0D0D0D] drop-shadow-2xl px-2 py-2">
                <div className="overflow-y-auto scrollbar max-h-[325px] ">
                  <div
                    className={`px-2 py-1 rounded-lg cursor-pointer ${
                      sortOption === "DateNew" ? "bg-[#F11941] text-black font-medium" : ""
                    }`}
                    onClick={() => {
                      setSortOption("DateNew");
                      handleSort("DateNew");
                    }}
                  >
                    Date Created {"-"} Newest First
                  </div>
                  <div
                    className={` px-2 py-1 rounded-lg ${
                      sortOption === "DateOld" ? "bg-[#F11941] text-black font-medium" : ""
                    } cursor-pointer`}
                    onClick={() => {
                      setSortOption("DateOld");
                      handleSort("DateOld");
                    }}
                  >
                    Date Created {"-"} Oldest First
                  </div>
                </div>

                {/* <div className="flex justify-end gap-2 w-full mt-4">
              <button
                className="border border-[#b8e834] text-[#b8e834] font-semibold rounded-lg px-4 py-1"
                onClick={handleRemoveFilter}
              >
                Remove Filter
              </button>
              <button
                className="bg-[#b8e834] text-black font-semibold rounded-lg px-4 py-1"
                onClick={handleFilter}
              >
                Apply
              </button>
            </div> */}
              </div>
            )}

            {tradeData.map((trade, index) => (
              <div
                key={index}
                className="bg-[#0D0D0D] w-[90%] mx-auto mb-8 py-6 rounded-xl font-medium"
              >
                <div className="flex flex-row-reverse justify-between px-8 text-lg text-center">
                  {/* Payment status  */}
                  {trade?.result ? (
                    <div className="flex gap-4">
                      <div
                        style={{
                          // backgroundColor: trade?.result === "win"? '#121705': trade?.result == "loss" ? 'rgb(255,0,0,0.1)' : trade?.result == "refunded" ? '#191919' : '#171405',
                          color:
                            trade?.result == "win" || trade?.result == "half won"
                              ? "#b8e834"
                              : "red",
                        }}
                        className={`
                      rounded-lg capitalize px-6 py-1
                      bg-${
                        trade?.result == "win" || trade?.result == "Half Won"
                          ? "[#121705]"
                          : trade?.result == "loss" || trade?.result == "Half Lost"
                          ? "[rgb(255,0,0,0.1)]"
                          : trade?.result == "Refunded"
                          ? "[#191919]"
                          : "[#171405]"
                      }
                    `}
                      >
                        {trade?.result}
                        {/* {trade?.result === "win"? 'Half Won': trade?.result == "Half Loss" ? '[rgb(255,0,0,0.1)]' : trade?.result == "Refunded"}  */}
                      </div>
                    </div>
                  ) : // <div className="bg-[#121705] text-[#b8e834] rounded-lg w-16">
                  //   In Progress
                  // </div>
                  trade?.result == "Refunded" ? (
                    <div className="flex gap-4">
                      <div className="bg-[#191919] text-white rounded-lg capitalize">
                        {trade?.result}
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <div className="bg-[#171405] text-[#E8cb34] rounded-lg capitalize">
                        Active
                      </div>
                    </div>
                  )}

                  <div className="capitalize flex gap-2">
                    <div className="flex">
                      <div>{trade.phase}</div>
                      <div className="ml-2">-</div>
                    </div>
                    <div>
                      {trade?.subscription_combined_value &&
                        trade.subscription_combined_value.split("-")[0]}
                    </div>
                  </div>
                </div>

                <div className="flex gap-8 mt-4 px-8 font-semibold">
                  {/* Event Name */}
                  {/* {trade?.bet_name} */}
                  <div>
                    <div className="text-[#565656]">Home</div>
                    <div className="text-[25.88px] mt-2">{trade.home_team}</div>
                  </div>
                  <div className="mt-auto">vs</div>
                  <div>
                    <div className="text-[#565656]">Away</div>
                    <div className="text-[25.88px] mt-2">{trade.away_team}</div>
                  </div>
                </div>

                <div className="px-8 mt-4 font-medium text-[#F11941]">{trade.league}</div>

                <div className="mt-6 ml-8">
                  <div className="flex w-full gap-8 text-base flex-wrap">
                    <div className="">
                      {/* Amount Paid  */}
                      <div className="text-[#868686]">Bet Name</div>
                      <div className=" mt-2 pr-6">{trade.bet_name}</div>
                    </div>
                    <div className="">
                      {/* Amount Paid  */}
                      <div className="text-[#868686]">Stake</div>
                      <div className=" mt-2 pr-6">
                        ${Number(trade?.bet_amount).toLocaleString("en")}.00
                      </div>
                    </div>
                    <div className="">
                      {/* Purchase Date  */}
                      <div className="text-[#868686]">Market Name</div>
                      <div className=" mt-2 pr-6">{trade?.market_name}</div>
                    </div>
                    <div className="">
                      {/* Purchase Date  */}
                      <div className="text-[#868686]">Odds</div>
                      <div
                        className={`
                      mt-2 pr-6
                      ${trade?.odds_price < 0 ? "text-[#b8e834]" : "text-[#e83434]"}
                    `}
                      >
                        {trade?.odds_price && trade?.odds_price > 0 ? "+" : ""}
                        {trade?.odds_price}
                      </div>
                    </div>
                    <div className="">
                      {/* Event Start Date */}
                      <div className="text-[#868686]">Event Start Date</div>
                      <div className=" mt-2 pr-6">
                        {trade?.game_start_date &&
                          moment(trade?.game_start_date).format("MM-DD-YYYY")}
                      </div>
                    </div>
                    <div className="">
                      {/* CLV */}
                      <div className="text-[#868686]">CLV</div>
                      <div className=" mt-2 pr-6">
                        {trade?.clv &&
                          trade?.odds_price &&
                          (trade?.odds_price > 0 ? "+" : trade?.odds_price < 0 ? "-" : "")}
                        {trade?.clv ? trade?.clv : "NA"}
                      </div>
                    </div>
                    <div className="">
                      {/* Date Created  */}
                      <div className="text-[#868686]">Date Created</div>
                      <div className=" mt-2 pr-6">
                        {trade?.created_at && moment(trade?.created_at).format("MM-DD-YYYY")}
                      </div>
                    </div>
                    <div className="">
                      {/* Win Amount  */}
                      <div className="text-[#868686]">Win Amount</div>
                      <div className=" mt-2 pr-6">
                        {trade.status &&
                        (trade.result === "half lost" ||
                          trade.result === "loss" ||
                          trade.status === "refunded")
                          ? "$0"
                          : trade.result === "half won"
                          ? "$" + (Number(trade?.win_amount) / 2).toLocaleString("en")
                          : "$" + Number(trade?.win_amount).toLocaleString("en")}
                      </div>
                    </div>
                  </div>

                  {/* <div
                onClick={() => handleViewMore(index)}
                className="flex justify-center py-4 text-[#565656]"
              >
                {openSection === index ? (
                  <div className="mx-auto flex w-[50%]">
                    <div>View Less</div>
                    <FaAngleUp size={18} className="my-auto" />
                  </div>
                ) : (
                  <div className="mx-auto flex w-[50%]">
                    <div>View More</div>
                    <FaAngleDown size={18} className="my-auto" />
                  </div>
                )}
              </div> */}
                </div>
              </div>
            ))}
          </div>

          {/* For smaller Screen  */}
          <div className="w-full pb-10 xl:hidden">
            <Analytics phase={phase} setPhase={setPhase} data={data} />
            <div className="text-3xl w-[90%] mx-auto mb-8">Bets</div>
            <div className="flex text-white mx-auto w-[90%] mt-3">
              {/* Import/Export Bets  */}
              <div className="border-2 border-[#191919] rounded-md px-3 py-2 flex">
                <div>Import Bets</div>
                {/* Import Icon */}
                <LuArrowDownToLine size={15} className="my-auto ml-2" />
              </div>
              <div className="border-2 border-[#191919] rounded-md ml-2 px-3 py-2 flex">
                <div>Export Bets</div>
                {/* Export Icon  */}
                <LuArrowUpFromLine size={15} className="my-auto ml-2" />
              </div>
            </div>

            {/* For lg-xl devices  */}
            <div
              className=" w-[90%] mx-auto mt-3 mb-6
        hidden
        lg:flex lg:justify-between "
            >
              {/* Search, sort and filters  */}
              <div className="w-[38%]">
                <div className="flex w-full border-2 border-[#161616] rounded-md py-2">
                  <IoSearch size={15} className="my-auto ml-4" />
                  <input
                    className="my-auto bg-transparent px-2 ml-2"
                    placeholder="Search in all fields"
                  />
                </div>
              </div>

              <div className="flex">
                <div
                  className={`border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer
                ${openBets ? "bg-[#F11941] text-white border-black font-semibold" : ""}
              `}
                  onClick={() => {
                    setOpenBets(!openBets);
                    showOpenBets(!openBets);
                  }}
                >
                  Show Open Bets
                </div>
                <div
                  className="flex border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer"
                  onClick={() =>
                    openFilterSort === "sort"
                      ? setOpenFilterSort("none")
                      : setOpenFilterSort("sort")
                  }
                >
                  <div>Sort</div>
                  <BiSort size={15} className="my-auto ml-2" />
                </div>
                <div
                  className="flex border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer"
                  onClick={() =>
                    openFilterSort === "filter"
                      ? setOpenFilterSort("none")
                      : setOpenFilterSort("filter")
                  }
                >
                  <div>Filters</div>
                  <IoFilter size={15} className="my-auto ml-2" />
                </div>
              </div>

              {/* When the filters button is clicked, we have to show a number of filters  */}
            </div>

            {/* For xsm-lg devices */}
            <div
              className="hidden justify-between mx-auto w-[90%] mt-3
          xsm:flex xsm:flex-col
          lg:hidden"
            >
              {/* Search, sort and filters  */}
              <div className="flex justify-between">
                <div className="flex border-2 border-[#161616] rounded-md py-2">
                  <IoSearch size={15} className="my-auto ml-4" />
                  <input
                    className="my-auto bg-transparent px-2 ml-2"
                    placeholder="Search in all fields"
                  />
                </div>
                <div
                  className="flex border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer"
                  onClick={() =>
                    openFilterSort === "sort"
                      ? setOpenFilterSort("none")
                      : setOpenFilterSort("sort")
                  }
                >
                  <div>Sort</div>
                  <BiSort size={15} className="my-auto ml-2" />
                </div>
              </div>

              <div className="flex justify-between mt-4 mb-4">
                <div
                  className={`border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer
                ${openBets ? "bg-[#F11941] text-white border-black font-semibold" : ""}
              `}
                  onClick={() => {
                    setOpenBets(!openBets);
                    showOpenBets(!openBets);
                  }}
                >
                  Show Open Bets
                </div>

                <div
                  className="flex border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer"
                  onClick={() =>
                    openFilterSort === "filter"
                      ? setOpenFilterSort("none")
                      : setOpenFilterSort("filter")
                  }
                >
                  <div>Filters</div>
                  <IoFilter size={15} className="my-auto ml-2" />
                </div>
              </div>

              {/* When the filters button is clicked, we have to show a number of filters  */}
            </div>

            {/* For 0-xsm devices  */}
            <div
              className="flex flex-col mx-auto w-[90%] mt-3
          xsm:hidden"
            >
              {/* Search, sort and filters  */}
              <div className="flex justify-between">
                <div className="flex border-2 border-[#161616] rounded-md py-2">
                  <IoSearch size={15} className="my-auto ml-4" />
                  <input
                    className="my-auto bg-transparent px-2 ml-2"
                    placeholder="Search in all fields"
                  />
                </div>
              </div>

              <div
                className="flex border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer"
                onClick={() =>
                  openFilterSort === "sort" ? setOpenFilterSort("none") : setOpenFilterSort("sort")
                }
              >
                <div>Sort</div>
                <BiSort size={15} className="my-auto ml-2" />
              </div>

              <div className="flex justify-between mt-4 mb-4">
                <div
                  className={`border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer
                ${openBets ? "bg-[#F11941] text-white border-black font-semibold" : ""}
              `}
                  onClick={() => {
                    setOpenBets(!openBets);
                    showOpenBets(!openBets);
                  }}
                >
                  {" "}
                  Show Open Bets
                </div>

                <div
                  className="flex border-2 border-[#161616] rounded-md my-auto ml-2 py-2 px-4 cursor-pointer"
                  onClick={() =>
                    openFilterSort === "filter"
                      ? setOpenFilterSort("none")
                      : setOpenFilterSort("filter")
                  }
                >
                  {" "}
                  <div>Filters</div>
                  <IoFilter size={15} className="my-auto ml-2" />
                </div>
              </div>

              {/* When the filters button is clicked, we have to show a number of filters  */}
            </div>

            {/* Filter */}
            {openFilterSort === "filter" && (
              <div className="absolute border rounded-xl right-[6%] w-[255px] bg-[#0D0D0D] drop-shadow-2xl px-2 py-2">
                <div className="overflow-y-auto scrollbar max-h-[325px] ">
                  {/* Challenge Name */}
                  <div className="">
                    <div className="">Challenge Name</div>
                    {challengeList.map((challenge, index) => (
                      <div key={index} className="flex">
                        <div className="flex gap-2 text-black">
                          <input
                            type="checkbox"
                            id="some_id"
                            className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                            checked={selectedChallenges.includes(challenge)}
                            value={challenge}
                            onChange={handleChallengeChange}
                          />
                          <svg
                            className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div className="ml-2">{challenge}</div>
                      </div>
                    ))}
                  </div>
                  {/* Phase */}
                  <div className="mt-4">
                    <div className="">Phase</div>
                    <div className="flex"></div>
                    <div className="flex items-center">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedPhases.includes("phase 1")}
                          value="phase 1"
                          onChange={handlePhaseChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="ml-2">Phase 1</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedPhases.includes("phase 2")}
                          value="phase 2"
                          onChange={handlePhaseChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="ml-2">Phase 2</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedPhases.includes("phase 3")}
                          value="phase 3"
                          onChange={handlePhaseChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="ml-2">Phase 3</div>
                    </div>
                  </div>
                  {/* Status */}
                  <div className="mt-4">
                    <div className="">Status</div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("win")}
                          value="win"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Win</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("loss")}
                          value="loss"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Loss</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("half won")}
                          value="half won"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Half Won</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("half lost")}
                          value="half lost"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Half Lost</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("Active")}
                          value="Active"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Active</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 text-black">
                        <input
                          type="checkbox"
                          id="some_id"
                          className="
                      relative peer shrink-0
                      appearance-none w-4 h-4 border-2 border-none rounded-sm bg-[#555555]
                      mt-1
                      checked:bg-[#F11941] checked:border-0
                      "
                          checked={selectedStatus.includes("Refunded")}
                          value="Refunded"
                          onChange={handleStatusChange}
                        />
                        <svg
                          className="
                      absolute 
                      w-4 h-4 mt-1
                      hidden peer-checked:block
                      pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>Refunded</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 w-full mt-4">
                  <button
                    className="border border-[#F11941] text-[#F11941] font-semibold rounded-lg px-4 py-1"
                    onClick={handleRemoveFilter}
                  >
                    Remove Filter
                  </button>
                  <button
                    className="bg-[#F11941] text-black font-semibold rounded-lg px-4 py-1"
                    onClick={handleFilter}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {/* Sort */}
            {openFilterSort === "sort" && (
              <div className="absolute border rounded-xl right-[6%] w-[255px] bg-[#0D0D0D] drop-shadow-2xl px-2 py-2">
                <div className="overflow-y-auto scrollbar max-h-[325px] ">
                  <div
                    className={`px-2 py-1 rounded-lg cursor-pointer ${
                      sortOption === "DateNew" ? "bg-[#F11941] text-black font-medium" : ""
                    }`}
                    onClick={() => {
                      setSortOption("DateNew");
                      handleSort("DateNew");
                    }}
                  >
                    Date Created {"-"} Newest First
                  </div>
                  <div
                    className={` px-2 py-1 rounded-lg ${
                      sortOption === "DateOld" ? "bg-[#F11941] text-black font-medium" : ""
                    } cursor-pointer`}
                    onClick={() => {
                      setSortOption("DateOld");
                      handleSort("DateOld");
                    }}
                  >
                    Date Created {"-"} Oldest First
                  </div>
                </div>
              </div>
            )}

            {tradeData.map((trade, index) => (
              <div key={index} className="bg-[#0D0D0D] w-[90%]  mx-auto mb-8 rounded-xl">
                <div className="flex flex-col justify-start px-4 pt-4 text-lg text-center">
                  {/* Payment status  */}
                  {trade?.result ? (
                    <div className="flex flex-row-reverse items-center justify-between flex-co gap-4">
                      <div
                        style={{
                          // backgroundColor: trade?.result === "win"? '#121705': trade?.result == "loss" ? 'rgb(255,0,0,0.1)' : trade?.result == "refunded" ? '#191919' : '#171405',
                          color:
                            trade?.result == "win" || trade?.result == "half won"
                              ? "#b8e834"
                              : "red",
                        }}
                        className={`
                      rounded-lg capitalize px-6 py-1
                      bg-${
                        trade?.result == "win" || trade?.result == "Half Won"
                          ? "[#121705]"
                          : trade?.result == "loss" || trade?.result == "Half Lost"
                          ? "[rgb(255,0,0,0.1)]"
                          : trade?.result == "Refunded"
                          ? "[#191919]"
                          : "[#171405]"
                      }
                    `}
                      >
                        {trade?.result}
                        {/* {trade?.result === "win"? 'Half Won': trade?.result == "Half Loss" ? '[rgb(255,0,0,0.1)]' : trade?.result == "Refunded"}  */}
                      </div>
                      <div>
                        {/* {trade?.subscription_combined_value &&
                      trade.subscription_combined_value.split("-")[0]} */}
                        {trade?.bet_name}
                      </div>
                    </div>
                  ) : // <div className="bg-[#121705] text-[#b8e834] rounded-lg w-16">
                  //   In Progress
                  // </div>
                  trade?.result == "Refunded" ? (
                    <div className="flex flex-co gap-4">
                      <div className="bg-[#191919] text-white rounded-lg capitalize">
                        {trade?.result}
                      </div>
                      <div>
                        {/* {trade?.subscription_combined_value &&
                      trade.subscription_combined_value.split("-")[0]} */}
                        {trade?.bet_name}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-co gap-4">
                      <div className="bg-[#171405] text-[#E8cb34] rounded-lg capitalize">
                        Active
                      </div>
                      <div>
                        {/* {trade?.subscription_combined_value &&
                      trade.subscription_combined_value.split("-")[0]} */}
                        {trade?.bet_name}
                      </div>
                    </div>
                  )}

                  <div className="capitalize text-left text-[16px]">
                    {/* {trade.phase} */}
                    {trade?.market_name}
                  </div>

                  <div className="flex gap-2 text-left text-[16px]">
                    {/* {trade.phase} */}
                    <div className="text-[#868686]">Stake:</div>
                    <div className="font-light">
                      ${Number(trade?.bet_amount).toLocaleString("en")}
                    </div>
                  </div>

                  <div className="flex gap-2 text-left text-[16px]">
                    {/* {trade.phase} */}
                    <div className="text-[#868686]">Win Amount:</div>
                    <div className="font-light">
                      {trade.status &&
                      (trade.result === "half lost" ||
                        trade.result === "loss" ||
                        trade.status === "refunded")
                        ? "$0"
                        : trade.result === "half won"
                        ? "$" + (Number(trade?.win_amount) / 2).toLocaleString("en")
                        : "$" + Number(trade?.win_amount).toLocaleString("en")}
                    </div>
                  </div>

                  <div className="flex gap-2 text-left ">
                    {/* {trade.phase} */}
                    <div className="text-[#6b6b6b] text-[12px]">
                      {moment(trade?.created_at).format("MMM DD | h:mm A")}
                    </div>
                  </div>
                </div>

                {/* <div className="pt-4 px-8 text-lg">
              {trade?.bet_name}
            </div> */}

                <div className="mt- px-4">
                  {openSection === index && (
                    <div>
                      <div className="flex flex-col gap-2 mt-2  font-semibold">
                        {/* Event Name */}
                        {/* {trade?.bet_name} */}
                        <div>
                          <div className="text-[#565656]">Home</div>
                          <div className="text-[24.88px] mt-">{trade.home_team}</div>
                        </div>
                        <div className="mt-auto">vs</div>
                        <div>
                          <div className="text-[#565656]">Away</div>
                          <div className="text-[24.88px] mt-">{trade.away_team}</div>
                        </div>
                      </div>

                      <div className="px- mt-2 font-medium text-[#F11941]">{trade.league}</div>

                      {/* <div className="flex w-full ">
                    <div className="w-[50%] ">
                      <div className="text-[#868686]">Stake</div>
                      <div className=" mt-2 pr-6">
                        $ {Number(trade?.bet_amount).toLocaleString("en")}.00
                      </div>
                    </div>
                    <div className="w-[50%] ">
                      <div className="text-[#868686]">Win Amount</div>
                      <div className=" mt-2 pr-6">
                        {trade.status &&
                        (trade.result === ("half lost" || "lost") ||
                          trade.status === "refunded")
                          ? "$0"
                          : trade.result === "half won"
                          ? "$" +
                            (Number(trade?.win_amount) / 2).toLocaleString("en")
                          : "$" +
                            Number(trade?.win_amount).toLocaleString("en")}
                      </div>
                    </div>
                  </div> */}

                      <div className="flex w-full mt-4 pb-2">
                        <div className="w-[50%] ">
                          {/* Odds  */}
                          <div className="text-[#868686]">Phase</div>
                          <div className=" mt-2 pr-6 capitalize">{trade?.phase}</div>
                        </div>
                        <div className="w-[50%] ">
                          {/* CLV  */}
                          <div className="text-[#868686]">Challenge</div>
                          <div className=" mt-2 pr-6">
                            {/* {trade?.clv} */}
                            {trade?.subscription_combined_value &&
                              trade.subscription_combined_value.split("-")[0]}
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full mt-4 pb-2">
                        <div className="w-[50%] ">
                          {/* Odds  */}
                          <div className="text-[#868686]">Odds</div>
                          <div
                            className={` mt-2 pr-6 ${
                              trade?.odds_price < 0 ? "text-[#b8e834]" : "text-[#e83434]"
                            }`}
                          >
                            {trade?.odds_price && trade?.odds_price > 0 ? "+" : ""}
                            {trade?.odds_price}
                          </div>
                        </div>
                        <div className="w-[50%] ">
                          {/* CLV  */}
                          <div className="text-[#868686]">CLV</div>
                          <div className=" mt-2 pr-6">
                            {/* {trade?.clv} */}
                            {trade?.clv &&
                              trade?.odds_price &&
                              (trade?.odds_price > 0 ? "+" : trade?.odds_price < 0 ? "-" : "")}
                            {trade?.clv ? trade?.clv : "NA"}
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full mt-2 pb-2">
                        <div className="w-[50%] ">
                          {/* Date Created  */}
                          <div className="text-[#868686]">Date Created</div>
                          <div className=" mt-2 pr-6">
                            {trade?.created_at && moment(trade?.created_at).format("MM-DD-YYYY")}
                          </div>
                        </div>
                        <div className="w-[50%] ">
                          {/* Event Start Date  */}
                          <div className="text-[#868686]">Event Start Date</div>
                          <div className=" mt-2 pr-6">
                            {trade?.game_start_date &&
                              moment(trade?.game_start_date).format("MM-DD-YYYY")}
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex w-full mt-4 pb-6">
                    <div className="w-[50%] ">
                      <div className="text-[#868686]">Phase</div>
                      <div className=" mt-2 pr-6">{trade.phase}</div>
                    </div>
                  </div> */}
                    </div>
                  )}

                  <div
                    onClick={() => handleViewMore(index)}
                    className="flex justify-center pb-2 pt-2 text-[#565656]"
                  >
                    {openSection === index ? (
                      <div className="mx-auto flex justify-center w-[50%]">
                        <div>View Less</div>
                        <FaAngleUp size={18} className="my-auto" />
                      </div>
                    ) : (
                      <div className="mx-auto flex justify-center w-[50%]">
                        <div>View More</div>
                        <FaAngleDown size={18} className="my-auto" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingHistory;
