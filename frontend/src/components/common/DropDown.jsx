import { useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getallCategory } from "../../redux/slices/categorySlice";
import Loader from "./Loader";
import { CATEGORY_GUEST } from "../../utils/constants";

export const CategoryDropDown = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallCategory());
  }, [dispatch]);

  const storeData = useSelector((state) => state?.category);
  const { loading, categorys } = storeData;

  const allCateory = categorys?.categorys
    ?.filter((category) => category.subcategory === CATEGORY_GUEST)
    ?.map((category) => {
      return {
        label: category?.title,
        value: category?._id,
      };
    });

  const handleChange = (selectedOption) => {
    props.onChange(selectedOption);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Select
          onChange={handleChange}
          id="category"
          options={allCateory}
          className="capitalize"
          value={props.value}
          placeholder="Select Category"
        />
      )}
    </>
  );
};

CategoryDropDown.propTypes = {
  onChange: PropTypes.any,
  value: PropTypes.any,
};
