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
            "You've hit the Upload Limit 3 images!",
            "Upload Complete: You've reached the maximum of 3 images allowed.",
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
        className="md:px-5 px-3 md:py-2.5 py-1.5 rounded-[4px] flex items-center gap-2 text-white default-transition ms-auto min-w-[160px] upload-btn wobble-hor-bottom"
      >
        <AiOutlineCloudUpload size={18} />
        <span className=" font-semibold">Upload Photo</span>
      </button>

      <div
        className={`z-[999] grid w-[28rem] overflow-hidden p-0 absolute left-0 top-full bg-white shadow-xl rounded-md mt-4 default-transition ${
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
        <div className="p-4">
          <Typography className="mb-2 text-lg font-semibold title-theme">
            {msgPopup.msgTitle || ""}
          </Typography>
          <div className="flex items-center gap-y-3 gap-x-1 flex-wrap md:flex-nowrap">
            <div className="w-[80px] h-[80px] min-w-[80px]">
              <img src={msgPopup.msgImg} alt="" />
            </div>
            <Typography className="font-normal text-sm text-slategray inline-block">
              {msgPopup.msgText || ""}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
