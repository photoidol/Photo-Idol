import { AiOutlineStar } from "react-icons/ai";
import PropTypes from "prop-types";
import CustomNextArrow from "../common/arrow/CustomNextArrow";
import CustomPrevArrow from "../common/arrow/CustomPrevArrow";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { staticImages } from "../../images";
import { CardSlanted } from "../common/CardSlanted";
import ContactInfo from "../common/ContactInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getAllPost, selectAllPosts } from "../../redux/slices/postsSlice";
import Loader from "../common/Loader";
import { getallCategory } from "../../redux/slices/categorySlice";
import { Typography } from "@material-tailwind/react";
import { getFeaturesLists } from "../../redux/slices/settings/SettingSlice";
import { format } from "date-fns";
import {
  CATEGORY_ADMIN,
  HOME_SETTING_OPT_THREE,
  PHOTO_FEATURING_LIMIT,
} from "../../utils/constants";
import { getAllhomeSlider } from "../../redux/slices/settings/homeSliderSlice";
import Masonary from "../common/Masonary";
import { FaDollarSign } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { MdOutlineSecurity } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";

export const Explore = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const [adminCategories, setAdminCategories] = useState([]);
  const categories = useSelector(
    (state) => state.category.categorys?.categorys
  );

  const exploreGridOneCardClasses = [
    "xl:col-span-2 row-span-2 md:col-span-3 col-span-4 h-[500px]",
    "md:col-span-1 col-span-2 h-[240px]",
    "md:col-span-1 col-span-2 h-[240px]",
    "xl:col-span-1 col-span-2 h-[240px]",
    "xl:col-span-1 col-span-2 h-[240px]",
    "col-span-2 md:col-span-1 h-[240px]",
    "col-span-2 md:col-span-1 h-[240px]",
    "col-span-2 md:col-span-1 h-[240px]",
    "col-span-2 md:col-span-1 h-[240px]",
  ];

  useEffect(() => {
    if (categories?.length > 0) {
      setAdminCategories(
        categories?.filter(
          (category) => category?.subcategory === CATEGORY_ADMIN
        )
      );
    }
  }, [categories]);

  useEffect(() => {
    dispatch(getallCategory());
    dispatch(getAllPost());
  }, [dispatch]);

  return (
    <>
      <section className="lg:py-12 md:py-10 py-8" id="top-picks">
        <div className="containers">
          <div className="section-title" data-aos="fade-up">
            <h2 className="text-center font-bold text-dark">
              <span className="text-new-blue font-bold text-moonstone-gradient">
                Explore
              </span>{" "}
              our Studio&apos;s services archives
            </h2>
            <p className="text-center text-base text-indigo opacity-70">
              Featuring image bundles by category form our studio’s iconic photo
              archive.
            </p>
          </div>

          <div data-aos="fade-up">
            {categories?.length > 0 && adminCategories?.length > 0 ? (
              <div className="grid explore-grid-one grid-cols-4 grid-rows-3 xxl:gap-4 md:gap-2 gap-1 mt-8 md:mt-10 lg:mt-12">
                {adminCategories?.slice(0, 9)?.map((category, index) => {
                  return (
                    <Card
                      key={category?._id}
                      title={category?.title}
                      image={category?.cover?.filePath}
                      categoryId={category?._id}
                      gridClass={`${exploreGridOneCardClasses[index]}`}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-indigo text-center font-semibold text-lg my-4">
                No categories found!
              </p>
            )}
          </div>
        </div>
      </section>
      {/* <ExploreOne categories={categories} /> */}
      <ExploreOne posts={posts} />
      <Features />
      <ViewSlider />
      <ExploreTwo />
      <ContactInfo />
    </>
  );
};

export const ExploreOne = ({ posts }) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="py-8 md:py-10 lg:py-12" id="categories">
      <div className="containers pb-6">
        <div className="section-title text-center" data-aos="fade-up">
          <h2 className="font-bold text-dark">
            <span className="text-new-blue font-bold leading-loose text-moonstone-gradient">
              Colorful
            </span>
            &nbsp; photos of your pick
          </h2>
          <p className="text-base text-slategray opacity-70">
            Featuring the most exceptional photos with most popularity.
          </p>
        </div>

        {posts?.length > 0 ? (
          <div className="lg:mt-8 mt-6" data-aos="fade-up">
            <Slider
              nextArrow={<CustomNextArrow />}
              prevArrow={<CustomPrevArrow />}
              {...settings}
            >
              {posts?.slice(0, PHOTO_FEATURING_LIMIT)?.map((post) => {
                if (post?.assets && post?.assets?.filePath) {
                  return (
                    <CardSlanted
                      key={post?._id}
                      title={post?.title}
                      image={post?.assets?.filePath}
                      styles="rounded-xl"
                      postSlug={post?.slug}
                    />
                  );
                }
              })}
            </Slider>
          </div>
        ) : (
          <p className="text-gray font-semibold">No photos to show right now</p>
        )}
      </div>
    </section>
  );
};

ExploreOne.propTypes = {
  posts: PropTypes.any,
};

export const Features = () => {
  const dispatch = useDispatch();
  const { contents } = useSelector((state) => state.homeSlider);
  const filteredCreatives = useMemo(
    () =>
      contents?.filter(
        (content) => content.category === HOME_SETTING_OPT_THREE
      ),
    [contents]
  );

  useEffect(() => {
    dispatch(getAllhomeSlider());
  }, [dispatch]);

  const cardIcons = [
    <FaDollarSign size={30} key={"dollar-icon"} />,
    <CiStar size={30} key={"star-icon"} />,
    <MdOutlineSecurity size={30} key={"security-icon"} />,
    <IoCameraOutline size={30} key={"camera-icon"} />,
  ];

  return (
    <section
      className="lg:py-12 md:py-10 py-8"
      id="pricing"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${staticImages.blue_banner}") center/cover no-repeat fixed`,
      }}
    >
      <div className="containers">
        <div className="section-title text-center" data-aos="fade-up">
          <h2 className="font-bold text-white">
            Your one-stop &nbsp;
            <span className="text-new-blue font-bold text-moonstone-gradient">
              platform
            </span>
            &nbsp; for photographers and creative enthusiasts like you.
          </h2>
          <p className="text-base text-white opacity-90">
            We keep the perfect collection the photos that you upload.
          </p>
        </div>

        {filteredCreatives?.length > 0 && (
          <div
            className="grid lg:grid-cols-2 lg:gap-10 gap-6 pt-8 md:pt-10 lg:pt-14 pb-6"
            data-aos="fade-up"
          >
            {filteredCreatives.map((creative, index) => {
              return (
                <Card1
                  key={creative?._id}
                  icon={cardIcons[index]}
                  title={creative?.title}
                  desc={creative.description}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export const Card = ({ title, image, styles, show, gridClass, categoryId }) => {
  return (
    <Link
      to={`/category/${categoryId}`}
      className={`card shadow rounded overflow-hidden relative ${gridClass} overlay-black-gradient group block`}
    >
      <img
        src={image}
        alt="title"
        className={`w-full h-full object-cover block group-hover:scale-110 group-hover:rotate-6 default-transition`}
      />
      <h2 className="capitalize font-medium mt-5 text-white absolute bottom-0 text-sm lg:text-base lg:m-4 md:m-3 m-2.5 z-30 ">
        {title}
      </h2>
      {show && (
        <div
          className={`${styles} overlay absolute top-0 w-full bg-gray-400 rotate-6 -z-10`}
        ></div>
      )}
    </Link>
  );
};

Card.propTypes = {
  title: PropTypes.any,
  image: PropTypes.any,
  styles: PropTypes.any,
  show: PropTypes.any,
  gridClass: PropTypes.string,
  categoryId: PropTypes.any,
};

export const Card1 = ({ title, icon, desc }) => {
  return (
    <div
      className="box flex flex-col xs:flex-row lg:gap-7 md:gap-6 sm:gap-5 xs:gap-4 gap-3"
      data-aos="fade-up"
    >
      <div className="icon flex items-center justify-center text-white bg-moonstone-gradient2 default-shadow rounded-full w-[52px] h-[52px] min-w-[52px] lg:w-[68px] lg:min-w-[68px] lg:h-[68px]">
        {icon || <AiOutlineStar size={30} />}
      </div>
      <div className="details">
        <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 text-white drop-shadow-lg">
          {title}
        </h3>
        <p className="text-base text-slategray border-[1px] border-moonstone/20 bg-white/95 lg:py-5 lg:px-6 md:py-4 md:px-5 py-3 px-3 rounded-lg default-shadow hover:-mt-1 default-transition">
          {desc}{" "}
        </p>
      </div>
    </div>
  );
};

Card1.propTypes = {
  title: PropTypes.any,
  icon: PropTypes.any,
  desc: PropTypes.any,
};

export const ExploreTwo = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector((state) => state.posts.isLoading);

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  return (
    <>
      <section
        className="bg-gray-50 py-8 md:py-10 lg:py-12"
        id="recent-uploads"
      >
        <div className="containers">
          <div className="section-title" data-aos="fade-up">
            <h2 className="text-center text-dark font-bold mb-3">
              View
              <span className="font-bold text-moonstone-gradient px-2">
                Recent uploads
              </span>
              from our community
            </h2>
            <p className="text-center text-base text-slategray opacity-70">
              See the recent pictures that reflect the memories of our community
              users.
            </p>
          </div>
          {isLoading && <Loader />}
          <div>
            {posts?.length > 0 && (
              <div className="mt-4 masonry-wrapper">
                <Masonary dataArr={posts?.slice(0, 18)} />
              </div>
            )}

            {posts?.length === 0 && (
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-6 text-center"
              >
                No any images found!
              </Typography>
            )}
            {posts?.length > 0 && (
              <div className="flex items-center justify-center">
                <Link
                  className="text-center h-[52px] min-w-[180px] flex items-center justify-center font-semibold text-lg  bg-moonstone-gradient2 text-white default-transition shadow-lg rounded"
                  to="/search"
                >
                  Explore All
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export const PhotoCard = ({ image }) => {
  return (
    <div className="">
      <img src={image} alt="" />
    </div>
  );
};

PhotoCard.propTypes = {
  image: PropTypes.any,
};

export const ViewSlider = () => {
  const dispatch = useDispatch();
  const features = useSelector((state) => state.setting.features);
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  useEffect(() => {
    dispatch(getFeaturesLists());
  }, [dispatch]);

  return (
    <>
      {features && features[0]?.items?.length > 0 && (
        <section className="py-12 view-slider-sc px-4" id="best-picture">
          <div className="containers">
            <div className="border-3 overflow-hidden xl:h-[580px] lg:h-[540px] md:h-[480px] h-[400px] relative">
              <Slider
                nextArrow={<CustomNextArrow />}
                prevArrow={<CustomPrevArrow />}
                {...settings}
              >
                {features &&
                  features[0]?.items?.map((feature) => {
                    return (
                      <div
                        key={feature?._id}
                        className="xl:h-[580px] lg:h-[540px] md:h-[480px] h-[400px] overflow-hidden relative outline-none"
                      >
                        <img
                          src={feature?.assets?.filePath}
                          className="object-fit-cover"
                          alt=""
                        />
                        <div className="absolute top-5 lg:max-w-[360px] max-w-[260px] px-4 py-5 left-5 bg-white right-5 shadow-lg rounded">
                          <p className="text-sm opacity-60 text-slategray font-medium">
                            By{" "}
                            <span className="capitalize break-all">
                              {feature?.user?.name}
                            </span>{" "}
                            -{" "}
                            {feature?.createdAt &&
                              format(
                                new Date(feature?.createdAt),
                                "do MMMM, yyyy"
                              )}
                          </p>
                          <p className="mt-1 font-semibold text-indigo uppercase break-all">
                            {feature?.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
