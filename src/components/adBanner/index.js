import React from "react";
import tw from "tailwind-styled-components";
import adImg from "@assets/images/banner3.png";

function AdBanner() {
  return (
    <div className="mb-4 mt-10">
      <Container>
        <a target="_blank" href="#">
          <div className={adView}>
            <img
              src={adImg}
              className="w-[100%] h-auto min-h-[80px] rounded-xl"
            />
          </div>
        </a>
      </Container>
    </div>
  );
}

const Container = tw.div`
w-full
h-full
`;

const adView = `
w-full 
h-auto
rounded-lg 
`;

export default AdBanner;
