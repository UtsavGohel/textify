"use client";
import Button from "@/components/ui/Button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg">
      {/* Logo Section */}
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo-1.webp" alt="Textify Logo" width={50} height={50} />
      </Link>

      {/* Authentication Section */}
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <span className="text-white font-medium">
              Hello, {session.user?.name}
            </span>
            <Button
              onClick={() => signOut()}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 text-lg text-white font-semibold rounded-full"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <Button className="bg-blue-500 hover:bg-blue-600 px-6 text-lg font-semibold">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
