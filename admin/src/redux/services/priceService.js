import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../utils/helper";
export const API_URL_PRICE_LIMIT = `${REACT_APP_BACKEND_URL}/price-limit/`;

const getPriceConfig = async () => {
  const response = await axios.get(API_URL_PRICE_LIMIT);
  return response.data;
};

const changePriceConfig = async (formdata) => {
  const response = await axios.post(API_URL_PRICE_LIMIT, formdata);
  console.log(response);
  return response.data;
};

const priceService = {
  getPriceConfig,
  changePriceConfig,
};

export default priceService;
