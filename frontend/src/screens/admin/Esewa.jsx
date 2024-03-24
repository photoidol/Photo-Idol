import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { initiatePayment } from "../../redux/slices/EsewaSlice";
import { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { staticImages } from "../../images";
import { IoLockClosed } from "react-icons/io5";

export const Esewa = () => {
  const dispatch = useDispatch();
  const [openOffer, setOpenOffer] = useState(false);
  const { isLoading, isSuccess, isError } = useSelector((state) => state.esewa);

  const handleOfferOpen = () => setOpenOffer((cur) => !cur);

  const handleEsewaPayment = async () => {
    try {
      const response = await dispatch(initiatePayment());
      if (response && response.payload.formData) {
        esewaCall(response.payload.formData);
      } else {
        console.log("Failed to initiate payment");
      }
    } catch (error) {
      toast.error(error);
      console.error("Error during payment initiation:", error);
    }
  };
  const esewaCall = (formData) => {
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      <button
        onClick={handleOfferOpen}
        className="bg-green-500 text-white px-5 py-2 text-sm rounded-md shadow-xl font-bold hover:scale-110 default-transition"
      >
        E-sewa Pay
      </button>

      <Dialog
        size="sm"
        open={openOffer}
        handler={handleOfferOpen}
        className="max-w-[95%] max-h-[90vh] overflow-y-scroll"
      >
        <DialogHeader className="justify-between py-2 px-3 sm:px-4">
          <Typography
            color="blue-gray"
            className="font-semibold text-indigo text-base sm:text-lg"
          >
            For user in Nepal
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOfferOpen}
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
          <div className="lg:max-w-[80px] max-w-[60px] mx-auto rounded-md overflow-hidden">
            <img src={staticImages.esewa} alt="" />
          </div>
          <p className="text-lg text-green-500 font-semibold md:mb-2 mb-1.5">
            Limited Time Offer !
          </p>
          <h3 className="font-semibold sm:text-xl text-lg">
            Join Now for Only
            <span className="font-bold text-green-500 px-1.5">NRP 300</span>!
          </h3>
          <p className="py-2 md:text-base text-sm">
            Don&apos;t miss out on this exclusive deal ! Join us to unlock
            premium features and join our vibrant community!
          </p>
          <p className="text-moonstone font-semibold sm:text-lg text-base">
            (40% Off Regular Price: NPR 500)
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
            onClick={handleEsewaPayment}
            formTarget="_blank"
            className="capitalize px-4 py-1.5 rounded-[4px] shadow-md font-medium bg-green-500 text-white hover:bg-green-600 default-transition"
          >
            agree & continue
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
