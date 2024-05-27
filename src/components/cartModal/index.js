import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import tw from "tailwind-styled-components";
import getSymbolFromCurrency from "currency-symbol-map";
import _ from "lodash";
import moment from "moment";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
import { Text, ClearCartModal } from "@components";
import { removeTeetime, editCart } from "@redux/booking/slice";
import { setBookingDetails } from "@redux/teetime/slice";
import closeBtn from "@assets/images/deleteIcon.png";
import closeIcon from "@assets/images/closeIcon.png";
import "./style.css";

function CartModal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToCartData } = props;
  const { cartDetails } = useSelector((store) => store.bookingReducer);
  const { clubId } = useSelector((store) => store?.teetimeReducer);
  const utc = require("dayjs/plugin/utc");
  const timezone = require("dayjs/plugin/timezone");
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      clearCartModal: false,
    }
  );

  let prices =
    cartDetails && cartDetails?.length > 0
      ? cartDetails.map((a) => a?.price?.amount)
      : "";
  let totalPrice =
    cartDetails && cartDetails?.length > 0 && prices
      ? prices.reduce((acc, curr) => acc + curr)
      : "";

  const changeHoles = (res, item) => {
    let localdata = JSON.parse(localStorage.getItem("LocalCartData"));
    let upd_obj = localdata?.map((obj) => {
      if (obj?.teeId === item?.teeId) {
        obj.holes = Number(res);
      }
      return obj;
    });
    dispatch(editCart(upd_obj));
  };

  const changePlayers = (res, item) => {
    let localdata = JSON.parse(localStorage.getItem("LocalCartData"));
    let upd_obj = localdata?.map((obj) => {
      if (obj?.teeId === item?.teeId) {
        obj.players = Number(res);
        obj.price = item?.allPrice[Number(res) - 1]?.price;
      }
      return obj;
    });
    dispatch(editCart(upd_obj));
  };

  const removeItem = (e) => {
    dispatch(removeTeetime({ teeId: e?.teeId, amount: e?.price }));
    if (cartDetails?.length === 1) {
      props.closeModal();
      if (window.location.pathname == "/checkout") {
        navigate(-1);
      }
    }
  };

  const goCheckout = () => {
    const data = {
      bookings: [...cartDetails],
      amountPaid: totalPrice,
      clubId: clubId,
    };
    let currentTimeFilter = _.filter(cartDetails, function (e) {
      return moment().isSameOrAfter(e?.teetime);
    });
    if (currentTimeFilter?.length > 0) {
      toast.error(
        "Please Remove Past Tee Time in your cart before checkout !",
        {}
      );
    } else {
      dispatch(setBookingDetails(data));
      props.closeModal();
      navigate("/checkout");
    }
  };

  const closeClearCartModal = () => {
    setState({ clearCartModal: false });
  };

  const Title = () => {
    return (
      <div className="flex flex-row items-center justify-between w-full h-auto my-4">
        <Text className="text-2xl text-black0 font-bold font-sfprodisplay text-center">
          {"TeeTime Cart"}
        </Text>
        <button
          onClick={props.closeModal}
          className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center opacity-80 hover:opacity-100"
        >
          <img src={closeIcon} className="w-[35px] h-[35px] " />
        </button>
      </div>
    );
  };

  const DetailText = (props) => {
    return (
      <div className={`${props.divClass}`}>
        <p className={` ${props.txtClass}`}>{props.value}</p>
      </div>
    );
  };

  const BookingDetails = () => {
    return (
      <div className="w-full h-auto overflow-y-auto custom-scroll">
        {cartDetails?.length > 0 ? (
          cartDetails?.map((item, index) => (
            <React.Fragment key={`teeTimeDAta`}>
              {/* {console.log("*** item is ", item)} */}
              <div className="flex flex-col py-2 px-[7px] bg-[#e6e6e6] mb-2 rounded-md">
                <div className="w-full h-auto flex flex-row items-center justify-between">
                  <div className="w-auto h-auto flex flex-col">
                    <DetailText
                      divClass="w-full truncate"
                      txtClass="font-semibold sm:text-[16px] text-[14px] truncate"
                      value={item?.clubName}
                    />
                    <DetailText
                      divClass=""
                      txtClass="font-medium sm:text-[14px] text-[13px]"
                      value={dayjs(item?.teetime).format("DD/MM/YY - HH:mm")}
                    />
                  </div>
                  <Tooltip title={"Remove Tee Time"} arrow>
                    <button onClick={() => removeItem(item)}>
                      <img
                        src={closeBtn}
                        alt={"close"}
                        className="w-[20px] h-[20px]"
                      />
                    </button>
                  </Tooltip>
                </div>
                <div className="w-full h-[1px] opacity-30 bg-[gray] my-2"></div>

                <div className="w-full h-auto flex flex-row items-center justify-between">
                  <div className="w-auto h-auto flex flex-col gap-y-[4px]">
                    <DetailText
                      txtClass="opacity-70 sm:text-[14px] text-[13px]"
                      value={`Holes`}
                    />
                    <select
                      id="hole"
                      className="w-auto hover:cursor-pointer"
                      defaultValue={item?.holes}
                      onChange={(e) => changeHoles(e?.target?.value, item)}
                    >
                      <option className="text-center">9</option>
                      <option className="text-center">18</option>
                    </select>
                  </div>
                  <div className="w-auto h-auto flex flex-col gap-y-[4px]">
                    <DetailText
                      txtClass="opacity-70 sm:text-[14px] text-[13px]"
                      value={`Players`}
                    />
                    <select
                      id="player"
                      className="w-auto hover:cursor-pointer"
                      defaultValue={item?.players}
                      onChange={(e) => changePlayers(e?.target?.value, item)}
                    >
                      {/* {Array.from(
                        Array(item?.players),
                        (_, index) => index + 1
                      )?.map((e) => (
                        <option className="text-center">{e}</option>
                      ))} */}
                      <option className="text-center">1</option>
                      <option className="text-center">2</option>
                      <option className="text-center">3</option>
                      <option className="text-center">4</option>
                    </select>
                  </div>
                  <div className="w-auto h-auto flex flex-col gap-y-[4px]">
                    <DetailText
                      txtClass="opacity-70 sm:text-[14px] text-[13px]"
                      value={`Price`}
                    />
                    <div>
                      <sup className="font-black lg:text-[11px] text-[9px]">
                        {item?.price?.currency?.length > 1
                          ? getSymbolFromCurrency(item?.price?.currency)
                          : item?.price?.currency}
                      </sup>
                      <span className="text-[16px] font-black">
                        {Math.round(item?.price?.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Line />
              {cartDetails?.length - 1 === index ? (
                <div className="w-full h-auto flex flex-row items-center pb-4 px-2">
                  <div className="w-[50%] h-auto">
                    <p className="font-semibold">{"TOTAL"}</p>
                  </div>
                  <div className="w-[50%] h-auto text-end">
                    <div>
                      <sup className="font-bold lg:text-[11px] text-[9px]">
                        {item?.price?.currency?.length > 1
                          ? getSymbolFromCurrency(item?.price?.currency)
                          : item?.price?.currency}
                      </sup>
                      <span className="text-[16px] font-bold">
                        {Math.round(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </React.Fragment>
          ))
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div>
      <Dialog
        open={props.openModal}
        onClose={props.closeModal}
        TransitionComponent={Zoom}
        // maxWidth='xl'
      >
        {addToCartData?.length > 0 ? (
          <Content>
            {/* <CloseBtn onClick={props.closeModal}>
              <img src={closeIcon} className="w-full h-full" />
            </CloseBtn> */}
            <div className="w-full h-auto flex flex-row justify-between items-start pt-6 pb-6">
              <p className={titleTxt}>{"Tee Times Cart :"}</p>
              <button onClick={() => setState({ clearCartModal: true })}>
                <span className="text-[15px] font-semibold text-[#004996]">
                  {"Clear All"}
                </span>
              </button>
            </div>
            {/* <Title /> */}

            <div>
              <BookingDetails />
            </div>
            <div className="w-full h-auto flex items-center justify-center pt-4">
              <button
                className="md:w-auto w-full md:px-6 px-[3px] rounded-lg h-auto bg-darkYellow py-2 "
                onClick={() => goCheckout()}
              >
                <span className="text-[18px] font-bold ">
                  {"Checkout and Pay"}
                </span>
              </button>
            </div>

            <div className="w-full h-auto flex flex-row items-center justify-center gap-x-[2px] mt-[10px]">
              <Text className="text-sm text-white255 font-sfprodisplay text-center"></Text>
              <button onClick={props.closeModal}>
                <span className="text-[#004996] txt-underline-animation font-bold">
                  {"Continue Shopping  :-"}
                </span>
              </button>
            </div>

            <ClearCartModal
              openModal={state.clearCartModal}
              closeModal={() => closeClearCartModal()}
            />
          </Content>
        ) : (
          <Content className="flex flex-col items-center justify-center">
            <Title />
            <button className="w-full h-auto p-2" onClick={props.closeModal}>
              No Items Available
            </button>
          </Content>
        )}
      </Dialog>
    </div>
  );
}

const Content = tw.div`
md:w-[500px] sm:w-[430px] xsm:w-[320px] w-full 
min:w-[280px]
h-full
md:px-8 px-2
pb-6
md:overflow-x-hidden
sm:overflow-x-hidden
overflow-x-auto
overflow-y-auto
custom-scroll
overflow-auto
bg-white
`;
const Line = tw.div`
w-full
h-[1.1px] 
opacity-70
bg-[gray]
my-4
`;
const titleTxt = `
text-[21px] 
text-[black]
font-bold 
`;
const CloseBtn = tw.button`
w-[40px] 
h-[40px] 
absolute
right-0
top-[-2px]
flex 
items-start 
justify-end
`;

export default CartModal;
