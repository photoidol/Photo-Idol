import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  Avatar,
  MenuItem,
} from "@material-tailwind/react";
import { BiUserCircle } from "react-icons/bi";
import {
  AiOutlineDashboard,
  AiOutlinePoweroff,
  AiOutlineSetting,
} from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";

export const UserProfileAfterLogin = ({ logoutUser, photo, user }) => {
  const location = useLocation();
  const editTabValue = "edit";

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <div className="flex items-center gap-x-[14px] cursor-pointer">
          <div
            className={`uppercase text-sm font-medium ${
              location.pathname.startsWith("/admin")
                ? "text-indigo capitalize hidden md:block"
                : "tracking-[1px]"
            }`}
          >
            {user?.name?.slice(0, 12)}
            {user?.name?.length > 12 ? "..." : ""}
          </div>
          <Avatar
            src={photo}
            size="sm"
            variant="circular"
            alt={user}
            className="w-[30px] h-[30px]"
          />
          <FaChevronDown
            size={12}
            className={`-ms-1 text-indigo ${
              location.pathname.startsWith("/admin")
                ? "text-indigo"
                : "text-white"
            }`}
          />
        </div>
      </MenuHandler>
      <MenuList>
        <Link to="/admin" className="outline-none">
          <MenuItem className="flex items-center gap-2">
            <AiOutlineDashboard className="text-slategray" size={18} />
            <Typography variant="small" className="font-normal text-slategray">
              Dashboard
            </Typography>
          </MenuItem>
        </Link>
        <Link to="/admin/account" className=" outline-none border-none">
          <MenuItem className="flex items-center gap-2">
            <BiUserCircle className="text-slategray" size={18} />
            <Typography variant="small" className="font-normal text-slategray">
              My Profile
            </Typography>
          </MenuItem>
        </Link>
        <Link
          to="/admin/account"
          className={`outline-none border-none ${
            !location.pathname.startsWith("/admin") && "hidden"
          }`}
        >
          <MenuItem className="flex items-center gap-2">
            <AiOutlineSetting className="text-slategray" size={18} />
            <Typography variant="small" className="font-normal text-slategray">
              Edit Profile
            </Typography>
          </MenuItem>
        </Link>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 " onClick={logoutUser}>
          <AiOutlinePoweroff className="text-slategray" size={18} />
          <Typography variant="small" className="font-normal text-slategray">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

UserProfileAfterLogin.propTypes = {
  logoutUser: PropTypes.any,
  photo: PropTypes.any,
  user: PropTypes.any,
};
