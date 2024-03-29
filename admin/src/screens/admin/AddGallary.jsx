import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { CategoryDropDown } from "../../components/common/DropDown";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createResource } from "../../redux/slices/resourceSlice";
import Loader from "../../components/common/Loader";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  category: null,
};

export const AddGallary = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resource, setResource] = useState(initialState);
  const [resourceImage, setResourceImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { title, description, category } = resource;
  const { isSuccess, isLoading } = useSelector((state) => state.resource);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResource({ ...resource, [name]: value });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const selectedImage = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

    if (selectedImage && allowedFormats.includes(selectedImage.type)) {
      setResourceImage(selectedImage);
      const preview = URL.createObjectURL(selectedImage);
      setImagePreview(preview);
    } else {
      setResourceImage(null);
      setImagePreview(null);
      toast.error(
        "Invalid file formats. Please uplaod only JPEG, PNG, or JPG images."
      );
    }
  };

  const handleDeleteImage = () => {
    resetFileInput();
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setResourceImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("assets", resourceImage);

    if (category) {
      formData.append("category", category.value);
    }

    if (resourceImage) {
      try {
        await dispatch(createResource(formData));
        if (isSuccess) {
          navigate("/admin/images");
        }
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("Please select an image.");
    }
  };

  return (
    <div className="bg-white my-8 py-6 px-4 lg:px-6 font-inter rounded shadow-lg">
      <Card color="transparent" className="max-w-[500px]" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Create Post
        </Typography>

        {isLoading && <Loader />}
        <form onSubmit={handleSubmit} className="mt-8 mb-2">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              type="text"
              size="lg"
              name="title"
              value={resource.title}
              onChange={handleInputChange}
              label="Title"
            />
            <CategoryDropDown
              value={category}
              onChange={(selectedCategory) =>
                setResource({ ...resource, category: selectedCategory })
              }
            />
            <Textarea
              type="text"
              label="Message"
              name="description"
              value={resource.description}
              onChange={handleInputChange}
            />
            <Input
              size="lg"
              type="file"
              name="assets"
              onChange={handleImageChange}
              label="Select Photo"
              className="pt-2.5"
              ref={fileInputRef}
            />
            {imagePreview?.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                <div className="relative h-[120px]">
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500  text-white rounded-full cursor-pointer"
                    onClick={() => handleDeleteImage()}
                  >
                    <RxCrossCircled size={24} />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-moonstone text-sm font-normal">
                No Images selected!
              </p>
            )}
          </div>

          <Button type="submit" className="mt-6 rounded bg-moonstone" fullWidth>
            Create
          </Button>
        </form>
      </Card>
    </div>
  );
};
