import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { imageUrlBuilder } from "@utils";
import { Text, HeadingText, Root } from "@components";
import { exploreGameList } from "@redux/teetime/actions";

export const ExploreGame = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { exploreGame } = useSelector((store) => store.teetimeReducer);
  const { customDate } = useSelector((store) => store.headerReducer);

  useEffect(() => {
    dispatch(exploreGameList());
  }, []);

  const onSearch = (e) => {
    let query = `?date=${customDate}`;
    if (e?.slug) {
      query = query + "&slug=" + e?.slug;
    } else {
    }
    if (
      e?.slug !== "favorite" ||
      (e?.slug === "favorite" && localStorage.getItem("UserToken"))
    ) {
      navigate({
        pathname: `/search`,
        search: query,
      });
    } else if (e?.slug === "favorite" && !localStorage.getItem("UserToken")) {
      toast.error("Login to get your Favourite Clubs");
    }
  };

  return (
    <div className="py-10">
      <Root>
        <div className={`flex flex-col  items-center justify-center`}>
          <HeadingText className={`${Heading} text-black font-semibold`}>
            {item?.attributes?.title || "Explore the Game"}
          </HeadingText>
          <Text className={`${SimpleText}  ${Describe}`}>
            {
              "From the Tour-inspired playability of T100 to the extreme forgiveness of T400, T·Series irons offer a model for every level of player. Get an idea of which model is right for your game with our iron selection…"
            }
          </Text>
        </div>
        <ul role="list" className={ExploreGrid}>
          {exploreGame?.data?.map((person) => {
            const image = imageUrlBuilder(
              person?.attributes?.image?.data?.attributes?.url
            );
            return (
              <li
                key={person.id}
                className="col-span-1 divide-y divide-gray-200 justify-self-center "
              >
                <div
                  onClick={() => onSearch({ slug: person?.attributes?.slug })}
                  className="flex flex-col items-center justify-center gap-4 p-2 bg-[white] rounded-lg shadow-[0_0px_15px_0px_#cdcaec] w-[200px] h-[200px] hover:cursor-pointer hover:bg-[#f0efef]"
                >
                  <div className=" truncate ">
                    <img className={ExploreImage} src={image} alt="" />
                  </div>
                  <div className=" w-auto h-auto text-center">
                    <h3 className="text-black lg:text-[20px] text-[16px] font-semibold">
                      {person?.attributes?.title}
                    </h3>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Root>
    </div>
  );
};

const Heading = `
lg:text-[28px]
text-[18px] `;

const SimpleText = `
lg:text-[18px] 
text-[15px]`;

const Describe = `
text-black 
lg:py-6 
py-3 
opacity-80 
text-center`;

const ExploreImage = `
h-[75px] 
w-[75px] 
flex-shrink-0 
mb-1
rounded-full 
 `;

const ExploreGrid = `
grid 
grid-cols-1 
sm:grid-cols-2 
gap-6 
md:grid-cols-2 
lg:grid-cols-3 
xl:grid-cols-5`;
