import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../utils/helper";

export const API_URL = `${REACT_APP_BACKEND_URL}/posts/`;

const createPost = async (postData) => {
  const response = await axios.post(API_URL, postData);
  return response.data;
};

const getAllPost = async() => {
    const response = await axios.get(API_URL + "all");
    return response.data
};

const getSinglePost = async(postSlug) => {
    const response = await axios.get(API_URL + postSlug);
    return response.data
};

const getUserPosts = async() => {
  const response = await axios.get(API_URL + "user/posts");
  return response.data;
}

const searchUserPosts = async(userId, email) => {
  const response = await axios.get(API_URL + `search/posts?userId=${userId}&email=${email}`);
  return response.data;
}

const postsService = {
  createPost,
  getSinglePost,
  getAllPost,
  getUserPosts,
  searchUserPosts
};

export default postsService;
