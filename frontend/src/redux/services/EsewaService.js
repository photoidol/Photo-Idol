import axios from "axios";
const BACKEND_URL = "http://api.fotoidol.com";
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
