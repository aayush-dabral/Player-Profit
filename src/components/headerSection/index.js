import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";

// import { Storage, updateRecentData, imageUrlBuilder } from "@utils";
// import bgImage from "../../assets/images/background.png";


const HeaderSection = ({

}) => {

  return (
    <Container>
      <div
        // style={{
        //   "--image-url": `url(${(bgImage)
        //     })`,
        // }}
        className={RootHeader}
      >
      </div>
    </Container>
  );
};

const Container = tw.div`
bg-white
`;

const RootHeader = `
pb-10 
lg:pb-20
bg-no-repeat
bg-cover
bg-center
w-full
h-[800px]
max-h-[800px]
bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0)_33%),var(--image-url)]
`;

const SearchSuggestionText = `
text-black
font-sans
font-semibold
hover:underline
`;

const RootHeader2 = `
pb-10 
lg:pb-20
bg-no-repeat
bg-cover
bg-center
w-full
h-[545px]
max-h-[545px]
bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0)_33%),var(--image-url)]
`;

const Li = tw.div`
flex-1
flex 
p-2
justify-center
items-center
bg-white
flex
border-[#dddddddd] 
rounded-md 
self-center
`;

const SearchContainer = `
h-[300px] 
flex 
flex-col 
w-[90%] 
md:w-[63%] 
lg:w-[56%] 
xl:w-[38%] 
border-[gray] 
bg-[#ffffffcc] 
rounded-lg 
shadow-[0_0px_20px_#3c7fed90]
mt-5 
px-5 
py-5 
text-white 
m-auto 
overflow-y-scroll 
overflow-x-hidden 
custom-scroll 
transparent`;

export default HeaderSection;
