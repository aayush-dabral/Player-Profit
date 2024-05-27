import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import getSymbolFromCurrency from "currency-symbol-map";
import StarIcon from "@mui/icons-material/Star";
import RefreshSharpIcon from "@mui/icons-material/RefreshSharp";
import { Rating } from "@mui/material";
import heart from "@assets/images/heart.png";
import bg from "@assets/images/bg.png";

const ClubCard = ({
  goToCoursesDetails,
  goToLikeClub,
  imgUrl,
  name,
  rating,
  reviews,
  searchPage,
  distance,
  startTeeTime,
  lastTeeTime,
  teeTimes,
  onTryAgain,
  showTryAgain,
  showTeeTimesList,
  onMouseEnter,
  featured,
  isFavClub,
  noTeeTimes,
}) => {
  const handleTryAgain = (e) => {
    e?.stopPropagation();
    onTryAgain();
  };

  const onLike = (e) => {
    e.stopPropagation();
    goToLikeClub();
  };

  const parentRef = useRef();

  useEffect(() => {
    calculateLowHighestAmount();
  }, []);

  const calculateLowHighestAmount = () => {
    let minAmount = startTeeTime?.pricing[0].price?.amount;
    let maxAmount = lastTeeTime?.pricing[0].price?.amount;
    if (teeTimes && teeTimes.length) {
      teeTimes.forEach((item) => {
        const amount = item.pricing[0].price.amount;
        if (amount < minAmount) {
          minAmount = amount;
        }
        if (amount > maxAmount) {
          maxAmount = amount;
        }
      });
      parentRef.current = { minAmount: minAmount, maxAmount: maxAmount };
    }
  };

  return (
    <React.Fragment>
      <button className="justify-self-center" onClick={goToCoursesDetails}>
        <div
          className={`${
            searchPage ? "max-w-[240px]" : "max-w-[270px]"
          } w-full h-auto bg-white`}
          onMouseEnter={onMouseEnter}
          onTouchStart={onMouseEnter}
        >
          <li className="overflow-hidden shadow-[0_0px_15px_0px_#cdcaec] rounded-lg">
            <div className={ImagesRoot}>
              <img
                src={imgUrl || bg}
                alt={""}
                className={`${ImageItem} transform scale-100 hover:scale-110 duration-500 object-cover`}
              />
              {isFavClub === true ? (
                <div
                  className="w-fit h-fit absolute bottom-0 right-2 top-2 z-[1] flex items-center justify-center"
                  onClick={onLike}
                >
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="22"
                      cy="22"
                      r="22"
                      fill="white"
                      fill-opacity="0.63"
                    />
                    <g clip-path="url(#clip0_939_1546)">
                      <path
                        d="M22 30.6489C21.8988 30.6489 21.7977 30.6228 21.7071 30.5704C21.6086 30.5136 19.2699 29.1557 16.8977 27.1097C15.4917 25.8971 14.3693 24.6944 13.5619 23.535C12.5171 22.0348 11.9916 20.5917 12.0001 19.2459C12.01 17.6799 12.5709 16.2072 13.5796 15.099C14.6053 13.9721 15.9741 13.3516 17.434 13.3516C19.305 13.3516 21.0156 14.3996 22 16.0598C22.9845 14.3996 24.6951 13.3516 26.5661 13.3516C27.9453 13.3516 29.2612 13.9115 30.2715 14.9282C31.3803 16.0439 32.0102 17.6204 31.9999 19.2533C31.9914 20.5968 31.4561 22.0377 30.409 23.5358C29.599 24.6946 28.4783 25.8968 27.0778 27.1091C24.7142 29.1549 22.3923 30.5127 22.2946 30.5695C22.2035 30.6224 22.1017 30.6489 22 30.6489Z"
                        fill="#FFBC00"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_939_1546">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(12 12)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              ) : isFavClub === false ? (
                <div
                  className="w-fit h-fit absolute bottom-0 right-2 top-2 z-[1] flex items-center justify-center"
                  onClick={onLike}
                >
                  <img
                    src={heart}
                    width={40}
                    height={40}
                    className="self-center "
                  />
                </div>
              ) : null}
              {featured ? (
                <div className="w-[100px] h-[28px] absolute left-2 bottom-2 z-[1] flex items-center justify-center rounded-full bg-darkYellow">
                  <span className="text-center text-[16px] font-medium">
                    {"Featured"}
                  </span>
                </div>
              ) : null}
            </div>
            <dl className={CardDetails}>
              <div className="h-auto w-[250px] xl:min-w-[240px] min-w-auto text-start py-2 ">
                <dt className={`${NormalText} font-semibold truncate `}>
                  {name}
                </dt>
              </div>
              <div className="w-auto h-auto flex flex-row justify-start items-center gap-x-2">
                <dt className="text-gray-500">
                  <Rating
                    name="read-only"
                    value={rating || 0}
                    readOnly
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize={"medium"} />
                    }
                  />
                </dt>
                <dd>
                  <div className="text-[#8B8B8B] text-[12px] font-light">
                    {reviews ? `${reviews} Reviews` : "0 Reviews"}
                  </div>
                </dd>
              </div>
              {distance && (
                <div className="w-auto h-auto flex flex-row justify-start items-center gap-x-2">
                  <span className="text-[15px]">{"Distance: "}</span>
                  <span className="text-[15px] font-semibold">
                    {distance + " mi"}
                  </span>
                </div>
              )}
              {showTeeTimesList ? (
                showTryAgain ? (
                  <React.Fragment>
                    <div className="w-auto h-[65px] flex flex-col items-center justify-center gap-y">
                      <RefreshSharpIcon onClick={handleTryAgain} />
                      <button
                        onClick={handleTryAgain}
                        className="w-auto px-4 py-[3px] rounded-md bg-darkYellow hover:opacity-60"
                      >
                        <span className="text-[17px] font-medium text-white">
                          {"Try Again"}
                        </span>
                      </button>
                    </div>
                  </React.Fragment>
                ) : noTeeTimes ? (
                  <div className="w-auto h-[90px] flex flex-col items-center justify-center">
                    <p className={"text-[16px] animate-pulse"}>
                      {"No Tee Times Available!"}
                    </p>
                  </div>
                ) : teeTimes?.length <= 0 || teeTimes == undefined ? (
                  <div className="w-full h-[90px] flex items-center justify-center">
                    <p className={"text-[16px] animate-pulse"}>
                      {"No Tee Times Available!"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-scroll overflow-y-hidden custom-scroll">
                    <div className="flex flex-row w-full h-auto justify-between items-center gap-x-4 pt-4 min-w-fit">
                      {teeTimes?.map((item) => (
                        <div className="border border-darkYellow w-[76px] h-[67px] rounded-[5px]">
                          <div className="bg-darkYellow w-full h-[27px]">
                            <span className="text-[12px]">
                              {dayjs(item?.time).format("hh:mm ")}
                              {dayjs(item?.time).format(" A")}
                            </span>
                          </div>
                          <div className="flex pt-2 items-center justify-center">
                            <sup className="font-bold lg:text-[11px] text-[9px]">
                              {item?.price.publicRate?.currency?.length > 1
                                ? getSymbolFromCurrency(
                                    item?.price.publicRate?.currency
                                  )
                                : item?.price.publicRate?.currency || "$"}
                            </sup>
                            <span className="text-[16px] font-bold">
                              {Math.round(item?.price.publicRate?.amount) ||
                                "N/A"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <div className="flex flex-row w-full h-auto justify-between items-center pt-2">
                  {startTeeTime ? (
                    <dt className=" text-[14px] text-black-500">
                      <div className="bg-darkYellow w-auto px-2 h-[28px] rounded-[30px] flex flex-row items-center justify-center hover:opacity-80">
                        <div className={"font-semibold"}>
                          <span className="text-[12px]">
                            {dayjs(startTeeTime?.time).format("hh:mm A")}
                          </span>
                        </div>
                        <span className="px-1">{" - "}</span>
                        <div className={"font-semibold"}>
                          <span className="text-[12px]">
                            {dayjs(lastTeeTime?.time).format("hh:mm A")}
                          </span>
                        </div>
                      </div>
                    </dt>
                  ) : (
                    ""
                  )}

                  <dd className="h-[25px]">
                    <React.Fragment>
                      {startTeeTime ? (
                        <>
                          <sup className="font-bold lg:text-[11px] text-[9px]">
                            {startTeeTime?.pricing[0].publicRate?.currency
                              ?.length > 1
                              ? getSymbolFromCurrency(
                                  startTeeTime?.pricing[0].publicRate?.currency
                                )
                              : ""}
                          </sup>
                          {parentRef.current?.maxAmount !==
                          parentRef.current?.minAmount ? (
                            <>
                              <span className="text-[16px] font-bold">
                                {parentRef.current?.minAmount || ""}
                              </span>
                              -
                              <sup className="font-bold lg:text-[11px] text-[9px]">
                                {startTeeTime?.pricing[0].publicRate?.currency
                                  ?.length > 1
                                  ? getSymbolFromCurrency(
                                      startTeeTime?.pricing[0].publicRate
                                        ?.currency
                                    )
                                  : ""}
                              </sup>
                              <span className="text-[16px] font-bold">
                                {parentRef.current?.maxAmount || ""}
                              </span>
                            </>
                          ) : (
                            <span className="text-[16px] font-bold">
                              {startTeeTime?.pricing[0].price.amount || ""}
                            </span>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  </dd>
                </div>
              )}
            </dl>
          </li>
        </div>
      </button>
    </React.Fragment>
  );
};

export default ClubCard;

const NormalText = `
text-[18px]
`;

const ImagesRoot = `
w-full 
h-[145px]
rounded-lg 
overflow-hidden
relative
`;

const ImageItem = `
h-full
w-full
rounded-lg 
bg-white 
object-cover 
`;

const CardDetails = `
w-full
h-auto
px-4
pt-[10px]
pb-4
text-sm 
`;
