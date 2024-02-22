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

export function Account() {
  useRedirectLoggedOutUser("/auth/login");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div className="my-4">
      <div className="px-4 pt-1">
        {user && !user?.isVerified && <Notification />}
      </div>

      <div className="max-w-[1400px] mx-auto w-full my-6 account-tab">
        <Tabs value="profile">
          <TabsHeader className="flex-col bg-white md:flex-row px-4 py-3 max-w-[720px] w-full account-tab-head">
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
              <TabPanel className="p-0" value="profile">
                <div className="mx-4 my-8">
                  <section className="relative pt-16 rounded-md pb-2 px-2">
                    <div className="container mx-auto bg-white rounded-md shadow-xl max-w-[720px]">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-default rounded-lg lg:mt-10">
                        <div className="px-4 py-4">
                          <div className="flex flex-wrap justify-center items-center mt-10 lg:-mt-24">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                              <div className="relative mt-4 border-1 border-white">
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
                            <div className="flex items-center justify-center mb-2 gap-x-2">
                              <h3 className="text-2xl capitalize font-semibold leading-normal text-indigo">
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
                                {(user?.address && user?.address + ", ") ||
                                  ""}{" "}
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
                          {/* <div className="flex items-center justify-center mb-6 pt-4 mt-1 flex-wrap gap-3 border-t-[1px] border-blue-gray-50">
                            <span className="text-indigo font-semibold">
                              Social:
                            </span>
                            <div className="flex items-center">
                              {links[0]?.links?.map((link, index) => {
                                return (
                                  <div
                                    className="flex flex-col items-start gap-3"
                                    key={index}
                                  >
                                    <SocialIcon
                                      url={link.link}
                                      target="_blank"
                                      style={{
                                        width: "36px",
                                        height: "36px",
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div> */}
                          <div className="pb-2 text-center">
                            <div className="flex flex-wrap justify-center">
                              <div className="w-full px-4">
                                <p className="text-indigo font-semibold">
                                  Your Bio or Status{" "}
                                </p>
                                <p className="mb-4 text-base">
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
              <TabPanel value="edit" className="pt-8">
                <UpdateProfile />
              </TabPanel>
              <TabPanel value="settings">
                <UpdatePassword />
              </TabPanel>
            </TabsBody>
          )}
        </Tabs>
      </div>
    </div>
  );
}
