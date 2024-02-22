import PropTypes from "prop-types";
import { FaChevronLeft } from "react-icons/fa";

const CustomPrevArrow = ({ onClick }) => (
  <button className="custom-prev-arrow" onClick={onClick}>
    <FaChevronLeft />
  </button>
);

CustomPrevArrow.propTypes = {
  onClick: PropTypes.func,
};

export default CustomPrevArrow;
