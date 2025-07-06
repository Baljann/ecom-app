"use client";

import Link from "next/link";
import NavbarLinks from "./NavbarLinks";

export default function Header() {
  return (
    <header className="bg-sky-950 border-b-2 border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-7 py-4 flex justify-between">
        <Link href="/" >
          <h1 className="text-yellow-600 text-2xl font-bold">MiniCom</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-stone-50">
          <NavbarLinks onLinkClick={() => {}} />
        </nav>
      </div>
    </header>
  );
}
