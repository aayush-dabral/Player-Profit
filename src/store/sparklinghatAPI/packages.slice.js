import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const subscriptionplan_list = createAsyncThunk(
  "packages/subscriptionplan_list",
  async payload => {
    const response = await apiService.subscriptionplan_list(payload)
    return response.data
  }
)
export const subscriptionplan_retrieve = createAsyncThunk(
  "packages/subscriptionplan_retrieve",
  async payload => {
    const response = await apiService.subscriptionplan_retrieve(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {},
  extraReducers: {
    [subscriptionplan_list.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [subscriptionplan_list.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = action.payload
        state.api.loading = "idle"
      }
    },
    [subscriptionplan_list.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [subscriptionplan_retrieve.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [subscriptionplan_retrieve.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [subscriptionplan_retrieve.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  subscriptionplan_list,
  subscriptionplan_retrieve,
  slice: packagesSlice
}
