import { useEffect, useRef } from "react";
import { staticImages } from "../../images";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
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
import { Option, Select, Typography } from "@material-tailwind/react";
import { CATEGORY_GUEST, LOAD_MORE_POST_COUNT } from "../../utils/constants";
import { MdArrowBackIos } from "react-icons/md";

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
  const navigate = useNavigate();
  const posts = useSelector(selectAllPosts);
  const categories = useSelector((state) => state.category.categorys.categorys);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategorySearch, setShowCategorySearch] = useState(false);
  const categorySearchRef = useRef(null);
  const categorySingle = useSelector((state) => state.category.category);
  const [sortValue, setSortValue] = useState("latest");
  const [sortedPosts, setSortedPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortedCategoryPosts, setSortedCategoryPosts] = useState([]);
  const [filteredCategoryPosts, setFilteredCategoryPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(LOAD_MORE_POST_COUNT);
  const [visibleCategoryPosts, setVisibleCategoryPosts] =
    useState(LOAD_MORE_POST_COUNT);

  const loadMorePosts = () => {
    setVisiblePosts(
      (prevVisiblePosts) => prevVisiblePosts + LOAD_MORE_POST_COUNT
    );
  };

  const loadMoreCategoryPosts = () => {
    setVisibleCategoryPosts(
      (prevVisibleCategoryPosts) =>
        prevVisibleCategoryPosts + LOAD_MORE_POST_COUNT
    );
  };

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getallCategory());
    dispatch(CATEGORY_SINGLE_RESET());
  }, [dispatch]);

  useEffect(() => {
    const filteredPosts = posts?.filter((post) => {
      const titleMatch = post?.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const usernameMatch = post?.user?.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return titleMatch || usernameMatch;
    });
    const filteredCategoryPosts = categorySingle?.posts?.filter((post) => {
      const titleMatch = post?.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const usernameMatch = post?.user?.name
        .toLowerCase()
        .includes(searchQuery.toLocaleLowerCase());
      return titleMatch || usernameMatch;
    });

    setFilteredPosts(filteredPosts || []);
    setFilteredCategoryPosts(filteredCategoryPosts || []);
  }, [posts, searchQuery, categorySingle?.posts]);

  useEffect(() => {
    const sortPosts = () => {
      let sorted;
      if (sortValue === "latest") {
        sorted = [...filteredPosts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (sortValue === "oldest") {
        sorted = [...filteredPosts].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      }
      setSortedPosts(sorted);
    };
    sortPosts();

    const sortCategoryPosts = () => {
      let sorted;
      if (sortValue === "latest") {
        sorted = [...filteredCategoryPosts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (sortValue === "oldest") {
        sorted = [...filteredCategoryPosts].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      }
      setSortedCategoryPosts(sorted);
    };
    sortCategoryPosts();
  }, [sortValue, filteredPosts, filteredCategoryPosts]);

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
    setShowCategorySearch(false);
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

  const handleSortChange = (value) => {
    setSortValue(value);
  };

  return (
    <>
      <div
        className="masonary-search flex justify-center items-center flex-col pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-16 lg:pb-20 border-t-2 border-white/30"
        style={{
          background: `linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%), url("${staticImages.hero}") center/cover no-repeat`,
        }}
      >
        <div className="containers flex-col" data-aos="fade-up">
          <h4 className="text-center md:text-lg sm:text-md text-sm max-w-[780px] mx-auto drop-shadow-lg  text-white">
            Explore our photo gallery, a visual journey through moments frozen
            in time.
          </h4>
          <div className="flex items-start mt-4 lg:flex-nowrap flex-wrap justify-center gap-3">
            <form
              className="flex justify-center items-center border-[1px] border-gray-300 text-indigo w-full max-w-[1000px] mx-auto px-3 sm:px-4 md:px-5 lg:px-6 lg:h-[56px] md:h-[52px] sm:h-[48px] h-[44px] shadow-md shadow-dark/5 rounded  placeholder:text-gray-300  bg-white relative"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="outline-none w-full placeholder:text-sm lg:placeholder:text-base text-indigo"
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
            <div className="w-48 flex items-center py-1 bg-white px-1 lg:h-[56px] md:h-[52px] sm:h-[48px] h-[44px] rounded-[4px] shadow-sm customized-select">
              <Select
                label="Select Version"
                className="border-0 w-full"
                value={sortValue}
                onChange={handleSortChange}
              >
                <Option value="latest">Latest</Option>
                <Option value="oldest">Oldest</Option>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex gap-1 lg:gap-2 flex-wrap items-center justify-center">
              <div
                className="text-white cursor-pointer default-transition opacity-90 lg:text-base text-sm"
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
                        className="flex items-center gap-2 lg:gap-3 rounded px-2 py-1 lg:py-1.5 default-transition group cursor-pointer opacity-90"
                        to={`/category/${category?._id}`}
                        key={category?._id}
                      >
                        <div className="lg:w-[40px] lg:h-[40px] md:w-[30px] md:h-[30px] w-[24px] h-[24px] rounded-full overflow-hidden border-2 border-white group-hover:scale-110 default-transition">
                          <img
                            src={category?.cover?.filePath}
                            alt={category?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-white group-hover:text-white lg:text-base text-sm">
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
            <div className="mt-6 md:mt-8 lg:mt-10">
              <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                <button
                  className="text-slategray flex items-center gap-x-1 pt-6 pb-4 hover:gap-x-2 hover:text-moonstone default-transition"
                  onClick={() => navigate(-1)}
                >
                  <MdArrowBackIos size={17} />
                  <span className="font-semibold text-sm lg:text-md uppercase">
                    Go Back
                  </span>
                </button>
              </div>
              <h3 className=" text-dark text-2xl font-semibold">
                {searchQuery ? (
                  <span>Search results for &quot;{searchQuery}&quot;</span>
                ) : (
                  <div className="text-lg md:text-xl lg:text-2xl flex flex-wrap items-center gap-x-4">
                    Get The Glimpse Of
                    <span className="font-bold text-lg md:text-xl lg:text-[28px] text-moonstone-gradient2">
                      All Photos
                    </span>
                  </div>
                )}
              </h3>
            </div>
          ) : (
            <div className="mt-6 md:mt-8 lg:mt-10">
              <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                <button
                  className="text-slategray flex items-center gap-x-1 pt-6 pb-4 hover:gap-x-2 hover:text-moonstone default-transition"
                  onClick={() => navigate(-1)}
                >
                  <MdArrowBackIos size={17} />
                  <span className="font-semibold text-sm lg:text-md uppercase">
                    Go Back
                  </span>
                </button>
              </div>
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
          {isLoading && <Loader />}
          <Masonary
            dataArr={sortedPosts.slice(0, visiblePosts)}
            dataLength={sortedPosts?.length}
          />
          {sortedPosts?.length > visiblePosts && (
            <div className="text-center mt-4 mb-10 flex items-center justify-center">
              <button
                type="button"
                className="text-center h-[44px] min-w-[160px] flex items-center justify-center font-semibold text-base  bg-moonstone-gradient2 text-white default-transition shadow-lg rounded"
                onClick={loadMorePosts}
              >
                Load More
              </button>
            </div>
          )}
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
            <div className="mt-6 md:mt-8 lg:mt-10">
              <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                <button
                  className="text-slategray flex items-center gap-x-1 pt-6 pb-4 hover:gap-x-2 hover:text-moonstone default-transition"
                  onClick={() => navigate(-1)}
                >
                  <MdArrowBackIos size={17} />
                  <span className="font-semibold text-sm lg:text-md uppercase">
                    Go Back
                  </span>
                </button>
              </div>

              <h3 className=" text-dark text-2xl font-semibold">
                <div className="text-lg md:text-xl lg:text-2xl flex flex-wrap items-center gap-x-4">
                  {searchQuery ? (
                    <span>Search results for &quot;{searchQuery}&quot;</span>
                  ) : (
                    <div className="text-lg md:text-xl lg:text-2xl flex flex-wrap items-center gap-x-4">
                      Get The Glimpse Of
                      <span className="font-bold text-lg md:text-xl lg:text-[28px] text-moonstone-gradient2">
                        {categorySingle?.title}
                      </span>
                    </div>
                  )}
                </div>
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
          {isLoading && <Loader />}
          <Masonary
            dataArr={sortedCategoryPosts.slice(0, visibleCategoryPosts)}
            dataLength={sortedCategoryPosts?.length}
          />
          {sortedCategoryPosts.length > visibleCategoryPosts && (
            <div className="text-center mt-4 mb-10 flex items-center justify-center">
              <button
                type="button"
                className="text-center h-[44px] min-w-[160px] flex items-center justify-center font-semibold text-base  bg-moonstone-gradient2 text-white default-transition shadow-lg rounded"
                onClick={loadMoreCategoryPosts}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
