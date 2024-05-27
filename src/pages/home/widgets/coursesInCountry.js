import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { HeadingText, ClubCard, Root } from "@components";
import { imageUrlBuilder } from "@utils";
import { DEFAULT_SEARCH_COUNTRY } from "@utils/constants";
import { getBestClubsInCountry } from "@redux/teetime/actions";

const LENGTH = 8;

const getDefaultSortOption = (sortOptions) =>
  sortOptions.find((val) => val?.attributes?.isDefault === true);

export const CoursesInCountry = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customDate } = useSelector((store) => store.headerReducer);
  const { setting } = useSelector((store) => store.settingsReducer);
  const { coordinates } = useSelector((store) => store.userReducer);
  const { sortingOptions } = useSelector((store) => store.searchReducer);
  const { bestClubsInCountry } = useSelector((store) => store.teetimeReducer);

  const [viewAll, setViewAll] = useState(true);

  let location =
    coordinates?.country ||
    setting?.data?.attributes?.country?.data?.attributes?.name ||
    DEFAULT_SEARCH_COUNTRY;

  useEffect(() => {
    if (
      customDate &&
      location &&
      getDefaultSortOption(sortingOptions)?.attributes?.sortBy
    ) {
      dispatch(
        getBestClubsInCountry({
          date: dayjs(customDate).format("DD-MM-YYYY"),
          country: location,
          sortBy:
            getDefaultSortOption(sortingOptions)?.attributes?.sortBy || "",
          orderBy:
            getDefaultSortOption(sortingOptions)?.attributes?.orderBy || "",
        })
      );
    }
  }, [customDate, location, JSON.stringify(sortingOptions), coordinates]);

  const goToCoursesDetails = (e) => navigate(`/course/${e?.id}`);

  return (
    <div className="my-4">
      {bestClubsInCountry?.length > 0 && (
        <Root>
          <div
            className={`flex flex-row lg:py-8 py-6 items-center justify-between`}
          >
            <HeadingText className={`${Heading} font-semibold`}>
              {item?.attributes?.title || `The best courses in ${location}`}
            </HeadingText>
            {bestClubsInCountry?.length > 8 ? (
              <button
                onClick={() => {
                  setViewAll(!viewAll);
                }}
              >
                <span className="text-[15px] font-medium text-[#004996]">
                  {viewAll ? "View all" : "View less"}
                </span>
              </button>
            ) : null}
          </div>
          <ul role="list" className={CoursesGrid}>
            {bestClubsInCountry
              ?.slice(0, viewAll === true ? LENGTH : bestClubsInCountry?.length)
              .map((client, index) => {
                const ratings =
                  client?.review_and_ratings?.reduce(
                    (total, next) => total + next?.rating,
                    0
                  ) / client?.review_and_ratings?.length;
                const onClick = () => goToCoursesDetails(client);
                let startTee;
                let endTee;
                var teeTimes = [];
                if (
                  client.tee_times_cachings &&
                  client.tee_times_cachings.length
                ) {
                  teeTimes = client.tee_times_cachings.find(
                    (val) =>
                      val.bookingDate === dayjs(customDate).format("DD-MM-YYYY")
                  );
                  if (teeTimes && teeTimes.teeTimes.length) {
                    startTee = teeTimes.teeTimes[0];
                    endTee = teeTimes.teeTimes[teeTimes.teeTimes.length - 1];
                  }
                }
                return (
                  <ClubCard
                    key={index}
                    goToCoursesDetails={onClick}
                    imgUrl={
                      client?.photos[0] ||
                      imageUrlBuilder(client?.image && client?.image[0]?.url)
                    }
                    name={client?.name}
                    rating={ratings}
                    reviews={client?.review_and_ratings?.length}
                    startTeeTime={startTee}
                    lastTeeTime={endTee}
                    teeTimes={teeTimes && teeTimes.teeTimes}
                  />
                );
              })}
          </ul>
        </Root>
      )}
    </div>
  );
};

const CoursesGrid = `
grid 
xl1:grid-cols-4 
xl:grid-cols-3 
lg2:grid-cols-3 
lg:grid-cols-2 
md2:grid-cols-2 
md:grid-cols-1 
grid-cols-1 
gap-y-8 
gap-x-4 
`;

const Heading = `
lg:text-[28px] 
text-[18px] 
`;
