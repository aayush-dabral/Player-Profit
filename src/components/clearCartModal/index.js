import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { Zoom } from "@mui/material";
import closeBtn from "@assets/images/closeBtn.png";
import { updateCart } from "@redux/booking/slice";

function ClearCartModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearCarts = () => {
    dispatch(updateCart({ removeItem: true }));
    props.closeModal();
    if (window.location.pathname == "/checkout") {
      navigate(-1);
    }
  };

  return (
    <div>
      <Dialog
        open={props.openModal}
        onClose={props.closeModal}
        TransitionComponent={Zoom}
      >
        <div className="md:w-[400px] sm:w-[330px] w-[230px] h-[300px] rounded-lg bg-white flex flex-col items-center justify-evenly">
          <div className="md:h-[80px] h-[50px] md:w-[80px] w-[50px] rounded-full">
            <img
              src={closeBtn}
              className="md:h-[80px] h-[50px] md:w-[80px] w-[50px] rounded-full"
              alt=""
            />
          </div>
          <div>
            <span className="sm:text-[24px] text-[18px] font-semibold text-center">
              {"Are you sure?"}
            </span>
          </div>
          <div className="w-full flex items-center justify-center">
            <span className="sm:text-[16px] text-[15px] text-center">
              {"You want to remove all items from the cart?"}
            </span>
          </div>
          <div className="w-full h-auto flex flex-row items-center justify-evenly">
            <button
              onClick={() => clearCarts()}
              className="md:w-[150px] sm:w-[120px] w-[70px] h-auto  flex items-center justify-center bg-[#f44336] rounded-md py-2"
            >
              <span className="sm:text-[17px] text-[16px] text-center font-semibold text-white">
                {"Remove"}
              </span>
            </button>
            <button
              onClick={props.closeModal}
              className="md:w-[150px] sm:w-[120px] w-[70px] h-auto  flex items-center justify-center bg-white border border-darkYellow rounded-md py-2"
            >
              <span className="sm:text-[17px] text-[16px] font-semibold text-center">
                {"Cancel"}
              </span>
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ClearCartModal;
