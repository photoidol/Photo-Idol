import { FaCheck } from "react-icons/fa";
import { staticImages } from "../../images";
import { useEffect } from "react";
import { scrollToTop } from "../../utils/scrollToTop";

const GuidelineScreen = () => {

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <section>
      <div className="lg:py-10 md:py-8 py-6">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="lg:mb-4 mb-3 lg:text-3xl md:text-2xl text-xl tracking-tight font-bold title-theme">
            Photo Upload Guidelines
          </h2>
          <p className="lg:mb-5 mb-4 font-medium text-white">
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
            <ul
              role="list"
              className="mt-1 text-left text-sm text-slategray ps-1"
            >
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>Image size must not exceed 3 MB.</span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>Accepted formats include JPEG, JPG, and PNG.</span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  Dimensions: Please ensure the photo dimensions are suitable
                  for half body portraits.
                </span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  Resolution: Please ensure the resolution is appropriate for
                  clear viewing.
                </span>
              </li>
            </ul>
            <div className="pt-3 mt-auto">
              <img
                className="rounded shadow-md"
                src={staticImages.half_body_portrait_min}
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col py-4 px-4 text-center bg-white rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4 pb-3 title-theme border-b-[1px] border-b-blue-gray-50">
              Full Body Portrait
            </h3>
            <h3 className="text-sm text-start font-bold title-theme opacity-80 uppercase">
              Guidelines:
            </h3>
            <ul
              role="list"
              className="mt-1 text-left text-sm text-slategray ps-1"
            >
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>Image size must not exceed 3 MB.</span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>Accepted formats: JPEG, PNG, JPG.</span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  Dimensions: Please ensure the photo dimensions are appropriate
                  for full body portraits.
                </span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  Resolution: Provide the highest quality possible without
                  exceeding file size limits.
                </span>
              </li>
            </ul>
            <div className="pt-3 mt-auto">
              <img
                className="rounded shadow-md"
                src={staticImages.full_body_portrait_min}
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col py-4 px-4 text-center bg-white rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4 pb-3 title-theme border-b-[1px] border-b-blue-gray-50">
              Landscape
            </h3>
            <h3 className="text-sm text-start font-bold title-theme opacity-80 uppercase">
              Guidelines:
            </h3>
            <ul
              role="list"
              className="mt-1 text-left text-sm text-slategray ps-1"
            >
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>Image size must not exceed 3 MB.</span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>Accepted formats include JPEG, JPG, and PNG.</span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  Dimensions: Please ensure the photo dimensions are suitable
                  for landscape orientation.
                </span>
              </li>
              <li className="flex items-start gap-x-3 my-2">
                <span className="min-w-[10px] w-[10px] pt-[2px]">
                  <FaCheck size={12} className="text-slategray" />
                </span>
                <span>
                  Resolution: Provide the highest quality possible without
                  exceeding file size limits.
                </span>
              </li>
            </ul>
            <div className="pt-3 mt-auto">
              <img
                className="rounded shadow-md"
                src={staticImages.landscape_min}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="my-3">
          <p className="text-white italic">
            <span className="font-semibold drop-shadow-sm pe-1">Note :</span> We
            recommend using an image compressor to reduce the size of your photo
            before uploading.
          </p>
        </div>
        <div className="bg-moonstone-gradient2 text-white p-3 rounded-md shadow-sm mt-6">
          <p className="font-bold mb-2 text-base lg:text-lg">
            Violation Policy :
          </p>
          <p className="text-sm md:text-base">
            Images breaching our guidelines, including violence, hate speech, or
            discrimination, will result in permanent account bans. Additionally,
            any content promoting social issues like child abuse or exploitation
            will be removed, and accounts will be suspended indefinitely.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuidelineScreen;
