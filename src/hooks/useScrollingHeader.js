import React, { useState, useEffect } from "react";

const useScrollingHeader = (
  scrollColor = "bg-black",
  defaultColor = "bg-black"
) => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 37) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClassName = `z-[999] sticky top-0 left-0 w-full transition-all duration-300 ${
    scrolling ? scrollColor : defaultColor
  }`;

  return headerClassName;
};

export default useScrollingHeader;
