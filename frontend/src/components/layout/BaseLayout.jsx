import ScrollPopup from "../common/ScrollPopup";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import PropTypes from "prop-types";
import { Outlet, useLocation } from "react-router-dom";
import ScrollTopButton from "../common/ScrollTopButton";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsModalOpen } from "../../redux/slices/modalSlice";
import Modal from "../common/Modal";

export const BaseLayout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isModalOpen = useSelector(selectIsModalOpen);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen && location.pathname === "/") {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen, location.pathname]);

  return (
    <>
      <Header />
      <main
        className="overflow-hidden"
        style={{
          minHeight: "calc(100vh - 150px)",
        }}
      >
        <Outlet />
      </main>
      <Footer />
      {location.pathname === "/" && isModalOpen && <Modal />}
      {!isModalOpen && (
        <>
          <ScrollTopButton showScrollTop={showScrollTop} />
          <ScrollPopup />
        </>
      )}
    </>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.any,
};
