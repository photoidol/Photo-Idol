import axios from "axios";

export default axios.create({
  baseURL: "https://api.fotoidol.com/api/v1/",
});