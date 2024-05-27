import { SUBSCRIPTION_PLAN_INIT, SUBSCRIPTION_PLAN_SUCCESS, SUBSCRIPTION_PLAN_FAILURE} from "../actionType";

const initialState = {};

const subscriptionPlanListInit = (state, action) => ({
  ...state,
  subscriptionPlan: {data: {}, status: false, loader: true},
});

const subscriptionPlanListSuccess = (state, action) => ({
  ...state,
  subscriptionPlan: {data: action?.data, status: true, loader: false},
});

const subscriptionPlanListFailure = (state, action) => ({
  ...state,
  subscriptionPlan: {data: action?.data, status: false, loader: false},
});

const subscriptionPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_PLAN_INIT:
      return subscriptionPlanListInit(state, action);
    case SUBSCRIPTION_PLAN_SUCCESS:
      return subscriptionPlanListSuccess(state, action?.payload);
    case SUBSCRIPTION_PLAN_FAILURE:
      return subscriptionPlanListFailure(state, action?.payload);
    default:
      return state;
  }
};

export default subscriptionPlanReducer;