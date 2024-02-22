import PropTypes from "prop-types";
import { FaChevronRight } from "react-icons/fa";

const CustomNextArrow = ({ onClick }) => (
  <button className="custom-next-arrow" onClick={onClick}>
    <FaChevronRight />
  </button>
);

CustomNextArrow.propTypes = {
  onClick: PropTypes.func,
};

export default CustomNextArrow;
