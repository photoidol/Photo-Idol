import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AiFillCheckCircle, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { SocialIcon } from "react-social-icons";
import { getAllPost } from "../../redux/slices/postsSlice";
import FsLightbox from "fslightbox-react";
import { FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const ProfileModal = ({
  profileOpen,
  singlePost,
  handleProfileView,
  userPosts,
  userLinks,
}) => {
  const dispatch = useDispatch();
  const [toggler, setToggler] = useState(false);
  const [postPhotos, setPostPhotos] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const totalViews = userPosts?.reduce((accum, currObj) => {
    return accum + currObj.numOfViews;
  }, 0);

  const openLightbox = (index) => {
    setActiveImage(index);
    setToggler(!toggler);
  };

  useEffect(() => {
    if (userPosts) {
      let tempPhotos = [];
      userPosts.forEach((post) => {
        if (post.assets && post.assets[0]?.filePath) {
          tempPhotos.push(post.assets[0].filePath);
        }
      });
      setPostPhotos(tempPhotos);
    } else {
      setPostPhotos([]);
    }
    dispatch(getAllPost());
  }, [dispatch, userPosts, profileOpen]);

  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={postPhotos.length > 0 ? postPhotos : []}
        sourceIndex={activeImage}
      />
      <Dialog
        size="xl"
        open={profileOpen}
        handler={() => handleProfileView()}
        className="profile-modal-dialog bg-moonstone-gradient2 shadow-xl"
      >
        <DialogHeader className="py-2">
          <IconButton
            variant="text"
            size="sm"
            className="rounded-full border-none outline-none text-white w-[26px] h-[26px] hover:bg-transparent active:bg-transparent active:border-none focus:bg-transparent ms-auto focus:border-none"
            onClick={handleProfileView}
          >
            <MdClose size={28} />
          </IconButton>
        </DialogHeader>
        <DialogBody divider={true} className="ps-5 pe-3 relative border-0">
          <section className="relative pt-10 -mt-1 rounded-md">
            <div className="container mx-auto bg-white rounded-md shadow-lg">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-default rounded-lg lg:mt-4">
                <div className="lg:px-6">
                  <div className="flex flex-wrap justify-center items-center mt-10 lg:-mt-24">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative mt-4 after:absolute after:content-[''] after:-top-[2px] after:-left-[2px] after:-right-[2px] after:-bottom-[2px] after:shadow-lg after:bg-white after:rounded-full">
                        <img
                          src={
                            singlePost?.user?.avatar?.url
                              ? singlePost?.user?.avatar?.url
                              : singlePost?.user?.avatar
                          }
                          alt="profile image"
                          className="shadow-xl rounded-full h-auto align-middle border-none max-w-[120px] relative z-10"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center flex items-end lg:mt-20 min-h-[75px]">
                      <div className="py-1 w-full px-3 flex lg:justify-start justify-center">
                        <div className="flex gap-2">
                          {userLinks?.links?.length > 0 &&
                            userLinks?.links.map((link, index) => {
                              if (link?.visibility === "public") {
                                return (
                                  <div key={index}>
                                    <SocialIcon
                                      className="shadow-lg rounded-full"
                                      url={link.link}
                                      target="_blank"
                                      style={{ width: "36px", height: "36px" }}
                                    />
                                  </div>
                                );
                              }
                            })}
                        </div>
                        {userLinks?.links?.length === 0 && (
                          <Typography className=" font-medium text-sm text-dark/60">
                            No social links found.
                          </Typography>
                        )}
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1 lg:mt-24">
                      <div className="flex lg:justify-end justify-center">
                        <div className="p-3 text-center">
                          <div className="flex gap-1 items-center border-[1px] border-indigo/30 px-2 py-0.5 rounded-md text-indigo text-sm mt-3">
                            <FaEye />
                            <span className="font-semibold">
                              {totalViews || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mx-4 pb-4 pt-2">
                    <div className="flex items-center justify-center mb-2 gap-x-2">
                      <h3 className="text-2xl capitalize font-semibold leading-normal text-indigo">
                        {singlePost?.user?.name || "Unknown"}
                      </h3>
                      <div>
                        {singlePost?.user?.isVerified && (
                          <AiFillCheckCircle
                            size={24}
                            className="text-green-500"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-6 flex-wrap">
                      <div className="text-sm leading-normal text-slategray mt-0 font-medium capitalize flex items-center justify-center">
                        <FaMapMarkerAlt className="me-2" />
                        {(singlePost?.user?.address &&
                          singlePost?.user?.address + ", ") ||
                          ""}
                        {singlePost?.user?.country || ""}
                      </div>
                    </div>
                  </div>
                  <div className="pb-2 text-center border-t-[1px] border-blue-gray-50 pt-3">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="text-indigo font-semibold">
                          Author Bio or Status{" "}
                        </p>
                        <p className="mb-4 text-base">
                          <span className="text-slategray text-sm font-medium">
                            {singlePost?.user?.bio || "Nothing to show."}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 mb-6 mt-2 flex flex-wrap justify-center gap-3 overflow-y-scroll scrollbar-y-dir h-[40vh]">
                  {postPhotos?.length > 0 ? (
                    postPhotos.map((photo, index) => {
                      return (
                        <div
                          key={photo + index}
                          className="lg:h-[160px] md:h-[200px] h-[160px] w-full overflow-hidden xl:w-[24%] lg:w-[30%] sm:w-[48%] rounded shadow-lg cursor-pointer relative after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:bg-dark/30 after:opacity-0 hover:after:opacity-100 group after:default-transition"
                          onClick={() => openLightbox(index)}
                        >
                          <img
                            src={photo}
                            alt=""
                            className="rounded-lg object-cover w-full h-full"
                          />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm px-4 py-0.5 rounded z-10 opacity-0 group-hover:opacity-100 default-transition">
                            <AiFillEye size={22} />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="font-medium text-indigo">No images to show.</div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ProfileModal;

ProfileModal.propTypes = {
  profileOpen: PropTypes.any,
  singlePost: PropTypes.any,
  handleProfileView: PropTypes.any,
  userPosts: PropTypes.any,
  userLinks: PropTypes.object,
};
