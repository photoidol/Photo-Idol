import axios from "axios";
const BACKEND_URL = "http://localhost:5001";
export const API_URL = `${BACKEND_URL}/api/v1/payment/`;

const initiatePayment = async () => {
  const response = await axios.post(API_URL + "initiate-payment");
  console.log("Service Response:", response.data);
  return response.data;
};

const esewaService = {
  initiatePayment,
};

export default esewaService;
