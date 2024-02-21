import { Button, Input, Typography } from "@material-tailwind/react";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  changePriceConfig,
  getPriceConfig,
} from "../../redux/slices/priceSlice";
import { toast } from "react-toastify";

const PriceLimit = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [priceLimitValue, setPriceLimitValue] = useState("");

  const { isSuccess, priceLimit } = useSelector((state) => state.pricelimit);

  const create = async (e) => {
    e.preventDefault();
    if (/^[0-9]+$/.test(priceLimitValue)) {
      const requestData = { priceLimit: priceLimitValue };
      await dispatch(changePriceConfig(requestData));
      if (isSuccess) {
        navigate("/admin/pricelimit");
      }
      dispatch(getPriceConfig());
    } else {
      toast.error("Please enter valid price value.");
    }
  };

  useEffect(() => {
    dispatch(getPriceConfig());
  }, [dispatch]);

  return (
    <>
      <div className="bg-white shadow-lg rounded-md my-10 py-8 px-3 lg:px-6 font-inter">
        <div className="max-w-[380px]">
          <Typography className="font-medium text-dark-blue font-lg font-inter capitalize">
            Change Price:
          </Typography>
          <br />
          <form onSubmit={create}>
            <Input
              size="lg"
              type="text"
              label="Price Limit Value"
              name="assetLimit"
              value={priceLimitValue}
              onChange={(e) => setPriceLimitValue(e.target.value)}
            />
            <br />
            <Button type="submit" className="bg-moonstone w-full rounded">
              Submit
            </Button>
          </form>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <Typography variant="h1" className="text-2xl capitalize">
            Price limit :{" "}
          </Typography>
          <Typography variant="h1" className="text-5xl text-moonstone">
            Rs. {priceLimit?.priceLimit || 0}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default PriceLimit;
