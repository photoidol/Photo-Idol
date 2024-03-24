import axios from "axios";
import { BACKEND_URL } from "../../utils/helper";
export const API_URL = `${BACKEND_URL}/api/v1/posts/`;

const createPost = async (postData) => {
  const response = await axios.post(API_URL, postData);
  return response.data;
};

const getAllPost = async() => {
    const response = await axios.get(API_URL + "/all");
    return response.data
};

const getSinglePost = async(postSlug) => {
    const response = await axios.get(API_URL + postSlug);
    return response.data
};

const getUserPosts = async() => {
  const response = await axios.get(API_URL + "/user/posts");
  return response.data;
}

const postsService = {
  createPost,
  getSinglePost,
  getAllPost,
  getUserPosts
};

export default postsService;
