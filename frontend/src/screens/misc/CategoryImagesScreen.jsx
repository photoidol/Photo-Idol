import { useEffect } from "react";
import { staticImages } from "../../images";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllPost } from "../../redux/slices/postsSlice";
import Loader from "../../components/common/Loader";
import { scrollToTop } from "../../utils/scrollToTop";
import PropTypes from "prop-types";
import LazyImage from "../../utils/LazyImage";
import { getSingleCategory } from "../../redux/slices/categorySlice";
import BackButton from "../../components/common/BackButton";

export const CategoryImagesScreen = () => {
  const { categoryId } = useParams();
  const { isLoading } = useSelector((state) => state.posts.isLoading);
  const dispatch = useDispatch();
  const categorySingle = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getAllPost());
    if (categoryId) {
      dispatch(getSingleCategory(categoryId));
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div
      style={{
        minHeight: "calc(100vh - 160px)",
      }}
    >
      {isLoading && <Loader />}
      <CategoryImagesContent
        categoryId={categoryId}
        posts={categorySingle?.posts}
        categorySingle={categorySingle}
      />
    </div>
  );
};

export const CategoryImagesContent = ({ posts, categorySingle }) => {
  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    700: 3,
    500: 2,
  };

  const isCategoryLoading = useSelector((state) => state.category.isLoading);

  return (
    <>
      <div>
        <div
          className="masonary-search flex justify-center flex-col pt-32 pb-14 border-t-2 border-white/30"
          style={{
            background: `linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%), url("${staticImages.hero}") center/cover no-repeat`,
          }}
        >
          <div className="containers flex-col">
            <h4 className="text-center md:text-base text-sm max-w-[780px] mx-auto   text-white">
              Explore our photo gallery, a visual journey through moments frozen
              in time.
            </h4>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4">
          <BackButton backLink={"/"} />
          {posts?.length > 0 ? (
            <div className="mt-10 px-3">
              <h3 className=" text-dark text-2xl font-semibold">
                Photos related to
                <span className="font-bold text-[1.6rem] text-moonstone">
                  {categorySingle?.title}
                </span>
              </h3>
            </div>
          ) : (
            <div className="mt-6 md:mt-8 lg:mt-10">
              <h3 className=" text-dark text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 md:mb-4 lg:mb-6 text-center">
                We couldn’t find anything for you.
              </h3>
              <div className="flex gap-3 flex-wrap justify-center">
                <Link
                  className="text-center px-3 h-[40px] md:h-[44px] lg:h-[50px] min-w-[100px] md:min-w-[120px] lg:min-w-[160px] items-center justify-center  font-medium text-sm lg:text-base border-dark border-[2px] bg-dark text-white default-transition shadow rounded inline-flex tracking-[0.5px]"
                  to="/"
                >
                  Go To Home Page
                </Link>
                <Link
                  className="text-center px-3 h-[40px] md:h-[44px] lg:h-[50px] min-w-[100px] md:min-w-[120px] lg:min-w-[160px] items-center justify-center font-semibold text-sm lg:text-base border-dark border-[2px] bg-white text-dark default-transition shadow rounded inline-flex tracking-[0.5px]"
                  to="/search"
                >
                  Search Page
                </Link>
              </div>
            </div>
          )}

          {isCategoryLoading && <Loader />}

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column sm:my-9 my-5"
          >
            {posts?.length > 0 &&
              posts.map((item) => (
                <Link
                  to={`/search/${item?.slug}`}
                  key={item._id}
                  className="masonry-item hover:scale-[1.02] transition-all duration-200 relative group after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/40 after:opacity-0 after:transition-all after:ease-in-out after:duration-300 hover:after:opacity-100"
                >
                  <LazyImage
                    src={
                      item?.assets?.length > 0 ? item?.assets[0].filePath : ""
                    }
                    alt=""
                  />
                  <div className="item-info opacity-0 group-hover:opacity-100 absolute bottom-[12px] left-[12px] transition-all duration-300 ease-in-out flex items-center justify-start z-10">
                    <div className="item-info-user w-[32px] h-[32px] rounded-full overflow-hidden me-2">
                      <img
                        src={
                          item?.user?.avatar.url
                            ? item?.user?.avatar?.url
                            : item?.user?.avatar
                        }
                        className="w-full h-full object-fit-cover"
                        alt="avatar"
                      />
                    </div>
                    <p className="font-medium text-white bg-black/20 px-2 py-1 rounded-full text-xs capitalize">
                      {item?.user?.name}
                    </p>
                  </div>
                </Link>
              ))}
          </Masonry>
        </div>
      </div>
    </>
  );
};

CategoryImagesContent.propTypes = {
  categoryId: PropTypes.any,
  posts: PropTypes.any,
  categorySingle: PropTypes.any,
};
