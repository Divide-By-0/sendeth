"use client";

import Link from "next/link";
import MobileHeader from "./MobileHeader";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { ExternalLink } from "lucide-react";

const routes = [
  { name: "docs", pathname: "https://docs.sendeth.org", isExternal: true },
  { name: "about", pathname: "/about" },
  { name: "blog", pathname: "/blog" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-transparent">
      <div className="flex w-full items-center justify-between px-4 py-1">
        <Logo />
        <nav className="hidden gap-4 md:flex">
          {routes.map((route) => (
            <Link
              className={cn(
                buttonVariants({ variant: "ghost", className: "capitalize" }),
                pathname === route.pathname && "rounded-md bg-secondary",
              )}
              key={route.name}
              href={route.pathname}
              target={route.isExternal ? "_blank" : ""}
            >
              {route.name}
            </Link>
          ))}
          <Link
            href={"https://github.com/zkemail/sendeth"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex items-center gap-1",
            )}
          >
            Github
            <ExternalLink size={20} />
          </Link>

          <ModeToggle />
        </nav>
        <div className="flex items-center gap-x-2 md:hidden">
          <ModeToggle />
          <MobileHeader routes={routes} />
        </div>
      </div>
    </header>
  );
};

export default Header;
