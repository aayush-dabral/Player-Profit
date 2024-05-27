import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Root, HeadingText } from "@components";
import { imageUrlBuilder, imageUrlUpdater } from "@utils";
import { getBanner } from "@redux/teetime/actions";
import adImg from "@assets/images/banner3.png";

export const Banner = ({ item }) => {
  const dispatch = useDispatch();

  const { banner } = useSelector((store) => store.teetimeReducer);
  const urls = imageUrlUpdater(
    banner?.data?.attributes?.image?.data?.attributes
  );

  useEffect(() => {
    dispatch(getBanner());
  }, []);

  return (
    <div className="my-4">
      {urls?.path && urls?.height && (
        <Root>
          <div className={`flex flex-row lg:py-8 py-6 items-center`}>
            <HeadingText className={`${Heading} font-semibold`}>
              {item?.attributes?.title || `Ad Banner`}
            </HeadingText>
          </div>
          <a target="_blank" href="#">
            <img
              src={urls?.path || adImg}
              className={`w-[100%] h-${urls?.height} min-h-[80px] rounded-xl`}
            />
          </a>
        </Root>
      )}
    </div>
  );
};

const Heading = `
lg:text-[28px] 
text-[18px] 
`;
