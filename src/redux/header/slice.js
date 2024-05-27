import dayjs from "dayjs";
import { createSlice } from "@reduxjs/toolkit";
import { getHeaderData, getMenus } from "./actions";

const initialState = {
  menus: null,
  logo: null,
  customDate: dayjs(),
};

const slice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    updateCustomDate: (state, action) => {
      state.customDate = action?.payload?.date;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHeaderData.fulfilled, (state, action) => {
      state.logo = action?.payload?.data;
    });
    builder.addCase(getMenus.fulfilled, (state, action) => {
      state.menus = action?.payload?.data;
    });
  },
});

export const { updateCustomDate } = slice.actions;
export default slice.reducer;
