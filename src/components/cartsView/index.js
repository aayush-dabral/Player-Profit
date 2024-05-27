import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getSymbolFromCurrency from "currency-symbol-map";
import { CartModal } from "@components";
import { updateCart } from "@redux/booking/slice";
import cartImg from "@assets/images/cartImg.png";
import "../../App.css";

export default function CartsView() {
  const dispatch = useDispatch();
  const { cartDetails } = useSelector((store) => store.bookingReducer);

  const [state, setState] = useState({
    cartModal: false,
  });

  const prices =
    cartDetails && cartDetails?.length > 0
      ? cartDetails.map((a) => a?.price?.amount)
      : "";
  const totalPrice =
    cartDetails && cartDetails?.length > 0 && prices
      ? prices.reduce((acc, curr) => acc + curr)
      : "";

  let currencyType =
    cartDetails?.length > 0 ? cartDetails[0]?.price?.currency : "EUR";
  let currencySymble =
    currencyType?.length > 1
      ? getSymbolFromCurrency(currencyType)
      : currencyType;

  const closeModal = () => {
    setState((prev) => ({ ...prev, cartModal: false }));
  };

  useEffect(() => {
    let localdata = JSON.parse(localStorage.getItem("LocalCartData"));
    if (localdata?.length && !cartDetails?.length) {
      dispatch(updateCart({ localdata: localdata, localSave: true }));
    } else {
    }
  }, [cartDetails]);

  return (
    <>
      {cartDetails?.length > 0 && totalPrice && currencySymble ? (
        <div
          onClick={() => setState((prev) => ({ ...prev, cartModal: true }))}
          className="w-auto h-[40px] rounded-full bg-darkYellow flex flex-row items-center justify-around gap-x-2 px-2 hover:cursor-pointer hover:opacity-80"
        >
          <div className="w-[20px] h-[20px]">
            <img src={cartImg} alt="" className="w-[20px] h-[20px]" />
          </div>
          <div className="w-auto min-w-[25px] px-[8px] flex items-center justify-center h-auto bg-white border border-black rounded-full">
            <span className="text-[16px] font-semibold text-center">
              {cartDetails?.length}
            </span>
          </div>
          <div>
            <sup className="font-black lg:text-[11px] text-[9px]">
              {currencySymble}
            </sup>
            <span className="text-[16px] font-black">
              {Math.round(totalPrice)}
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
      <CartModal
        openModal={state.cartModal}
        closeModal={closeModal}
        addToCartData={cartDetails}
      />
    </>
  );
}
