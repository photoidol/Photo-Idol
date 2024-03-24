import { useDispatch, useSelector } from "react-redux";
import ContactInfo from "../../components/common/ContactInfo";
import { useEffect, useMemo } from "react";
import {
  getAllAbout,
  getAllLocation,
  selectAllAbout,
} from "../../redux/slices/aboutSlice";
import { scrollToTop } from "../../utils/scrollToTop";
import { HOME_SETTING_OPT_THREE } from "../../utils/constants";
import { getAllhomeSlider } from "../../redux/slices/settings/homeSliderSlice";
import { staticImages } from "../../images";
import { Card1 } from "../../components/hero/Explore";
import PropTypes from "prop-types";
import { getallCategory } from "../../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { MdOutlineSecurity } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";

const cardIcons = [
  <FaDollarSign size={30} key={"dollar-icon"} />,
  <CiStar size={30} key={"star-icon"} />,
  <MdOutlineSecurity size={30} key={"security-icon"} />,
  <IoCameraOutline size={30} key={"camera-icon"} />,
];

const AboutScreen = () => {
  const dispatch = useDispatch();
  const allAbout = useSelector(selectAllAbout);
  const { contents } = useSelector((state) => state.homeSlider);
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
      <section className="flex flex-col items-center pt-24 sm:pt-28 md:pt-32 lg:pt-36 bg-white">
        <AboutBlockOne />
        <Process />
      </section>
      <HowToPay />
      <Pricing filteredCreatives={filteredCreatives} />
      <AboutBlockTwo allAbout={allAbout} />
      <ContactInfo />
    </>
  );
};

export default AboutScreen;

