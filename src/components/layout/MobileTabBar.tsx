"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function MobileTabBar() {
  const pathname = usePathname();
  const tabs = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/admin", icon: ShieldCheckIcon, label: "Admin" },
    { href: "/login", icon: UserIcon, label: "Login" },
    { href: "/cart", icon: ShoppingCartIcon, label: "Cart" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 flex justify-around items-center h-16 md:hidden z-50">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center"
          >
            <tab.icon
              className={`h-6 w-6 ${
                isActive ? "text-cyan-600" : "text-cyan-800 hover:text-cyan-600"
              }`}
            />
            <span
              className={`text-xs ${
                isActive ? "text-cyan-600" : "text-cyan-800 hover:text-cyan-600"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
