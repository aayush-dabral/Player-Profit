import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Text, HeadingText, Root } from "@components";
import { imageUrlBuilder, imageUrlUpdater } from "@utils";
import { getDestinationList } from "@redux/teetime/actions";

export const Traveling = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { destination } = useSelector((store) => store.teetimeReducer);

  useEffect(() => {
    dispatch(getDestinationList());
  }, []);

  return (
    <>
      {destination?.length > 0 && (
        <div className="py-10 bg-[#F5F5F5] ">
          <Root>
            <div className={`flex flex-col  items-center justify-center pb-2`}>
              <HeadingText className={`${Heading} font-semibold`}>
                {item?.attributes?.title ||
                  "Traveling? Great Golf Vacation Destinations"}
              </HeadingText>
              <Text
                className={`${SimpleText} font-light text-[#414141] lg:py-4 py-2 text-center`}
              >
                {
                  "From the Tour-inspired playability of T100 to the extreme forgiveness of T400, T·Series irons offer a model for every level of player. Get an idea of which model is right for your game with our iron selection…"
                }
              </Text>
            </div>
            <ul role="list" className={TravelingGrid}>
              {destination?.map((client) => {
                const image = imageUrlBuilder(client?.image[0]?.url);
                const images = imageUrlUpdater(client?.image[0]);
                return (
                  <button
                    className="justify-self-center hover:shadow-[0px_0px_20px_0px_#cdcaec] rounded-lg overflow-hidden shadow drop-shadow-xl"
                    onClick={() => {
                      navigate("/destination", { state: image });
                    }}
                    key={client?.id + client?.location}
                  >
                    <li className=" md:w-[360px] sm:w-[330px] xsm:w-[300px] w-full bg-[white] hover:text-[#f8bc05]  cursor-pointer ">
                      <div className={ImagesRoot}>
                        <img
                          src={image}
                          alt={client.name}
                          className={ImageItem}
                        />
                      </div>
                      <dl className="-my-3 divide-gray-100 px-2 pb-4 text-sm leading-6 ">
                        <div className="flex justify-between gap-x-4 py-3">
                          <div className="lg:pt-6 lg:px-4 pt-4 px-2">
                            <div className="flex flex-row justify-between">
                              <Text
                                className={`lg:text-[20px] text-[18px] text-inherit`}
                              >
                                {client?.location}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </dl>
                    </li>
                  </button>
                );
              })}
            </ul>
          </Root>
        </div>
      )}
    </>
  );
};

const Heading = `
lg:text-[28px]
text-[18px] `;

const SimpleText = `
lg:text-[18px] 
text-[15px]`;

const TravelingGrid = `
grid 
gap-x-6
gap-y-8 
xl1:grid-cols-3 
xl:grid-cols-2 
lg:grid-cols-2 
grid-cols-1 
`;

const ImagesRoot = `
h-[200px]
flex 
items-center 
gap-x-4 
border-gray-900/5 
bg-gray-50 `;

const ImageItem = `
h-full 
w-full 
flex-none 
rounded-lg 
bg-white 
object-cover 
ring-1 
ring-gray-900/10
`;
