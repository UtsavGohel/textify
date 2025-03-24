import { FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-5">
      <footer className="mt-10 py-6 text-center border-t border-gray-700 w-full">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Textify. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <FaGithub
            className="text-gray-400 hover:text-white cursor-pointer"
            size={20}
          />
          <FaTwitter
            className="text-gray-400 hover:text-white cursor-pointer"
            size={20}
          />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
