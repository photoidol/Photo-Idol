import { Link } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { PiSmileySad } from "react-icons/pi";
import AuthFooter from "../../components/footer/AuthFooter";
import { staticImages } from "../../images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RESET, login, sendLoginCode } from "../../redux/slices/authSlice";
import SpinLoader from "../../components/common/SpinLoader";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

const initialSate = {
  password: "",
  email: "",
};

const SigninSchema = Yup.object().shape({
  email: Yup.string()
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

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, isSuccess, isError, isLoggedIn, twoFactor } = useSelector(
    (state) => state.auth
  );

  const loginUser = async (
    values,
    { resetForm, setFieldTouched, setSubmitting }
  ) => {
    try {
      const userData = values;
      setEmail(values.email);
      await dispatch(login(userData));
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
    setFieldTouched("email", false, false);
    setFieldTouched("password", false, false);
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/admin");
    }

    // login with otp
    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/login-with-otp/${email}`);
    }

    dispatch(RESET());
  }, [dispatch, isLoggedIn, isSuccess, navigate, isError, email, twoFactor]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <section className="login flex flex-col items-center justify-center">
        {/* <AuthHeader /> */}
        <div className="containers">
          <div className="grid md:grid-cols-2 grid-cols-1 items-stretch my-12 bg-blue-gradient rounded-2xl shadow-auth max-w-[400px] md:max-w-full mx-auto tilted-box">
            <div className="md:flex items-center justify-end relative hidden rounded-l-xl overflow-hidden">
              <img
                src={staticImages.login_img}
                alt="cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white relative flex flex-col justify-between px-4 py-8 sm:px-7 sm:py-10 md:rounded-l-none rounded-xl">
              <div>
                <h3 className="lg:text-2xl text-xl text-center font-semibold text-dark-moonstone mb-4">
                  Login
                </h3>
                <Formik
                  initialValues={initialSate}
                  validationSchema={SigninSchema}
                  onSubmit={loginUser}
                >
                  {({ errors, touched, dirty, isValid, resetForm }) => (
                    <Form className="flex flex-col md:gap-5 gap-3 my-5">
                      <div>
                        <div className="border-b-[1px] text-base flex items-stretch form-element">
                          <Field
                            name="email"
                            type="text"
                            placeholder="Email Address"
                            className="w-full md:h-[48px] h-[42px] text-dark-blue placeholder:text-dark-blue/70 outline-none opacity-90 text-sm sm:text-base"
                          />
                          <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue">
                            <FaEnvelope />
                          </span>
                        </div>
                        {errors.email && touched.email && (
                          <span className="form-error-msg">{errors.email}</span>
                        )}
                      </div>
                      <div>
                        <div className="border-b-[1px] text-base flex items-stretch form-element">
                          <Field
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full md:h-[48px] h-[42px] text-dark-blue placeholder:text-dark-blue/70 outline-none opacity-90 text-sm sm:text-base"
                          />
                          <span
                            className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <FaEye size={18} />
                            ) : (
                              <FaEyeSlash size={18} />
                            )}
                          </span>
                          <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue">
                            <FaKey />
                          </span>
                        </div>
                        {errors.password && touched.password && (
                          <span className="form-error-msg">
                            {errors.password}
                          </span>
                        )}
                      </div>
                      {isLoading && <SpinLoader />}
                      <button
                        type="submit"
                        className={`bg-blue-gradient text-white rounded  md:min-h-[52px] min-h-[48px] uppercase font-inter font-semibold tracking-[1px] shadow-button md:mt-3 mt-1 hover:scale-105 default-transition text-sm sm:text-base disabled:opacity-80 disabled:cursor-not-allowed`}
                        disabled={!(dirty && isValid)}
                      >
                        proceed to login
                      </button>

                      <button
                        className="uppercase font-semibold tracking-[2px]"
                        type="button"
                        onClick={() => {
                          resetForm({
                            values: {
                              email: "",
                              password: "",
                            },
                          });
                        }}
                      >
                        reset
                      </button>
                    </Form>
                  )}
                </Formik>
                <div className="text-center mt-3 flex items-center justify-center mb-6">
                  <PiSmileySad size={24} />
                  <Link
                    to="/forgetpassword"
                    className="text-dark font-semibold font-inter sm:text-base text-sm ms-2"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className="border-t-[1px] border-dark/10 pt-4">
                <p className="font-semibold text-lg text-blue-gradient text-center mt-auto">
                  <Link to="/" className="text-blue-gradient">
                    PhotoIdol Studio.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <AuthFooter />
      </section>
    </>
  );
};
