import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import EastIcon from "@mui/icons-material/East";
import { getNewsList } from "@redux/news/actions";
import { Text } from "@components";
import { imageUrlBuilder } from "@utils";

export const GolfTrands = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newsList } = useSelector((store) => store.newsReducer);
  const topNews = newsList?.slice(0, 3);

  useEffect(() => {
    dispatch(getNewsList());
  }, []);

  return (
    <Container>
      <div className={`flex flex-col items-center justify-center`}>
        <Text className="text-md text-[#004996] flex">{"Our Blogs"}</Text>
        <Text className="text-[26px] font-semibold flex">
          {item?.attributes?.title || "Latest Articles & Tips"}
        </Text>
        <div className="w-full h-auto flex flex-wrap gap-4 items-center justify-center my-10">
          {topNews &&
            topNews?.map((client, index) => {
              const logo = imageUrlBuilder(
                client?.attributes?.logo?.data?.attributes?.url
              );
              const image = imageUrlBuilder(
                client?.attributes?.backgroundImage?.data?.attributes?.url
              );
              return (
                <div
                  onClick={() => navigate(`/news/${client?.id}`)}
                  className="rounded-lg bg-contain md:w-[360px] sm:w-[300px] w-[260px] md:h-[360px] sm:h-[300px] h-[260px] hover:cursor-pointer transform scale-100 hover:scale-105 duration-500 object-cover"
                  style={{
                    background: `linear-gradient(to bottom, rgba(255,255,255,0.01) 60%, rgba(12,12,12,1.0) 100%), url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="md:w-[350px] sm:w-[300px] w-[260px] md:h-[140px] sm:h-[110px] h-[100px] md:mt-[220px] sm:mt-[170px] mt-[130px] flex absolute flex-col gap-y-2">
                    <div className=" h-[46px] w-full flex flex-row items-center gap-x-2 md:px-4 px-2 justify-between">
                      <div className=" flex flex-row items-center md:gap-x-4 gap-x-2">
                        <div className=" w-[46px] min-w-[46px] min-h-[46px] h-[46px] rounded-full">
                          <img
                            src={logo}
                            alt="logo"
                            className="w-[46px] h-[46px] rounded-full bg-center border-2 border-[white]"
                          />
                        </div>
                        <div className="md:max-w-[150px] max-w-[90px] w-auto truncate">
                          <Text className="text-[white] text-[16px] truncate">
                            {client?.attributes?.title}
                          </Text>
                        </div>
                      </div>
                      <div className="">
                        <Text className="text-[white] text-[14px]">
                          {"2 day ago"}
                        </Text>
                      </div>
                    </div>
                    <div className="h-[50px] w-[80%] md:pl-4 pl-2">
                      <Text className="text-[white] font-semibold line-clamp-2">
                        {client?.attributes?.description}
                      </Text>
                    </div>
                    <div className="px-4 md:mt-[0px] mt-[-6px]">
                      <EastIcon sx={{ color: "white" }} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <button
          className="py-2 px-4 border-[1px] border-[#004996] rounded-md flex flex-row items-center justify-center gap-x-2 hover:bg-[#004996] text-[#004996] hover:text-[white]"
          onClick={() => navigate("/news")}
        >
          <Text className="text-[14px] font-semibold ">
            {"View More Articles"}
          </Text>
          <EastIcon sx={{ color: "inherit" }} />
        </button>
      </div>
    </Container>
  );
};

const Container = tw.div`
lg:px-[8%]  
px-[4%] 
lg:py-14 
py-8 
bg-[#f5f5f5]
`;
