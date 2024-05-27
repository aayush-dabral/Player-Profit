import { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Storage } from "../../utils";
import { setUserDetails } from "../../redux/authentication/slice";
import { deleteUserData } from "../../redux/user/slice";
import { resetUserToken } from "../../redux/action/userToken";
import { resetUserProfile } from "../../redux/action/userProfile";
import { clearReduxState } from "../../redux/action/userToken";
import { toast } from "react-toastify";

let keys = ["accessToken", "userData"];

export default function DropDown(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [dropIcon, setDropIcon] = useState(false);

  const handleLogout = async (e) => {
    dispatch(resetUserToken());
    dispatch(resetUserProfile());
    dispatch(clearReduxState());
    await keys.forEach(k => localStorage.removeItem(k));
    navigate('/login')
    toast.success("Logout successfully.")
    props.isMenuOpen()
    dispatch(deleteUserData(null));
    dispatch(setUserDetails(""));
  };
  const ArrowUp = () => {
    return <ChevronUpIcon className="h-5 w-5 text-white" aria-hidden="true" />;
  };
  const ArrowDown = () => {
    return (
      <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
    );
  };

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span
          className={`text-[16px] font-sans font-medium text-[white] ${props.titleStyle}`}
        >
          {props.title}
        </span>
        {dropIcon === false ? <ArrowDown /> : <ArrowUp />}
      </Popover.Button>
      <Transition
        beforeLeave={() => setDropIcon(false)}
        beforeEnter={() => setDropIcon(true)}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
          <div className="w-36 shrink rounded-xl bg-black border border-[#646464] p-3 text-sm font-semibold leading-6 text-white ring-1 ring-gray-900/5 shadow-[0px_2px_5px_0px_rgba(229,226,255,0.80)]">
            {props.options.map((item, index) => (
              <Fragment key={index}>
                <NavLink
                  key={item.value}
                  to={item.value}
                  className="block p-2 hover:text-[#b8e834] text-[18px] font-sans font-medium"
                  onClick={
                    item.value === "/login" && item.index === 1
                      ? handleLogout
                      : null
                  }
                >
                  {item.title}
                </NavLink>
                {props.options.length - 1 === index ? (
                  <></>
                ) : (
                  <div key={index} className="w-full h-[1px] bg-[#DDDDDD]"></div>
                )}
              </Fragment>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
