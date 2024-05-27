import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useScrollingHeader from "../../hooks/useScrollingHeader";
import DensityMediumRoundedIcon from "@mui/icons-material/DensityMediumRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {
  Button,
  Text,
  DropDown,
} from "../../components";
import defaultUser from "../../assets/defaultUser.png";
import moment from "moment";
import { Dialog } from "@headlessui/react";
// import { imageUrlBuilder } from "@utils";
import "../../App.css";
import Logo from "../../assets/images/logo.png";
import { navOptions } from "../../utils/mock";
import { getNotifications } from "../../redux/action/notifications";
import { Popover, Transition } from "@headlessui/react";

//For Logout
import { resetUserToken } from "../../redux/action/userToken";
import { resetUserProfile } from "../../redux/action/userProfile";
import { clearReduxState } from "../../redux/action/userToken";
import { setUserDetails } from "../../redux/authentication/slice";
import { deleteUserData } from "../../redux/user/slice";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import onClickOutside from "react-onclickoutside";
import * as api from "../../api/Request";
// import { readNotification } from '../../api/Endpoints'
import { toast } from "react-toastify";

const AuthenticationRoute = ({ onPressLogin }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-3 ">
      <Button onClick={onPressLogin} variant="primary" className={AuthActive}>
        <Text className={`${AuthText} px-1`}>Log in</Text>
      </Button>
    </div>
  );
};

const options = [
  // {
  //   index: 0,
  //   title: "Profile",
  //   // value: "/profile",
  // },
  // {
  //   index: 1,
  //   title: "Settings",
  //   // value: "/settings",
  // },
  {
    index: 0,
    title: "Profile",
    value: "/profile",
  },
  {
    index: 1,
    title: "Logout",
    value: "/login",
  },
];



const handleLogout = async (navigate, dispatch, setIsMenuOpen) => {
  let keys = ["accessToken", "userData"];
  dispatch(resetUserToken());
  dispatch(resetUserProfile());
  dispatch(clearReduxState());
  await keys.forEach((k) => localStorage.removeItem(k));
  navigate("/login");
  toast.success("Logout successfully.");
  setIsMenuOpen(false)
  dispatch(deleteUserData(null));
  dispatch(setUserDetails(""));
};

const notiView = (data) => {
  if (data?.data && data?.data?.length && data.data.length > 0) {
    return (
      <div className="flex flex-col sm:min-w-[300px] xsm:min-w-[250px] xxsm:min-w-[200px] xxsm:max-w-[250px] min-w-auto max-w-[90%] shrink rounded-xl bg-black text-white border border-[#646464] p-3 text-sm leading-6 ring-1 ring-gray-900/5 shadow-[0px_4px_5px_0px_rgba(229,226,255,0.80)]">
        {data.data.map((data,index) => (
          <div key={index}>
            <div className="uppercase font-extrabold text-base">
              {data.type}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="capitalize font-normal text-sm">
                {data.message}
              </div>
              <div className="capitalize font-hairline text-xs opacity-50 mt-1 ml-8">
                {moment(data?.created_at).format("MMM DD | h:mm A")}
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-400" />
          </div>
        ))}
      </div>
    );
  }
};

