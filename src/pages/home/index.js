import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import {useNavigate} from 'react-router-dom'
import { HeaderSection } from "../../components";
import { getHomePageSetting } from "../../redux/settings/actions";
import { clubSortingOptions } from "../../redux/search/actions";

const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const userProfile = useSelector(
    (state) => state?.userProfileReducer?.userProfile
  );

  useEffect(() => {
    checkRoute()
  }, [token]);

  const checkRoute =() => {
    if(token){
      navigate("/trading")
    }
    else{
      navigate("/login")
    }
  }

  return (
    <div />
  );
};

const Container = tw.div`
bg-[#f9f9f9]
`;

export default Home;
