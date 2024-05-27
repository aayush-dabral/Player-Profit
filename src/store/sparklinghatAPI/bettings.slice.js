import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const betting_data_list = createAsyncThunk(
  "bettings/betting_data_list",
  async payload => {
    const response = await apiService.betting_data_list(payload)
    return response.data
  }
)
export const betting_data_create = createAsyncThunk(
  "bettings/betting_data_create",
  async payload => {
    const response = await apiService.betting_data_create(payload)
    return response.data
  }
)
export const betting_data_retrieve = createAsyncThunk(
  "bettings/betting_data_retrieve",
  async payload => {
    const response = await apiService.betting_data_retrieve(payload)
    return response.data
  }
)
export const betting_data_update = createAsyncThunk(
  "bettings/betting_data_update",
  async payload => {
    const response = await apiService.betting_data_update(payload)
    return response.data
  }
)
export const betting_data_partial_update = createAsyncThunk(
  "bettings/betting_data_partial_update",
  async payload => {
    const response = await apiService.betting_data_partial_update(payload)
    return response.data
  }
)
export const betting_data_destroy = createAsyncThunk(
  "bettings/betting_data_destroy",
  async payload => {
    const response = await apiService.betting_data_destroy(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const bettingsSlice = createSlice({
  name: "bettings",
  initialState,
  reducers: {},
  extraReducers: {
    [betting_data_list.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [betting_data_list.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = action.payload
        state.api.loading = "idle"
      }
    },
    [betting_data_list.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [betting_data_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [betting_data_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [betting_data_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [betting_data_retrieve.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [betting_data_retrieve.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [betting_data_retrieve.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [betting_data_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [betting_data_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [betting_data_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [betting_data_partial_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [betting_data_partial_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [betting_data_partial_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [betting_data_destroy.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [betting_data_destroy.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.filter(
          record => record.id !== action.meta.arg?.id
        )
        state.api.loading = "idle"
      }
    },
    [betting_data_destroy.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  betting_data_list,
  betting_data_create,
  betting_data_retrieve,
  betting_data_update,
  betting_data_partial_update,
  betting_data_destroy,
  slice: bettingsSlice
}
