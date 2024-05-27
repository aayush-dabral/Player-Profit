import { createAsyncThunk } from "@reduxjs/toolkit";
import { CLUB_SORTING_OPTIONS, SEARCH_CLUBS, CATCHING_TEETIME } from "./types";
import {
  clubSortingOptionsApi,
  searchClubsApi,
  catchingTeetimeApi,
} from "../../services/apis";


export const clubSortingOptions = createAsyncThunk(
  CLUB_SORTING_OPTIONS,
  async () => {
    try {
      const response = await clubSortingOptionsApi();
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const searchClubs = createAsyncThunk(SEARCH_CLUBS, async (data) => {
  try {
    const response = await searchClubsApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const catchingTeetime = createAsyncThunk(
  CATCHING_TEETIME,
  async (data) => {
    try {
      const response = await catchingTeetimeApi(data);
      return response;
    } catch (err) {
      return err;
    }
  }
);
