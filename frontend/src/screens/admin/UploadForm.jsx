import { Card, Typography } from "@material-tailwind/react";
import Loader from "../../components/common/Loader";
import { useEffect, useRef, useState } from "react";
import { getUserPosts } from "../../redux/slices/postsSlice";
import {
  createResource,
  getallResource,
} from "../../redux/slices/resourceSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { guidelinesData } from "../../utils/constants";
import { FaCheck, FaClipboardCheck } from "react-icons/fa";
import { CategoryDropDown } from "../../components/common/DropDown";
import { RxCrossCircled } from "react-icons/rx";
import { Button } from "@material-tailwind/react";
import { FiChevronRight } from "react-icons/fi";
import { staticImages } from "../../images";
import { MdUpload } from "react-icons/md";

const initialState = {
  title: "",
  description: "",
  category: "",
  image: null,
};

const UploadForm = () => {
  // const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useRedirectLoggedOutUser("/login");
  const [resource, setResource] = useState(initialState);
  const [resourceImages, setResourceImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { title, description, category } = resource;
  const { isSuccess, isLoading } = useSelector((state) => state.resource);
  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });

  const validateTitle = (value) => {
    if (value.length > 100) {
      return "Title must be at most 100 characters";
    } else if (value.trim().length === 0) {
      return "You can't leave the title field empty.";
    }
    return "";
  };

  const validateDescription = (value) => {
    if (value.length > 500) {
      return "Description must be at most 500 characters";
    } else if (value.trim().length === 0) {
      return "You can't leave the description field empty.";
    }
    return "";
  };

  const validateCategory = (value) => {
    if (value.length === 0) {
      return "Please select a category.";
    }
    return "";
  };

  const validateImage = (value) => {
    if (!value || value.length === 0) {
      return "Please choose an image.";
    } else if (value.length > 1) {
      return "Please select only one image.";
    } else if (value[0].size > 3 * 1024 * 1024) {
      return "Image size can't be larger than 3 MB.";
    }
    return "";
  };

  const showPhotoGuideline = () => {
    let category = resource?.category?.label
      ?.replace("-", " ")
      ?.replace(/\s{2,}/g, " ")
      ?.toLowerCase();

    return guidelinesData.map((guideline) => {
      if (guideline.id === category) {
        return (
          <div
            key={guideline.id}
            className="border-[1px] border-blue-gray-50 rounded-md p-3"
          >
            <h3 className="capitalize font-semibold text-indigo mb-2 text-[15px]">
              {guideline.id} - Photo Requirements
            </h3>
            <ul>
              {guideline.guidelines.map((guideline, index) => (
                <li
                  key={index}
                  className="flex text-slategray items-center gap-x-2 flex-wrap text-sm my-[2px]"
                >
                  <FaClipboardCheck />
                  <span>{guideline.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResource({ ...resource, [name]: value });
    setErrors({
      ...errors,
      [name]:
        name === "title" ? validateTitle(value) : validateDescription(value),
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const selectedImages = Array.from(e.target.files || e.dataTransfer.files);
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

    const invalidFiles = selectedImages.filter(
      (file) => !allowedFormats.includes(file.type)
    );

    if (invalidFiles.length === 0) {
      setResourceImages(selectedImages);
      const previews = selectedImages.map((image) =>
        URL.createObjectURL(image)
      );
      setImagePreviews(previews);
    } else {
      setResourceImages([]);
      setErrors({
        ...errors,
        image: `Invalid file formats. Please upload only JPEG, PNG, or JPG images. Invalid files: ${invalidFiles
          .map((file) => file.name)
          .join(", ")}`,
      });
    }
    setIsDragOver(false);
  };

  const handleDeleteImage = (indexToDelete) => {
    const updatedImages = [...resourceImages];
    updatedImages.splice(indexToDelete, 1);
    setResourceImages(updatedImages);

    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(indexToDelete, 1);
    setImagePreviews(updatedPreviews);
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = validateTitle(resource.title);
    const descriptionError = validateDescription(resource.description);
    const categoryError = validateCategory(resource.category);
    const imageError = validateImage(resourceImages);

    setErrors({
      title: titleError,
      description: descriptionError,
      category: categoryError,
      image: imageError,
    });

    if (!titleError && !descriptionError && !categoryError && !imageError) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      resourceImages.forEach((image) => {
        formData.append("assets", image);
      });

      if (category) {
        formData.append("category", category.value);
      }

      try {
        await dispatch(createResource(formData));
        setResource(initialState);
        setResourceImages([]);
        setImagePreviews([]);
        navigate("/admin/images");
        resetFileInput();
        await dispatch(getallResource());

        if (isSuccess) {
          setResource({
            title: "",
            description: "",
            category: null,
          });
          setResource(initialState);
        }
        await dispatch(getUserPosts());
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    dispatch(getUserPosts());
    dispatch(getallResource());
  }, [dispatch]);

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrors({
        title: "",
        description: "",
        category: "",
      });
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [errors]); // Run this effect whenever the errors state changes

  return (
    <div className="bg-white pt-2 pb-6 my-5 shadow-xl rounded-md grid xxl:grid-cols-[600px_auto] xl:grid-cols-[600px_auto] gap-4">
      <div className="w-full px-6">
        <div className="py-4 flex justify-between gap-4 items-center px-8 border-b-[1px] border-gray-200">
          <Typography variant="h4" className="text-indigo font-bold">
            Upload Your Photo
          </Typography>
        </div>
        <Card color="transparent" shadow={false} className="px-8 py-2">
          {isLoading && <Loader />}
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="mb-4 flex flex-col gap-5">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="title"
                  value={resource.title}
                  onChange={handleInputChange}
                  className="input-theme"
                  placeholder="Title or Event ..."
                />
                {errors.title && (
                  <div className="text-red-400 text-[14px] mt-1">
                    {errors.title}
                  </div>
                )}
              </div>
              <div>
                <CategoryDropDown
                  value={category}
                  onChange={(selectedCategory) =>
                    setResource({ ...resource, category: selectedCategory })
                  }
                />
                {errors.title && (
                  <div className="text-red-400 text-[14px] mt-1">
                    {errors.category}
                  </div>
                )}
              </div>
              {showPhotoGuideline()}
              <div className="flex flex-col">
                <textarea
                  name="description"
                  value={resource.description}
                  onChange={handleInputChange}
                  placeholder="Write some description"
                  className="textarea-theme"
                />
                {errors.description && (
                  <div className="text-red-400 text-[14px] mt-1">
                    {errors.description}
                  </div>
                )}
              </div>
              <Card
                className={`shadow-none`}
                onDrop={handleImageChange}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <label
                  className={`h-[120px] w-full border-dashed border-[1px] overflow-hidden relative cursor-pointer  ${
                    isDragOver ? "border-moonstone" : "border-gray-300"
                  }`}
                  onClick={handleBoxClick}
                >
                  <div className="flex flex-col items-center justify-center pt-2">
                    <svg
                      className="w-8 h-8 mb-4 text-slategray"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-slategray">
                      <span className="font-semibold">
                        Click to Upload or Drag Here
                      </span>
                    </p>
                    <p className="text-xs text-slategray">
                      PNG, JPG & JPEG (MAX. 3 MB)
                    </p>
                  </div>
                </label>
                <input
                  name="avatar"
                  ref={fileInputRef}
                  type="file"
                  onChange={handleImageChange}
                  className="pt-[7px] hidden"
                />
              </Card>

              {errors.image && (
                <div className="text-red-400 text-[14px] mt-1 font-medium">
                  {errors.image}
                </div>
              )}

              {imagePreviews.length > 0 ? (
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative rounded-lg overflow-hidden h-[180px]"
                    >
                      <img
                        src={preview}
                        alt={`Image ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-2 shadow-lg right-2 bg-moonstone text-white rounded-full cursor-pointer"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <RxCrossCircled size={30} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div id="gallery" className="flex flex-1 flex-wrap my-3">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    <img
                      className="mx-auto w-24"
                      src={staticImages.file_not_selected}
                      alt="no data"
                    />
                    <span className="text-small text-slategray text-sm mt-2">
                      No files selected!
                    </span>
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="mt-6 text-base bg-moonstone-gradient2 font-semibold tracking-[2px] rounded-md flex items-center justify-center gap-x-3"
              fullWidth
            >
              <span className="animate-bounce flex items-center justify-center -mb-1">
                <MdUpload size={20} />
              </span>
              <span>upload now</span>
            </Button>
          </form>
        </Card>
      </div>

      <div className="px-6 sm:px-8 md:px-10 xl:pe-6 xl:ps-4">
        <div className="py-4 flex justify-between gap-4 items-center border-b-[1px] border-gray-200 mb-6">
          <Typography variant="h4" className="text-indigo font-bold">
            Photo Upload Guidelines
          </Typography>
        </div>
        <div className="grid gap-4 xl:gap-6">
          <div className="flex flex-col text-center text-gray-900 bg-white rounded-lg">
            <h3 className="text-sm text-start font-bold text-indigo opacity-80 uppercase">
              Half Body Portrait
            </h3>
            <ul role="list" className="mt-2 text-left text-sm text-slategray">
              <li className="flex items-start gap-x-4 my-1">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  Generally, anything under 2MB is accepted. We do accept larger
                  images but they can sometimes cause issues.
                </span>
              </li>
              <li className="flex items-start gap-x-4 my-1">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  We limit image resolution to 4000x4000px. Anything larger will
                  prompt an image upload error.{" "}
                </span>
              </li>
              <li className="flex items-start gap-x-4 my-1">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  You can upload the following formats: JPEG, JPG & PNG.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col text-center text-gray-900 bg-white rounded-lg">
            <h3 className="text-sm text-start font-bold text-indigo opacity-80 uppercase">
              Full Body Portrait
            </h3>
            <ul role="list" className="mt-2 text-left text-sm text-gray-600">
              <li className="flex items-start gap-x-4 my-1">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The size must be between 0.5 MB and 80 MB.</span>
              </li>
              <li className="flex items-start gap-x-4 my-1">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The accepted photo format are JPEG, PNG & JPG.</span>
              </li>
              <li className="flex items-start gap-x-4 my-1">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The dimensions for the photo is: 50x50.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col text-center text-gray-900 bg-white rounded-lg">
            <h3 className="text-sm text-start font-bold text-indigo opacity-80 uppercase">
              Landscape
            </h3>
            <ul role="list" className="mt-2 text-left text-sm text-gray-600">
              <li className="flex items-start gap-x-4 my-1">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The size must be between 0.5 MB and 80 MB.</span>
              </li>
              <li className="flex items-start gap-x-4 my-1">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The accepted photo format are JPEG, PNG & JPG.</span>
              </li>
              <li className="flex items-start gap-x-4 my-1">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The dimensions for the photo is: 50x50.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 px-8 py-4 rounded-md border-[1px] border-blue-gray-50 inline-flex flex-col">
          <h3 className="text-pink font-bold mb-2">Still Confused?</h3>
          <Link to="/admin/guideline">
            <img className="w-[120px]" src={staticImages.confused} alt="" />
          </Link>
          <Link
            className="text-sm font-semibold mt-4 inline-flex items-center gap-x-2 text-slategray hover:text-indigo default-transition"
            to="/admin/guideline"
          >
            <span>Click here for full details</span>
            <span className="flex items-center justify-center">
              <FiChevronRight size={20} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
