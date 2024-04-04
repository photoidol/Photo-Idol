import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";
import { getallResource } from "../../redux/slices/resourceSlice";
import { selectUser } from "../../redux/slices/authSlice";
import { getUserPosts } from "../../redux/slices/postsSlice";
import { Typography } from "@material-tailwind/react";
import { MdOutlineClose } from "react-icons/md";
import { staticImages } from "../../images";
import { getPostLimit } from "../../redux/slices/settings/SettingSlice";

export const UploadBox = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [msgPopup, setMsgPopup] = useState({
    isVisible: false,
    msgTitle: "",
    msgText: "",
    msgImg: null,
  });

  const popupRef = useRef(null);
  const postLimit = useSelector((state) => state.setting.postLimit);

  useRedirectLoggedOutUser("/login");
  const { resources } = useSelector((state) => state.resource);

  const openUploadForm = () => {
    const userPosts = resources?.posts?.filter(
      (post) => post?.user?._id === user?._id
    );

    if (user?.isVerified) {
      if (user?.paid) {
        if (userPosts && userPosts.length < postLimit?.assetLimit) {
          navigate("/admin/upload");
        } else {
          handlePopupOpen(
            "You've hit the Upload Limit 2 images!",
            "Upload Complete: You've reached the maximum of 2 images allowed.",
            staticImages.payment1
          );
          navigate("/admin/images");
        }
      } else {
        handlePopupOpen(
          "No any payment has been made yet!",
          "Oops! It seems like you have not made the payment. Please do make the payment through Esewa for uploading images.",
          staticImages.payment1
        );
        navigate("/admin");
      }
    } else {
      handlePopupOpen(
        "Account Verification is required!",
        "Oops! You need to first verify you account. Please check your email inbox for verification link.",
        staticImages.verification1
      );
    }
  };

  useEffect(() => {
    dispatch(getUserPosts());
    dispatch(getallResource());
    dispatch(getPostLimit());
  }, [dispatch]);

  const handlePopupClose = () => {
    setMsgPopup((prevData) => {
      return {
        ...prevData,
        msgText: "",
        msgTitle: "",
        isVisible: false,
      };
    });
  };

  const handlePopupOpen = (title, text, img) => {
    setMsgPopup((prevData) => {
      return {
        ...prevData,
        msgTitle: title,
        msgText: text,
        isVisible: true,
        msgImg: img,
      };
    });

    // Close the popup after 3 seconds
    setTimeout(() => {
      handlePopupClose();
    }, 6000);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        !e.target.closest(".upload-btn")
      ) {
        handlePopupClose();
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={openUploadForm}
        className="md:px-5 px-3 md:py-2.5 py-1.5 min-h-[36px] rounded-[4px] flex items-center gap-2 text-white default-transition ms-auto min-w-[160px] upload-btn wobble-hor-bottom"
      >
        <AiOutlineCloudUpload size={18} />
        <span className=" font-semibold text-sm md:text-base">
          Upload Photo
        </span>
      </button>

      <div
        className={`z-[999] grid sm:w-[28rem] overflow-hidden p-0 fixed sm:absolute top-20 sm:top-full sm:left-0 left-3 sm:right-auto right-3 bg-white shadow-xl rounded-md mt-4 default-transition ${
          msgPopup.isVisible ? "visible opacity-100" : "opacity-0 invisible"
        }`}
        ref={popupRef}
      >
        <button
          type="button"
          className="absolute right-2.5 top-2.5 text-indigo hover:text-red-400"
          onClick={() => handlePopupClose()}
        >
          <MdOutlineClose size={20} />
        </button>
        <div className="sm:p-4 p-3">
          <Typography className="mb-2 text-base sm:text-lg font-semibold title-theme mt-4 xs:mt-0">
            {msgPopup.msgTitle || ""}
          </Typography>
          <div className="flex items-center gap-y-3 gap-x-1 flex-wrap xs:flex-nowrap">
            <Typography className="font-normal text-sm text-slategray inline-block">
              {msgPopup.msgText || ""}
            </Typography>
            <div className="sm:w-[80px] sm:h-[80px] sm:min-w-[80px] w-[60px] h-[60px] min-w-[60px] mx-auto hidden xs:block">
              <img src={msgPopup.msgImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
