import { AiFillCloseCircle } from "react-icons/ai";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import SpinLoader from "../SpinLoader";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
} from "@material-tailwind/react";
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
import { RxCrossCircled } from "react-icons/rx";

const PostEdit = ({ open, handleEditDialog, postSlug }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // ### POST UPDATION
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const { isSuccess, isLoading } = useSelector((state) => state.resource);
  const post = useSelector(selectSinglePost);
  const categories = useSelector((state) => state.category.categorys.categorys);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        description: post.description || "",
        category: post.category?._id || "",
        image: null,
      });
    }
  }, [post]);

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
    const selectedImage = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

    if (selectedImage && allowedFormats.includes(selectedImage.type)) {
      setFormData((prevData) => ({
        ...prevData,
        image: selectedImage,
      }));
      setImagePreview(URL.createObjectURL(selectedImage));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        image: null,
      }));
      setImagePreview(null);
      toast.error(
        `Invalid file formats. Please upload only JPEG, PNG, or JPG images`
      );
    }
  };

  const handlePreviewDelete = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFormData((prevData) => ({
      ...prevData,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please select an image!");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("assets", formData.image);

    try {
      await dispatch(
        updateResource({ formData: formDataToSubmit, id: post?._id })
      );

      if (isSuccess) {
        setFormData({
          title: "",
          description: "",
          category: "",
          image: "",
        });

        setImagePreview(null);
        await dispatch(getallResource());
      }
      await dispatch(getSinglePost(postSlug));
      handleEditModalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEditModalClose = () => {
    handleEditDialog(false);
    setImagePreview(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      image: "",
    });
  };

  useEffect(() => {
    if (postSlug) {
      dispatch(getSinglePost(postSlug));
    }
    dispatch(getallCategory());
  }, [postSlug, dispatch]);

  return (
    <div>
      <Dialog open={open} handler={handleEditModalClose}>
        <DialogHeader className="flex items-center justify-between md:px-6">
          <p className="text-xl">Change Post Details</p>
          <button onClick={() => handleEditModalClose()}>
            <AiFillCloseCircle size={28} />
          </button>
        </DialogHeader>
        <DialogBody
          divider
          className="h-[540px] sm:px-6 lg:px-8 py-6 overflow-x-hidden scrollbar-y-dir rounded-lg"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-3">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="h-[44px] border-[1px] border-dark/40 rounded focus:outline-none p-3 placeholder:text-dark/40"
                placeholder="Title or Event ..."
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              />

              <select
                value={formData.category}
                className="h-[44px] border-[1px] border-dark/40 rounded focus:outline-none p-3"
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
                className="min-h-[100px] border-[1px] border-dark/40 resize-none rounded focus:outline-none p-3  placeholder:text-dark/40"
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              />
              <input
                type="file"
                name="assets"
                onChange={handleImageChange}
                className="h-[44px] border-[1px] border-dark/40 rounded focus:outline-none p-[5.5px]"
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              />

              {post?.assets?.filePath ? (
                <div className="grid grid-cols-1 gap-4">
                  <p>Current image :</p>
                  <div className="relative rounded-lg overflow-hidden h-[180px]">
                    <img
                      src={post?.assets?.filePath}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <p>No any old image found.</p>
              )}

              {imagePreview ? (
                <div className="grid grid-cols-1 gap-4">
                  <p>New Image :</p>
                  <div className="relative rounded-lg overflow-hidden h-[180px]">
                    <img
                      src={imagePreview}
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      className="absolute top-2 shadow-lg right-2 bg-moonstone text-white rounded-full cursor-pointer"
                      onClick={() => handlePreviewDelete()}
                    >
                      <RxCrossCircled size={30} />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="font-medium text-slategray mt-2 text-center">
                  No any new images selected right now!
                </p>
              )}
            </div>

            <div>{isLoading && <SpinLoader />}</div>
            <Button
              type="submit"
              className="mt-6 text-base bg-moonstone font-medium tracking-[3px]"
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
