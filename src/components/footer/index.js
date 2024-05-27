import React, { useState } from "react";

import tw from "tailwind-styled-components";

import logo from '../../assets/images/logo.png'


const styles = {
  footerContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    width: "full",
    height: "auto",
    backgroundColor: "white",
  },
  mainView: {
    width: "100%",
    maxWidth: "full",
    height: "auto",
  },
};

const Footer = () => {

  return (
    // <div style={styles.footerContainer}>
    //   <div style={styles.mainView}>
    //     <div className={FooterContainer}>
    //       <FooterDiv className="max-w-[330px]">

    //         <Text className={text}>
    //           The Future of Sports Trading. Get Your Funded Account Today.
    //         </Text>
    //       </FooterDiv>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="flex flex-col align-middle bg-black w-full pb-28 border-t-0 border-t-[#191919]">
        <div className="flex justify-center ">
          <img src={logo} alt="logo" className="pt-24
          w-[75%]
          lg:w-[20%]"/>
        </div>
        <div className="
        text-center text-[#8F8F8F] flex-wrap pt-4 mx-auto
        w-[80%] text-base sm:w-[96%] sm:text-xl
        lg:w-full lg:text-base">
          The Future of Sports Trading. Get Your Player Profit Account Today.
        </div>
        <div className="flex justify-center mx-auto gap-4 w-[80%] text-base sm:w-[96%] sm:text-xl
        lg:w-full lg:text-base mt-4 text-[#8F8F8F]" >
          <a href="https://fundedsportstrader.com/" className=" hover:underline hover:text-white transition-all">About Us</a>
          <a href="https://help.fundedsportstrader.com/" className=" hover:underline hover:text-white transition-all">FAQ</a>
        </div>
      </div>
      
    </>
  );
};

const FooterDiv = tw.div`
w-fit 
h-auto 
flex 
flex-col 
items-start 
justify-start 
gap-y-4
`;
const FooterTitle = tw.span`
text-[1.125rem] 
font-semibold 
text-white
text-md
`;
const text = `
text-[13px]
text-white
opacity-70
`;

const FooterContainer = `
w-full 
h-auto 
bg-black 
flex 
flex-wrap 
justify-between 
items-start 
gap-x-6 
gap-y-20 
py-20 
xl:px-40 
lg-px-20 
md:px-8 
px-6`;

const InputStyle = `
w-full 
bg-[white] 
text-[gray] 
rounded-lg 
py-[11px] 
mb-2
px-4 
leading-tight 
focus:outline-none 
focus:border-[gray] 
focus:bg-[#d9d9d9]
placeholder:text-[gray]`;

const Copyright = `
w-full 
h-auto 
py-6 
flex 
items-center 
justify-center 
border-t-[0.1px] 
border-t-[#a9a9a9] 
bg-black`;

const footerText = `
flex 
flex-row 
items-center  
gap-[3px] 
no-underline 
hover:underline 
decoration-white 
underline-offset-4 
hover:cursor-pointer`;

export default Footer;