export const AboutBlockOne = () => {
  const navigate = useNavigate();

  return (
    <div className="containers">
      <div>
        <button
          className="text-slategray flex items-center gap-x-1 pb-4 hover:gap-x-2 hover:text-moonstone default-transition"
          onClick={() => navigate(-1)}
        >
          <MdArrowBackIos size={17} />
          <span className="font-semibold text-sm lg:text-md uppercase">
            Go Back
          </span>
        </button>
      </div>
      <div className="grid gap-y-8">
        <div
          className={`grid md:grid-cols-2 gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-10 lg:gap-y-12 min-h-[400px]`}
        >
          <div className={`rounded-lg`}>
            <div
              className="pl-4 mb-4 lg:mb-6 border-l-4 border-moonstone"
              data-aos="fade-right"
            >
              <h1 className={`mt-2 text-2xl text-dark md:text-3xl font-bold `}>
                About our FotoIdol
              </h1>
            </div>
            <div data-aos="fade-right">
              <p
                className={`mb-2 lg:mb-4 text-sm lg:text-base text-justify leading-6 lg:leading-7 text-slategray font-normal`}
              >
                Foto Idol offers a non-stop destination to showcase your photos
                and protect your treasured photographic moments.
              </p>
              <p
                className={`mb-2 lg:mb-4 text-sm lg:text-base text-justify leading-6 lg:leading-7 text-slategray font-normal html-content`}
              >
                We&apos;re more than a platform; we&apos;re a vibrant community
                united by our love for visual storytelling.
              </p>
              <p
                className={`mb-2 lg:mb-4 text-sm lg:text-base text-justify leading-6 lg:leading-7 text-slategray font-normal html-content`}
              >
                With top-notch security, your photos and data are always safe.
              </p>
              <p
                className={`mb-2 lg:mb-6 text-sm lg:text-base text-justify leading-6 lg:leading-7 text-slategray font-normal html-content`}
              >
                Join us and share, protect, and cherish your photographic
                treasures. Together, let&apos;s preserve every moment in pixels
              </p>
            </div>
          </div>
          <div
            className={`h-full rounded-lg overflow-hidden relative min-h-[320px] lg:min-h-[auto]`}
            data-aos="fade-left"
          >
            <img
              src={staticImages.site_logo}
              alt="aboutimage"
              className="absolute z-10 rounded w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutBlockTwo = ({ allAbout }) => {
  return (
    <div className="py-8 md:py-10 lg:py-12 bg-seasalt border-b-[1px] border-blue-gray-50">
      <div className="containers">
        <div className="grid gap-y-8">
          {/* <div
            className={`grid md:grid-cols-[auto_480px] gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-10 lg:gap-y-12 min-h-[380px] items-center`}
          >
            <div className={`rounded-lg`}>
              <div
                className="pl-4 mb-4 lg:mb-6 border-l-4 border-moonstone"
                data-aos="fade-right"
              >
                <h1 className={`mt-2 text-2xl md:text-3xl font-bold text-dark`}>
                  About Founder
                </h1>
              </div>
              <div
                data-aos="fade-right"
                className={`mb-2 md:mb-4 lg:mb-6 text-sm lg:text-base text-justify leading-6 lg:leading-7 text-slategray`}
              >
                Mr. David Paul Limbu, the visionary founder of our platform, is
                an avid photography enthusiast who has a deep passion for
                capturing life&apos;s moments through the lens. His dedication
                to photography has driven the creation of our innovative
                platform, aiming to unite people through the art of photography,
                allowing them to display their memory-capturing skills, with a
                core emphasis on preserving cherished moments. Foto Idol offers
                a one-stop destination to showcase your photos and protect your
                treasured photographic moments.
              </div>
            </div>
            <div
              data-aos="fade-left"
              className={`h-full bg-dark rounded-lg overflow-hidden relative min-h-[360px]`}
            >
              <img
                src={allAbout?.about && allAbout?.about[1]?.cover?.filePath}
                alt="aboutimage"
                className="absolute z-10 rounded object-top w-full h-full object-cover"
              />
            </div>
          </div> */}
          <div
            className={`grid gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-10 lg:gap-y-12 min-h-[380px] items-center`}
          >
            <div className={`rounded-lg`}>
              <div
                className="pl-4 mb-4 lg:mb-6 border-l-4 border-moonstone"
                data-aos="fade-right"
              >
                <h1 className={`mt-2 text-2xl md:text-3xl font-bold text-dark`}>
                  About Founder
                </h1>
              </div>
              <div
                data-aos="fade-right"
                className={`mb-2 md:mb-4 lg:mb-6 text-sm lg:text-base text-justify leading-6 lg:leading-7 text-slategray`}
              >
                Mr. David Paul Limbu, the visionary founder of our platform, is
                an avid photography enthusiast who has a deep passion for
                capturing life&apos;s moments through the lens. His dedication
                to photography has driven the creation of our innovative
                platform, aiming to unite people through the art of photography,
                allowing them to display their memory-capturing skills, with a
                core emphasis on preserving cherished moments. Foto Idol offers
                a one-stop destination to showcase your photos and protect your
                treasured photographic moments.
              </div>
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
    <div className="w-full mt-8 md:mt-10 lg:mt-12 py-8 md:py-10 lg:py-12 bg-seasalt border-t-[1px] border-blue-gray-50">
      <div className="containers">
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-dark sm:text-2xl lg:text-3xl">
            Process We Follow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-normal font-normal text-slategray">
            We follow our process to get you started as quickly as possible
          </p>
        </div>
        <ul
          className="mx-auto mt-8 grid grid-cols-1 gap-10 md:grid-cols-4"
          data-aos="fade-up"
        >
          <li className="flex-start group relative flex lg:flex-col">
            <span
              className="md:hidden lg:block absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-blue-gray-100 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
              aria-hidden="true"
            ></span>
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-moonstone-gradient2 text-white font-bold">
              1
            </div>
            <div className="ml-4 lg:ml-0 -mt-2 lg:mt-4">
              <h3 className="text-base lg:text-lg font-bold text-indigo before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                Register
              </h3>
              <h4 className="mt-1 lg:mt-2 text-sm lg:text-base text-slategray">
                First Register to get started.
              </h4>
            </div>
          </li>
          <li className="flex-start group relative flex lg:flex-col">
            <span
              className="md:hidden lg:block absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-blue-gray-100 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
              aria-hidden="true"
            ></span>
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-moonstone-gradient2 text-white font-bold">
              2
            </div>
            <div className="ml-4 lg:ml-0 -mt-2 lg:mt-4">
              <h3 className="text-base lg:text-lg font-bold text-indigo before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                Pay
              </h3>
              <h4 className="mt-1 lg:mt-2 text-sm lg:text-base text-slategray">
                Pay to upload the photos.
              </h4>
            </div>
          </li>
          <li className="flex-start group relative flex lg:flex-col">
            <span
              className="md:hidden lg:block absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-blue-gray-100 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
              aria-hidden="true"
            ></span>
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-moonstone-gradient2 text-white font-bold">
              3
            </div>
            <div className="ml-4 lg:ml-0 -mt-2 lg:mt-4">
              <h3 className="text-base lg:text-lg font-bold text-indigo before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                Upload
              </h3>
              <h4 className="mt-1 lg:mt-2 text-sm lg:text-base text-slategray">
                Upload your photos.
              </h4>
            </div>
          </li>
          <li className="flex-start group relative flex lg:flex-col">
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-moonstone-gradient2 text-white font-bold">
              4
            </div>
            <div className="ml-4 lg:ml-0 -mt-2 lg:mt-4">
              <h3 className="text-base lg:text-lg font-bold text-indigo before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                Showcase
              </h3>
              <h4 className="mt-1 lg:mt-2 text-sm lg:text-base text-slategray">
                Win a monthly fotoidol contest
              </h4>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const HowToPay = () => {
  return (
    <div className="py-8 md:py-12 lg:py-16 w-full">
      <div className="containers">
        <div>
          <div data-aos="fade-up">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-dark sm:text-2xl lg:text-3xl mb-4 lg:mb-6">
                How to Pay?
              </h2>
            </div>
            <p className="mt-4 mb-6 text-normal text-center font-normal text-slategray">
              At Foto Idol, we make payment convenient and hassle-free. Choose
              the option that suits you best:
            </p>
          </div>

          <div className="flex flex-wrap gap-8 justify-center mt-6 md:mt-8 lg:mt-10">
            <div
              data-aos="fade-right"
              className="group relative cursor-pointer overflow-hidden bg-white px-3 lg:px-5 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-2xl sm:rounded-lg"
            >
              <span className="absolute top-4 z-0 h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-moonstone transition-all duration-300 group-hover:scale-[20]"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-12 w-12 lg:h-16 lg:w-16 place-items-center rounded-full  bg-moonstone transition-all duration-300 group-hover:border-2 border-white p-3">
                  <img src={staticImages.national} alt="" />
                </span>
                <div className="space-y-2 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <h4 className="font-bold text-base lg:text-lg text-moonstone group-hover:text-white">
                    For Users in Nepal:
                  </h4>
                  <p className="text-sm lg:text-base leading-6 lg:leading-7">
                    Pay effortlessly through eSewa, Nepal&apos;s leading digital
                    wallet. Enjoy quick and secure transactions with just a few
                    clicks.
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="group relative cursor-pointer overflow-hidden bg-white px-3 lg:px-5 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-2xl sm:rounded-lg"
            >
              <span className="absolute top-4 z-0 h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-moonstone transition-all duration-300 group-hover:scale-[20]"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-12 w-12 lg:h-16 lg:w-16 place-items-center rounded-full  bg-moonstone transition-all duration-300 group-hover:border-2 border-white p-3">
                  <img src={staticImages.international} alt="" />
                </span>
                <div className="space-y-2 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <h4 className="font-bold text-base lg:text-lg text-moonstone group-hover:text-white">
                    For International Users:
                  </h4>
                  <p className="text-sm lg:text-base leading-6 lg:leading-7">
                    Transfer funds securely using our provided Swift Code. From
                    Asia to Europe and beyond, paying with Foto Idol is easy and
                    reliable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="mx-auto max-w-7xl">
              <div
                className="rounded-lg bg-moonstone-gradient2 p-1.5 shadow-lg"
                data-aos="fade-up"
              >
                <div className="flex flex-wrap items-center justify-center px-1 lg:px-3 text-center py-1.5">
                  <p className="font-medium text-white text-center text-sm lg:text-base">
                    Join us today and begin your journey of sharing, protecting,
                    and celebrating your photographic treasures with Foto Idol!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Pricing = ({ filteredCreatives }) => {
  return (
    <section
      className="py-8 md:py-10 lg:py-12"
      id="pricing"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${staticImages.blue_banner}") center/cover no-repeat fixed`,
      }}
    >
      <div className="containers">
        <div className="section-title text-center" data-aos="fade-up">
          <h2 className=" font-bold text-white">
            Your one-stop&nbsp;
            <span className="text-new-blue font-semibold leading-loose text-moonstone">
              platform
            </span>
            &nbsp; for photographers and creative enthusiasts like you.
          </h2>
          <p className="text-base text-white opacity-90">
            We keep the perfect collection the photos that you upload.
          </p>
        </div>

        {filteredCreatives?.length > 0 && (
          <div className="grid lg:grid-cols-2 lg:gap-10 gap-6 pt-8 sm:pt-19 md:pt-12 lg:pt-14 pb-6">
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
