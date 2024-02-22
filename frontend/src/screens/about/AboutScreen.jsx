import { useDispatch, useSelector } from "react-redux";
import ContactInfo from "../../components/common/ContactInfo";
import { useEffect, useMemo } from "react";
import {
  getAllAbout,
  getAllLocation,
  selectAllAbout,
  selectAllLocation,
} from "../../redux/slices/aboutSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import { scrollToTop } from "../../utils/scrollToTop";
import { CATEGORY_ADMIN, HOME_SETTING_OPT_THREE } from "../../utils/constants";
import { getAllhomeSlider } from "../../redux/slices/settings/homeSliderSlice";
import { AiOutlineLike, AiOutlineSearch, AiOutlineStar } from "react-icons/ai";
import { BsArrowRepeat } from "react-icons/bs";
import { staticImages } from "../../images";
import { Card1 } from "../../components/hero/Explore";
import PropTypes from "prop-types";
import { getallCategory } from "../../redux/slices/categorySlice";

const cardIcons = [
  <AiOutlineStar size={30} key={"ai-star"} />,
  <AiOutlineLike size={30} key={"ai-like"} />,
  <AiOutlineSearch size={30} key={"ai-search"} />,
  <BsArrowRepeat size={30} key={"bs-arrow"} />,
];

const AboutScreen = () => {
  const dispatch = useDispatch();
  const allAbout = useSelector(selectAllAbout);
  const allLocation = useSelector(selectAllLocation);
  const { contents } = useSelector((state) => state.homeSlider);
  const services = useSelector((state) => state.category.categorys);
  const filteredCreatives = useMemo(
    () =>
      contents?.filter(
        (content) => content.category === HOME_SETTING_OPT_THREE
      ),
    [contents]
  );

  useEffect(() => {
    dispatch(getAllAbout());
    dispatch(getAllLocation());
    dispatch(getAllhomeSlider());
    dispatch(getallCategory());
  }, [dispatch]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <section className="flex flex-col items-center pt-36 bg-white">
        <AboutBlockOne />
        <Process />
      </section>
      <Pricing filteredCreatives={filteredCreatives} />
      <AboutBlockTwo allAbout={allAbout} />
      <Studio allAbout={allAbout} />
      <Branches allLocation={allLocation} />
      <Services services={services?.categorys} />
      <ContactInfo />
    </>
  );
};

export default AboutScreen;

