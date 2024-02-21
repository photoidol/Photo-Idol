import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";

export const DateFormatter = ({ date }) => {
  // Parse the date string into a Date object
  const createdAt = parseISO(date);
  // Format the date to display only the date portion
  const formattedDate = format(createdAt, "yyyy-MM-dd");
  return <>{formattedDate}</>;
};

DateFormatter.propTypes = {
  date: PropTypes.any,
};
