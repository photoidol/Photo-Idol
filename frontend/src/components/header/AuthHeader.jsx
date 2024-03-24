import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { scrollToTop } from "../../utils/scrollToTop";
import { Link } from "react-router-dom";

const AuthHeader = () => {
  const [showHeaderTop, setShowHeaderTop] = useState(true);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const headerTopTimer = setTimeout(() => {
      setShowHeaderTop(false);
    }, 10000);
    return () => clearTimeout(headerTopTimer);
  }, []);

  return (
    <div>
      <div
        className={`bg-moonstone-gradient2 py-1.5 pe-8 ps-4 text-white text-center relative ${
          showHeaderTop ? "block" : "hidden"
        }`}
      >
        <FaTimes
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => setShowHeaderTop(false)}
        />
        <div className="flex items-center justify-center gap-2 flex-col lg:flex-row containers text-sm lg:text-base">
          <p className="">
            Enjoy a{" "}
            <span className="font-medium">
              10% discount on all our studio services
            </span>{" "}
            taking place at our
            <span className="font-medium px-1">photo studio.</span>
          </p>
          <Link
            to="/studio"
            className="px-4 lg:py-[6px] py-[4px] bg-white rounded-sm font-semibold text-slategray ms-4 text-sm border-[1px] border-white hover:bg-transparent hover:text-white default-transition"
          >
            Visit Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
