import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostSidebar = ({ posts }) => {
  const [sortedPosts, setSortedPosts] = useState();

  const sortPostDescending = (postsArr) => {
    const tempPosts = [...postsArr];
    tempPosts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setSortedPosts(tempPosts);
  };

  useEffect(() => {
    sortPostDescending(posts);
  }, [posts]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <h3 className="text-lg font-semibold border-b-[1px] border-blue-gray-50 pb-2">Latest Photos</h3>
      <div className="grid gap-2.5 mt-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-2">
        {sortedPosts?.length > 0 &&
          sortedPosts.slice(0, 10).map((post) => {
            return <RelatedItem key={post._id} data={post} />;
          })}
      </div>
    </div>
  );
};

PostSidebar.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      updatedAt: PropTypes.string,
      // Define other properties as needed
    })
  ),
};
export default PostSidebar;

export const RelatedItem = (props) => {
  return (
    <article className="rounded-xl shadow-md hover:transform hover:scale-105 duration-300 ">
      <Link to={`/search/${props?.data?.slug}`}>
        <div className="relative flex items-end overflow-hidden rounded h-[100px]">
          <img
            src={props?.data?.assets[0]?.filePath}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
    </article>
  );
};

RelatedItem.propTypes = {
  data: PropTypes.shape({
    slug: PropTypes.string,
    assets: PropTypes.arrayOf(
      PropTypes.shape({
        filePath: PropTypes.string,
      })
    ),
    // Define other properties as needed
  }),
};
