import React, { useState, useEffect } from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  AiOutlineDashboard,
  AiOutlineShareAlt,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectIsSidebarOpen,
  toggleSidebar,
} from "../../redux/slices/sidebarSlice";
import { BsFillImageFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { FaListCheck } from "react-icons/fa6";

export const ContentSidebar = () => {
  const [sidebarClass, setSidebarClass] = useState("");
  const [sidebarOverlayClass, setSidebarOverlayClass] = useState("");
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const location = useLocation();

  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
      setSidebarOverlayClass("block");
    } else {
      setSidebarClass("");
      setSidebarOverlayClass("hidden");
    }
  }, [isSidebarOpen]);

  const handleOverlayClick = () => {
    setSidebarClass("");
    setSidebarOverlayClass("hidden");
    dispatch(toggleSidebar());
  };

  return (
    <>
      <div
        className={`content-sidebar-overlay  ${sidebarOverlayClass}`}
        onClick={handleOverlayClick}
      ></div>
      <div
        className={`content-sidebar default-transition w-[260px] ${sidebarClass}`}
      >
        <Card className="h-[100vh] default-shadow">
          <div className="mb-2 p-4 border-b-[1px] border-blue-gray-50 flex justify-between items-center">
            <Link to="/">
              <h3 className="text-moonstone text-2xl font-bold">
                Foto<span className="text-indigo">Idol.</span>
              </h3>
            </Link>
            <button
              type="button"
              className="hover:scale-110 default-transition lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            >
              <AiOutlineClose className="text-moonstone" size={18} />
            </button>
          </div>
          <List className="px-3">
            <ListItem className="p-0">
              <Link
                to="/admin"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin" ? "active-link" : "inactive-link"
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <AiOutlineDashboard size={20} />
                </ListItemPrefix>
                Dashboard
              </Link>
            </ListItem>
            <ListItem className="p-0">
              <Link
                to="/admin/images"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/images" ? "active-link" : "inactive-link"
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <BsFillImageFill size={16} />
                </ListItemPrefix>
                Your Uploads
              </Link>
            </ListItem>
            <ListItem className="p-0">
              <Link
                to="/admin/account"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/account" ? "active-link" : "inactive-link"
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <AiOutlineUser size={20} />
                </ListItemPrefix>
                My Account
              </Link>
            </ListItem>

            <ListItem className="p-0">
              <Link
                to="/admin/social_links"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/social_links"
                    ? "active-link"
                    : "inactive-link"
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <AiOutlineShareAlt size={20} />
                </ListItemPrefix>
                Social Links
              </Link>
            </ListItem>

            <ListItem className="p-0">
              <Link
                to="/admin/guideline"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/guideline" ? "active-link" : "inactive-link"
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <FaListCheck size={18} />
                </ListItemPrefix>
                Upload Guidelines
              </Link>
            </ListItem>
          </List>
        </Card>
      </div>
    </>
  );
};
