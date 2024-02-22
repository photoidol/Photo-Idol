import { useEffect, useRef } from "react";
import { staticImages } from "../../images";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { selectAllPosts } from "../../redux/slices/postsSlice";
import { getAllPost } from "../../redux/slices/postsSlice";
import Loader from "../../components/common/Loader";
import { scrollToTop } from "../../utils/scrollToTop";
import { useState } from "react";
import {
  CATEGORY_SINGLE_RESET,
  getSingleCategory,
  getallCategory,
} from "../../redux/slices/categorySlice";
import Masonary from "../../components/common/Masonary";
import { Typography } from "@material-tailwind/react";
import { CATEGORY_GUEST } from "../../utils/constants";

export const SearchScreen = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div
      style={{
        minHeight: "calc(100vh - 270px)",
      }}
    >
      <SearchContent />
    </div>
  );
};

export const SearchContent = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const categories = useSelector((state) => state.category.categorys.categorys);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategorySearch, setShowCategorySearch] = useState(false);
  const categorySearchRef = useRef(null);
  const categorySingle = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getallCategory());
  }, [dispatch]);

  const filteredPosts = posts?.filter((post) => {
    const titleMatch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const usernameMatch = post.user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || usernameMatch;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.search.value);
  };

  const showSelectedCategory = async (categoryId) => {
    if (categoryId) {
      await dispatch(getSingleCategory(categoryId));
    } else {
      await dispatch(CATEGORY_SINGLE_RESET());
    }
  };

  const handleCategorySearchVisibility = () => {
    setShowCategorySearch(true);
  };

  useEffect(() => {
    const handleSearchClickOutside = (event) => {
      if (
        categorySearchRef.current &&
        !categorySearchRef.current.contains(event.target) &&
        event.target.name !== "search"
      ) {
        setShowCategorySearch(false);
      }
    };

    window.addEventListener("click", handleSearchClickOutside);
    return () => {
      window.removeEventListener("click", handleSearchClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="masonary-search flex justify-center flex-col pt-32 pb-20 border-t-2 border-white/30"
        style={{
          background: `linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%), url("${staticImages.hero}") center/cover no-repeat`,
        }}
      >
        <div className="containers flex-col">
          <h4 className="text-center md:text-lg sm:text-md text-sm max-w-[780px] mx-auto drop-shadow-lg  text-white">
            Explore our photo gallery, a visual journey through moments frozen
            in time.
          </h4>
          <form
            className="flex justify-center items-center border-[1px] border-gray-300 text-slategray w-full max-w-[700px] mx-auto px-6 md:h-[56px] sm:h-[52px] h-[48px] shadow-md shadow-dark/5 rounded  placeholder:text-gray-300 mt-4 bg-white relative"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              className="outline-none w-full"
              placeholder="Search photos here by title or author"
              name="search"
              autoComplete="on"
              onFocus={handleCategorySearchVisibility}
            />
            <button
              type="submit"
              className="h-[40px] inline-flex items-center justify-center text-xl text-slategray"
            >
              <BsSearch />
            </button>

            <div
              className={`absolute bg-white top-full left-0 w-full mt-2 shadow-lg rounded-md border-[1px] border-black/5 px-6 py-4 z-50 default-transition ${
                showCategorySearch
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
              ref={categorySearchRef}
            >
              <div className="h-[400px] overflow-y-scroll scrollbar-y-dir">
                <h3 className="text-dark/90 font-bold text-indigo text-lg mb-3">
                  Show Categories Photos
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories?.length > 0 ? (
                    categories?.map((category) => {
                      return (
                        <div
                          key={category?._id}
                          onClick={() => showSelectedCategory(category?._id)}
                          className="flex items-center gap-3 rounded px-2 py-1.5 default-transition group bg-white cursor-pointer opacity-90"
                        >
                          <div className="lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] rounded-full overflow-hidden border-[1px] border-white">
                            <img
                              src={category?.cover?.filePath}
                              alt={category?.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-indigo font-medium default-transition group-hover:opacity-80">
                            {category?.title}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div>Categories are not available.</div>
                  )}
                </div>
              </div>
            </div>
          </form>
          <div className="mt-4">
            <div className="flex gap-2 flex-wrap items-center">
              <div
                className="text-white cursor-pointer default-transition opacity-90"
                onClick={() => showSelectedCategory(null)}
              >
                All Photos
              </div>
              {categories?.length > 0 ? (
                categories?.map((category) => {
                  if (category?.subcategory === CATEGORY_GUEST) {
                    return (
                      <div
                        onClick={() => showSelectedCategory(category?._id)}
                        className="flex items-center gap-3 rounded px-2 py-1.5 default-transition group cursor-pointer opacity-90"
                        to={`/category/${category?._id}`}
                        key={category?._id}
                      >
                        <div className="lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] rounded-full overflow-hidden border-2 border-white group-hover:scale-110 default-transition">
                          <img
                            src={category?.cover?.filePath}
                            alt={category?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-white group-hover:text-white">
                          {category?.title}
                        </span>
                      </div>
                    );
                  }
                })
              ) : (
                <div>Categories are not available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {categorySingle === null ? (
        <div className="max-w-[1440px] mx-auto px-4">
          {filteredPosts?.length > 0 ? (
            <div className="mt-10 px-3">
              <h3 className=" text-dark text-2xl font-semibold">
                {searchQuery ? (
                  <span>Search results for &quot;{searchQuery}&quot;</span>
                ) : (
                  <div>
                    Get The Glimpse Of{" "}
                    <span className="font-bold text-[1.6rem] text-moonstone-gradient2">
                      {" "}
                      All Photos
                    </span>
                  </div>
                )}
              </h3>
            </div>
          ) : (
            <div className="mt-10 px-3">
              <h3 className=" text-dark text-2xl font-semibold mb-6">
                We couldn’t find anything for you.
              </h3>
              <div className="flex gap-4 flex-wrap">
                <Link
                  className="text-center px-4 h-[50px] min-w-[200px] items-center justify-center  font-medium text-lg border-dark border-[2px] bg-dark text-white default-transition shadow rounded inline-flex tracking-[0.5px]"
                  to="/"
                >
                  Go To Home Page
                </Link>
                <Link
                  className="text-center px-4 h-[50px] min-w-[200px] items-center justify-center  font-semibold text-lg border-dark border-[2px] bg-white text-dark default-transition shadow rounded inline-flex tracking-[0.5px]"
                  to="/search"
                >
                  Search Page
                </Link>
              </div>
            </div>
          )}
          {isLoading && <Loader />}
          <Masonary dataArr={filteredPosts} />
          {filteredPosts?.length === 0 && (
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-6 text-center"
            >
              No any images found!
            </Typography>
          )}
        </div>
      ) : (
        <div className="max-w-[1440px] mx-auto px-4">
          {categorySingle?.posts?.length > 0 ? (
            <div className="mt-10 px-3">
              <h3 className=" text-dark text-2xl font-semibold">
                <div>
                  Get The Glimpse Of{" "}
                  <span className="font-bold text-[1.6rem] text-moonstone">
                    {" "}
                    {categorySingle?.title}
                  </span>
                </div>
              </h3>
            </div>
          ) : (
            <div className="mt-10 px-3">
              <h3 className=" text-dark text-2xl font-semibold mb-6">
                We couldn’t find anything for you.
              </h3>
              <div className="flex gap-4 flex-wrap">
                <Link
                  className="text-center px-4 h-[50px] min-w-[200px] items-center justify-center  font-medium text-lg border-dark border-[2px] bg-dark text-white default-transition shadow rounded inline-flex tracking-[0.5px]"
                  to="/"
                >
                  Go To Home Page
                </Link>
                <Link
                  className="text-center px-4 h-[50px] min-w-[200px] items-center justify-center  font-semibold text-lg border-dark border-[2px] bg-white text-dark default-transition shadow rounded inline-flex tracking-[0.5px]"
                  to="/search"
                >
                  Search Page
                </Link>
              </div>
            </div>
          )}
          {isLoading && <Loader />}
          <Masonary dataArr={categorySingle?.posts} />
        </div>
      )}
    </>
  );
};
