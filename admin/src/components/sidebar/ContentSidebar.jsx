import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  AiFillSetting,
  AiOutlineClose,
  AiOutlineComment,
  AiOutlineDashboard,
  AiOutlineDollar,
  AiOutlineNumber,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { HiViewGrid, HiViewGridAdd } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSidebarOpen,
  toggleSidebar,
} from "../../redux/slices/sidebarSlice";
import { BsFillImageFill } from "react-icons/bs";
import {
  MdContactPage,
  MdFolderSpecial,
  MdManageAccounts,
} from "react-icons/md";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { RiPagesLine, RiPagesFill } from "react-icons/ri";
import { PiTreeStructureFill } from "react-icons/pi";
import { routeConstants } from "../../constants/routeConstants";

export const ContentSidebar = () => {
  const [sidebarClass, setSidebarClass] = useState("");
  const [sidebarOverlayClass, setSidebarOverlayClass] = useState("");
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const location = useLocation();
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? -1 : index));
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
        className={`content-sidebar-overlay ${sidebarOverlayClass}`}
        onClick={handleOverlayClick}
      ></div>
      <div
        className={`overflow-y-scroll scrollbar-y-dir h-[100vh] content-sidebar default-transition w-[260px] ${sidebarClass}`}
      >
        <Card className="min-h-screen default-shadow bg-white">
          <div className="mb-2 p-4 border-b-[1px] border-rich-black/5 flex justify-between items-center">
            <Link to={routeConstants.ADMIN_ROOT}>
              <h3 className="text-blue-gradient text-2xl font-bold">
                Foto<span className="text-dark-moonstone">Idol.</span>
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
            <ListItem className="p-0 h-[48px] block">
              <Link
                to={routeConstants.ADMIN_ROOT}
                className={`flex p-4 w-full ${
                  location.pathname === routeConstants.ADMIN_ROOT
                    ? "active-link"
                    : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <AiOutlineDashboard size={20} />
                </ListItemPrefix>
                Dashboard
              </Link>
            </ListItem>
            <Accordion
              open={openAccordionIndex === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordionIndex === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={openAccordionIndex === 1}>
                <AccordionHeader
                  onClick={() => toggleAccordion(1)}
                  className="border-b-0 px-4 py-3.5 text-base font-normal"
                >
                  <ListItemPrefix className="w-[20px] flex items-center justify-start">
                    <RiPagesFill size={20} />
                  </ListItemPrefix>
                  <span className="me-auto whitespace-nowrap">
                    Dynamic Sections
                  </span>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 nav-sub-list">
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.SECTION_MODAL}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname.startsWith(
                          routeConstants.SECTION_MODAL
                        )
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <RiPagesLine size={20} />
                      </ListItemPrefix>
                      Start Screen
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.SECTION_BANNER}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname.startsWith(
                          routeConstants.SECTION_BANNER
                        )
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <RiPagesLine size={20} />
                      </ListItemPrefix>
                      Banner Slider
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.CATEGORY}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname === routeConstants.CATEGORY
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <HiViewGrid size={20} />
                      </ListItemPrefix>
                      Manage Category
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.SECTION_PRICING}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname.startsWith(
                          routeConstants.SECTION_PRICING
                        )
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <AiOutlineDollar size={20} />
                      </ListItemPrefix>
                      Pricing Details
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.SECTION_FEATURED}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname === routeConstants.SECTION_FEATURED ||
                        location.pathname.startsWith(
                          routeConstants.SECTION_FEATURED
                        )
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <MdFolderSpecial size={20} />
                      </ListItemPrefix>
                      Featured Slider
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openAccordionIndex === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordionIndex === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={openAccordionIndex === 2}>
                <AccordionHeader
                  onClick={() => toggleAccordion(2)}
                  className="border-b-0 px-4 py-3.5 text-base font-normal"
                >
                  <ListItemPrefix className="w-[20px] flex items-center justify-start">
                    <RiPagesFill size={20} />
                  </ListItemPrefix>
                  <span className="me-auto">About Page</span>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 nav-sub-list">
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.ABOUT}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname === routeConstants.ABOUT
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <RiPagesLine size={20} />
                      </ListItemPrefix>
                      Studio Images
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.LOCATION}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname === routeConstants.LOCATION
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <PiTreeStructureFill size={20} />
                      </ListItemPrefix>
                      Branches
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openAccordionIndex === 3}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordionIndex === 3 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={openAccordionIndex === 3}>
                <AccordionHeader
                  onClick={() => toggleAccordion(3)}
                  className="border-b-0 px-4 py-3.5 text-base font-normal"
                >
                  <ListItemPrefix className="w-[20px] flex items-center justify-start">
                    <RiPagesFill size={20} />
                  </ListItemPrefix>
                  <span className="me-auto">Manage</span>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 nav-sub-list">
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.USERS}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname.startsWith(routeConstants.USERS)
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <AiOutlineUsergroupAdd size={20} />
                      </ListItemPrefix>
                      All Users
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.IMAGES}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname.startsWith(routeConstants.IMAGES)
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <BsFillImageFill size={16} />
                      </ListItemPrefix>
                      All Photos
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.COMMENTS}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname === routeConstants.COMMENTS
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <AiOutlineComment size={20} />
                      </ListItemPrefix>
                      All Comments
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.GALLERY}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname === routeConstants.GALLERY
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <HiViewGridAdd className="scale-125" />
                      </ListItemPrefix>
                      Gallery
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>

            <Accordion
              open={openAccordionIndex === 4}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordionIndex === 4 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={openAccordionIndex === 4}>
                <AccordionHeader
                  onClick={() => toggleAccordion(4)}
                  className="border-b-0 px-4 py-3.5 text-base font-normal"
                >
                  <ListItemPrefix className="w-[20px] flex items-center justify-start">
                    <AiFillSetting size={20} />
                  </ListItemPrefix>
                  <span className="me-auto">Settings</span>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 nav-sub-list">
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.ADD_CATEGORY}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname === routeConstants.ADD_CATEGORY
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <HiViewGridAdd size={20} />
                      </ListItemPrefix>
                      Add Category
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.CONTACT}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname === routeConstants.CONTACT
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <MdContactPage size={20} />
                      </ListItemPrefix>
                      Contact Details
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.POSTLIMIT}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname === routeConstants.POSTLIMIT
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <AiOutlineNumber size={20} />
                      </ListItemPrefix>
                      Post Limit
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to="/admin/pricelimit"
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname === "/admin/pricelimit"
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <AiOutlineNumber size={20} />
                      </ListItemPrefix>
                      Price Limit
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            {/* <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin/assetlimit"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/assetlimit" ? "active-link" : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <AiOutlineNumber size={20} />
                </ListItemPrefix>
                Asset Limit
              </Link>
            </ListItem> */}

            <Accordion
              open={openAccordionIndex === 5}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordionIndex === 5 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={openAccordionIndex === 5}>
                <AccordionHeader
                  onClick={() => toggleAccordion(5)}
                  className="border-b-0 px-4 py-3.5 text-base font-normal"
                >
                  <ListItemPrefix className="w-[20px] flex items-center justify-start">
                    <MdManageAccounts size={20} />
                  </ListItemPrefix>
                  <span className="me-auto">My Account</span>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 nav-sub-list">
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to={routeConstants.ACCOUNT}
                      className={`flex p-4 w-full nav-sub-link ${
                        location.pathname === routeConstants.ACCOUNT
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <AiOutlineUser size={20} />
                      </ListItemPrefix>
                      Admin Profile
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </List>
        </Card>
      </div>
    </>
  );
};
