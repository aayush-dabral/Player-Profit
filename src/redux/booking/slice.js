import { createSlice } from "@reduxjs/toolkit";
import {
  bookingTeetime,
  createCustomer,
  createPpayment,
  getFacilities,
  addFavClub,
  getFavClub,
} from "./actions";

const initialState = {
  cartDetails: [],
  totalAmount: 0,
  currency: null,
  payLoader: false,
  favClubData: [],
  addFavClubs: null,
};
const slice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      if (action?.payload?.localSave === true) {
        state.cartDetails = action?.payload?.localdata;
      } else if (action?.payload?.removeItem === true) {
        state.cartDetails = [];
        localStorage.setItem("LocalCartData", JSON.stringify([]));
      } else {
        localStorage.setItem(
          "LocalCartData",
          JSON.stringify([...state.cartDetails, action.payload])
        );
        state.cartDetails = [...state.cartDetails, action.payload];
        localStorage.setItem(
          "AddToCartsData",
          JSON.stringify(state.cartDetails)
        );
      }
    },
    editCart: (state, action) => {
      state.cartDetails = action.payload;
      localStorage.setItem("LocalCartData", JSON.stringify(action.payload));
    },
    removeTeetime: (state, action) => {
      state.cartDetails = state.cartDetails?.filter(
        (val, ind) => val.teeId !== action?.payload?.teeId
      );
      localStorage.setItem("AddToCartsData", JSON.stringify(state.cartDetails));
      localStorage.setItem(
        "LocalCartData",
        JSON.stringify(
          (state.cartDetails = state.cartDetails?.filter(
            (val, ind) => val.teeId !== action?.payload?.teeId
          ))
        )
      );
      state.totalAmount = state.totalAmount - action?.payload?.amount?.amount;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = state.totalAmount + action?.payload?.amount;
      state.currency = action?.payload?.currency;
    },
    setPayLoader: (state, action) => {
      state.payLoader = action;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bookingTeetime.fulfilled, (state, action) => {});
    builder.addCase(createCustomer.fulfilled, (state, action) => {});
    builder.addCase(createPpayment.fulfilled, (state, action) => {});
    builder.addCase(getFacilities.fulfilled, (state, action) => {});
    builder.addCase(addFavClub.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.addFavClubs = action?.payload?.data);
    });
    builder.addCase(getFavClub.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.favClubData = action?.payload?.data);
    });
  },
});
export const {
  updateCart,
  setTotalAmount,
  removeTeetime,
  editCart,
  setPayLoader,
} = slice.actions;

export default slice.reducer;
