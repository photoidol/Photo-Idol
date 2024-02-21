import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import priceService from "../services/priceService";
import { toast } from "react-toastify";

const initialState = {
  priceLimit: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getPriceConfig = createAsyncThunk(
  "price-get/limit",
  async (_, thunkAPI) => {
    try {
      return await priceService.getPriceConfig();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changePriceConfig = createAsyncThunk(
  "price-change/limit",
  async (formData, thunkAPI) => {
    try {
      return await priceService.changePriceConfig(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const priceLimitSlice = createSlice({
  name: "pricelimit",
  initialState,
  reducers: {
    PRICELIMIT_RESET(state) {
      state.priceLimit = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPriceConfig.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPriceConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.priceLimit = action.payload;
      })
      .addCase(getPriceConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.priceLimit = null;
        toast.error(action.payload);
      })
      .addCase(changePriceConfig.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePriceConfig.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success("Price value changed!");
      })
      .addCase(changePriceConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { PRICELIMIT_RESET } = priceLimitSlice.actions;
export default priceLimitSlice.reducer;
