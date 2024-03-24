import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { HiMenuAlt2 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";
import { UserProfileAfterLogin } from "./UserProfileAterLogin";
import { UploadBox } from "../common/UploadBox";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/slices/authSlice";
import { RESET, logout } from "../../redux/slices/authSlice";

export const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const photo = user?.avatar?.url ? user?.avatar?.url : user?.avatar;

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <>
      <div className="bg-white z-50 shadow-xl rounded-md px-2 sm:px-3 py-2 sm:py-3 w-full min-h-[56px] flex items-center ">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-10">
            <div className="logo flex gap-1 items-center">
              <button
                type="button"
                className="text-slategray md:me-4 sm:me-3 me-2 lg:hidden"
                onClick={() => dispatch(toggleSidebar())}
              >
                <HiMenuAlt2 size={22} />
              </button>
              <UploadBox />
            </div>
          </div>
          <div className="items-center gap-3 flex">
            {user && user?.isVerified && (
              <div className="flex items-center gap-x-2 md:border-r-[1px] border-blue-gray-50 md:pe-3">
                <AiFillCheckCircle className="text-green-400" />
                <span className="text-indigo font-medium text-sm hidden xs:flex">
                  Verified
                </span>
              </div>
            )}

            {user && !user?.isVerified && (
              <div className="flex items-center gap-x-2 md:border-r-[1px] border-gray-400 md:pe-3">
                <AiFillCloseCircle className="text-red-400" />
                <span className="font-medium hidden xs:flex text-red-400 text-sm">
                  Not Verified
                </span>
              </div>
            )}

            <UserProfileAfterLogin
              user={user}
              photo={photo}
              logoutUser={logoutUser}
            />
          </div>
        </div>
      </div>
    </>
  );
};
