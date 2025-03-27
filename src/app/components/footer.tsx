import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 flex flex-col items-center border-t border-gray-700 w-full">
      <p className="text-gray-400 text-lg">
        &copy; {new Date().getFullYear()} Textify. All rights reserved.
      </p>
      <div className="flex space-x-6 mt-3">
        <Link href="/legal/terms" className="text-gray-400 hover:text-white">
          Terms of Service
        </Link>
        <Link href="/legal/privacy" className="text-gray-400 hover:text-white">
          Privacy Policy
        </Link>
        <Link href="/legal/contact" className="text-gray-400 hover:text-white">
          Contact Us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
