import { BiLogInCircle } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET, logout, selectUser } from "../../redux/slices/authSlice";
import { BsSearch } from "react-icons/bs";
import useNavbarBackground from "../../hooks/useNavbarBackground";
import { useState } from "react";
import { useEffect } from "react";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { UserProfileAfterLogin } from "./UserProfileAterLogin";
import { Link as ScrollLink, Events, animateScroll as scroll, scroller } from "react-scroll";
import { staticImages } from "../../images";
import { HiArrowRight } from "react-icons/hi";
import AuthHeader from "./AuthHeader";
import { Esewa } from "../../screens/admin/Esewa";

export const Header = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = useLocation();

  // ### HEADER CHANGE ON SCROLL
  const scrollThreshold = 70;
  const hasBackground = useNavbarBackground(scrollThreshold);
  const headerStyle = {
    background: hasBackground ? "rgba(0, 0, 0, 0.2)" : `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1))`,
  };

  //### HOME PAGE SEARCH
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchError, setShowSearchError] = useState(false);
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleHomeSearch = (e) => {
    e.preventDefault();
    if (searchQuery.length > 0) {
      navigate(`/results/${searchQuery}`);
    } else {
      setShowSearchError(true);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setShowSearchError(false);
    }, 2000);
    return () => clearTimeout(timeOutId);
  }, [showSearchError]);

  const handleBrandClick = () => {
    window.scrollTo(0, 0);
  };

  const photo = user?.avatar?.url ? user?.avatar?.url : user?.avatar ? user?.avatar : staticImages.blank_user;

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/auth/login");
  };

  // smooth scroll on link click
  useEffect(() => {
    Events.scrollEvent.register("begin", (to, element) => {
      // console.log("begin");
    });
    Events.scrollEvent.register("end", (to, element) => {
      // console.log("end");
    });
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const location = useLocation();

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full">
        {location.pathname === "/" && <AuthHeader />}
        <header className={`m-0 py-2.5 w-full rounded-none border-none shadow-none glass-effect ${hasBackground ? "default-transition header-light" : ""}`} style={headerStyle}>
          <div className="flex items-center justify-between text-white max-w-[1400px] mx-auto px-4">
            <Link to="/" className="flex" onClick={handleBrandClick}>
              <img src={staticImages.site_logo} className="w-[80px]" />
            </Link>

            <div className="lg:flex items-center">
              <div className={`flex items-center ${url.pathname.startsWith("/results/") ? "hidden" : ""} ${url.pathname === "/search" ? "hidden" : ""}`}>
                <form className="fixed top-14 right-0 left-0 px-4 mt-3 lg:mt-0 lg:relative md:left-auto lg:top-0 hidden lg:block" onSubmit={handleHomeSearch}>
                  <div
                    className="flex header-search items-center rounded h-[48px] ps-5 w-full outline-none text-dark bg-white md:min-w-[500px] md:left-0 max-w-full"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 3px 8px",
                    }}
                  >
                    <input type="text" className="h-full focus:caret-dark w-full outline-none  text-base font-normal text-slategray placeholder:text-gray-500" placeholder="Search photos by Author name, or title" onChange={handleSearchInputChange} value={searchQuery} />
                    <button type="submit" className="h-[48px] w-[48px] flex items-center justify-center text-[28px] mx-1 px-3 opacity-50 hover:opacity-90 default-transition">
                      <BsSearch />
                    </button>
                  </div>
                  <div className={`absolute top-full mt-2 bg-white shadow rounded px-3 py-1 text-dark/60 font-medium ${showSearchError ? "block" : "hidden"}`}>Please enter text to search.</div>
                </form>
              </div>
              <div className={`relative ${url.pathname === "/" && "hidden md:block"} ${url.pathname.startsWith("/results/") ? "hidden" : ""} ${url.pathname.startsWith("/search") ? "hidden" : ""} ${url.pathname.startsWith("/category") ? "hidden" : ""} ${url.pathname === "/about" ? "hidden" : ""}`}>
                <Menu>
                  <MenuHandler>
                    <button className="h-[48px] rounded bg-transparent shadow-none hover:shadow-none text-sm uppercase tracking-[1px] flex items-center gap-x-3">
                      <HiArrowRight />
                      <span>Navigate</span>
                    </button>
                  </MenuHandler>
                  <MenuList className="max-w-[18rem] px-2 py-1">
                    <MenuItem className="flex items-center gap-2 p-0 text-base h-[36px]">
                      <Link to="/about" className="inline-flex items-center justify-start px-3 w-full h-full text-sm text-slategray">
                        About us
                      </Link>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-2 p-0 text-base h-[36px]">
                      <Link to="/search" className="inline-flex items-center justify-start px-3 w-full h-full text-sm text-slategray">
                        Search Page
                      </Link>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-2 p-0 text-base h-[36px]">
                      <ScrollLink className="inline-flex items-center justify-start px-3 w-full h-full text-sm text-slategray" to="pricing" smooth={true} duration={400} offset={-90}>
                        Pricing
                      </ScrollLink>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-2 p-0 text-base h-[36px]">
                      <ScrollLink className="inline-flex items-center justify-start px-3 w-full h-full text-sm text-slategray" to="top-picks" smooth={true} duration={400} offset={-80}>
                        Studio Archives
                      </ScrollLink>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-2 p-0 text-base h-[36px]">
                      <ScrollLink className="inline-flex items-center justify-start px-3 w-full h-full text-sm text-slategray" to="categories" smooth={true} duration={400} offset={-90}>
                        Top Portraits
                      </ScrollLink>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-2 p-0 text-base h-[36px]">
                      <ScrollLink className="inline-flex items-center justify-start px-3 w-full h-full text-sm text-slategray" to="best-picture" smooth={true} duration={400} offset={-90}>
                        Top Landscapes
                      </ScrollLink>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-2 p-0 text-base h-[36px]">
                      <ScrollLink className="inline-flex items-center justify-start px-3 w-full h-full text-sm text-slategray" to="contact" smooth={true} duration={400} offset={-90}>
                        Contact Us
                      </ScrollLink>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>

            {!user ? (
              <div className="text-sm flex gap-5 items-center">
                <Link to="/auth/login" className="font-semibold uppercase tracking-[1px]  flex items-center auth-link">
                  <BiLogInCircle size={18} className="me-[6px]" /> Login
                </Link>
                <Link
                  to="/auth/register"
                  className="border border-white px-4 py-[8px] rounded font-semibold uppercase tracking-[1px] transition-all ease-in-out duration-200 auth-link hover:opacity-90"
                  style={{
                    boxShadow: "rgba(99, 99, 99, 0.15) 0px 2px 8px 0px",
                  }}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Esewa />
                <UserProfileAfterLogin user={user} photo={photo} logoutUser={logoutUser} />
              </div>
            )}
          </div>
        </header>
      </div>
    </>
  );
};
