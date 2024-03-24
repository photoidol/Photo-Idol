import { Typography } from "@material-tailwind/react";

export function AdminFooter() {
  const copyrightYear = new Date();
  return (
    <footer className="w-full bg-white lg:p-4 p-3 lg:mt-6 md:mt-5 mt-4 shadow-lg rounded-md">
      <Typography className="text-center text-indigo font-medium md:text-[15px] text-sm opacity-90">
        &copy; {copyrightYear.getFullYear()} All Rights Reserved To Foto Idol.
        Developed By Faith Tech.
      </Typography>
    </footer>
  );
}
