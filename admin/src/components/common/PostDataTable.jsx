import { AiFillDelete, AiFillEdit, AiOutlineDownload } from "react-icons/ai";
import PropTypes from "prop-types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
  Chip,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DateFormatter } from "./DateFormatter";
import { useState } from "react";
import ImageViewer from "./ImageViewer";
import useModal from "../../hooks/useModal";
import {
  getallResource,
  deleteResource,
} from "../../redux/slices/resourceSlice";
import { NavLink } from "react-router-dom";
import PostEdit from "./posts/PostEdit";
import Loader from "./Loader";
import { saveAs } from "file-saver";

const TABLE_HEAD = [
  "S.N",
  "Recent Uploads",
  "Event",
  "Category",
  "View",
  "Uploaded At",
  "Actions",
];

export const PostDataTable = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { resources, isLoading } = useSelector((state) => state.resource);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleEditDialog = (boolValue) => {
    setOpen(boolValue);
  };

  // ### PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const posts = resources?.posts;

  // ### POST SEARCHING & FILTER
  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {isLoading && <Loader />}
      {modalOpen && <ImageViewer src={imageSrc} onClose={closeModal} />}
      <Card className="h-full w-full rounded-md shadow-lg">
        <CardHeader floated={false} shadow={false} className="rounded-none p-1">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" className="text-dark">
                Uploaded Photos
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal text-gray-800"
              >
                See information about the photos that have been uploaded.
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <NavLink to="/admin/images/add">
                <div className="flex items-center">
                  <Button className="py-2.5 rounded bg-moonstone">
                    Create
                  </Button>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-80 font-inter">
              <Input
                label="Search by Title"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll scrollbar-x-dir p-1">
          {!posts?.length && (
            <div>
              <p className="py-6 px-4 font-inter font-semibold">
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
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-4 py-3"
                    >
                      <Typography
                        color="blue-gray"
                        className="font-medium text-dark text-[15px]"
                      >
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
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {currentPage > 1
                              ? index + 1 + (currentPage - 1) * 10
                              : index + 1}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-start gap-3">
                          <div className="flex flex-wrap items-start">
                            <div
                              onClick={() => openModal(post?.assets?.filePath)}
                              key={post?.assets?.publicId + index}
                              className="w-[40px] h-[40px] overflow-hidden rounded me-1 cursor-pointer hover:scale-95 default-transition"
                            >
                              <img
                                src={post?.assets?.filePath}
                                alt={post?.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              By:{" "}
                              <span className="capitalize font-normal">
                                {post?.user?.name || "Not found"}
                              </span>
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70 text-xs"
                            >
                              {post?.user?.email || "Not found"}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col max-w-[280px]">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold capitalize"
                          >
                            {post?.title || "Not found"}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {post?.category?.title || "Not found"}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          {post?.numOfViews ? (
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={post?.numOfViews}
                            />
                          ) : (
                            <Chip variant="ghost" size="sm" value="0" />
                          )}
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {post?.createdAt ? (
                            <DateFormatter date={post?.createdAt} />
                          ) : (
                            "Not found!"
                          )}
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
                            <div className="tooltip-custom-container ">
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
                            <div className="tooltip-custom-container ">
                              delete
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
                            <div className="tooltip-custom-container ">
                              download
                            </div>
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
        {currentPosts?.length > 0 && (
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal font-inter"
            >
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
