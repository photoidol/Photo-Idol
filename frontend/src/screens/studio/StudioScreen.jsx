import { useEffect } from "react";
import ContactInfo from "../../components/common/ContactInfo";
import { scrollToTop } from "../../utils/scrollToTop";
import { getallCategory } from "../../redux/slices/categorySlice";
import { getAllhomeSlider } from "../../redux/slices/settings/homeSliderSlice";
import {
  getAllAbout,
  getAllLocation,
  selectAllAbout,
  selectAllLocation,
} from "../../redux/slices/aboutSlice";
import { useDispatch, useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { CATEGORY_ADMIN } from "../../utils/constants";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link as ScrollLink, Events } from "react-scroll";
import { staticImages } from "../../images";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
const StudioScreen = () => {
  const dispatch = useDispatch();
  const allAbout = useSelector(selectAllAbout);
  const allLocation = useSelector(selectAllLocation);
  const services = useSelector((state) => state.category.categorys);

  useEffect(() => {
    dispatch(getAllAbout());
    dispatch(getAllLocation());
    dispatch(getAllhomeSlider());
    dispatch(getallCategory());
  }, [dispatch]);

  useEffect(() => {
    scrollToTop();
  }, []);

  // smooth scroll on link click
  useEffect(() => {
    Events.scrollEvent.register("begin", () => {});
    Events.scrollEvent.register("end", () => {});
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <>
      <section className="flex flex-col items-center pt-24 sm:pt-28 md:pt-32 lg:pt-36 bg-white">
        <StudioBlockOne />
      </section>
      <Studio allAbout={allAbout} />
      <Branches allLocation={allLocation} />
      <Services services={services?.categorys} />
      <ContactInfo />
    </>
  );
};

export default StudioScreen;

export const Studio = ({ allAbout }) => {
  return (
    <div className="py-8 md:py-10 lg:py-12 w-full">
      <div className="containers">
        <div className="text-center mb-6 md:mb-8 lg:mb-10" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
            Our Studio
          </h2>
        </div>
        <div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          data-aos="fade-up"
        >
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

export const StudioBlockOne = () => {
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
      <div className={`rounded-lg`}>
        <div
          className="pl-4 mb-4 lg:mb-6 border-l-4 border-moonstone"
          data-aos="fade-right"
        >
          <h1 className={`mt-2 text-2xl text-dark md:text-3xl font-bold `}>
            Foto Idol studio
          </h1>
        </div>
        <div data-aos="fade-right">
          <div
            className={`mb-4 text-sm lg:text-base text-justify leading-6 lg:leading-7 text-slategray font-normal`}
          >
            Foto Idol Studio blends creativity with quality. Beyond just online
            availability, immerse yourself in excellence at our physical studio.
            Explore a diverse range of photography and videography services,
            spanning studio shoots, weddings, maternity sessions, product
            photography, and more.
          </div>
          <div
            className={`mb-4 text-sm lg:text-base text-justify leading-6 lg:leading-7 text-slategray font-normal`}
          >
            Need captivating aerial views? Count on our drone video services.
            Our skilled team guarantees top-notch results with every project.
          </div>
          <div
            className={`mb-4 text-sm lg:text-base text-justify leading-6 lg:leading-7 text-slategray font-normal`}
          >
            With top-notch security, your photos and data are always safe.
          </div>
          <div
            className={`mb-6 text-sm lg:text-base text-justify leading-6 lg:leading-7 text-slategray font-normal`}
          >
            Contact us and visit for exceptional service and remarkable
            outcomes.
          </div>
          <ScrollLink
            className="text-center h-[44px] sm:h-[48px] lg:h-[52px] min-w-[120px] sm:min-w-[160px] lg:min-w-[180px] inline-flex items-center justify-center font-semibold text-base lg:text-lg  bg-moonstone-gradient2 text-white default-transition shadow-lg rounded cursor-pointer"
            to="contact"
            smooth={true}
            duration={400}
            offset={-90}
          >
            Contact Us
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export const Services = ({ services }) => {
  return (
    <div className="py-8 md:py-10 lg:py-12">
      <div className="containers">
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-dark sm:text-2xl lg:text-3xl">
            Our Studio Services
          </h2>
        </div>
        <div
          className="grid gap-x-6 md:grid-cols-2 xl:grid-cols-3"
          data-aos="fade-up"
        >
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
  );
};

Services.propTypes = {
  services: PropTypes.any,
};

export const Branches = ({ allLocation }) => {
  return (
    <div
      className="py-8 md:py-10 lg:py-12 w-full bg-seasalt border-y-[1px] border-blue-gray-50 min-h-[480px] flex items-center justify-center"
      style={{
        background: `url(${staticImages.nepal_map}) center/contain no-repeat`,
      }}
    >
      <div className="containers w-full sm:w-auto">
        <div className="text-center mb-6 md:mb-8 lg:mb-10" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
            All Branches
          </h2>
        </div>
        <div data-aos="fade-up">
          {allLocation?.total > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {allLocation?.data?.map((location) => {
                return (
                  <div
                    className="flex flex-col sm:flex-row rounded-lg px-3 py-4 gap-x-6 shadow-lg bg-white"
                    key={location?._id}
                  >
                    <div className="mb-3 sm:mb-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-blue-gradient text-white">
                        <FaMapMarkerAlt />
                      </div>
                    </div>
                    <div>
                      <h6 className="font-bold text-indigo text-base">
                        {location?.name}
                      </h6>
                      <div className="mt-2 text-sm lg:text-base">
                        <div className="text-slategray">
                          <p className="py-0.5 flex flex-wrap">
                            <span className="font-semibold">Email:</span>&nbsp;
                            <span>{location?.email}</span>
                          </p>
                          <p className="py-0.5 flex flex-wrap">
                            <span className="font-semibold">Address:</span>
                            &nbsp;
                            <span>{location?.address}</span>
                          </p>
                          <p className="pt-0.5 flex flex-wrap">
                            <span className="font-semibold">Phone no:</span>
                            &nbsp;
                            <span>{location?.phone}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-3xl font-bold">
                We are Opening Soon! <br />
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Branches.propTypes = {
  allLocation: PropTypes.any,
};
