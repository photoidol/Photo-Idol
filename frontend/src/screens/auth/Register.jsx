import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import AuthFooter from "../../components/footer/AuthFooter";
import { staticImages } from "../../images";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCheckAll } from "react-icons/bs";
import { RESET, register, sendVerificationEmail } from "../../redux/slices/authSlice";
import CountrySelect from "../../components/common/CountrySelect";
import AuthHeader from "../../components/header/AuthHeader";
import SpinLoader from "../../components/common/SpinLoader";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .notOneOf(["admin", "superadmin", "superuser", "root"], "Username is not allowed")
    .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "Invalid username format")
    .matches(/^[^\d!@#$%^&*(),.?":{}|<>]*$/, {
      excludeEmptyString: true,
      message: "Username cannot contain digits or special characters",
    })
    .trim()
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(/@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com)$/, "Invalid email domain"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/([a-z].*[A-Z])|([A-Z].*[a-z])/, "Password must contain both uppercase and lowercase letters")
    .matches(/([0-9])/, "Password must contain at least one number")
    .matches(/([!,%,&,@,#,$,^,*,?,_,~])/, "Password must contain at least one special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isLoggedIn, isLoading } = useSelector((state) => state.auth);
  // for validation checklist
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [countryData, setCountryData] = useState({
    name: "",
    flag: "",
  });
  const [passwordValue, setPasswordValue] = useState("");

  const wrongIcon = <BsCheckAll size={18} />;
  const checkIcon = <BsCheckAll size={18} className="text-green-500" />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return wrongIcon;
  };

  const handlePasswordKeyPress = (e) => {
    setPasswordValue(e.target.value);
  };

  useEffect(() => {
    //check lowercase and uppercase
    if (passwordValue.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }
    //check for number
    if (passwordValue.match(/([0-9])/)) {
      setNumber(true);
    } else {
      setNumber(false);
    }
    // Check for special character
    if (passwordValue.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSpecialChar(true);
    } else {
      setSpecialChar(false);
    }
    // Check for PASSWORD LENGTH
    if (passwordValue.length >= 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
  }, [passwordValue]);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const userData = values;
      if (countryData.name) {
        userData.country = countryData.name;
        if (agreeTerms) {
          const registerResult = await dispatch(register(userData));
          if (register.fulfilled.match(registerResult)) {
            await dispatch(sendVerificationEmail());
          }
          resetForm();
          setAgreeTerms(false);
          setCountryData((prevData) => {
            return {
              ...prevData,
              name: "",
              country: "",
            };
          });
        } else {
          toast.error("Please agree to terms & conditions");
        }
      } else {
        toast.error("Please select a country.");
      }
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
    dispatch(RESET());
  }, [dispatch, isLoggedIn, isSuccess, navigate]);

  const getSelectedCountry = (name, flag) => {
    setCountryData((prevData) => {
      return {
        ...prevData,
        name: name,
        flag: flag,
      };
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleAgreement = () => {
    setAgreeTerms((prevValue) => !prevValue);
  };

  return (
    <section
      className="register"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${staticImages.banner2}) center/cover no-repeat`,
      }}
    >
      <AuthHeader />
      <div className="containers my-10 w-full">
        <div className="items-stretch rounded-2xl shadow-auth overflow-hidden border-[1px] border-white/10 max-w-[520px] mx-auto">
          <div className="relative flex flex-col justify-between px-4 py-8 sm:px-7 sm:py-10 bg-white">
            <div>
              <h3 className="lg:text-2xl text-xl text-center font-bold text-dark-moonstone mb-4">Register Here!</h3>
              <Formik initialValues={initialValues} validationSchema={RegistrationSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                  <Form className="flex flex-col gap-2 mb-5 mt-2">
                    <div className="border-b-[1px] border-blue-gray-50 text-base flex items-stretch form-element mb-3">
                      <Field
                        type="text"
                        placeholder="Username"
                        className="w-full md:h-[48px] h-[42px] text-slategray placeholder:text-slategray opacity-90 outline-none text-sm sm:text-base"
                        name="name"
                      />
                      <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue">
                        <FaUserAlt />
                      </span>
                    </div>
                    <ErrorMessage className="error-msg" name="name" component="div" />
                    <div className="border-b-[1px] border-blue-gray-50 text-base flex items-stretch form-element mb-3">
                      <Field
                        type="text"
                        placeholder="Email Address"
                        className="w-full md:h-[48px] h-[42px] text-slategray placeholder:text-slategray opacity-90 outline-none text-sm sm:text-base"
                        name="email"
                      />
                      <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue">
                        <FaEnvelope />
                      </span>
                    </div>
                    <ErrorMessage className="error-msg" name="email" component="div" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3 lg:gap-y-0">
                      <div>
                        <div className="border-b-[1px] border-blue-gray-50 text-base flex items-stretch form-element mb-3">
                          <Field
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full md:h-[48px] h-[42px] text-slategray placeholder:text-slategray opacity-90 outline-none text-sm sm:text-base"
                            name="password"
                            onKeyUp={(e) => {
                              handlePasswordKeyPress(e);
                            }}
                          />
                          <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-indigo" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </span>
                        </div>
                        <ErrorMessage className="error-msg" name="password" component="div" />
                      </div>
                      <div>
                        <div className="border-b-[1px] border-blue-gray-50 text-base flex items-stretch form-element mb-3">
                          <Field
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full md:h-[48px] h-[42px] text-slategray placeholder:text-slategray opacity-90 outline-none text-sm sm:text-base"
                            name="confirmPassword"
                            onPaste={(e) => {
                              e.preventDefault();
                              toast.error("Cannot paste into input field");
                              return false;
                            }}
                          />
                          <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-indigo cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                          </span>
                        </div>
                        <ErrorMessage className="error-msg" name="confirmPassword" component="div" />
                      </div>
                    </div>
                    <ul className="box border border-blue-gray-100 p-3 rounded-lg  grid grid-cols-2 gap-x-2">
                      <li className={`text-[13px] ${upperCase ? "text-green-500" : "text-slategray"} flex items-center gap-2`}>
                        {switchIcon(upperCase)}
                        Lowercase & Uppercase
                      </li>
                      <li className={`text-[13px] ${number ? "text-green-500" : "text-slategray"} flex items-center gap-2`}>
                        {switchIcon(number)}
                        Number (0-9)
                      </li>
                      <li className={`text-[13px] ${specialChar ? "text-green-500" : "text-slategray"} flex items-center gap-2`}>
                        {switchIcon(specialChar)}
                        Special Character (!@#$%^&*)
                      </li>
                      <li className={`text-[13px] ${passwordLength ? "text-green-500" : "text-slategray"} flex items-center gap-2`}>
                        {switchIcon(passwordLength)}
                        At least 8 Characters
                      </li>
                    </ul>

                    <div className="mt-3">
                      <div className="text-base flex items-stretch form-element">
                        <CountrySelect countryData={countryData} getSelectedCountry={getSelectedCountry} />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 agree-checkbox">
                      <div className="h-[18px] w-[19px] border-[1px] border-moonstone relative cursor-pointer" onClick={handleAgreement}>
                        {agreeTerms ? <FaCheck size={13} className="absolute ps-[1px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 check-icon text-moonstone" /> : ""}
                      </div>
                      <span className="text-slategray font-medium">I agree to the terms & conditions.</span>
                    </div>
                    {isLoading && <SpinLoader />}
                    <button
                      type="submit"
                      className="bg-blue-gradient text-white rounded md:min-h-[52px] min-h-[48px] uppercase  font-semibold tracking-[1px] shadow-button hover:scale-105 default-transition text-sm sm:text-base mt-2"
                    >
                      proceed to register
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="text-center  mt-5 mb-6">
                <p className="inline text-slategray font-medium sm:text-base text-sm">Already have an account?</p>
                <Link to="/auth/login" className="text-moonstone-gradient2 font-semibold mx-2 sm:text-base text-sm">
                  Log in
                </Link>
              </div>
            </div>

            <div className="border-t-[1px] border-blue-gray-50 pt-4">
              <p className=" text-moonstone-gradient2 font-bold text-lg text-center mt-auto">
                <Link to="/">FotoIdol Studio.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <AuthFooter />
    </section>
  );
};

export default Register;
