import { HomeScreen } from "./screens/home/HomeScreen";
// layouts
import { BaseLayout } from "./components/layout/BaseLayout";
import { SearchLayout } from "./components/layout/SearchLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
// screens
import { SearchScreen } from "./screens/search/SearchScreen";
import NotFoundScreen from "./screens/error/NotFoundScreen";
import PolicyScreen from "./screens/misc/PolicyScreen";
import { CategoryImagesScreen } from "./screens/misc/CategoryImagesScreen";
// auth pages
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import { Forgetpassword } from "./screens/auth/Forgetpassword";
import { ResetPassword } from "./screens/auth/ResetPassword";
import { LoginWithOTP } from "./screens/auth/LoginWithOTP";
// dashboard
import { Dashboard } from "./screens/admin/Dashboard";
import { Images } from "./screens/admin/Images";
import { Account } from "./screens/admin/Account";
import { ImagesEdit } from "./screens/admin/ImagesEdit";
import DetailsPage from "./screens/details/DetailsPage";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogInStatus,
  getUserProfile,
  selectIsLoggedIn,
  selectUser,
} from "./redux/slices/authSlice";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Verify } from "./screens/admin/Verify";
import { HomeSearchScreen } from "./screens/home/HomeSearchScreen";
import { SocialLinks } from "./screens/admin/SocialLinks";
import MaintenanceScreen from "./screens/error/MaintenanceScreen";
import AboutScreen from "./screens/about/AboutScreen";
import GuidelineScreen from "./screens/guideline/GuidelineScreen";
import UploadForm from "./screens/admin/UploadForm";
import PaymentStatus from "./screens/admin/PaymentStatus";
import StudioScreen from "./screens/studio/StudioScreen";
axios.defaults.withCredentials = true;
import AOS from "aos";
import "aos/dist/aos.css";
import StepByStep from "./screens/admin/StepByStep";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const user = useSelector(selectUser);

  // useEffect(() => {
  //   dispatch(getLogInStatus());
  //   if (isLoggedIn && user === null) {
  //     dispatch(getUserProfile());
  //   }
  // }, [dispatch, isLoggedIn, user]);

  useEffect(() => {
    dispatch(getLogInStatus());
    if (isLoggedIn) {
      dispatch(getUserProfile());
    }
  }, [dispatch, isLoggedIn]);

  AOS.init({
    delay: 0,
    duration: 1000,
    easing: "ease",
    once: false,
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="/privacy-policy" element={<PolicyScreen />} />
          <Route
            path="/category/:categoryId"
            element={<CategoryImagesScreen />}
          />
          <Route path="/results/:searchQuery" element={<HomeSearchScreen />} />
          <Route path="about" element={<AboutScreen />} />
          <Route path="/studio" element={<StudioScreen />} />
          <Route path="/maintain" element={<MaintenanceScreen />} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<Forgetpassword />} />
        <Route
          path="/auth/reset-password/:resetToken"
          element={<ResetPassword />}
        />
        <Route path="/auth/login-with-otp/:email" element={<LoginWithOTP />} />
        <Route path="/search" element={<SearchLayout />}>
          <Route index element={<SearchScreen />} />
          <Route path=":postSlug" element={<DetailsPage />} />
        </Route>

        <Route
          path="/auth/verify/:verificationToken"
          element={
            <AdminLayout>
              <Verify />
            </AdminLayout>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/upload"
          element={
            <AdminLayout>
              <UploadForm />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/images"
          element={
            <AdminLayout>
              <Images />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/images/edit/:postSlug"
          element={
            <AdminLayout>
              <ImagesEdit />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/account/:tabValue?"
          element={
            <AdminLayout>
              <Account />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/social_links"
          element={
            <AdminLayout>
              <SocialLinks />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/guideline"
          element={
            <AdminLayout>
              <GuidelineScreen />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/steps"
          element={
            <AdminLayout>
              <StepByStep />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/pay-status/:queryString"
          element={
            <AdminLayout>
              <PaymentStatus />
            </AdminLayout>
          }
        />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
