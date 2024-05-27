import { createSlice } from "@reduxjs/toolkit";
import { clubSortingOptions, searchClubs, catchingTeetime } from "./actions";

const initialState = {
  sortingOptions: [],
  searchedClubs: [],
  cachingTeeTime: null,
  loading: false,
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchClubs: (state, action) => {
      state.searchedClubs = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clubSortingOptions.fulfilled, (state, action) => {
      if (action?.payload?.status === 200) {
        state.sortingOptions = action?.payload?.data?.data;
      }
    });
    builder.addCase(searchClubs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchClubs.fulfilled, (state, action) => {
      if (action?.payload?.status === 200) {
        state.searchedClubs = action?.payload?.data;
      }
      state.loading = false;
    });
    builder.addCase(catchingTeetime.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(catchingTeetime.fulfilled, (state, action) => {
      if (action?.payload?.status === 200) {
        state.cachingTeeTime = action?.payload?.data;
      }
      state.loading = false;
    });
  },
});

export const { setSearchClubs } = slice.actions;
export default slice.reducer;
