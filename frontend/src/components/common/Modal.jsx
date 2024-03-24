import PropTypes from "prop-types";
import { setModalClose } from "../../redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getContactInfo } from "../../redux/slices/settings/SettingSlice";
import { getAllhomeSlider } from "../../redux/slices/settings/homeSliderSlice";
import { HOME_SETTING_OPT_TWO } from "../../utils/constants";
import { MdClose } from "react-icons/md";
import { scrollToTop } from "../../utils/scrollToTop";

const Modal = () => {
  const dispatch = useDispatch();
  const contactInfo = useSelector((state) => state.setting.contactinfo);
  const { contents } = useSelector((state) => state.homeSlider);
  const modal = contents?.filter(
    (content) => content.category === HOME_SETTING_OPT_TWO
  );

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      dispatch(setModalClose());
    }
  };

  useEffect(() => {
    if (!contactInfo) {
      dispatch(getContactInfo());
    }
    if (!modal) {
      dispatch(getAllhomeSlider());
    }
  }, [dispatch, contactInfo, modal]);

  return (
    <div
      className="fixed modal-overlay w-full h-full left-0 top-0 right-0 bottom-0 bg-black/80 z-50"
      onClick={handleOverlayClick}
    >
      <div className="preview-modal bg-white lg:max-w-[600px] max-w-[90vw] min-h-[400px] absolute top-1/2 -translate-y-1/2 left-1/2 h-auto max-h-[90vh] w-full -translate-x-1/2 z-50 rounded-lg overflow-x-hidden overflow-y-scroll scroll-y-dir flex flex-col items-center justify-center">
        <button
          type="button"
          className="absolute top-3 right-2 text-dark z-[100]"
          onClick={() => dispatch(setModalClose())}
        >
          <MdClose size={24} />
        </button>
        <div className="py-2 ps-2">
          <img
            src={modal && modal[0]?.cover?.filePath}
            className="relative rounded-md"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func,
};

export default Modal;
