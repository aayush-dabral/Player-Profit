import React, { useState, useEffect } from "react";
import Analytics from "../analytics";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./AccordionStyle.css";
import { getAdvanceStatistics } from "../../redux/action/advanceStatistics";

const Accordion = ({ bettingData, challengeData, heading, keyIndex }) => {
  console.log(bettingData);
  const dispatch = useDispatch();
  const advanceStatisticsData = useSelector(
    (state) => state?.advanceStatisticsReducer?.advanceStatisticsDetails
  );
  const [openAccordion, setOpenAccordion] = useState(null);
  const [advanceAccordianData, setAdvanceAccordianData] = useState([]);

  const handleAccordionToggle = (index) => {
    console.log(index);
    setOpenAccordion(openAccordion === index ? null : index);
    if (challengeData.length > 0 && openAccordion !== index) {
      const params = "?subscription_id=" + challengeData[0].subscription_id;
      dispatch(getAdvanceStatistics(params));
    }
  };

  const [phase, setPhase] = useState((challengeData?.length - 1).toString());

  const handleChange = (event) => {
    const selectedIndex = event.target.value;
    setPhase(selectedIndex);
  };

  useEffect(() => {
    if (advanceStatisticsData) {
      setAdvanceAccordianData(advanceStatisticsData?.data[0]);
    }
  }, [advanceStatisticsData]);

  return (
    <div className="w-full mx-auto">
      <div>
        <div className="accordianBorder bg-black border-b-2 border-b-[#191919] border-x-2 border-x-black border-t-2 border-t-black  mb- pt-2 px-2">
          <div
            onClick={() => handleAccordionToggle(keyIndex)}
            className="flex justify-between pb-4 pt-1"
          >
            <div className="flex">
              <div className="mt-1">{heading}</div>
              <div
                className={`ml-4 
                          ${
                            challengeData[
                              phase ? phase : challengeData?.length - 1
                            ]?.challenge_status === "Passes"
                              ? "bg-[#121705] text-[#b8e834] rounded-lg px-2 py-1 mx-auto w-16"
                              : challengeData[
                                  phase ? phase : challengeData?.length - 1
                                ]?.challenge_status === "In Progress"
                              ? "bg-[#171405] text-[#E8cb34] rounded-lg px-2 py-1 mx-auto text-center w-28"
                              : "bg-[#191919] text-white rounded-lg px-2 py-1 mx-auto text-center w-28"
                          }`}
              >
                {
                  challengeData[phase ? phase : challengeData?.length - 1]
                    ?.challenge_status
                }
              </div>
            </div>

            <div className="my-auto">
              {openAccordion === keyIndex ? (
                <FaChevronUp size={15} />
              ) : (
                <FaChevronDown size={15} />
              )}
            </div>
          </div>
          {openAccordion === keyIndex && (
            <>
              <Analytics
                phase={phase}
                setPhase={setPhase}
                view="daily"
                data={bettingData}
                selectedChallenge={heading}
              />
              <div className="mt-2 ">
                {/* Main headings for lg-xl devices  */}
                <div
                  className="hidden
                            lg2:flex flex-wrap 
                            bg-[#0d0d0d] pl-16 pr-20 py-8 text-[#F11941] justify-between"
                >
                  {advanceAccordianData ? (
                    <>
                      <div>
                        <div className="pb-3 text-[#565656] font-semibold text-center">
                          Payout Date Profit
                        </div>
                        <div className="text-center border-t-2 w-16 mx-auto pt-3 border-t-[#252525]">
                          {/* {challenge?.profit} */}
                          {"$" +
                            Number(advanceAccordianData.profit).toLocaleString(
                              "en-US"
                            )}
                        </div>
                      </div>
                      <div>
                        <div className="pb-3 text-[#565656] font-semibold text-center">
                          Win Percentage
                        </div>
                        <div className="text-center border-t-2 w-16 mx-auto pt-3 border-t-[#252525]">
                          {advanceAccordianData.win_percentage}%
                        </div>
                      </div>
                      <div>
                        <div className="pb-3 text-[#565656] font-semibold text-center">
                          ROI
                        </div>
                        <div className="text-center border-t-2 w-16 mx-auto pt-3 border-t-[#252525]">
                          {advanceAccordianData.ROI}
                        </div>
                      </div>
                      <div>
                        <div className="pb-3 text-[#565656] font-semibold text-center">
                          ALV
                        </div>
                        <div className="text-center border-t-2 w-16 mx-auto pt-3 border-t-[#252525]">
                          {advanceAccordianData.avg_line_value}
                        </div>
                      </div>
                      <div>
                        <div className="pb-3 text-[#565656] font-semibold text-center">
                          Unit Size
                        </div>
                        <div className="w-full text-center border-t-2 mx-auto pt-3 border-t-[#252525]">
                          {advanceAccordianData.unit_size}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </div>

              {/* Main headings for 0-lg devices */}
              <div
                className="flex flex-col
                          bg-[#0d0d0d] pl-8 pr-10 py-8 text-[#F11941] justify-between
                          lg2:hidden
                          "
              >
                {advanceAccordianData ? (
                  <>
                    <div className="flex justify-between pb-8">
                      <div className="w-1/2 text-left">
                        <div className="text-[#565656] font-semibold text-cente">
                          Payout Date Profit
                        </div>
                        <div
                          className="text-cente  w-16 mx-aut pt-2 
                              lg2:border-t-2 lg2:border-t-[#252525]"
                        >
                          {/* {challengeData[challengeData?.length-1]?.profit} */}
                          {"$" +
                            Number(advanceAccordianData.profit).toLocaleString(
                              "en-US"
                            )}
                        </div>
                      </div>
                      <div className="w-1/2 ml-4 text-left">
                        <div className="text-[#565656] font-semibold text-cente">
                          Win Percentage
                        </div>
                        <div
                          className="text-cente w-16 mx-aut pt-2 
                              lg2:border-t-2 lg2:border-t-[#252525]"
                        >
                          {advanceAccordianData.win_percentage}%
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pb-8">
                      <div className="w-1/2 text-left">
                        <div className="text-[#565656] font-semibold text-cente">
                          ROI
                        </div>
                        <div
                          className="text-cente w-16 mx-aut pt-2 
                              lg2:border-t-2 lg2:border-t-[#252525]"
                        >
                          {advanceAccordianData.ROI}
                        </div>
                      </div>
                      <div className="w-1/2 ml-4 text-left">
                        <div className="text-[#565656] font-semibold text-cente">
                          ALV
                        </div>
                        <div
                          className="text-cente w-16 mx-aut pt-2 
                               lg2:border-t-2 lg2:border-t-[#252525]"
                        >
                          {advanceAccordianData.avg_line_value}
                        </div>
                      </div>
                    </div>

                    <div className="py-2 bg-[#191919] flex flex-col justify-center ">
                      <div className=" text-[#565656] font-semibold text-center">
                        Unit Size
                      </div>
                      <div
                        className="text-center mx-auto pt-2
                            lg2:border-t-2 lg2:border-t-[#252525]"
                      >
                        {Math.floor(advanceAccordianData.unit_size)}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>Loading...</div>
                )}
              </div>

              {/* Rest of the heading for all devices  */}
              <div className="flex flex-col py-8 pl-8 pr-10 ">
                {/* rest of the headings  */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-[12.5%] justify-between">
                  <div className="">
                    <div className="text-[#565656] font-semibold text-left">
                      Phase
                    </div>
                    <div className="text-left w-16 pt-2">
                      <select
                        value={phase}
                        onChange={handleChange}
                        className="bg-transparent focus:bg-black focus:border focus:border-white focus:ring-1 focus:ring-blue-500"
                      >
                        {challengeData
                          .map((item, index) => (
                            <option key={index} value={index}>
                              {item.phase}
                            </option>
                          ))
                          .reverse()}
                      </select>
                    </div>
                  </div>
                  <div className="">
                    <div className="text-[#565656] font-semibold text-left">
                      Equity
                    </div>
                    <div className="text-left w-16 mx-aut pt-2">
                      {"$" +
                        Number(
                          challengeData[
                            phase ? phase : challengeData?.length - 1
                          ]?.equity
                        ).toLocaleString("en-US")}
                    </div>
                  </div>
                  <div className="">
                    <div className="text-[#565656] font-semibold text-left">
                      Balance Amount
                    </div>
                    <div className="text-left w-16 mx-aut pt-2">
                      {"$" +
                        (phase &&
                        phase === (challengeData?.length - 1).toString()
                          ? Number(
                              challengeData[challengeData?.length - 1]
                                ?.balance_amount
                            ).toLocaleString("en-US")
                          : " -")}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-[12.5%] mt-6">
                  <div className="">
                    <div className={`text-[#565656] font-semibold text-cente`}>
                      Profit
                    </div>
                    <div className="text-cente w-16 mx-aut pt-2">
                      {/* {challengeData[challengeData?.length-1]?.profit} */}
                      {"$" +
                        Number(
                          challengeData[
                            phase ? phase : challengeData?.length - 1
                          ]?.profit
                        ).toLocaleString("en-US")}
                    </div>
                  </div>
                  <div className="">
                    <div className="text-[#565656] font-semibold">
                      Number Of Bets
                    </div>
                    <div className="w-16 pt-2">
                      {
                        challengeData[phase ? phase : challengeData?.length - 1]
                          ?.total_bets
                      }
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-[12.5%] mt-6">
                  <div className="">
                    <div className="text-[#565656] font-semibold">
                      Daily Loss
                    </div>
                    <div className="w-16 pt-2">
                      {/* {challengeData[0]?.daily_loss} */}
                      {challengeData[phase ? phase : challengeData?.length - 1]
                        ?.total_loss_today ||
                      challengeData[phase ? phase : challengeData?.length - 1]
                        ?.total_loss_today === 0
                        ? challengeData[
                            phase ? phase : challengeData?.length - 1
                          ]?.total_loss_today
                        : "-"}
                    </div>
                  </div>
                  <div className="">
                    <div className="text-[#565656] font-semibold">
                      Maximum Loss
                    </div>
                    <div className="w-16 pt-2">
                      {
                        challengeData[phase ? phase : challengeData?.length - 1]
                          ?.maximum_loss
                      }
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
