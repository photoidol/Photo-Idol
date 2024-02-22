import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import {
  createChildComment,
  deleteComment,
  getAllComment,
} from "../../../redux/slices/commentSlice";
import { staticImages } from "../../../images";
import { formatDateToTimeAgo } from "../../../utils/DateUtils";
import { ChildCommentsItem } from "./ChildCommentsItem";
import { Button } from "@material-tailwind/react";
import { FaCommentDots } from "react-icons/fa";

export const CommentsItem = ({ comment, postId }) => {
  const initialValues = {
    postsId: postId,
    parentCommentId: comment?._id,
    content: "",
  };

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);
  const [isActionBtnsVisible, setIsActionBtnsVisible] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const replyFormRef = useRef(null);
  const actionBtnsRef = useRef(null);

  const handleDeleteComment = async () => {
    await dispatch(deleteComment(comment?._id));
    await dispatch(getAllComment());
  };

  const handleReplyClick = () => {
    setIsReplyFormVisible(true);
  };

  const handleOutsideClick = (e) => {
    if (replyFormRef.current && !replyFormRef.current.contains(e.target)) {
      setIsReplyFormVisible(false);
    }

    if (actionBtnsRef.current && !actionBtnsRef.current.contains(e.target)) {
      setIsActionBtnsVisible(false);
    }
  };

  const handleActionClick = () => {
    setIsActionBtnsVisible(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    initialValues.content = replyContent;
    await dispatch(createChildComment(initialValues));
    await dispatch(getAllComment());
    setReplyContent("");
    setIsReplyFormVisible(false);
  };

  return (
    <div>
      {!comment?.parentComment && (
        <div>
          <article className="p-2 mb-3 text-base border-[1px] border-blue-gray-50 rounded-lg">
            <div className="px-2 py-1">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {!comment.user ? (
                    <img
                      className="mr-3 w-8 h-8 rounded-full"
                      src={staticImages.blank_user}
                      alt=""
                    />
                  ) : (
                    <img
                      className="mr-3 w-8 h-8 rounded-full"
                      src={
                        comment?.user?.avatar?.url
                          ? comment?.user?.avatar?.url
                          : comment?.user?.avatar
                      }
                      alt=""
                    />
                  )}
                  <p className="inline-flex items-center mr-3 font-semibold text-sm text-indigo capitalize">
                    {!comment?.user ? "Anonymous" : comment?.user?.name}
                  </p>
                  <p className="text-xs text-slategray">
                    <span>{formatDateToTimeAgo(comment?.createdAt)}</span>
                  </p>
                </div>
                {comment?.user?._id === user?._id && (
                  <div
                    className="inline-flex relative items-center p-2 text-sm font-medium text-center text-indigo default-transition cursor-pointer"
                    onClick={handleActionClick}
                    type="button"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>

                    {isActionBtnsVisible && (
                      <div
                        className="mt-2 z-10 w-[120px] bg-white rounded-md divide-y divide-gray-100 shadow-lg  absolute right-0 top-full"
                        ref={actionBtnsRef}
                      >
                        <ul className="py-1 text-sm text-slategray">
                          <li>
                            <button
                              className="block w-full py-1.5 px-3 hover:bg-gray-100  default-transition text-slategray"
                              onClick={() => handleDeleteComment(comment?._id)}
                            >
                              Remove
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </footer>
              <p className="text-slategray text-sm">{comment?.content}</p>
              <div className="flex items-center mt-2 space-x-4">
                <button
                  type="button"
                  className="flex gap-x-2 items-center font-medium text-sm text-slategray hover:underline"
                  onClick={handleReplyClick}
                >
                  <FaCommentDots />
                  <span className="text-slategray">Reply</span>
                </button>
              </div>
            </div>

            {comment?.childComments?.length > 0 && (
              <div className="py-4 rounded-lg">
                <p className="px-3 mb-2 text-sm font-semibold text-indigo border-b-[1px] border-blue-gray-50 pb-3">
                  Some Replies:{" "}
                </p>
                {comment?.childComments?.map((childComment) => {
                  return (
                    <ChildCommentsItem
                      childComment={childComment}
                      key={childComment?._id}
                    />
                  );
                })}
              </div>
            )}

            {isReplyFormVisible && (
              <div className="child-comment-form mt-4" ref={replyFormRef}>
                <form
                  className="flex flex-col items-end"
                  onSubmit={handleReplySubmit}
                >
                  <textarea
                    className="textarea-theme"
                    name="content"
                    placeholder="Type Your Comment"
                    value={replyContent}
                    onChange={handleReplyContentChange}
                  ></textarea>
                  <Button
                    type="submit"
                    className="mt-2 mb-2 py-2 rounded bg-moonstone-gradient2 text-sm"
                  >
                    Send Reply
                  </Button>
                </form>
              </div>
            )}
          </article>
        </div>
      )}
    </div>
  );
};

CommentsItem.propTypes = {
  comment: PropTypes.object,
  postId: PropTypes.string,
};
