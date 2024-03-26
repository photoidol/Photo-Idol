import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../utils/helper";
export const API_URL = `${REACT_APP_BACKEND_URL}/comment/`;

const getAllComment = async() => {
    const response = await axios.get(API_URL);
    return response.data;
};

const createComment = async(commentData) => {
    const response = await axios.post(API_URL, commentData);
    return response.data.message;
}

const createChildComment = async(commentData) => {
    const response = await axios.post(API_URL, commentData);
    return response.data.message;
}

const deleteComment = async(commentId) => {
    const response = await axios.delete(API_URL, {
        data: { id: commentId}
    });
    return response.data.message;
}

const commentService = {
    getAllComment,
    createComment,
    deleteComment,
    createChildComment
}

export default commentService;