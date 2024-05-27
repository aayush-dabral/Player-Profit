import React from "react";
import tw from "tailwind-styled-components";
import PlaceIcon from "@mui/icons-material/Place";
import SearchIcon from "@mui/icons-material/Search";
import { Button, DatePickers, Text } from "../../components";
import "../../App.css";

const SearchInput = ({
  isCompact,
  selectedDate,
  search,
  setSearch,
  value,
  setShow,
  goToSearch,
  changeSelectedDate,
}) => {
  const navigateToSearch = (e) => {
    e?.stopPropagation();
    goToSearch();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigateToSearch();
    }
  };
  const isMenuMobile = window.matchMedia("(max-width: 600px)").matches
    ? true
    : false;

  return (
    <div className={isCompact ? Container : Container2}>
      <ContainerInner>
        <div className={Date}>

        </div>
        <div className="flex w-full md:w-9/12 h-full" onClick={setShow}>
          <PlaceIcon className="text-yellow  self-center" />
          <input
            value={value}
            className={Input}
            placeholder={"Enter Course, City or Postal Code"}
            onChange={setSearch}
            onKeyPress={handleKeyPress}
            autoComplete="off"
            role="presentation"
          />
          <Button
            variant="primary"
            className={`${SearchBox} flex lg:hidden p-3`}
            onClick={navigateToSearch}
          >
            <SearchIcon sx={{ color: "white" }} fontSize="small" />
          </Button>
          <Button
            variant="primary"
            className={`${SearchBox} hidden lg:flex hover:opacity-80`}
            onClick={navigateToSearch}
          >
            <Text className="invisible lg:visible font-sans text-[18px] font-semibold ">
              Find Tee Time
            </Text>
          </Button>
        </div>
      </ContainerInner>
    </div>
  );
};

const Container = `
w-full 
flex 
items-end 
justify-center 
pt-40 
`;

const Container2 = `
w-full 
flex 
items-end 
justify-center 
pt-60 
`;

const ContainerInner = tw.div`
mx-4 
w-full 
xl:w-[1100px] 
h-[54px] 
bg-white
rounded-lg 
shadow-[0_0px_20px_0px_#00000054]
flex 
flex-row 
items-center 
justify-between`;

const Date = `
xl:w-[20%]
lg:w-[25%] 
md:w-[28%]
md:w-[40%]
w-[50%]
border-e-[0.11px] 
h-fit 
flex 
flex-row 
items-center 
justify-start 
truncate
`;

const Input = `
w-full 
self-center 
h-full 
text-black
font-sans
text-[16px] 
px-2 
rounded-lg 
focus:outline-none 
focus:border-[gray] 
placeholder:text-gray-400`;

const SearchBox = `
webkitHighlight
h-[100%]
md:w-3/12
bg-yellow 
flex 
items-center 
rounded-r-lg
justify-center`;

export default SearchInput;
