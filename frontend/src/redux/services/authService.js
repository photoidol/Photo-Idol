import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../utils/helper";
export const API_URL = `${REACT_APP_BACKEND_URL}/auth/`;

// const headers = {
//   "Content-Type": "multipart/form-data",
// };

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

const getLogInStatus = async () => {
  const response = await axios.get(API_URL + "login-status");
  return response.data;
};

const getUserProfile = async () => {
  const response = await axios.get(API_URL + "profile");
  return response.data;
};

const updateUserProfile = async (userData) => {
  const response = await axios.put(API_URL + "profile/update", userData);
  return response.data;
};

const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "send-verification-email");
  return response.data.message;
};

const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verify-account/${verificationToken}`
  );
  return response.data.message;
};

const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "change-password", userData);
  return response.data;
};

const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgot-password", {
    email: userData,
  });
  return response.data.message;
};

const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}reset-password/${resetToken}`,
    userData
  );
  return response.data.message;
};

const sendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `send-otp/${email}`);
  return response.data.message;
};
const loginWithCode = async (code, email) => {
  const response = await axios.post(API_URL + `loginwith-otp/${email}`, code);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLogInStatus,
  getUserProfile,
  updateUserProfile,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  sendLoginCode,
  loginWithCode,
};

export default authService;
