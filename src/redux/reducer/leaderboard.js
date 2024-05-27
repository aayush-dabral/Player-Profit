import {LEADERBOARD_FAILURE,LEADERBOARD_SUCCESS,LEADERBOARD_INIT} from "../actionType";

const initialState = {};

const getLeaderboardInit = (state, action) => ({
  ...state,
  leaderboardDetails: {data: {}, status: false, loader: true},
});

const getLeaderboardSuccess = (state, action) => ({
  ...state,
  leaderboardDetails: {data: action?.data, status: true, loader: false},
});

const getLeaderboardFailure = (state, action) => ({
  ...state,
  leaderboardDetails: {data: action?.data, status: false, loader: false},
});

const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEADERBOARD_INIT:
      return getLeaderboardInit(state, action);
    case LEADERBOARD_SUCCESS:
      return getLeaderboardSuccess(state, action?.payload);
    case LEADERBOARD_FAILURE:
      return getLeaderboardFailure(state, action?.payload);
    default:
      return state;
  }
};

export default leaderboardReducer;