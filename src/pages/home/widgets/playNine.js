import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlayNineClubs } from "@redux/teetime/actions";
import { HeadingText, ClubCard, Root } from "@components";
import { imageUrlBuilder } from "@utils";
import dayjs from "dayjs";

const LENGTH = 8;

export const PlayNine = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { playNineClubs } = useSelector((store) => store.teetimeReducer);
  const [viewAll, setViewAll] = useState(true);
  const { customDate } = useSelector((store) => store.headerReducer);

  useEffect(() => {
    dispatch(getPlayNineClubs());
  }, []);

  const goToCoursesDetails = (e) => navigate(`/course/${e?.id}`);
  return (
    <div className="my-4">
      {playNineClubs?.length > 0 && (
        <Root>
          <div
            className={`flex flex-row lg:py-8 py-6 items-center justify-between`}
          >
            <HeadingText className={`${Heading} font-semibold`}>
              {item?.attributes?.title || "Short on time? Play Nine"}
            </HeadingText>
            {playNineClubs?.length > 8 ? (
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
            {playNineClubs
              ?.slice(0, viewAll === true ? LENGTH : playNineClubs.length)
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
                    // teeTimes={teeTimes && teeTimes.teeTimes}
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
