import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { initiatePayment } from "../../redux/slices/EsewaSlice";

export const Esewa = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError } = useSelector((state) => state.esewa);

  const handleEsewaPayment = async () => {
    try {
      const response = await dispatch(initiatePayment());
      if (response && response.payload.formData) {
        esewaCall(response.payload.formData);
      } else {
        console.log("Failed to initiate payment");
      }
    } catch (error) {
      toast.error(error);
      console.error("Error during payment initiation:", error);
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
  return (
    <>
      <div>
        <button onClick={handleEsewaPayment} formTarget="_blank" className="bg-green-500 text-white px-5 py-2 text-sm rounded-md shadow-xl">
          E-sewa Pay
        </button>
      </div>
    </>
  );
};

/* import { REACT_APP_BACKEND_URL } from "../../utils/helper";

export const Esewa = () => {
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
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

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
  return (
    <>
      <div>
        <button onClick={handleEsewaPayment} className="bg-green-500 text-white px-8 py-3 text-lg rounded-md shadow-xl">
          E-sewa Pay
        </button>
      </div>
    </>
  );
};
 */
