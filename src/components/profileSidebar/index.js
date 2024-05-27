import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function ProfileSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const scrollContainerRef = useRef(null);

  function scrollSidebar(direction) {
    const container = scrollContainerRef.current;

    if (container) {
      const scrollAmount = 100; // Adjust scroll amount as needed

      if (direction === "left") {
        container.scrollLeft -= scrollAmount; // Scroll left
      } else {
        container.scrollLeft += scrollAmount; // Scroll right
      }
    }
  }
  return (
    <>
      <div className="hidden bg-black xl:flex p-8 sticky top-20 w-full text-white">
        {/* Sidebar */}
        <div className="flex flex-col gap-10">
          {/* Convert these into buttons/Links */}
          <div
            onClick={() => {
              navigate("/profile");
            }}
            className={`cursor-pointer hover:text-[#F11941] ${
              location.pathname === "/profile" ? "text-[#F11941]" : ""
            }`}
          >
            Profile
          </div>
          <div
            onClick={() => {
              navigate("/profile/paymenthistory");
            }}
            className={`cursor-pointer hover:text-[#F11941] ${
              location.pathname === "/profile/paymenthistory"
                ? "text-[#F11941]"
                : ""
            }`}
          >
            Payments History
          </div>
          <div
            onClick={() => {
              navigate("/profile/support");
            }}
            className={`cursor-pointer hover:text-[#F11941] ${
              location.pathname === "/profile/support" ? "text-[#F11941]" : ""
            }`}
          >
            Support
          </div>
          <div
            onClick={() => {
              navigate("/profile/kyc");
            }}
            className={`cursor-pointer hover:text-[#F11941] ${
              location.pathname === "/profile/kyc" ? "text-[#F11941]" : ""
            }`}
          >
            KYC
          </div>
          <div
            onClick={() => {
              navigate("/profile/withdrawal");
            }}
            className={`cursor-pointer hover:text-[#F11941] ${
              location.pathname === "/profile/withdrawal" ? "text-[#F11941]" : ""
            }`}
          >
            Withdraw
          </div>
          <div
            onClick={() => {
              navigate("/profile/withdrawal/history");
            }}
            className={`cursor-pointer hover:text-[#F11941] ${
              location.pathname === "/profile/withdrawal/history" ? "text-[#F11941]" : ""
            }`}
          >
            Withdraw transaction
          </div>
        </div>
      </div>

      <div className="flex justify-center relative w-full px-2 text-white mx-auto xl:hidden">
        <FaChevronLeft
          size={15}
          className="my-auto"
          onClick={() => scrollSidebar("left")}
        />

        <div
          className="overflow-x-auto whitespace-nowrap text-lg mx-2"
          ref={scrollContainerRef}
        >
          <div className="flex gap-6">
            <div
              onClick={() => {
                navigate("/profile");
              }}
              className={`cursor-pointer hover:text-[#F11941] ${
                location.pathname === "/profile" ? "text-[#F11941]" : ""
              }`}
            >
              Profile
            </div>
            <div
              onClick={() => {
                navigate("/profile/paymenthistory");
              }}
              className={`cursor-pointer hover:text-[#F11941] ${
                location.pathname === "/profile/paymenthistory"
                  ? "text-[#F11941]"
                  : ""
              }`}
            >
              Payments History
            </div>
            <div
              onClick={() => {
                navigate("/profile/support");
              }}
              className={`cursor-pointer hover:text-[#F11941] ${
                location.pathname === "/profile/support" ? "text-[#F11941]" : ""
              }`}
            >
              Support
            </div>
            <div
              onClick={() => {
                navigate("/profile/kyc");
              }}
              className={`cursor-pointer hover:text-[#F11941] ${
                location.pathname === "/profile/kyc" ? "text-[#F11941]" : ""
              }`}
            >
              KYC
            </div>
            <div
              onClick={() => {
                navigate("/profile/withdrawal");
              }}
              className={`cursor-pointer hover:text-[#F11941] ${
                location.pathname === "/profile/withdrawal" ? "text-[#F11941]" : ""
              }`}
            >
              Withdraw
            </div>
            <div
              onClick={() => {
                navigate("/profile/withdrawal/history");
              }}
              className={`cursor-pointer hover:text-[#F11941] ${
                location.pathname === "/profile/withdrawal/history" ? "text-[#F11941]" : ""
              }`}
            >
              Withdraw Transaction
            </div>
          </div>
        </div>

        <FaChevronRight
          size={15}
          className="my-auto"
          onClick={() => scrollSidebar("right")}
        />
      </div>
    </>
  );
}

export default ProfileSidebar;
