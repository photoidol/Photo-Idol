import { AiFillCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsNavbarOpen } from "../../redux/slices/navbarSlice";

const ScrollPopup = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const isNavbarOpen = useSelector(selectIsNavbarOpen);

  return (
    <>
      {isLoggedIn && (
        <div
          className={`fixed bottom-5 right-4 px-2.5 md:px-3 lg:px-4 py-1.5 md:py-2 lg:py-2.5 rounded-md  shadow-lg flex items-center z-50 cursor-pointer scroll-popup ${
            isNavbarOpen ? "bg-white" : "bg-moonstone-gradient2"
          }`}
        >
          <AiFillCamera
            size={24}
            className={`${isNavbarOpen ? "text-slategray" : "text-white"} me-2`}
          />
          {isLoggedIn ? (
            <Link
              to="/admin"
              className={`text-sm lg:text-base font-semibold ${
                isNavbarOpen ? "text-slategray" : "text-white"
              }`}
            >
              Upload Your Photos
            </Link>
          ) : (
            <Link
              to="/auth/register"
              className={`text-sm lg:text-base font-semibold ${
                isNavbarOpen ? "text-slategray" : "text-white"
              }`}
            >
              Upload Your Photos
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default ScrollPopup;
