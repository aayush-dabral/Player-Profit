import { createSlice } from "@reduxjs/toolkit";
import {
  getFeaturedClubsNearMe,
  getBestClubsInCountry,
  getBanner,
  getTodaysBestClubDealsNearMe,
  getPlayNineClubs,
  getDrivingRangeClubsNearMe,
  getPuttingGreenClubsNearMe,
  getTeachingProClubsNearMe,
  getPitchingAreaClubsNearMe,
  exploreGameList,
  getCountrysList,
  getDestinationList,
  getClubDetail,
  getClubPolicy,
  getClubTeeTime,
  getClubCachedTeeTime,
  clubSearchApiList,
} from "./actions";
import _ from "lodash";

const initialState = {
  featuredClubsNearMe: [],
  bestClubsInCountry: [],
  banner: null,
  todaysBestClubDealsNearMe: [],
  playNineClubs: [],
  drivingRangeClubsNearMe: [],
  puttingGreenClubsNearMe: [],
  teachingProClubsNearMe: [],
  pitchingAreaClubsNearMe: [],
  exploreGame: [],
  countryList: [],
  destination: null,
  clubDetail: null,
  clubPolicy: null,
  clubTeeTime: null,
  clubCachedTeeTime: null,
  clubId: null,
  bookingDetails: null,
  clubSearchList: {
    club: [],
    location: [],
  },
  cachedTeeTime: [],
};

const slice = createSlice({
  name: "teetime",
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
      state.bookingDetails = action?.payload;
    },
    getCachedTeeTime: (state, action) => {
      state.cachedTeeTime = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFeaturedClubsNearMe.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.featuredClubsNearMe = action?.payload?.data);
    });
    builder.addCase(getBestClubsInCountry.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.bestClubsInCountry = action?.payload?.data);
    });
    builder.addCase(getBanner.fulfilled, (state, action) => {
      action?.payload?.status === 200 && (state.banner = action?.payload?.data);
    });
    builder.addCase(getTodaysBestClubDealsNearMe.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.todaysBestClubDealsNearMe = action?.payload?.data);
    });
    builder.addCase(getPlayNineClubs.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.playNineClubs = action?.payload?.data);
    });
    builder.addCase(getDrivingRangeClubsNearMe.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.drivingRangeClubsNearMe = action?.payload?.data);
    });
    builder.addCase(getPuttingGreenClubsNearMe.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.puttingGreenClubsNearMe = action?.payload?.data);
    });
    builder.addCase(getTeachingProClubsNearMe.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.teachingProClubsNearMe = action?.payload?.data);
    });
    builder.addCase(getPitchingAreaClubsNearMe.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.pitchingAreaClubsNearMe = action?.payload?.data);
    });
    builder.addCase(exploreGameList.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.exploreGame = action?.payload?.data);
    });
    builder.addCase(getCountrysList.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.countryList = action?.payload?.data?.data);
    });
    builder.addCase(getDestinationList.fulfilled, (state, action) => {
      action?.payload?.status === 200 &&
        (state.destination = action?.payload?.data);
    });
    builder.addCase(getClubDetail.fulfilled, (state, action) => {
      state.clubDetail = action?.payload?.data?.data;
      state.clubId = action?.payload?.data?.data?.id;
    });
    builder.addCase(getClubPolicy.fulfilled, (state, action) => {
      state.clubPolicy = action?.payload?.data;
    });
    builder.addCase(getClubTeeTime.fulfilled, (state, action) => {
      state.clubTeeTime = action?.payload?.data?.data;
    });
    builder.addCase(getClubCachedTeeTime.fulfilled, (state, action) => {
      state.clubCachedTeeTime = action?.payload?.data?.data;
    });
    builder.addCase(clubSearchApiList.fulfilled, (state, action) => {
      if (action?.payload?.status === 200) {
        const [club, location] = _.partition(
          action?.payload?.data,
          function (e) {
            return e?.type?.toLowerCase() == "club";
          }
        );
        state.clubSearchList.club = club;
        state.clubSearchList.location = location;
      }
    });
  },
});

export const { setBookingDetails, getCachedTeeTime } = slice.actions;
export default slice.reducer;
