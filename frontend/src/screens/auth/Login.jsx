import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { PiSmileySad } from "react-icons/pi";
import AuthHeader from "../../components/header/AuthHeader";
import AuthFooter from "../../components/footer/AuthFooter";
import { staticImages } from "../../images";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login, sendLoginCode, RESET } from "../../redux/slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import SpinLoader from "../../components/common/SpinLoader";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .notOneOf(
      ["admin", "superadmin", "superuser", "root"],
      "Username is not allowed"
    )
    .email("Invalid email address")
    .trim()
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*#&])[A-Za-z\d@$!%^*#&]{8,}$/,
      "Password must meet criteria"
    )
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const { isSuccess, isError, isLoggedIn, twoFactor, isLoading } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const userData = values;
      setEmail(values.email);
      await dispatch(login(userData));
      if (isLoggedIn) {
        toast.success("Welcome back!");
      }
      resetForm();
    } catch (error) {
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }

    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/auth/login-with-otp/${email}`);
    }
    dispatch(RESET());
  }, [dispatch, isLoggedIn, isSuccess, navigate, isError, twoFactor, email]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <section
        className="login"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${staticImages.banner1}) center/cover no-repeat`,
        }}
      >
        <AuthHeader />
        <div className="containers w-full my-10">
          <div className="items-stretch bg-blue-gradient rounded-2xl shadow-auth overflow-hidden max-w-[520px] mx-auto">
            <div className="bg-white relative flex flex-col justify-between px-4 py-8 sm:px-7 sm:py-10">
              <div>
                <h3 className="lg:text-2xl text-xl text-center font-bold text-dark-moonstone mb-4">
                  Login
                </h3>
                <Formik
                  initialValues={initialValues}
                  validationSchema={SignupSchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form className="flex flex-col md:gap-4 gap-3 my-5">
                      <div className="border-b-[1px] border-blue-gray-50 text-base flex items-stretch form-element">
                        <Field
                          type="text"
                          placeholder="Email Address"
                          className="w-full md:h-[48px] h-[42px] text-slategray placeholder:text-slategray outline-none opacity-90 text-sm sm:text-base"
                          name="email"
                        />
                        <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-indigo">
                          <FaEnvelope />
                        </span>
                      </div>
                      <ErrorMessage
                        className="error-msg"
                        name="email"
                        component="div"
                      />
                      <div className="border-b-[1px] border-blue-gray-50 text-base flex items-stretch form-element">
                        <Field
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="w-full md:h-[48px] h-[42px] text-slategray placeholder:text-slategray outline-none opacity-90 text-sm sm:text-base"
                          name="password"
                        />
                        <span
                          className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-indigo"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                        <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-indigo">
                          <FaKey />
                        </span>
                      </div>
                      <ErrorMessage
                        className="error-msg"
                        name="password"
                        component="div"
                      />
                      {isLoading && <SpinLoader />}
                      <button
                        type="submit"
                        className="bg-moonstone-gradient2 text-white rounded  md:min-h-[52px] min-h-[48px] uppercase  font-semibold tracking-[1px] shadow-button md:mt-3 mt-1 hover:scale-105 default-transition text-sm sm:text-base"
                      >
                        proceed to login
                      </button>
                    </Form>
                  )}
                </Formik>

                <div className="text-center mt-10">
                  <p className="inline opacity-70 text-indigo font-medium sm:text-base text-sm">
                    Don’t you have an account?
                  </p>
                  <Link
                    to="/auth/register"
                    className="text-moonstone-gradient font-semibold mx-2 sm:text-base text-sm"
                  >
                    Sign up
                  </Link>
                </div>
                <div className="text-center mt-3 flex items-center justify-center mb-6">
                  <PiSmileySad className="text-indigo" size={24} />
                  <Link
                    to="/auth/forgot-password"
                    className="text-indigo font-semibold  sm:text-base text-sm ms-2"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className="border-t-[1px] border-blue-gray-50 pt-4">
                <p className="font-bold text-lg text-moonstone-gradient text-center mt-auto">
                  <Link to="/">FotoIdol.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <AuthFooter />
      </section>
    </>
  );
}

