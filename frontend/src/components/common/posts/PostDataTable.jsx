import { Card, Typography } from "@material-tailwind/react";
import { AiFillDelete, AiFillEdit, AiOutlineDownload } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  CardHeader,
  Input,
  CardBody,
  CardFooter,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DateFormatter } from "../DateFormatter";
import {
  getallResource,
  deleteResource,
} from "../../../redux/slices/resourceSlice";
import Loader from "../Loader";
import { selectUser } from "../../../redux/slices/authSlice";
import { useState } from "react";
import ImageViewer from "../ImageViewer";
import useModal from "../../../hooks/useModal";
import PostEdit from "./PostEdit";
import { getPostLimit } from "../../../redux/slices/settings/SettingSlice";
import { saveAs } from "file-saver";

const TABLE_HEAD = [
  "S.N",
  "Uploads",
  "Title/Theme",
  "Category",
  "View",
  "Uploaded On",
  "Action",
];

export const PostDataTable = (props) => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { resources, isLoading } = useSelector((state) => state.resource);
  const user = useSelector(selectUser);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleEditDialog = (boolValue) => {
    setOpen(boolValue);
  };
  const postLimit = useSelector((state) => state.setting.postLimit);

  // ### PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const userPosts = resources?.posts?.filter(
    (post) => post?.user?._id === user?._id
  );

  // ### POST SEARCHING & FILTER
  const filteredPosts = userPosts?.filter((post) => {
    const titleMatch = post?.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch = post?.category?.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || categoryMatch;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts?.length / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(resources?.posts?.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ### POST DELETION & CONFIRMATINO
  const removeUser = async (id) => {
    await dispatch(deleteResource(id));
    await dispatch(getallResource());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete this post",
      message: "Are you sure to do delete this post?.",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  // ### ALL POST FETCHING
  useEffect(() => {
    dispatch(getallResource());
    dispatch(getPostLimit());
  }, [dispatch]);

  // ### POST UPDATION
  const [postSlug, setPostSlug] = useState(null);
  const postUpdateHandler = (postSlug) => {
    handleOpen();
    setPostSlug(postSlug);
  };

  // ### IMAGE PREVIEW MODAL
  const { modalOpen, imageSrc, openModal, closeModal } = useModal();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // ### IMAGE DOWNLOAD
  const handleImageDownload = (imageUrl, fileName) => {
    saveAs(imageUrl, fileName);
  };

  return (
    <>
      {modalOpen && <ImageViewer src={imageSrc} onClose={closeModal} />}
      <div className="datatable">
        <Card className="h-full w-full rounded-md shadow-lg lg:p-1">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none p-0"
          >
            <div className="lg:mb-8 md:mb-6 mb-4 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h4" className="text-indigo font-bold">
                  Uploaded Photos
                </Typography>
                <Typography className="mt-1 font-medium text-slategray">
                  See information about the photos that have been uploaded.
                </Typography>
              </div>
              {props?.showViewBtn && (
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button className="bg-moonstone-gradient2 rounded" size="sm">
                    view all
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="w-full md:w-80">
                <Input
                  label="Search by Title & Category"
                  icon={<MagnifyingGlassIcon className="h-5 w-5 text-indigo" />}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="text-base">
                <span className="font-semibold text-slategray px-1">
                  Photo Uploaded :
                </span>
                <span className="text-slategray font-medium">
                  <span
                    className={`font-bold ${
                      userPosts?.length < postLimit?.assetLimit
                        ? "text-slategray"
                        : "text-red-400"
                    }`}
                  >
                    {userPosts?.length}
                  </span>{" "}
                  out of{" "}
                  <span
                    className={`font-bold ${
                      userPosts?.length < postLimit?.assetLimit
                        ? "text-slategray"
                        : "text-red-400"
                    }`}
                  >
                    {postLimit?.assetLimit}
                  </span>
                </span>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll scrollbar-x-dir p-0">
            {isLoading && <Loader />}
            {!userPosts?.length && (
              <div className="mx-1">
                <p className="lg:p-3 py-2 m-3 rounded-md border-[1px] border-moonstone/10 font-semibold text-indigo text-center bg-moonstone/5">
                  No images uploaded yet!
                </p>
              </div>
            )}

            {currentPosts?.length > 0 && (
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="px-4 py-3 border-b-[1px] border-blue-gray-50"
                      >
                        <Typography className="font-bold opacity-80 text-slategray text-[14px] uppercase">
                          {head || "Not found"}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentPosts?.map((post, index) => {
                    const isLast = index === resources.length - 1;
                    const classes = isLast
                      ? "px-4 py-2.5"
                      : "px-4 py-2.5 border-b border-blue-gray-50";

                    if (post?.user?._id === user?._id) {
                      return (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                className="text-indigo font-semibold"
                              >
                                {index + 1}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col items-start gap-3">
                              <div className="flex flex-wrap items-start">
                                <div
                                  onClick={() =>
                                    openModal(post?.assets?.filePath)
                                  }
                                  key={post?.assets?.publicId + index}
                                  className="w-[50px] h-[50px] overflow-hidden rounded me-1 cursor-pointer hover:scale-95 default-transition"
                                >
                                  <img
                                    src={post?.assets?.filePath}
                                    alt={post?.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col max-w-[280px]">
                              <Typography
                                variant="small"
                                className="font-bold capitalize text-slategray"
                              >
                                {post?.title || ""}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                className="font-normal text-slategray"
                              >
                                {post?.category?.title || ""}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                size="sm"
                                value={post?.numOfViews}
                                className="text-white bg-indigo"
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              className="font-normal text-slategray"
                            >
                              <DateFormatter date={post?.createdAt} />
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="flex gap-2">
                              <IconButton
                                size="sm"
                                className="rounded tooltip-custom group"
                                color="blue"
                                onClick={() => postUpdateHandler(post?.slug)}
                              >
                                <AiFillEdit size={20} />
                                <div className="tooltip-custom-container">
                                  Edit
                                </div>
                              </IconButton>
                              <IconButton
                                size="sm"
                                className="rounded tooltip-custom group"
                                color="red"
                                onClick={() => confirmDelete(post._id)}
                              >
                                <AiFillDelete size={20} />
                                <div className="tooltip-custom-container">
                                  Delete
                                </div>
                              </IconButton>
                              <IconButton
                                size="sm"
                                className="rounded tooltip-custom group"
                                color="green"
                                onClick={() =>
                                  handleImageDownload(
                                    post?.assets?.filePath,
                                    post?.assets?.fileName
                                  )
                                }
                              >
                                <AiOutlineDownload size={20} />
                                <div className="tooltip-custom-container">
                                  Download
                                </div>
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            )}
          </CardBody>
          {filteredPosts?.length > 0 && (
            <CardFooter className="flex items-center justify-between py-4 px-6">
              <Typography variant="small" className="font-semibold text-indigo">
                Page {currentPage} of{" "}
                {Math.ceil(filteredPosts?.length / postsPerPage)}
              </Typography>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  className="rounded border-[1px] border-moonstone text-moonstone"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  className="rounded border-[1px] border-pink text-pink"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
      {postSlug && (
        <PostEdit
          open={open}
          handleEditDialog={handleEditDialog}
          postSlug={postSlug}
        />
      )}
    </>
  );
};

PostDataTable.propTypes = {
  showViewBtn: PropTypes.any,
  TABLE_DATA: PropTypes.any,
};
