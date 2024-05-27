import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const withdrawl_list = createAsyncThunk(
  "withdrawls/withdrawl_list",
  async payload => {
    const response = await apiService.withdrawl_list(payload)
    return response.data
  }
)
export const withdrawl_create = createAsyncThunk(
  "withdrawls/withdrawl_create",
  async payload => {
    const response = await apiService.withdrawl_create(payload)
    return response.data
  }
)
export const withdrawl_retrieve = createAsyncThunk(
  "withdrawls/withdrawl_retrieve",
  async payload => {
    const response = await apiService.withdrawl_retrieve(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const withdrawlsSlice = createSlice({
  name: "withdrawls",
  initialState,
  reducers: {},
  extraReducers: {
    [withdrawl_list.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [withdrawl_list.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = action.payload
        state.api.loading = "idle"
      }
    },
    [withdrawl_list.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [withdrawl_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [withdrawl_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [withdrawl_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [withdrawl_retrieve.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [withdrawl_retrieve.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [withdrawl_retrieve.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  withdrawl_list,
  withdrawl_create,
  withdrawl_retrieve,
  slice: withdrawlsSlice
}
