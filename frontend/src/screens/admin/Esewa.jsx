import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { initiatePayment } from "../../redux/slices/EsewaSlice";

export const Esewa = () => {
  const dispatch = useDispatch();
  // const { isLoading, isSuccess, isError } = useSelector((state) => state.esewa);

  const handleEsewaPayment = async () => {
    try {
      const response = await dispatch(initiatePayment());
      if (response && response.payload.formData) {
        esewaCall(response.payload.formData);
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (error) {
      toast.error(error);
      toast.error(`Error during payment initiation: ${error}`);
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
        <button
          onClick={handleEsewaPayment}
          formTarget="_blank"
          className="bg-green-500 text-white px-5 py-2 text-sm rounded-md shadow-xl"
        >
          E-sewa Pay
        </button>
      </div>
    </>
  );
};
