import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";
import { Button, Card } from "@material-tailwind/react";
import SpinLoader from "../SpinLoader";
import { AiFillCamera } from "react-icons/ai";

export const UpdateProfile = () => {
  useRedirectLoggedOutUser("/auth/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);

  const initialState = {
    name: user?.name || "",
    address: user?.addres || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    role: user?.role || "",
    avatar: user?.avatar || user?.avatar?.url || "",
    isVerified: user?.isVerified || false,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgPreview, setProfileImgPreview] = useState(null);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImg(e.target.files[0]);
    setProfileImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("phone", profile.phone);
      formData.append("address", profile.address);
      formData.append("bio", profile.bio);

      if (profileImg) {
        formData.append("avatar", profileImg);
      }
      await dispatch(updateUserProfile(formData));
      await dispatch(getUserProfile);
      navigate("/admin/account");
    } catch (error) {
      toast.error(error);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        avatar: user?.avatar,
        role: user?.role,
        address: user?.address,
        country: user?.country,
        isVerified: user?.isVerified,
      });
    }
  }, [user]);

  const handleCameraIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={saveProfile}>
      <div className="flex flex-col gap-8 xl:flex-row xxl:items-start">
        <Card className="shadow-lg w-[290px] mx-auto bg-white p-4">
          <label
            htmlFor="avatar"
            className="h-[180px] w-[180px] mx-auto rounded-full bg-gray-200 shadow overflow-hidden relative"
          >
            {profileImgPreview ? (
              <img
                src={profileImgPreview}
                alt="profileImg"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <img
                src={
                  profile?.avatar?.url ? profile?.avatar?.url : profile?.avatar
                }
                className="w-full h-full object-cover rounded-full"
                alt="profile image"
              />
            )}
            <button
              type="button"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white w-[48px] h-[48px] rounded-full shadow flex items-center justify-center"
              onClick={handleCameraIconClick}
            >
              <AiFillCamera size={30} className="mx-auto text-indigo" />
            </button>
          </label>
          <input
            name="avatar"
            ref={fileInputRef}
            type="file"
            onChange={handleImageChange}
            className="pt-[7px] hidden"
          />
          <div className="flex flex-col items-center justify-center mt-6">
            <p className=" text-sm font-medium text-slategray">
              Click on icon to change profile picture.
            </p>
          </div>
        </Card>
        <div className="flex-auto lg:px-10 px-4 py-4 max-w-[720px] mx-auto xxl:ms-0 bg-white rounded-md shadow-lg mb-6">
          <div>
            <h6 className="text-indigo text-sm mb-4 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full sm:w-6/12 px-1 lg:mb-2">
                <div className="relative w-full mb-3">
                  <label
                    className="label-theme text-xs mb-2"
                    htmlFor="grid-password"
                  >
                    Fullname
                  </label>
                  <input
                    type="text"
                    className="input-theme"
                    value={profile?.name}
                    name="name"
                    placeholder={profile?.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="w-full sm:w-6/12 px-1 lg:mb-2">
                <div className="relative w-full mb-3">
                  <label
                    className="label-theme text-xs mb-2"
                    htmlFor="grid-password"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="input-theme"
                    disabled
                    defaultValue={user?.email || ""}
                  />
                </div>
              </div>
            </div>
            <hr className="mb-4 border-b-1 border-blueGray-300" />
            <h6 className="text-indigo text-sm mb-4 font-bold uppercase">
              More Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full sm:w-6/12 px-1 lg:mb-2">
                <div className="relative w-full mb-3">
                  <label
                    className="label-theme text-xs mb-2"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="input-theme"
                    value={profile?.address || ""}
                    name="address"
                    placeholder={profile?.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="w-full sm:w-6/12 px-1 lg:mb-2">
                <div className="relative w-full mb-3">
                  <label
                    className="label-theme text-xs mb-2"
                    htmlFor="grid-password"
                  >
                    Phone No.
                  </label>
                  <input
                    type="text"
                    className="input-theme"
                    value={profile?.phone || ""}
                    name="phone"
                    placeholder={profile?.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="label-theme text-xs mb-2"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    type="text"
                    className="textarea-theme"
                    rows="4"
                    value={profile?.bio || ""}
                    name="bio"
                    placeholder={profile?.bio}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>
            {isLoading && <SpinLoader />}
            <Button type="submit" className="bg-moonstone-gradient2 rounded text-sm mt-3">
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
