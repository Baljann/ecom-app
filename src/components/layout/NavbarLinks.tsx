import Link from "next/link";
import { usePathname } from "next/navigation";

enum Page {
  home = "Home",
  cart = "Cart",
  admin = "Admin",
  login = "Login",
}
interface NavbarLinksProps {
  onLinkClick: () => void;
}

interface NavItemProps {
  key: string;
  href: string;
  text: string;
  onClick?: () => void;
}

export default function NavbarLinks({ onLinkClick }: NavbarLinksProps) {
  const currentPath = usePathname();
  const navItems: NavItemProps[] = [
    {
      key: "home",
      href: "/",
      text: Page.home,
    },
    {
      key: "cart",
      href: "/cart",
      text: Page.cart,
    },
    {
      key: "admin",
      href: "/admin",
      text: Page.admin,
    },
    { key: "login", href: "/login", text: Page.login },
  ];

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          onClick={onLinkClick}
          className={`font-bold ${
            currentPath === item.href
              ? "text-cyan-600"
              : "text-cyan-800 hover:text-cyan-600"
          }`}
        >
          {" "}
          {item.text}{" "}
        </Link>
      ))}
    </>
  );
}
