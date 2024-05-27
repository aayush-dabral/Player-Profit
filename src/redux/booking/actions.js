import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BOOK_TEETIME,
  CREATE_CUSTOMER,
  CREATE_PAYMENT,
  FACILITES,
  ADD_FAV_CLUB,
  GET_FAV_CLUB,
} from "./types";
import {
  bookingTeetimeApi,
  createCustomerApi,
  createpaymentApi,
  getFacilitieApi,
  addFavClubApi,
  getFavClubApi,
} from "../../services/apis";

export const bookingTeetime = createAsyncThunk(BOOK_TEETIME, async (data) => {
  try {
    const response = await bookingTeetimeApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const createCustomer = createAsyncThunk(
  CREATE_CUSTOMER,
  async (data) => {
    try {
      const response = await createCustomerApi(data);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const createPpayment = createAsyncThunk(CREATE_PAYMENT, async (data) => {
  try {
    const response = await createpaymentApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const getFacilities = createAsyncThunk(FACILITES, async (data) => {
  try {
    const response = await getFacilitieApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const addFavClub = createAsyncThunk(ADD_FAV_CLUB, async (data) => {
  try {
    const response = await addFavClubApi(data);
    return response;
  } catch (err) {
    return err;
  }
});
export const getFavClub = createAsyncThunk(GET_FAV_CLUB, async (data) => {
  try {
    const response = await getFavClubApi();
    return response;
  } catch (err) {
    return err;
  }
});
