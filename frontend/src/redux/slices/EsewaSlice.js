import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import esewaService from "../services/EsewaService";

export const initiatePayment = createAsyncThunk("esewa/initiatePayment", async (_, thunkAPI) => {
  try {
    const response = await esewaService.initiatePayment();
    return response;
  } catch (error) {
    const message = error.response.data.message || error.message || error.toString();
    // console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});
const initialState = {
  formData: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
};

const esewaSlice = createSlice({
  name: "esewa",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.formData = action.payload;
        toast.success("Payment initiation successful");
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        toast.error(action.message);
      });
  },
});

export default esewaSlice.reducer;
