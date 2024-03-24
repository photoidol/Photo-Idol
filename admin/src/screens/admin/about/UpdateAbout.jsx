import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import { isImageValid } from "../../../utils/ImageUtils";
import { toast } from "react-toastify";
import { getAllAbout, updateAbout } from "../../../redux/slices/aboutSlice";
import "react-quill/dist/quill.snow.css";

export const UpdateAbout = ({ openAboutUpdate, onAboutUpdateClose, about }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { isUpdateSuccess, isLoading } = useSelector((state) => state.about);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isImageValid(selectedFile)) {
      setImage(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    } else {
      toast.error("Please select a valid PNG, JPEG, or JPG image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      if (image) {
        formData.append("cover", image);
      }

      await dispatch(
        updateAbout({
          formData: formData,
          id: about?._id,
        })
      );

      if (isUpdateSuccess) {
        await dispatch(getAllAbout());
        setImage(null);
      }
      await dispatch(getAllAbout());
      setImage(null);
      onAboutUpdateClose();
      navigate("/admin/about");
    } else {
      toast.error("Please choose an image.");
    }
  };

  return (
    <div>
      <Dialog open={openAboutUpdate} onClose={onAboutUpdateClose}>
        {isLoading && <Loader />}
        <DialogHeader>Update About</DialogHeader>
        <DialogBody>
          <div>
            <label className="font-semibold text-dark block mb-2">
              Select New Image
            </label>
            <Input
              size="lg"
              type="file"
              name="cover"
              onChange={handleImageChange}
              label="Select Image"
            />
          </div>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 max-w-xs max-h-32 rounded"
            />
          )}
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button onClick={onAboutUpdateClose} className="rounded">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-moonstone rounded"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

UpdateAbout.propTypes = {
  openAboutUpdate: PropTypes.bool.isRequired,
  onAboutUpdateClose: PropTypes.func.isRequired,
  about: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
