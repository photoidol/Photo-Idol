import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import { PropTypes } from "prop-types";
import { useEffect, useRef, useState } from "react";
import {
  CircleStencil,
  Cropper,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/themes/corners.css";
import "react-advanced-cropper/dist/style.css";
import { FaCropSimple } from "react-icons/fa6";
import { toast } from "react-toastify";

const ImageCrop = ({
  handleCropModalOpen,
  cropModalOpen,
  setProfileImgPreview,
  handleSetProfileImg,
}) => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const fileInputRef = useRef(null);
  const cropperRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (event) => {
    // Clean up previous image URL
    if (image) {
      URL.revokeObjectURL(image);
    }

    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
    event.target.value = "";
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  const handleCropSelection = () => {
    if (cropperRef.current) {
      const croppedImageDataUrl = cropperRef.current.getCanvas()?.toDataURL();
      setCroppedImage(croppedImageDataUrl);
      setProfileImgPreview(croppedImage);
      handleCropModalOpen();
    } else {
      toast.error("No any image to crop.");
    }
  };

  useEffect(() => {
    if (croppedImage) {
      const croppedImageBlob = dataURLtoBlob(croppedImage);

      const croppedImageFile = new File([croppedImageBlob], selectedFile.name, {
        type: selectedFile.type,
        lastModified: selectedFile.lastModified,
      });

      handleSetProfileImg(croppedImageFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedImage, selectedFile]);

  const handleCropModalToggle = () => {
    handleCropModalOpen();
    setImage(null);
    setCroppedImage(null);
    setSelectedFile(null);
  };

  return (
    <>
      <Dialog
        open={cropModalOpen}
        size="sm"
        handler={handleCropModalToggle}
        className="max-h-[90vh] max-w-[95vw] overflow-y-scroll scrollbar-y-dir"
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start pb-0">
            <Typography
              variant="h4"
              className="text-base text-indigo font-semibold"
            >
              Please select your image
            </Typography>
          </DialogHeader>
          <button type="button" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-3 h-5 w-5"
              onClick={handleCropModalToggle}
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <DialogBody>
          <div className="flex items-center space-x-4 mb-4">
            <div className="shrink-0">
              {croppedImage && (
                <img
                  id="preview_img"
                  className="h-16 w-16 object-cover rounded-full border-[1px]"
                  src={croppedImage}
                  alt="Current profile photo"
                />
              )}
            </div>
            <label className="block border-[1px] border-black/5 rounded-full cursor-pointer">
              <span className="sr-only">Choose profile photo</span>
              <input
                name="avatar"
                type="file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-indigo font-normal cursor-pointer"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </label>
          </div>
          {/* <FixedCropper
           ref={cropperRef}
            src={staticImages.banner1}
            stencilSize={{
              width: 300,
              height: 300,
            }}
            stencilProps={{
              handlers: true,
              lines: false,
              movable: true,
              resizable: true,
            }}
            imageRestriction={ImageRestriction.stencil}
            stencilComponent={CircleStencil}
          /> */}
          {image && (
            <>
              <Cropper
                ref={cropperRef}
                src={image}
                stencilSize={{
                  width: 300,
                  height: 300,
                }}
                stencilProps={{
                  handlers: true,
                  lines: false,
                  movable: true,
                  resizable: true,
                }}
                imageRestriction={ImageRestriction.stencil}
                stencilComponent={CircleStencil}
              />
              {selectedFile && (
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-3">
                  {/* <button
                    onClick={handleCropSelection}
                    className="inline-flex items-center text-indigo gap-x-1.5 hover:text-green-500 default-transition"
                  >
                    <FaEye size={15} />
                    <span className="text-sm font-semibold">Preview</span>
                  </button> */}
                  <button
                    className="inline-flex items-center text-indigo gap-x-1.5"
                    onClick={handleCropSelection}
                  >
                    <FaCropSimple size={14} />
                    <span className="text-sm font-semibold">Crop</span>
                  </button>
                </div>
              )}
            </>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ImageCrop;

ImageCrop.propTypes = {
  handleCropModalOpen: PropTypes.func,
  cropModalOpen: PropTypes.bool,
  setProfileImgPreview: PropTypes.func,
  handleSetProfileImg: PropTypes.func,
};
