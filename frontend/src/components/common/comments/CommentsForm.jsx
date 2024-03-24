import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createComment,
  getAllComment,
} from "../../../redux/slices/commentSlice";
import PropTypes from "prop-types";
import SpinLoader from "../SpinLoader";

export const CommentsForm = ({ postId }) => {
  const initialValues = {
    postsId: postId,
    content: "",
  };
  const [commentContent, setCommentContent] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.comment);
  const commentContentHandler = (e) => {
    setCommentContent(e.target.value);
  };

  const sendComment = async (e) => {
    e.preventDefault();
    if (commentContent.trim().length === 0) {
      toast.error("Please write your comment.");
      return;
    }
    const commentData = {
      ...initialValues,
      content: commentContent,
    };
    await dispatch(createComment(commentData));
    await dispatch(getAllComment());
    setCommentContent("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendComment(e);
    }
  };

  return (
    <>
      <div className="flex justify-center mx-auto lg:px-2">
        <div className="w-full">
          <form
            onSubmit={sendComment}
            className="relative z-10 h-auto overflow-hidden"
          >
            <textarea
              type="text"
              name="content"
              onChange={commentContentHandler}
              value={commentContent}
              className="textarea-theme max-w-[700px] mb-3.5 lg:mb-4"
              placeholder="Write your comment"
              rows="3"
              onKeyDown={handleKeyDown}
            ></textarea>
            {isLoading && <SpinLoader />}
            <button
              type="submit"
              className=" text-white px-3 lg:px-4 py-1.5 lg:py-2 bg-moonstone-gradient2 font-medium  rounded cursor-pointer flex items-center"
            >
              Send Your Comment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

CommentsForm.propTypes = {
  postId: PropTypes.string,
};
