import React, { useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { AiFillCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/authSlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { UpdateProfile } from "../../components/common/users/UpdateProfile";
import { UpdatePassword } from "../../components/common/users/UpdatePassword";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Notification } from "../../components/common/Notification";
import { scrollToTop } from "../../utils/scrollToTop";

export function Account() {
  useRedirectLoggedOutUser("/auth/login");
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isLoggedIn && user == null) {
  //     dispatch(getUserProfile());
  //   }
  // }, [dispatch, isLoggedIn, user]);

  useEffect(() => scrollToTop(), []);

  return (
    <div className="my-4">
      <div className="px-4 pt-1">
        {user && !user?.isVerified && <Notification />}
      </div>

      <div className="max-w-[1400px] mx-auto w-full my-6 account-tab">
        <Tabs value="profile">
          <TabsHeader className="flex-col bg-white sm:flex-row lg:px-4 px-3 py-3 max-w-[720px] w-full account-tab-head">
            <Tab className="py-2.5" value="profile">
              <div className="flex items-center gap-2 font-medium opacity-90 text-indigo tab-head-item">
                {React.createElement(UserCircleIcon, {
                  className: "w-5 h-5 text-indigo",
                })}
                <span className="whitespace-nowrap">My Profile</span>
              </div>
            </Tab>
            <Tab className="py-2.5" value="edit">
              <div className="flex items-center gap-2 font-medium opacity-90 text-indigo tab-head-item">
                {React.createElement(AiOutlineEdit, {
                  className: "w-5 h-5 text-indigo",
                })}
                <span className="whitespace-nowrap">Edit Profile</span>
              </div>
            </Tab>
            <Tab className="py-2.5" value="settings">
              <div className="flex items-center gap-2 font-medium opacity-90 text-indigo tab-head-item ">
                {React.createElement(Cog6ToothIcon, {
                  className: "w-5 h-5 text-indigo",
                })}
                <span className="whitespace-nowrap">Settings</span>
              </div>
            </Tab>
          </TabsHeader>
          {user && (
            <TabsBody>
              <TabPanel value="profile" className="pt-6 px-0">
                <div>
                  <section className="relative lg:pt-6 rounded-md">
                    <div className="container mx-auto bg-white rounded-md shadow-xl max-w-[720px]">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-default rounded-lg lg:mt-10">
                        <div className="px-4 py-4">
                          <div className="flex flex-wrap justify-center items-center lg:-mt-24">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                              <div className="relative mt-4 border-1 border-white bg-white rounded-full">
                                <img
                                  src={
                                    user?.avatar?.url
                                      ? user?.avatar?.url
                                      : user?.avatar
                                  }
                                  alt="profile image"
                                  className="shadow-xl rounded-full h-auto align-middle border-none max-w-[120px]"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-center pb-4 pt-2">
                            <p className="text-indigo font-semibold py-3 border-b-[1px] border-moonstone">
                              User ID : {user?._id}
                            </p>
                            <div className="flex items-center justify-center mb-2 gap-x-2 mt-3">
                              <h3 className="lg:text-2xl md:text-xl text-lg capitalize font-semibold leading-normal text-indigo">
                                {user?.name || "Unknown"}
                              </h3>
                              <div>
                                {user?.isVerified && (
                                  <AiFillCheckCircle
                                    size={24}
                                    className="text-green-500"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-center gap-x-6 flex-wrap">
                              <div className="text-sm leading-normal text-slategray mt-0 font-normal capitalize flex items-center justify-center">
                                <FaMapMarkerAlt className="me-2" />
                                {(user?.address && user?.address + ", ") || ""}
                                {user?.country || ""}
                              </div>
                              <div className="text-sm leading-normal text-slategray mt-0 font-normal flex items-center justify-center">
                                <span className="flex items-center justify-center">
                                  <FaEnvelope className="me-2 mt-[2px]" />
                                </span>
                                {user?.email}
                              </div>
                            </div>
                          </div>
                          <div className="pb-2 text-center">
                            <div className="flex flex-wrap justify-center">
                              <div className="w-full px-4">
                                <p className="text-indigo font-semibold">
                                  Your Bio or Status{" "}
                                </p>
                                <p className="text-base">
                                  <span className="text-slategray text-sm font-medium">
                                    {user?.bio || "Nothing to show."}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </TabPanel>
              <TabPanel value="edit" className="pt-6 px-0">
                <UpdateProfile />
              </TabPanel>
              <TabPanel value="settings" className="pt-6 px-0">
                <UpdatePassword />
              </TabPanel>
            </TabsBody>
          )}
        </Tabs>
      </div>
    </div>
  );
}
