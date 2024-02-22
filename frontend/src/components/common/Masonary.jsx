import PropTypes from "prop-types";
import { AiFillHeart } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";

const Masonary = ({ dataArr }) => {
  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 3,
    500: 2,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column sm:my-9 my-5"
      >
        {dataArr?.length > 0 &&
          dataArr?.slice(0, 18).map((item) => {
            return (
              <Link
                to={`/search/${item?.slug}`}
                key={item._id}
                className="masonry-item hover:scale-[1.02] transition-all duration-200 relative group after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/40 after:opacity-0 after:transition-all after:ease-in-out after:duration-300 hover:after:opacity-100"
              >
                <img
                  src={item?.assets?.length > 0 ? item?.assets[0].filePath : ""}
                  alt=""
                />
                <div className="item-info opacity-0 group-hover:opacity-100 absolute bottom-[12px] left-[12px] transition-all duration-300 ease-in-out flex items-center justify-start z-10">
                  <div className="item-info-user w-[32px] h-[32px] rounded-full overflow-hidden me-3">
                    <img
                      src={
                        item?.user?.avatar.url
                          ? item?.user?.avatar?.url
                          : item?.user?.avatar
                      }
                      className="w-full h-full object-fit-cover"
                      alt="avatar"
                    />
                  </div>
                  <p className="font-medium text-white bg-black/20 px-3 py-1 rounded-full text-xs capitalize">
                    {item?.user?.name}
                  </p>
                </div>

                <div className="absolute opacity-0 group-hover:opacity-100 top-2 right-3 z-10 flex items-center gap-x-4">
                  <div className="text-white flex items-center gap-x-1.5">
                    <BsEyeFill size = {14} />
                    <span className="text-xs">{item?.numOfViews}</span>
                  </div>
                  <div className="text-white flex items-center gap-x-1.5">
                    <AiFillHeart size = {14} />
                    <span className="text-xs">{item?.likes?.length}</span>
                  </div>
                </div>
              </Link>
            );
          })}
      </Masonry>
    </>
  );
};

Masonary.propTypes = {
  dataArr: PropTypes.any,
};
export default Masonary;
