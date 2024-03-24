import { staticImages } from "../../images";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from "@material-tailwind/react";
import { BsShare } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchUserPosts,
  selectAllPosts,
  selectSearchedUserPosts,
  selectSinglePost,
} from "../../redux/slices/postsSlice";
import { getSinglePost } from "../../redux/slices/postsSlice";
import { format } from "date-fns";
import ContactInfo from "../../components/common/ContactInfo";
import Loader from "../../components/common/Loader";
import {
  getAllComment,
  selectAllComment,
} from "../../redux/slices/commentSlice";
import { scrollToTop } from "../../utils/scrollToTop";
import { getallCategory } from "../../redux/slices/categorySlice";
import { Typography } from "@material-tailwind/react";
import ProfileModal from "../../components/common/ProfileModal";
import FsLightbox from "fslightbox-react";
import {
  MdArrowBackIos,
  MdContentCopy,
  MdOutlineFullscreen,
} from "react-icons/md";
import {
  searchUserLinks,
  selectSearchedUserLinks,
} from "../../redux/slices/userSlice";
import { SocialIcon } from "react-social-icons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  copyImageURL,
  shareOnFacebook,
  shareOnLinkedIn,
  shareOnPinterest,
  shareOnTwitter,
} from "../../utils/ShareUtils";
import { isEmptyObject } from "../../utils/helper";
import PostSidebar from "../../components/common/posts/PostSidebar";
import { CommentsForm } from "../../components/common/comments/CommentsForm";
import { Comments } from "../../components/common/comments/Comments";
import { togglePostLikes } from "../../redux/slices/resourceSlice";
import { selectUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { POST_LIKE_ADDED, POST_LIKE_REMOVED } from "../../utils/constants";
import { FaEye } from "react-icons/fa";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postSlug } = useParams();
  const posts = useSelector(selectAllPosts);
  const singlePost = useSelector(selectSinglePost);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const comments = useSelector(selectAllComment);
  const [toggler, setToggler] = useState(false);
  const userPosts = useSelector(selectSearchedUserPosts);
  const userLinks = useSelector(selectSearchedUserLinks);
  const likesStatus = useSelector((state) => state.resource.likesStatus);
  const user = useSelector(selectUser);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPostComment, setCurrentPostComment] = useState([]);
  const [postLikeStatus, setPostLikeStatus] = useState(null);
  const [postLikeCount, setPostLikeCount] = useState(0);

  // ### PROFILE MODAL TOGGLE
  const [profileOpen, setProfileOpen] = useState(false);
  const handleProfileView = () => setProfileOpen((cur) => !cur);

  // ### POST COMMENT FILTER
  useEffect(() => {
    let filteredCurrentPostComment = comments?.allComment?.filter(
      (comment) => singlePost?._id === comment?.posts?._id
    );
    setCurrentPostComment(filteredCurrentPostComment);
  }, [comments, singlePost]);

  useEffect(() => {
    if (!isEmptyObject(singlePost)) {
      dispatch(getAllComment());
      dispatch(
        searchUserPosts({
          userId: singlePost.user._id,
          email: singlePost.user.email,
        })
      );
      dispatch(searchUserLinks(singlePost.user._id));
    }
  }, [singlePost, dispatch]);

  useEffect(() => {
    if (postSlug) {
      dispatch(getSinglePost(postSlug));
    }
    dispatch(getallCategory());
  }, [postSlug, dispatch]);

  const handlePostLikes = async (postId) => {
    if (postId && user?._id) {
      const toggleData = {
        postId: postId,
        userId: {
          user: {
            id: user?._id,
          },
        },
      };
      const response = await dispatch(togglePostLikes(toggleData));
      if (response.payload && response.payload.status) {
        setPostLikeStatus(response.payload.status);
        if (response.payload.status === POST_LIKE_ADDED) {
          setPostLikeCount((prevVal) => ++prevVal);
        }
        if (response.payload.status === POST_LIKE_REMOVED) {
          setPostLikeCount((prevVal) => --prevVal);
        }
      }
      setIsVisible(true);
    } else {
      toast.error("Please login first to like the photo!");
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    if (singlePost?.likes && user?.email) {
      const isLiked = singlePost.likes.some(
        (like) => like.email === user.email
      );
      setPostLikeStatus(isLiked ? "added" : "removed");
      setPostLikeCount(singlePost.likes.length);
    }
  }, [singlePost.likes, user?.email]);

  return (
    <>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" className="text-indigo">
            FotoIdol - Photo Share
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            onClick={handleOpen}
            className="text-indigo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="pr-2 pt-0">
          <div className="mb-1">
            <Typography
              variant="small"
              color="gray"
              className="font-semibold text-slategray opacity-90  mb-3"
            >
              Share Image On:
            </Typography>
            <div className="flex items-center justify-start gap-2 flex-wrap">
              <SocialIcon
                className="cursor-pointer hover:scale-110 default-transition"
                onClick={() => shareOnFacebook(singlePost?.assets?.filePath)}
                network="facebook"
              />
              <SocialIcon
                className="cursor-pointer hover:scale-110 default-transition"
                onClick={() => shareOnTwitter(singlePost?.assets?.filePath)}
                network="twitter"
              />
              <SocialIcon
                className="cursor-pointer hover:scale-110 default-transition"
                onClick={() => shareOnLinkedIn(singlePost?.assets?.filePath)}
                network="linkedin"
              />
              <SocialIcon
                className="cursor-pointer hover:scale-110 default-transition"
                onClick={() =>
                  shareOnPinterest(
                    singlePost?.assets?.filePath,
                    singlePost?.description
                  )
                }
                network="pinterest"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="justify-between gap-2 border-t border-blue-gray-50">
          <Typography
            variant="small"
            color="gray"
            className="font-normal flex items-center cursor-pointer"
            onClick={() => copyImageURL(singlePost?.assets?.filePath)}
          >
            <MdContentCopy className="me-2 text-indigo" size={20} />
            <span className="mt-1 text-slategray">
              Click here to copy the image link
            </span>
          </Typography>
        </DialogFooter>
      </Dialog>

      {userPosts?.totalPost > 0 && (
        <ProfileModal
          profileOpen={profileOpen}
          singlePost={singlePost}
          userPosts={userPosts.postCount}
          handleProfileView={handleProfileView}
          userLinks={userLinks}
        />
      )}

      {/* Fs lightbox */}
      <FsLightbox toggler={toggler} sources={[singlePost?.assets?.filePath]} />

      <div className="flex py-8 lg:py-12 bg-seasalt">
        <div className="containers w-full lg:mt-2 mt-6">
          {isLoading && <Loader />}

          <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
            <button
              className="text-slategray flex items-center gap-x-1 pt-6 pb-4 hover:gap-x-2 hover:text-moonstone default-transition"
              onClick={() => navigate(-1)}
            >
              <MdArrowBackIos size={17} />
              <span className="font-semibold text-sm lg:text-md uppercase">
                Go Back
              </span>
            </button>
          </div>
          <div className="grid xl:grid-cols-[auto_280px] gap-8 items-start">
            <div className="bg-white rounded-md shadow-lg px-3">
              <div className="lg:px-2 flex items-center flex-wrap gap-y-2.5 sm:gap-y-3 justify-between border-b-[1px] border-blue-gray-50 py-3 w-full">
                <div className="flex items-center">
                  <header>
                    <address className="flex items-center not-italic">
                      <div className="inline-flex items-center mr-2 sm:mr-3 text-sm text-gray-900">
                        <div
                          className="cursor-pointer hover:scale-105 default-transition"
                          onClick={handleProfileView}
                        >
                          {singlePost?.user ? (
                            <img
                              className="mr-3 sm:mr-4 w-10 h-10 lg:w-12 lg:h-12 rounded-full"
                              src={
                                singlePost?.user?.avatar?.url
                                  ? singlePost?.user?.avatar?.url
                                  : singlePost?.user?.avatar
                              }
                              alt="user image"
                            />
                          ) : (
                            <img
                              className="mr-3 sm:mr-4 w-10 h-10 lg:w-12 lg:h-12 rounded-full"
                              src={staticImages.blank_user}
                              alt="user image"
                            />
                          )}
                        </div>
                        <div className="">
                          <a
                            rel="author"
                            className="text-sm sm:text-base font-bold text-dark capitalize"
                          >
                            {singlePost?.user?.name}
                          </a>
                          <p className="text-xs sm:text-[13px] text-slategray font-normal">
                            Uploaded : &nbsp;
                            {singlePost?.createdAt &&
                              format(
                                new Date(singlePost.createdAt),
                                "do MMMM, yyyy"
                              )}
                          </p>
                        </div>
                      </div>
                    </address>
                  </header>
                </div>
                <div className="flex items-center flex-wrap">
                  <p className="font-semibold lg:inline-flex items-center  text-slategray flex text-sm">
                    <span className="me-3 inline-flex items-center">
                      <FaEye className="text-sm sm:text-base" />
                    </span>
                    <span className="text-xs sm:text-sm">
                      {singlePost?.numOfViews}
                    </span>
                  </p>
                  <p className="ms-5 font-semibold lg:inline-flex items-center text-slategray flex text-sm relative">
                    <button
                      onClick={() => handlePostLikes(singlePost?._id)}
                      className="me-3 inline-flex items-center cursor-pointer hover:scale-110 default-transition"
                    >
                      {postLikeStatus === POST_LIKE_ADDED && (
                        <AiFillHeart className="text-sm sm:text-base text-moonstone" />
                      )}
                      {postLikeStatus === POST_LIKE_REMOVED && (
                        <AiOutlineHeart className="text-sm sm:text-base" />
                      )}
                    </button>
                    <span className="text-xs sm:text-sm">
                      {singlePost?.likes ? postLikeCount : <span>&nbsp;</span>}
                    </span>
                    {likesStatus && isVisible && (
                      <span className="absolute top-full left-0 block w-auto whitespace-nowrap text-sm rounded font-normal bg-white shadow-md text-slategray px-2 py-1.5">
                        Like {likesStatus?.status}
                      </span>
                    )}
                  </p>
                  <p className="ms-5 font-semibold text-sm lg:inline-flex items-center text-slategray flex">
                    <button
                      type="button"
                      onClick={handleOpen}
                      className="inline-flex items-center hover:text-moonstone default-transition"
                    >
                      <BsShare className="me-3 text-sm sm:text-base" />
                      <span className="text-xs sm:text-sm">Share Photo</span>
                    </button>
                  </p>
                </div>
              </div>
              <div className="mt-4 mb-4">
                <div className="h-[320px] sm:h-[360px] md:h-[400px] overflow-hidden">
                  <img
                    className="cursor-pointer default-transition object-contain w-full h-full"
                    src={singlePost?.assets?.filePath}
                    alt={singlePost?.title}
                    onClick={() => setToggler(!toggler)}
                  />
                  <div className="flex justify-end my-3">
                    <button
                      type="button"
                      className="hover:text-moonstone default-transition hover:scale-125"
                    >
                      <MdOutlineFullscreen
                        title="Full screen"
                        size={28}
                        onClick={() => setToggler(!toggler)}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="image-description border-t-[1px] border-black/5 py-4 lg:py-5 lg:px-2">
                <h1 className="mb-2 font-bold text-dark lg:mb-3 text-lg md:text-xl lg:text-2xl">
                  {singlePost?.title}
                </h1>

                <p className="text-sm lg:text-base text-slategray">
                  {singlePost?.description}
                </p>
              </div>
              <CommentsForm postId={singlePost._id} />
              {currentPostComment?.length > 0 ? (
                <Comments
                  comments={currentPostComment}
                  postId={singlePost._id}
                />
              ) : (
                <Typography className="mb-6 my-4 lg:my-5 text-slategray font-semibold text-sm lg:text-base">
                  No comments found!
                </Typography>
              )}
            </div>
            {posts?.length > 0 && <PostSidebar posts={posts} />}
          </div>
        </div>
      </div>
      <ContactInfo />
    </>
  );
};

export default DetailsPage;
