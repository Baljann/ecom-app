"use client";

import Link from "next/link";
import Image from "next/image";
import NavbarLinks from "./NavbarLinks";

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.jpg"
              alt="MiniCom Logo"
              width={100}
              height={100}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-cyan-800">
            <NavbarLinks onLinkClick={() => {}} />
          </nav>
        </div>
      </div>
    </header>
  );
}
