import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getNotifications } from '../../redux/action/notifications'

const notiData = [
  {title:"NOTIFICATION DATA 1", details:"Notification details of data 1"},
  {title:"NOTIFICATION DATA 2", details:"Notification details of data 2"},
  {title:"NOTIFICATION DATA 3", details:"Notification details of data 3"},
  {title:"NOTIFICATION DATA 4", details:"Notification details of data 4"},
  {title:"NOTIFICATION DATA 5", details:"Notification details of data 5"},
  {title:"NOTIFICATION DATA 6", details:"Notification details of data 6"},
]

const NotiScreen = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    loading: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  useEffect(() => {
    dispatch(getNotifications())
  }, []);

  const notiList = (data) => {
    return (
      <div className="max-w-3xl w-full h-auto overflow:auto mt-8 bg-[#b8e834]/20 px-6 py-[12px] rounded">
        <div className="text-lg text-[#b8e834] font-bold uppercase underline">
          {data.title}
        </div>
        <div className="overflow:scroll text-base text-[#b8e834] font-normal capitalize text-opacity-80">
          {data.details}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center xl:px-40 pt-24 md:px-8 px-4">
        {notiData.map(data => (notiList(data)))}
      </div>
      <div className="w-full h-[2px] bg-white bg-opacity-50 mt-[30%]" />
    </div>
  );
};

export default NotiScreen;