export const Studio = ({ allAbout }) => {
  return (
    <div className="px-4 py-12 w-full">
      <div className="containers">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
            Our Studio
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allAbout?.about?.map((about) => {
            return (
              <div
                key={about?._id}
                className="h-[320px] overflow-hidden shadow-normal rounded-md"
              >
                <img
                  src={about?.cover?.filePath}
                  alt=""
                  className="w-full h-full object-cover object-top"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Studio.propTypes = {
  allAbout: PropTypes.any,
};

export const AboutBlockOne = () => {
  return (
    <div className="containers">
      <div className="grid gap-y-8">
        <div className={`grid md:grid-cols-2 gap-x-8 gap-y-12 min-h-[400px]`}>
          <div
            className={`h-full bg-dark rounded-lg overflow-hidden relative min-h-[320px] lg:min-h-[auto]`}
          >
            <img
              src={staticImages.banner1}
              alt="aboutimage"
              className="absolute z-10 rounded w-full h-full object-cover"
            />
          </div>
          <div className={`rounded-lg xxl:p-10 lg:p-8 p-6`}>
            <div className="pl-4 mb-6 border-l-4 border-moonstone ">
              <h1 className={`mt-2 text-2xl text-dark md:text-3xl font-bold `}>
                About our FotoIdol Site
              </h1>
            </div>
            <div
              className={`mb-6 text-base text-justify leading-7 text-slategray font-normal html-content`}
            >
              Foto Idol offers a non-stop destination to showcase your photos
              and protect your treasured photographic moments.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutBlockTwo = ({ allAbout }) => {
  return (
    <div className="py-12 bg-seasalt border-b-[1px] border-blue-gray-50">
      <div className="containers">
        <div className="grid gap-y-8">
          <div
            className={`grid md:grid-cols-2 gap-x-8 gap-y-12 min-h-[400px] items-center`}
          >
            <div className={`rounded-lg xxl:p-10 lg:p-8 p-6`}>
              <div className="pl-4 mb-6 border-l-4 border-moonstone ">
                <h1 className={`mt-2 text-2xl md:text-3xl font-bold text-dark`}>
                  About Founder
                </h1>
              </div>
              <div
                className={`mb-6 text-base text-justify leading-7 text-slategray html-content`}
              >
                Mr. David Paul Limbu, the visionary founder of our platform, is
                an avid photography enthusiast who has a deep passion for
                capturing life&apos;s moments through the lens. His dedication to
                photography has driven the creation of our innovative platform,
                aiming to unite people through the art of photography, allowing
                them to display their memory-capturing skills, with a core
                emphasis on preserving cherished moments. Foto Idol offers a
                one-stop destination to showcase your photos and protect your
                treasured photographic moments.
              </div>
            </div>
            <div
              className={`h-full bg-dark rounded-lg overflow-hidden relative min-h-[520px]`}
            >
              <img
                src={allAbout?.about && allAbout?.about[1]?.cover?.filePath}
                alt="aboutimage"
                className="absolute z-10 rounded object-top w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AboutBlockTwo.propTypes = {
  allAbout: PropTypes.any,
};

export const Process = () => {
  return (
    <div className="w-full px-4 my-12 py-12 bg-seasalt border-t-[1px] border-blue-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-dark sm:text-2xl lg:text-3xl">
          Process We Follow
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-normal font-normal text-slategray">
          We follow our process to get you started as quickly as possible
        </p>
      </div>
      <ul className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-10 lg:max-w-5xl lg:grid-cols-4">
        <li className="flex-start group relative flex lg:flex-col">
          <span
            className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-blue-gray-100 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
            aria-hidden="true"
          ></span>
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-moonstone-gradient2 text-white font-bold">
            1
          </div>
          <div className="ml-6 lg:ml-0 lg:mt-10">
            <h3 className="text-lg font-bold text-indigo before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
              Register
            </h3>
            <h4 className="mt-2 text-base text-slategray">
              First Register to get started.
            </h4>
          </div>
        </li>
        <li className="flex-start group relative flex lg:flex-col">
          <span
            className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-blue-gray-100 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
            aria-hidden="true"
          ></span>
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-moonstone-gradient2 text-white font-bold">
            2
          </div>
          <div className="ml-6 lg:ml-0 lg:mt-10">
            <h3 className="text-lg font-bold text-indigo before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
              Pay
            </h3>
            <h4 className="mt-2 text-base text-slategray">
              Pay to upload the photos.
            </h4>
          </div>
        </li>
        <li className="flex-start group relative flex lg:flex-col">
          <span
            className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-blue-gray-100 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
            aria-hidden="true"
          ></span>
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-moonstone-gradient2 text-white font-bold">
            3
          </div>
          <div className="ml-6 lg:ml-0 lg:mt-10">
            <h3 className="text-lg font-bold text-indigo before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
              Upload
            </h3>
            <h4 className="mt-2 text-base text-slategray">Upload your photos.</h4>
          </div>
        </li>
        <li className="flex-start group relative flex lg:flex-col">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-moonstone-gradient2 text-white font-bold">
            4
          </div>
          <div className="ml-6 lg:ml-0 lg:mt-10">
            <h3 className="text-lg font-bold text-indigo before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
              Get ....
            </h3>
            <h4 className="mt-2 text-base text-slategray">Some text here.</h4>
          </div>
        </li>
      </ul>
    </div>
  );
};

export const Branches = ({ allLocation }) => {
  return (
    <div className="px-4 py-12 w-full bg-seasalt border-y-[1px] border-blue-gray-50">
      <div className="containers">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
            All Branches
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allLocation?.data?.map((location) => {
            return (
              <div
                className="flex flex-col sm:flex-row rounded-lg px-3 py-4 gap-x-6 shadow-lg bg-white"
                key={location?._id}
              >
                <div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-blue-gradient text-white">
                    <FaMapMarkerAlt />
                  </div>
                </div>
                <div>
                  <h6 className="font-bold text-indigo text-base">
                    {location?.name}
                  </h6>
                  <div className="mt-3 text-base">
                    <div className="text-slategray">
                      <p className="py-0.5">
                        <span className="font-semibold">Email:</span>{" "}
                        {location?.email}
                      </p>
                      <p className="py-0.5">
                        <span className="font-semibold">Address:</span>{" "}
                        {location?.address}
                      </p>
                      <p className="pt-0.5">
                        <span className="font-semibold">Phone no:</span>{" "}
                        {location?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Branches.propTypes = {
  allLocation: PropTypes.any,
};

export const Pricing = ({ filteredCreatives }) => {
  return (
    <section
      className="py-8"
      id="pricing"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${staticImages.blue_banner}") center/cover no-repeat fixed`,
      }}
    >
      <div className="containers">
        <div className="section-title text-center">
          <h2 className=" font-bold text-white">
            Your one-stop{" "}
            <span className="text-new-blue font-semibold leading-loose text-moonstone">
              platform
            </span>{" "}
            for photographers and creative enthusiasts like you.
          </h2>
          <p className="text-base text-white opacity-90">
            We keep the perfect collection the photos that you upload.
          </p>
        </div>

        {filteredCreatives?.length > 0 && (
          <div className="grid lg:grid-cols-2 lg:gap-10 gap-6 pt-14 pb-6">
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

Pricing.propTypes = {
  filteredCreatives: PropTypes.any,
};

export const Services = ({ services }) => {
  return (
    <div className="py-12">
      <div className="containers">
        <div className="px-4 mx-auto w-full">
          <div className="containers">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-dark sm:text-2xl lg:text-3xl">
                Our Studio Services
              </h2>
            </div>
            <div className="grid gap-x-6 md:grid-cols-2 xl:grid-cols-3">
              {services?.map((service) => {
                if (service.subcategory === CATEGORY_ADMIN) {
                  return (
                    <div
                      key={service?._id}
                      className="grid grid-cols-[80px_auto] gap-4 rounded-md bg-white border-b-[1px] border-blue-gray-50 py-4"
                    >
                      <div className="w-[70px] h-[70px] rounded-md overflow-hidden">
                        <img
                          src={service?.cover?.filePath}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center py-2">
                        <p className="font-semibold text-base text-indigo">
                          {service?.title}
                        </p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Services.propTypes = {
  services: PropTypes.any,
};
