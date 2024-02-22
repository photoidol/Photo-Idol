import { FaCheck } from "react-icons/fa";
import { staticImages } from "../../images";

const GuidelineScreen = () => {
  return (
    <section>
      <div className="py-10">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-3xl tracking-tight font-bold title-theme">
            Photo Upload Guidelines
          </h2>
          <p className="mb-5 font-semibold text-white">
            Please follow the following guidelines for different types of photo
            upload category/options.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 xxl:grid-cols-3 gap-4">
          <div className="flex flex-col py-4 px-4 text-center bg-white rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4 pb-3 title-theme border-b-[1px] border-b-blue-gray-50">
              Half Body Portrait
            </h3>
            <h3 className="text-sm text-start font-bold title-theme opacity-80 uppercase">
              Guidelines:
            </h3>
            <ul role="list" className="mt-1 text-left text-sm text-slategray">
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  Generally, anything under 2MB is accepted. We do accept larger
                  images but they can sometimes cause issues.
                </span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  We limit image resolution to 4000x4000px. Anything larger will
                  prompt an image upload error.{" "}
                </span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  You can upload the following formats: JPEG, JPG & PNG.
                </span>
              </li>
            </ul>
            <div className="pt-3 mt-auto">
              <img className="rounded shadow-md" src={staticImages.banner1} alt="" />
            </div>
          </div>

          <div className="flex flex-col py-4 px-4 text-center bg-white rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4 pb-3 title-theme border-b-[1px] border-b-blue-gray-50">
              Full Body Portrait
            </h3>
            <h3 className="text-sm text-start font-bold title-theme opacity-80 uppercase">
              Guidelines:
            </h3>
            <ul role="list" className="mt-1 text-left text-sm text-slategray">
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The size must be between 0.5 MB and 80 MB.</span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The accepted photo format are JPEG, PNG & JPG.</span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The dimensions for the photo is: 50x50.</span>
              </li>
            </ul>
            <div className="pt-3 mt-auto">
              <img className="rounded shadow-md" src={staticImages.banner2} alt="" />
            </div>
          </div>

          <div className="flex flex-col py-4 px-4 text-center bg-white rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4 pb-3 title-theme border-b-[1px] border-b-blue-gray-50">
              Landscape
            </h3>
            <h3 className="text-sm text-start font-bold title-theme opacity-80 uppercase">
              Guidelines:
            </h3>
            <ul role="list" className="mt-1 text-left text-sm text-slategray">
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The size must be between 0.5 MB and 80 MB.</span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The accepted photo format are JPEG, PNG & JPG.</span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>The dimensions for the photo is: 50x50.</span>
              </li>
            </ul>
            <div className="pt-3 mt-auto">
              <img className="rounded shadow-md" src={staticImages.banner3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidelineScreen;
