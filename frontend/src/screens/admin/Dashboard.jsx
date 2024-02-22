import { Card, Typography } from "@material-tailwind/react";
import { Overview } from "../../components/common/Overview";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { REACT_APP_BACKEND_URL } from "../../utils/helper";
import { staticImages } from "../../images";
import { useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";

export const Dashboard = () => {
  useRedirectLoggedOutUser("/auth/login");
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleEsewaPayment = async () => {
    const url = `${REACT_APP_BACKEND_URL}/payment/initiate-payment`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        esewaCall(responseData.formData);
      } else {
        console.log("Failed to fetch", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Error during fetch", error);
    }
  };

  const esewaCall = (formData) => {
    var path = "https://epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dataParam = queryParams.get("data");

    if (dataParam) {
      navigate(`/admin/pay-status/${dataParam}`);
    }
  }, [navigate]);

  return (
    <>
      <div className="flex flex-col py-5">
        {user && !user?.isVerified ? (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6 px-4 py-5 mb-4 text-sm text-blue-gray-500 rounded-lg shadow-xl bg-white" role="alert">
            <div>
              <img className="max-w-[200px] w-full animate-scale" src={staticImages.mailbox} alt="" />
            </div>
            <div>
              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-lg">
                    <span className="flex items-center text-indigo">
                      <FaInfoCircle />
                    </span>
                    <span className="font-semibold text-indigo">Your account is not verified!</span>
                  </div>
                  <div className="mt-2 text-slategray text-sm">
                    Please
                    <span className="font-semibold mx-1">check your email inbox</span> for account verfication link or
                    <Link to="/admin/account" className="underline font-medium px-1 uppercase">
                      Click Here
                    </Link>
                    to get link for verification if you haven&apos;t recevied yet.
                  </div>
                </div>
              </div>
              <p className=" mt-3 border-[1px] border-moonstone/80 rounded-sm px-2.5 py-1 text-moonstone inline-block">
                <span className="font-semibold">NOTE :</span> Account verification & Payment is required for uploading photos.
              </p>
            </div>
          </div>
        ) : !user?.paid ? (
          <div className="flex flex-col px-5 py-7 mb-4 text-sm bg-white shadow-xl rounded-md" role="alert">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-y-3 gap-x-4">
                <div className="text-lg">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center text-indigo">
                      <FaInfoCircle />
                    </span>
                    <span className="font-semibold title-theme">Please make payment before you upload photos!</span>
                  </div>
                  <p className="text-slategray text-sm mt-3 grid gap-y-1">
                    <span className="block">
                      1. You can make payment through <span className="font-bold text-indigo">Esewa</span> merchant.
                    </span>
                    <span className="block">2. Once your payment is successful, you can upload upto 3 images.</span>
                  </p>
                </div>
              </div>
              <button onClick={handleEsewaPayment} className="bg-green-500 text-white px-4 py-2.5 text-lg rounded-md shadow-lg inline-flex items-center gap-x-3 animate-scale">
                <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
                  <img className="" src={staticImages.esewa} alt="" />
                </div>
                <span className="font-semibold text-base">E-sewa Pay</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col px-3 py-2.5 mb-4 text-sm text-blue-gray-500 rounded-lg bg-white shadow-xl" role="alert">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className=" text-base flex flex-wrap items-center">
                <span className="flex items-center mt-[3px]">
                  <svg className="flex-shrink-0 inline w-4 h-4 mr-3 mb-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                </span>
                <span className="font-semibold">Your payment has already been done! You are good to go.</span>
                <br />
              </div>
            </div>
          </div>
        )}
        <DashboardContent />
        <Overview />
      </div>
    </>
  );
};

export const DashboardContent = () => {
  return (
    <>
      <section className="mt-4">
        <Card>
          <div
            className="py-10 px-5 overflow-hidden rounded-lg min-h-[240px]"
            style={{
              background: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(${staticImages.intro_hero}) center/cover no-repeat`,
            }}
          >
            <Typography variant="h4" className="text capitalize font-semibold text-white">
              We’ve been waiting for you!
            </Typography>
            <Typography variant="h6" className="capitalize font-semibold text-gray- my-3 text-gray-200">
              Welcome to the FotoIdol User Panel!
            </Typography>
          </div>
        </Card>
      </section>
    </>
  );
};
