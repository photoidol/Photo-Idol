import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../utils/helper";

export default axios.create({
  baseURL: `${REACT_APP_BACKEND_URL}/`,
});
