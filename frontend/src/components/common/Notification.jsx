import { Alert, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { RESET, sendVerificationEmail } from "../../redux/slices/authSlice";

export const Notification = () => {
  const dispatch = useDispatch();
  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  };
  return (
    <>
      <Alert
        variant="ghost"
        className="mb-8 bg-white flex items-center gap-3 justify-between flex-wrap py-2 rounded-md shadow-lg"
        action={
          <Button
            size="md"
            className="top-2 rounded-md right-3 bg-moonstone-gradient2"
            onClick={sendVerEmail}
          >
            Resend Link
          </Button>
        }
      >
        <span className="text-sm font-normal text-indigo">
          To verify your account, please{" "}
          <span className="font-semibold"> check your email </span>for a
          verification link.{" "}
          <span className="font-medium">
            If you haven&apos;t received yet, please click below.
          </span>
        </span>
      </Alert>
      <p className="text-white bg-moonstone p-3 rounded-md shadow-md">
        <span className="font-bold">Note: </span>If the message isn&apos;t
        in your spam folder. If you find it there, mark it as <b>&quot;Report not
        spam&quot;</b>, then double-check your inbox for verification.
      </p>
    </>
  );
};
