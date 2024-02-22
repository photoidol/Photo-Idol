import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className=" text-white bg-black py-10">
        <div className="containers">
          <div className="mb-2">
            <ul className="footer-links pt-2 pb-4 flex justify-center items-center flex-wrap gap-1 [&>*:last-child]:after:hidden">
              <li className="px-5 relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-[5px] after:h-[5px] after:rounded-full after:content-[''] after:bg-moonstone after:right-0 after:translate-x-1/2 lg:text-base text-base">
                <Link className="" to="/search">
                  All Photos
                </Link>
              </li>
              <li className="px-5 relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-[5px] after:h-[5px] after:rounded-full after:content-[''] after:bg-moonstone after:right-0 after:translate-x-1/2 lg:text-base text-base">
                <Link className="" to="/about">
                  About Us
                </Link>
              </li>
              <li className="px-5 relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-[5px] after:h-[5px] after:rounded-full after:content-[''] after:bg-moonstone after:right-0 after:translate-x-1/2 lg:text-base text-base">
                <Link className="" to="/maintain">
                  Terms and conditions
                </Link>
              </li>
              <li className="px-5 relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-[5px] after:h-[5px] after:rounded-full after:content-[''] after:bg-moonstone after:right-0 after:translate-x-1/2 lg:text-base text-base">
                <Link className="" to="/maintain">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-sm text-center">
            &copy; All rights reserved, FotoIdol
          </div>
        </div>
      </footer>
    </>
  );
};
