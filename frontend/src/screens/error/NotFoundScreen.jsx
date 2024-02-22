import { Typography } from "@material-tailwind/react";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { staticImages } from "../../images";
import { Link } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <>
      <Header />
      <main
        className="py-12 mt-20"
        style={{
          minHeight: "calc(100vh - 236px)",
        }}
      >
        <div className="flex flex-col items-center justify-center mx-auto max-w-[600px]">
          <div className="mb-6">
            <img
              className="max-w-[400px] mx-auto"
              src={staticImages.page_not_found}
              alt=""
            />
            <Typography
              variant="h4"
              className="mt-8 text-dark text-center font-bold"
            >
              Page Not Found!
            </Typography>
          </div>

          <Link
            className="text-center px-4 h-[50px] min-w-[200px] items-center justify-center font-medium text-lg bg-moonstone-gradient2 text-white default-transition shadow rounded inline-flex tracking-[0.5px]"
            to="/"
          >
            Go To Home Page
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundScreen;
