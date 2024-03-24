import { AiFillCloseCircle } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import SpinLoader from "../SpinLoader";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { toast } from "react-toastify";
import {
  getSinglePost,
  selectSinglePost,
} from "../../../redux/slices/postsSlice";
import {
  getallResource,
  updateResource,
} from "../../../redux/slices/resourceSlice";
import { getallCategory } from "../../../redux/slices/categorySlice";
import { MdClose } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

const PostEdit = ({ open, handleEditDialog, postSlug }) => {
  const dispatch = useDispatch();

  // ### POST UPDATION
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });

  const [singlePost, setSinglePost] = useState({});
  const [resourceImage, setResourceImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { isSuccess, isUpdateLoading } = useSelector((state) => state.resource);
  const post = useSelector(selectSinglePost);
  const categories = useSelector((state) => state.category.categorys.categorys);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const categoryChangeHandler = (e) => {
    setFormData((prevValue) => {
      return {
        ...prevValue,
        category: e.target.value,
      };
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const selectedImage = e.target.files[0] || e.dataTransfer.files[0];
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

    if (selectedImage && allowedFormats.includes(selectedImage.type)) {
      setResourceImage(selectedImage);
      const preview = URL.createObjectURL(selectedImage);
      setImagePreview(preview);
    } else {
      setResourceImage(null);
      toast.error(
        `Invalid file formats. Please upload only JPEG, PNG, or JPG images`
      );
    }
  };

  useEffect(() => {
    if (post) {
      setSinglePost(post);
      setFormData({
        title: post?.title || "",
        description: post?.description || "",
        category: post?.category?._id,
        image: post?.assets || "",
      });
    }
  }, [post]);

  const handleDeleteImage = () => {
    resetFileInput();
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setResourceImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category } = formData;
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", title);
    formDataToSubmit.append("description", description);
    formDataToSubmit.append("category", category);
    formDataToSubmit.append("assets", resourceImage);

    if (resourceImage) {
      try {
        await dispatch(
          updateResource({ formData: formDataToSubmit, id: singlePost?._id })
        );

        if (isSuccess) {
          setFormData({
            title: "",
            description: "",
            category: "",
            image: "",
          });
          setResourceImage(null);
          setImagePreview(null);
          await dispatch(getallResource());
        }
        await dispatch(getSinglePost(postSlug));
        handleEditModalClose();
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("Please select an image");
    }
  };

  const handleEditModalClose = () => {
    handleEditDialog(false);
    setResourceImage(null);
    setImagePreview(null);
  };

  useEffect(() => {
    dispatch(getSinglePost(postSlug));
    dispatch(getallCategory());
  }, [postSlug, dispatch]);

  return (
    <div>
      <Dialog open={open} handler={handleEditModalClose}>
        <DialogHeader className="flex items-center justify-between md:px-6">
          <p className="text-xl font-bold text-indigo">Change Post Details</p>
          <button onClick={() => handleEditModalClose()}>
            <MdClose className="text-indigo" size={28} />
          </button>
        </DialogHeader>
        <DialogBody
          divider
          className="h-[540px] sm:px-6 lg:px-8 py-8 overflow-x-hidden scrollbar-y-dir rounded-lg"
        >
          <form onSubmit={handleSubmit} className="mt-5 ">
            <div className="mb-4 flex flex-col gap-3">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input-theme"
                placeholder="Title or Event ..."
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              />

              <select
                value={formData.category}
                className="input-theme"
                onChange={categoryChangeHandler}
              >
                {categories?.length > 0 &&
                  categories?.map((category) => {
                    return (
                      <option key={category?._id} value={category?._id}>
                        {category?.title}
                      </option>
                    );
                  })}
              </select>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write some description"
                className="textarea-theme"
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              />
              <input
                type="file"
                name="assets"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="input-theme"
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                  paddingTop: "0.4rem",
                }}
              />

              {imagePreview?.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative rounded-lg overflow-hidden h-[180px]">
                    <img
                      src={imagePreview}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-2 shadow-lg right-2 bg-moonstone text-white rounded-full cursor-pointer"
                      onClick={() => handleDeleteImage()}
                    >
                      <RxCrossCircled size={30} />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="font-medium text-slategray mt-2">
                  No Images selected right now!
                </p>
              )}
            </div>
            <div>{isUpdateLoading && <SpinLoader />}</div>
            <Button
              type="submit"
              className="mt-6 text-base rounded-md bg-moonstone-gradient2 font-semibold tracking-[2px]"
              fullWidth
            >
              update now
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default PostEdit;

PostEdit.propTypes = {
  open: PropTypes.bool,
  handleEditDialog: PropTypes.func,
  postSlug: PropTypes.string,
};
