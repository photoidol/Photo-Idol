import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";


const BackButton = ({ backLink }) => {
  return (
    <Link to={backLink} className="text-dark flex items-center gap-x-1 pt-6 pb-4 border-b-[1px] border-dark/10 hover:gap-x-2 hover:text-moonstone default-transition">
      <MdArrowBackIos size = {17} />
      <span className="font-semibold text-md uppercase">Go Back</span>
    </Link>
  );
};

export default BackButton;

BackButton.propTypes = {
  backLink: PropTypes.string,
};
