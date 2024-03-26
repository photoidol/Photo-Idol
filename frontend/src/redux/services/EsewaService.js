import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../utils/helper";
export const API_URL = `${REACT_APP_BACKEND_URL}/payment/`;

const initiatePayment = async () => {
  const response = await axios.post(API_URL + "initiate-payment");
  return response.data;
};

const esewaService = {
  initiatePayment,
};

export default esewaService;
