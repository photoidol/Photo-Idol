import { Typography } from "@material-tailwind/react";
import { staticImages } from "../../images";
import { Link } from "react-router-dom";

const MaintenanceScreen = () => {
  return (
    <>
      <main className="py-12 mt-20">
        <div className="flex flex-col items-center justify-center mx-auto max-w-[600px]">
          <div className="mb-6">
            <img
              className="max-w-[400px] mx-auto"
              src={staticImages.maintenance}
              alt=""
            />
            <Typography
              variant="h4"
              className="mt-8 mb-3 text-dark text-center font-bold"
            >
              Under Maintenance
            </Typography>
            <p className="text-center text-slategray">
              Sorry for the inconvenience but we’re performing some maintenance
              at the moment. If you need to you can always contact us, otherwise
              we’ll be back online shortly!.
            </p>
          </div>
          <Link
            className="text-center px-4 h-[50px] min-w-[200px] items-center justify-center  font-medium text-lg bg-moonstone-gradient2 text-white default-transition shadow rounded inline-flex tracking-[0.5px]"
            to="/"
          >
            Go back home
          </Link>
        </div>
      </main>
    </>
  );
};

export default MaintenanceScreen;
