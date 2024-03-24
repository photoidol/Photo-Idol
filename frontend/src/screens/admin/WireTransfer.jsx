import { useState } from "react";
import { toast } from "react-toastify";
import { staticImages } from "../../images";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { selectUser } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { MdContentCopy } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { BsArrowLeft } from "react-icons/bs";

const WireTransfer = () => {
  const [openWire, setOpenWire] = useState(false);
  const [openWireOffer, setOpenWireOffer] = useState(false);
  const handleWireOpen = () => setOpenWire((cur) => !cur);
  const handleWireOfferOpen = () => setOpenWireOffer((cur) => !cur);
  const user = useSelector(selectUser);

  const handleClipboardCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(` Copied to clipboard!`);
      })
      .catch((err) => {
        toast.error(`Couldn't copy the text. ${err}`);
      });
  };

  const handleWireGoBack = () => {
    handleWireOpen();
    handleWireOfferOpen();
  };

  return (
    <>
      <button
        type="button"
        className="w-[60px] hover:scale-110 default-transition"
        onClick={handleWireOfferOpen}
      >
        <img src={staticImages.wire_transfer} alt="" />
      </button>

      <Dialog
        size="sm"
        open={openWireOffer}
        handler={handleWireOfferOpen}
        className="max-w-[95%] max-h-[90vh] overflow-y-scroll"
      >
        <DialogHeader className="justify-between py-2 px-3 sm:px-4">
          <Typography
            color="blue-gray"
            className="font-semibold text-indigo text-base sm:text-lg"
          >
            For internationl user
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleWireOfferOpen}
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
        <DialogBody className="overflow-y-scroll scrollbar-y-dir ps-3 sm:ps-4 pe-1 sm:pe-2 pt-3 border-t border-gray-200 text-center font-normal">
          <div className="max-w-[80px] mx-auto rounded-md overflow-hidden mb-4">
            <img src={staticImages.wire_transfer} alt="" />
          </div>
          <p className="text-lg text-[#006e90] font-semibold md:mb-2 mb-1.5">
            Limited Time Offer !
          </p>
          <h3 className="font-semibold sm:text-xl text-lg">
            Join Now for Only
            <span className="font-bold text-[#006e90] px-1.5">$3</span>!
          </h3>
          <p className="py-2 md:text-base text-sm">
            Don&apos;t miss out on this exclusive deal ! Join us to unlock
            premium features and join our vibrant community!
          </p>
          <p className="text-moonstone font-semibold sm:text-lg text-base">
            (40% Off Regular Price: $5)
          </p>
          <p className="md:mt-4 mt-3 underline">
            Membership Valid for 3 Years.
          </p>
          <div className="d-flex flex-wrap  leading-6 text-slategray bg-green-500/10 text-[15px] my-3 px-3 py-1.5 border-[1px] border-green-500/20 rounded-md">
            <span className="font-semibold text-indigo">Note:</span> You need to
            renew your account every 3 years. Price may vary according to
            regions.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-2 text-sm ">
            <span className="text-dark">
              <IoLockClosed />
            </span>
            <p className="text-indigo">Your data is safe and secure with us.</p>
          </div>
          <p className="mt-4 text-indigo">
            <span className="text-moonstone font-semibold">FotoIdol:</span>{" "}
            Capture Your Moments, Become a Foto Idol !
          </p>
        </DialogBody>
        <DialogFooter className="justify-center items-center gap-2 pt-1 pb-6">
          <button
            onClick={handleWireOpen}
            formTarget="_blank"
            className="capitalize px-4 py-1.5 rounded-[4px] shadow-md font-medium bg-green-500 text-white hover:bg-green-600 default-transition"
          >
            agree & continue
          </button>
        </DialogFooter>
      </Dialog>

      <Dialog
        size="sm"
        open={openWire}
        handler={handleWireOpen}
        className="max-w-[95%] max-h-[90vh] overflow-y-scroll"
      >
        <DialogHeader className="justify-between py-2 px-3 sm:px-4">
          <div className="flex items-center justify-start gap-x-4">
            <button type="button" onClick={handleWireGoBack}>
              <BsArrowLeft size={20} />
            </button>
            <Typography
              color="blue-gray"
              className="font-bold text-indigo text-base sm:text-lg"
            >
              Wire Transfer
            </Typography>
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleWireOpen}
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
        <DialogBody className="overflow-y-scroll scrollbar-y-dir ps-3 sm:ps-4 pe-1 sm:pe-2 pt-2 border-t border-gray-200">
          <p className="font-normal text-indigo mb-2 sm:text-lg text-base">
            <span className="font-semibold">Total Price:</span> $3.00
          </p>
          <div className="flex items-center justify-between">
            <Typography variant="paragraph">
              To
              <span className="font-semibold text-slategray px-2 mt-2">
                Standard Chartered Bank Nepal Limited
              </span>
            </Typography>
            <button
              onClick={() =>
                handleClipboardCopy("Standard Chartered Bank Nepal Limited")
              }
              title="Click to copy"
              className="animate-scale"
            >
              <MdContentCopy
                size={20}
                className="hover:scale-110 default-transition"
              />
            </button>
          </div>
          <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mt-3">
            <div className="flex flex-col pb-2">
              <dt className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                Account Name
              </dt>
              <dd className="text-base font-semibold text-slategray flex items-center justify-between flex-wrap gap-4">
                <span>FOTO IDOL PRIVATE LIMITED</span>
                <button
                  onClick={() =>
                    handleClipboardCopy("FOTO IDOL PRIVATE LIMITED")
                  }
                  title="Click to copy"
                  className="animate-scale"
                >
                  <MdContentCopy
                    size={20}
                    className="hover:scale-110 default-transition"
                  />
                </button>
              </dd>
            </div>
            <div className="flex flex-col py-2">
              <dt className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                Account Number
              </dt>
              <dd className="text-base font-semibold text-slategray flex items-center flex-wrap justify-between gap-4">
                <span>01-3649695-51</span>
                <button
                  onClick={() => handleClipboardCopy("01-3649695-51")}
                  title="Click to copy"
                  className="animate-scale"
                >
                  <MdContentCopy
                    size={20}
                    className="hover:scale-110 default-transition"
                  />
                </button>
              </dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                Swift code
              </dt>
              <dd className="text-base font-semibold text-slategray uppercase flex flex-wrap items-center justify-between gap-4">
                <span>SCBLNPKA</span>
                <button
                  onClick={() => handleClipboardCopy("SCBLNPKA")}
                  title="Click to copy"
                  className="animate-scale"
                >
                  <MdContentCopy
                    size={20}
                    className="hover:scale-110 default-transition"
                  />
                </button>
              </dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                Bank Branch
              </dt>
              <dd className="text-base font-semibold text-slategray uppercase flex flex-wrap items-center justify-between gap-4">
                <span>naya baneshwor branch</span>
                <button
                  onClick={() => handleClipboardCopy("NAYA BANESHWOR BRANCH")}
                  title="Click to copy"
                  className="animate-scale"
                >
                  <MdContentCopy
                    size={20}
                    className="hover:scale-110 default-transition"
                  />
                </button>
              </dd>
            </div>
          </dl>
          <div className="bg-moonstone-gradient2 text-white rounded-md px-3 py-2 mt-3 font-normal text-[15px] break-words hyphens-manual">
            <p className="uppercase font-bold text-center mb-2">
              Confirmation Process
            </p>
            <p>
              After a successful payment, please email your
              <span className="font-medium px-1.5" title="You ID is ">
                USER ID
              </span>
              and a screenshot/image/PDF displaying the successful payment
              statement to:
            </p>
            <div className="font-normal mt-1.5 flex flex-wrap gap-x-2">
              <span className="font-semibold">Mail Address&nbsp;:</span>
              client.request.fotoidol@gmail.com
              <button
                onClick={() =>
                  handleClipboardCopy("client.request.fotoidol@gmail.com")
                }
                title="Click to copy"
                className="animate-scale"
              >
                <MdContentCopy
                  size={20}
                  className="hover:scale-110 default-transition"
                />
              </button>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex-col gap-2 pt-1 pb-6">
          <div className="flex items-center w-full justify-between flex-wrap gap-2">
            <Typography variant="small" className="text-slategray font-medium">
              Your USER ID is :
            </Typography>
            <div className="flex items-center gap-x-3">
              <Typography
                variant="small"
                className="text-slategray font-semibold"
              >
                {user?._id || ""}
              </Typography>
              <button
                onClick={() => handleClipboardCopy(user?._id)}
                title="Click to copy"
                className="animate-scale"
              >
                <MdContentCopy
                  size={20}
                  className="hover:scale-110 default-transition"
                />
              </button>
            </div>
          </div>
          <p className="font-normal text-center text-sm mt-2">
            <b>Note:</b> Payment verification may take up to 3 - 4 business
            days.
          </p>
          <button
            onClick={handleWireOpen}
            formTarget="_blank"
            className="mt-3 px-4 py-1.5 rounded-[4px] shadow-md font-semibold bg-[#006e90] text-white  default-transition uppercase"
          >
            done
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default WireTransfer;
