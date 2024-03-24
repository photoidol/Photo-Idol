import { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { staticImages } from "../../images";
import { FaCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { scrollToTop } from "../../utils/scrollToTop";

const PaymentStatus = () => {
  const { queryString } = useParams();
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    try {
      const decodedData = JSON.parse(atob(queryString));
      setPaymentData(decodedData);
    } catch (error) {
      console.error("Error decoding or parsing the data:", error);
    }
  }, [queryString]);

  useEffect(() => scrollToTop(), []);

  return (
    <div className="py-10">
      <div className="bg-white rounded-md shadow-xl max-w-[700px] mx-auto overflow-hidden">
        <div className="bg-white px-6 pt-6 pb-3 md:mx-auto flex flex-col items-center justify-center">
          <div className="text-center">
            {paymentData.status === "COMPLETE" ? (
              <div className="flex flex-col items-center justify-center">
                <FaCircleCheck className="text-green-600 mb-4 mt-3" size={50} />
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Payment Done!
                </h3>
                <p className="mt-2 flex flex-wrap items-center gap-2 justify-center">
                  <span className="font-semibold">Total Amount Paid:</span>
                  <span className="text-green-400 font-semibold text-xl">
                    {paymentData.total_amount}
                  </span>
                </p>
                <p className="text-blue-gray-400 my-2 max-w-[500px] mx-auto">
                  Thank you for completing your secure online payment. Now you
                  can upload photos by clicking the &apos;UPLOAD&apos; button or
                  image.
                </p>
                <div className="flex items-center justify-center mt-5 mb-2">
                  <Link
                    to="/admin/upload"
                    className="border-[1px] border-pink bg-pink md:px-5 px-3 py-1.5 rounded-[4px] inline-flex items-center gap-2 text-white shadow hover:shadow-lg default-transition min-w-[160px]"
                  >
                    <AiOutlineCloudUpload size={18} />
                    <span className=" font-semibold">Upload Photo</span>
                  </Link>
                </div>
                <Link to="/admin/upload">
                  <img
                    className="max-w-[200px] w-full mx-auto"
                    src={staticImages.upload1}
                    alt=""
                  />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <MdError className="text-red-600 mb-4 mt-3" size={50} />
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Payment Status: {paymentData.status}
                </h3>
                <p className="text-blue-gray-400 my-2 max-w-[500px] mx-auto">
                  There seems to be an issue or problem with the payment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
