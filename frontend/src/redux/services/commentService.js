import axios from "axios";
const BACKEND_URL = "https://api.fotoidol.com";
export const API_URL = `${BACKEND_URL}/api/v1/comment/`;

const getAllComment = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createComment = async (commentData) => {
  const response = await axios.post(API_URL, commentData);
  return response.data.message;
};

const createChildComment = async (commentData) => {
  const response = await axios.post(API_URL, commentData);
  return response.data.message;
};

const deleteComment = async (commentId) => {
  const response = await axios.delete(API_URL, {
    data: { id: commentId },
  });
  return response.data.message;
};

const getPostComments = async (postId) => {
  const response = await axios.get(API_URL + `single/${postId}`);
  return response.data;
};

const commentService = {
  getAllComment,
  createComment,
  deleteComment,
  createChildComment,
  getPostComments,
};

export default commentService;
