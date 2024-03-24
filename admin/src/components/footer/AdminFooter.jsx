import { Typography } from "@material-tailwind/react";

export function AdminFooter() {
  const currentDate = new Date();
  return (
    <footer className="w-full bg-white p-4 mt-6 shadow-lg rounded-md">
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; {currentDate.getFullYear()} Faith Tech.
      </Typography>
    </footer>
  );
}
