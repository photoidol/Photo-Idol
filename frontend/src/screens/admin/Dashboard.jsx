import {
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Overview } from "../../components/common/Overview";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { staticImages } from "../../images";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Esewa } from "./Esewa";
import { scrollToTop } from "../../utils/scrollToTop";
import WireTransfer from "./WireTransfer";
import { MdArrowForwardIos } from "react-icons/md";

export const Dashboard = () => {
  useRedirectLoggedOutUser("/auth/login");
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  const postLimit = useSelector((state) => state.setting.postLimit);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dataParam = queryParams.get("data");

    if (dataParam) {
      navigate(`/admin/pay-status/${dataParam}`);
    }
  }, [navigate]);

  useEffect(() => scrollToTop(), []);

  return (
    <>
      <div className="flex flex-col pt-5">
        {user && !user?.isVerified ? (
          <div
            className="flex flex-col gap-6 lg:flex-row lg:items-center xl:gap-8 xxl:gap-10 px-4 py-5 mb-4 text-sm text-blue-gray-500 rounded-lg shadow-xl bg-white"
            role="alert"
          >
            <div>
              <img
                className="max-w-[200px] mx-auto w-full animate-scale"
                src={staticImages.mailbox}
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-end">
                <Link
                  to="/admin/steps"
                  type="button"
                  className="flex items-center gap-x-2 hover:gap-x-3 default-transition text-moonstone font-semibold text-base"
                >
                  <span>Getting Started ? Help</span>
                  <MdArrowForwardIos />
                </Link>
              </div>
              <div className="flex items-center mt-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 lg:text-lg md:text-base text-md">
                    <span className="flex items-center text-indigo">
                      <FaInfoCircle />
                    </span>
                    <span className="font-semibold text-indigo">
                      Your account is not verified!
                    </span>
                  </div>
                  <div className="mt-2 text-slategray text-sm">
                    Please
                    <span className="font-semibold mx-1">
                      check your email inbox
                    </span>
                    for account verfication link or
                    <Link
                      to="/admin/account"
                      className="underline font-medium px-1 uppercase"
                    >
                      Click Here
                    </Link>
                    to get link for verification if you haven&apos;t recevied
                    yet.
                  </div>
                </div>
              </div>
              <p className=" mt-3 border-[1px] border-moonstone/80 rounded-sm px-2.5 py-1 text-moonstone inline-block">
                <span className="font-semibold">NOTE :</span> Account
                verification & Payment is required for uploading photos.
              </p>
            </div>
          </div>
        ) : !user?.paid ? (
          <div
            className="flex flex-col px-3 sm:px-4 md:px-6 py-7 mb-4 text-sm bg-white shadow-xl rounded-md"
            role="alert"
          >
            <div className="flex flex-col items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-y-3 gap-x-4 justify-between w-full">
                <div className="text-lg w-full">
                  <div className="flex flex-wrap gap-x-3 gap-y-2 justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="sm:flex items-center text-indigo hidden">
                        <FaInfoCircle />
                      </span>
                      <span className="font-semibold text-indigo text-base">
                        Please make payment before you upload photos!
                      </span>
                    </div>
                    <button
                      onClick={handleOpen}
                      type="button"
                      className="flex items-center gap-x-2 hover:gap-x-3 default-transition text-moonstone font-semibold text-base"
                    >
                      <span>View Pricing Details</span>
                      <MdArrowForwardIos />
                    </button>
                    <Dialog
                      size="lg"
                      open={open}
                      handler={handleOpen}
                      className="max-h-[90vh] overflow-y-scroll scrollbar-y-dir"
                    >
                      <DialogHeader className="justify-between absolute right-1 top-3 z-50 p-1">
                        <IconButton
                          variant="text"
                          onClick={handleOpen}
                          className="ms-auto text-white rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </IconButton>
                      </DialogHeader>
                      <DialogBody className="p-2 pe-0">
                        <div>
                          <img src={staticImages.pricing} alt="" />
                        </div>
                      </DialogBody>
                      {/* <DialogFooter className="justify-between gap-2">
                      </DialogFooter> */}
                    </Dialog>
                  </div>
                  <p className="text-slategray text-sm mt-2 md:mt-3 grid gap-y-1">
                    <span className="block">
                      1. You can make payment through
                      <span className="font-bold text-indigo px-1">Esewa</span>
                      or international bank wire transfer.
                    </span>
                    <span className="block">
                      2. Once your payment is successful, you can upload upto
                      <span className="px-1">{postLimit?.assetLimit}</span>
                      images.
                    </span>
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:min-w-[800px] xl:w-auto w-full border-[1px] border-moonstone/50 bg-moonstone/5 sm:p-6 p-3 rounded-md">
                <div className="flex flex-col items-center sm:border-r-[2px] border-b-[2px] sm:border-b-0 border-dashed border-moonstone p-3">
                  <p className="text-indigo lg:text-lg font-semibold mb-2">
                    For user in Nepal
                  </p>
                  <Esewa />
                </div>
                <div className="flex flex-col items-center p-3">
                  <p className="text-indigo lg:text-lg font-semibold mb-2">
                    For international user
                  </p>
                  <WireTransfer />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col px-3 py-3 lg:mb-4 text-sm text-blue-gray-500 rounded-md bg-white shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className=" text-base flex flex-wrap items-center">
                <span className="items-center mt-[3px] hidden sm:flex">
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 mr-3 mb-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                </span>
                <span className="font-medium text-slategray text-sm sm:text-base">
                  Your payment has been done! You have limit to upload{" "}
                  <span className="px-1.5 mx-1 text-white font-bold bg-moonstone rounded-sm">
                    {postLimit?.assetLimit || "0"}
                  </span>{" "}
                  images.
                </span>
              </div>
            </div>
          </div>
        )}
        <DashboardContent />
        <Overview />
      </div>
    </>
  );
};

export const DashboardContent = () => {
  return (
    <>
      <section className="mt-4">
        <Card>
          <div
            className="lg:py-10 md:py-8 sm:py-6 py-4 px-5 overflow-hidden rounded-lg md:min-h-[240px] sm:min-h-[200px] min-h-[180px]"
            style={{
              background: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(${staticImages.intro_hero}) center/cover no-repeat`,
            }}
          >
            <Typography className="text capitalize font-semibold text-white text-xl xs:text-2xl lg:text-3xl">
              We’ve been waiting for you!
            </Typography>
            <Typography
              variant="h6"
              className="capitalize font-semibold text-gray- my-3 text-gray-200"
            >
              Welcome to the FotoIdol User Panel!
            </Typography>
          </div>
        </Card>
      </section>
    </>
  );
};
