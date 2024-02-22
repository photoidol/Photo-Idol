import {
  AiOutlineCloudUpload,
  AiOutlineEye,
  AiOutlineFileImage,
} from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallCategory } from "../../redux/slices/categorySlice";
import {
  getAllPost,
  getUserPosts,
  selectAllPosts,
  selectUserPosts,
} from "../../redux/slices/postsSlice";
import { selectUser } from "../../redux/slices/authSlice";

export const Overview = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const user = useSelector(selectUser);
  const categories = useSelector((state) => state.category.categorys);
  const [totalViews, setTotalViews] = useState(0);
  const userPosts = useSelector(selectUserPosts);

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getUserPosts()).then(() => {
      if (userPosts && userPosts[0]?.total > 0) {
        const tempViews =
          userPosts &&
          userPosts[0]?.posts?.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.numOfViews;
          }, 0);
        setTotalViews(tempViews);
      }
    });
    dispatch(getallCategory());
  }, [dispatch, user]);

  return (
    <>
      <section className="my-8 rounded-md shadow-lg py-8 px-5 bg-seasalt">
        <div className="mb-4 rounded-md">
          <h3 className="text-2xl font-bold">Overview Data</h3>
        </div>
        <div className="items-center m-auto w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <OverviewCard
              title="Total Photos"
              currentData={posts?.length > 0 ? posts?.length : 0}
              icon={<AiOutlineFileImage size={25} />}
            />
            <OverviewCard
              title="Your Uploads"
              currentData={userPosts ? userPosts[0]?.total : 0}
              icon={<AiOutlineCloudUpload size={25} />}
            />
            <OverviewCard
              title="Total Views"
              currentData={totalViews || 0}
              icon={<AiOutlineEye size={25} />}
            />
            <OverviewCard
              title="All Categories"
              currentData={categories ? categories?.total : 0}
              icon={<BsImages size={25} />}
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
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-title">
              {props.currentData}
            </h1>
            <p className="text-indigo pt-1 font-semibold">{props.title}</p>
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
};
