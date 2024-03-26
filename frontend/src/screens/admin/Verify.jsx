import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { RESET, verifyUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { scrollToTop } from "../../utils/scrollToTop";
import { useEffect } from "react";

export const Verify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verificationToken } = useParams();
  const { isLoading, isSuccess } = useSelector((state) => state.auth);

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
    if (isSuccess) {
      navigate("/admin");
    }
  };

  useEffect(() => scrollToTop(), []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="mx-auto max-w-[480px] flex items-center justify-center text-center h-full flex-col gap-4 pt-8">
        <Typography variant="h2" className="mb-2 capitalize text-white">
          verify profile
        </Typography>
        <Typography className="font-medium text-white">
          Your profile verification is necessary for you to upload photos.
          Please click on the below link to complete verification.
        </Typography>
        <Button
          onClick={verifyAccount}
          className="font-medium rounded capitalize bg-blue-gradient text-base text-white tracking-[1px]"
        >
          Verify Now
        </Button>
      </div>
    </>
  );
};
