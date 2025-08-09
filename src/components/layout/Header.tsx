"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const currentPath = usePathname();

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto lg:max-w-7xl px-4 py-3">
        <div className="flex items-center justify-center md:justify-between">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Image
                  src="/logo.jpg"
                  alt="MiniCom Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[150px] h-auto"
                  priority
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-cyan-800">
            <Link
              href="/"
              className={`font-bold transition-colors ${
                currentPath === "/" ? "text-cyan-600" : "hover:text-cyan-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/admin"
              className={`font-bold transition-colors ${
                currentPath === "/admin"
                  ? "text-cyan-600"
                  : "hover:text-cyan-600"
              }`}
            >
              Admin
            </Link>
            <Link
              href="/login"
              className={`font-bold transition-colors ${
                currentPath === "/login"
                  ? "text-cyan-600"
                  : "hover:text-cyan-600"
              }`}
            >
              Login
            </Link>
          </nav>

          <div className="flex-shrink-0">
            <Link
              href="/cart"
              className={`hidden md:flex items-center transition-colors ${
                currentPath === "/cart"
                  ? "text-cyan-600"
                  : "text-cyan-800 hover:text-cyan-600"
              }`}
            >
              <ShoppingCartIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