const OpenNotification = () => {
  const data = localStorage.getItem("userData");
  const dispatch = useDispatch();
  const [showNotificationNumber, setShowNotificationNumber] = useState(false);

  const notificationData = useSelector(
    (state) => state?.notificationReducer?.notificationDetails
  );

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  useEffect(() => {
    if (notificationData?.status && notificationData?.data?.length > 0) {
      setShowNotificationNumber(true);
    }
  }, [notificationData]);

  return (
    <Popover className={`relative mt-1`}>
      <Popover.Button
        className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
        {notificationData?.data?.length &&
        notificationData?.data?.length > 0 &&
        showNotificationNumber ? (
          <div
            style={{
              width: "12px",
              borderWidth: 1,
              borderColor: "white",
              backgroundColor: "red",
              color: "white",
              marginLeft: -10,
              borderRadius: 4,
            }}
          >
            {notificationData?.data?.length}
          </div>
        ) : null}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute mt-5 flex -translate-x-[80%] 2xl:-translate-x-1/2">
          {notiView(notificationData)}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

const OpenProfile = (props) => {
  const data = localStorage.getItem("userData");
  // console.log("USER DATA", JSON.parse(data))
  const userData = JSON.parse(data);
  const fname = userData?.username ? userData.username : "User";
  const image = userData?.avatar ? userData.avatar : defaultUser;
  return (
    <div className="flex flex-row items-center pr-6 ">
      <Link
        to="/profile"
        className={`w-[50px] h-[50px] bg-[whit] flex items-center rounded-full ml-3 overflow-hidden ${userData?.avatar ? "" : " border-2"}`}
      >
        <img
          alt=""
          src={image}
          className={`${userData?.avatar ? "size-[50px]" : "h-[30px] object-center mx-auto"}`}
          style={{color: "white"}}
        />
      </Link>
      <Link
        to="/profile"
        className="text-white ml-4 xl1:hidden"
        onClick={() => {
          window.scrollTo(0, 0);
          props.setMobileMenuOpen(false);
        }}
      >
        {fname}
      </Link>
      <div className="pl-3 text-white hidden xl1:block">
        <DropDown
          setMobileMenuOpen={props.setMobileMenuOpen}
          title={fname}
          options={options}
          titleStyle="max-w-[150px] truncate"
          isMenuOpen={() => props.menuOpen()}
        />
      </div>
    </div>
  );
};

const TopNavBar = ({ value, active, path, inActive, isModalOpen }) => {
  const pathName = "/" + window.location.pathname.split("/")[1];
  const PN = window.location.pathname
  return (
    <div className="rounded-md group hover:bg-gradient-to-r hover:from-[#E9193F] hover:to-[#831126] hover:text-[#F11941] px-[2px] py-[0.5px]">
      <NavLink
        onClick={() => isModalOpen()}
        key={value}
        to={path}
        className={`${
          (path ===
          ("/profile" ||
            "/profile/paymenthistory" ||
            "/profile/support" ||
            "/trades/tradehistory" ||
            "/trades/challengestatus")
            ? path
            : path) === PN
            ? active
            : inActive
        }  ${(pathName === "/course" ? "/courses" : pathName) !== path} 
          bg-black px-1 pb-[1px] pt-[1px] rounded-md group-hover:text-[#F11941]
        `}
      >
        {value}
      </NavLink>
    </div>
  );
};

export default function Header() {
  const headerClassName = useScrollingHeader();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { menus } = useSelector((state) => state.headerReducer);
  const { userdata } = useSelector((store) => store.userReducer);
  const [token, setToken] = useState("");

  const headerNav = menus?.data?.filter(
    (val, ind) => val?.attributes?.slug === "header-nav"
  );

  const menuRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userProfile = useSelector(
    (state) => state?.userProfileReducer?.userProfile
  );

  // useEffect(() => {
  //       document.addEventListener('click', handleClickOutside, true);
  //       return () => {
  //           document.removeEventListener('click', handleClickOutside, true);
  //       };
  // }, [])

  //   const handleClickOutside = (event) => {
  //     console.log("EVENT",event)
  //     console.log("MENU REF",menuRef)
  //     if (
  //         menuRef.current &&
  //         !menuRef.current.contains(event.target)
  //     ) {
  //         console.log("ON OUTSIDE CLICK")
  //         setOpenNotification(false)
  //     }
  //     else{
  //       console.log("IN ELSE BLOCK")
  //     }
  // };

  const onPressLogin = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, [token, userProfile]);

  const onPressSignup = (e) => {
    e?.stopPropagation();
    navigate("/signup");
  };

  

  return (
    <header className={`${headerClassName}`}>
      <nav className={LargeDeviceContainer} aria-label="Global">
        <div
          className={`flex justify-center xl:w-60 sm:w-60 w-40 ${
            mobileMenuOpen ? "hidden" : "flex"
          }`}
        >
          <NavLink to="/" className="webkitHighlight">
            <img className="img-fluid " src={Logo} alt="" />
          </NavLink>
        </div>
        <div
          className={`xl1:hidden  flex md:flex-row flex-col-reverse items-end justify-center gap-2 ${
            mobileMenuOpen ? "hidden" : "flex"
          }`}
        ></div>
        <div className={LgNavStyle}>
          {navOptions?.map((item, index) => (
            <TopNavBar
              key={index}
              value={item?.name}
              path={item?.path}
              active={ActiveTab}
              inActive={InactiveTab}
              isModalOpen={() => setMobileMenuOpen(false)}
            />
          ))}
        </div>
        {token && <OpenNotification />}
        <div className="xl1:flex hidden justify-center">
          {token ? (
            <OpenProfile
              setMobileMenuOpen={setMobileMenuOpen}
              navigate={navigate}
              dispatch={dispatch}
              menuOpen={() => setMobileMenuOpen(false)}
            />
          ) : (
            <AuthenticationRoute
              onPressSignup={onPressSignup}
              onPressLogin={onPressLogin}
            />
          )}
        </div>
      </nav>

      {/* For small devices (till x1)  */}

      <div
        className={`xl1:hidden w-full py-2 ${
          mobileMenuOpen ? "bg-[#0D0D0D] md3:bg-black" : "bg-black"
        }`}
      >
        <div className="flex justify-between">
          {/* Logo (absolute)  */}
          <div className={`mt-2 ml-6 w-60 `}>
            <NavLink to="/" className="webkitHighlight">
              <img
                className="img-fluid xl1:hidden w-[70%] min-[360px]:w-[80%] sm:w-full"
                src={Logo}
                alt=""
              />
            </NavLink>
          </div>
          {/* Button in closed section (absolute) */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {token && <OpenNotification />}
            <Button
              style={{ backgroundColor: "rgba(18,16,55,0.30)" }}
              variant="primary"
              className="xl1:hidden rounded-md text-white h-10 w-10 webkitHighlight"
              onClick={() => setMobileMenuOpen(true)}
            >
              <DensityMediumRoundedIcon aria-hidden="true" />
            </Button>
          </div>

          {/* Open section with button  */}
        </div>

        {mobileMenuOpen && (
          <Dialog
            as="div"
            className="xl1:hidden flex "
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            {/* <div className="fixed inset-0 z-[9] " /> */}
            <Dialog.Panel className={SmDrawer}>
              <div className="flex items-center justify-between mt-20">
                <div className="flex justify-center webkitHighlight">
                  {token ? (
                    <OpenProfile
                      setMobileMenuOpen={setMobileMenuOpen}
                      navigate={navigate}
                      dispatch={dispatch}
                      menuOpen={() => setMobileMenuOpen(false)}
                    />
                  ) : (
                    <AuthenticationRoute
                      onPressSignup={onPressSignup}
                      onPressLogin={onPressLogin}
                    />
                  )}
                </div>

                <Button
                  style={{ backgroundColor: "rgba(18,16,55,0.30)" }}
                  variant="primary"
                  className="absolute right-0 top-0 rounded-md text-white h-10 w-10 webkitHighlight"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <DensityMediumRoundedIcon aria-hidden="true" />
                </Button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navOptions?.map((item, index) => (
                      <TopNavBar
                        key={index}
                        value={item?.name}
                        path={item?.path}
                        active={MobActive}
                        inActive={MobInactive}
                        isModalOpen={() => setMobileMenuOpen(false)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {token && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 justify-center">
                  <div
                    className="flex px-8 py-1 justify-center text-black rounded-lg font-semibold border border-black bg-[#F11941]"
                    onClick={() => handleLogout(navigate, dispatch, setMobileMenuOpen)}
                  >
                    Logout
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Dialog>
        )}
      </div>
    </header>
  );
}

const LargeDeviceContainer = `
border-b-2
border-b-[#0C0C0C]
hidden 
w-full 
h-20
items-center 
justify-between 
xl1:flex
xl:px-10 
lg:px-5
px-4
py-4 
gap-x-1 
`;

const LgNavStyle = `
xl1:flex 
flex-1 
hidden 
px-3
xl3:gap-x-6 xl2:gap-x-2 xl1:gap-x-2 gap-x-[3px]
xl3:justify-center xl:justify-between justify-between
`;

const ActiveTab = `
text-[15px] 
font-sans
font-bold 
decoration-1
text-[#F11941]
self-center
 `;

const InactiveTab = `
font-sans
text-[15px] 
text-white 
self-center`;

const AuthActive = `
lg:px-4 
px-2 
py-[8px] 
bg-[#F11941]
rounded-full 
flex 
items-center 
justify-center`;

const SmDrawer = `
fixed 
inset-y-0 
right-0 
z-50 
w-full 
overflow-y-auto 
bg-[#0d0d0d]
px-6 
py-
md3:max-w-sm 
md3:ring-1 md3:ring-gray-900/10`;

const MobActive = `
text-[18px] 
-mx-3 
block 
rounded-lg 
px-3 
py-2 
font-sans
text-[#F11941] 
font-bold 
leading-7 

`;

const MobInactive = `
text-[18px] 
-mx-3 
font-sans
block 
rounded-lg 
px-3 
py-2 
text-base 
font-semibold 
leading-7 
text-white 
`;

const AuthText = `
text-black 
text-[15px] 
font-bold 
font-sans
`;

const InactiveText = `
text-[#004996] 
text-[15px] 
font-bold 
font-sans
`;
