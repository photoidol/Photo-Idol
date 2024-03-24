import axios from "axios";
import { BACKEND_URL } from "../../utils/helper";
export const API_URL = `${BACKEND_URL}/api/v1/payment/`;

const initiatePayment = async () => {
  const response = await axios.post(API_URL + "initiate-payment");
  return response.data;
};

const esewaService = {
  initiatePayment,
};

export default esewaService;
