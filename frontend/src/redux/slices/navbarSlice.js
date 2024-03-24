import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isNavbarOpen: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleNavbar(state) {
      state.isNavbarOpen = !state.isNavbarOpen;
    },
    closeNavbar(state) {
      state.isNavbarOpen = false;
    },
    openNavbar(state) {
      state.isNavbarOpen = true;
    },
  },
});

export const selectIsNavbarOpen = (state) => state.navbar.isNavbarOpen;
export const { toggleNavbar, closeNavbar, openNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
