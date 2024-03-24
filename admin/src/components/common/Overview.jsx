import {
  AiFillLike,
  AiOutlineCloudUpload,
  AiOutlineEye,
  AiOutlineFileImage,
} from "react-icons/ai";
import { BsClipboardCheckFill, BsImages } from "react-icons/bs";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallResource } from "../../redux/slices/resourceSlice";
import { getallCategory } from "../../redux/slices/categorySlice";
import { getAllUserByAdmin, selectUser } from "../../redux/slices/authSlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";

export const Overview = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const resources = useSelector((state) => state.resource.resources);
  const categories = useSelector((state) => state.category.categorys);
  const [totalViews, setTotalViews] = useState(0);
  const { users } = useSelector((state) => state.auth);
  const [verifiedUsers, setVerifiedUsers] = useState(null);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    if (users?.usersList?.length > 0) {
      const verifiedUsers = users.usersList.filter(
        (user) => user.role !== "admin" && user.isVerified === true
      );
      setVerifiedUsers(verifiedUsers);
    }
  }, [users?.usersList]);

  useEffect(() => {
    if (resources?.posts?.length > 0) {
      const likesCount = resources?.posts.reduce(
        (accumulator, currentPost) => accumulator + currentPost.likes.length,
        0
      );
      setTotalLikes(likesCount);

      const tempViews = resources?.posts.reduce(
        (accumulator, currentObject) => accumulator + currentObject.numOfViews,
        0
      );
      setTotalViews(tempViews);
    }
  }, [resources.posts]);

  useEffect(() => {
    dispatch(getallResource());
    dispatch(getallCategory());
    if (user?.role === "admin") {
      dispatch(getAllUserByAdmin());
    }
  }, [dispatch, user]);

  return (
    <>
      <section className="my-8">
        <div className="items-center m-auto w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <OverviewCard
              title="Total Uploads"
              currentData={
                resources?.posts?.length > 0 ? resources?.posts?.length : 0
              }
              icon={<AiOutlineFileImage size={25} />}
            />
            <OverviewCard
              title="Total Users"
              currentData={users?.totalUsers || 0}
              icon={<AiOutlineCloudUpload size={25} />}
            />
            <OverviewCard
              title="Total Views"
              currentData={totalViews || 0}
              icon={<AiOutlineEye size={25} />}
            />
            <OverviewCard
              title="Categories"
              currentData={categories ? categories?.total : 0}
              icon={<BsImages size={25} />}
            />
            <OverviewCard
              title="Verified Users"
              currentData={verifiedUsers ? verifiedUsers?.length : 0}
              icon={<BsClipboardCheckFill size={25} />}
            />
            <OverviewCard
              title="Total Likes"
              currentData={totalLikes ? totalLikes : 0}
              icon={<AiFillLike size={25} />}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export const OverviewCard = (props) => {
  return (
    <>
      <div className="w-full">
        <div className="flex items-start justify-between px-4 py-5 overflow-hidden bg-white rounded-lg shadow-xl duration-300">
          <div className="flex flex-row justify-between items-center">
            <div className="px-2.5 py-2.5 bg-pinkstone text-white rounded-md bg-opacity-30 shadow-md">
              {props.icon}
            </div>
          </div>
          <div className="flex flex-col items-end flex-wrap gap-y-1 gap-x-2">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-indigo">
              {props.currentData}
            </h1>
            <div className="flex flex-row justify-between mt-1 flex-wrap">
              <p className="text-indigo pt-1 font-semibold">{props.title}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

OverviewCard.propTypes = {
  title: PropTypes.any,
  currentData: PropTypes.any,
  icon: PropTypes.any,
  classes: PropTypes.string,
  description: PropTypes.string,
};
