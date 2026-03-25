"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "@/assets/Logo.png";
import { navLinks } from "@/components/data/navLinks";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
} from "lucide-react";

type NavbarRole = "admin" | "tenant" | "landing";

interface NavbarProps {
  role: NavbarRole;
}

const Navbar = ({ role }: NavbarProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
  };

  const links = navLinks[role] || [];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <Image src={Logo} alt="StaySync" className="w-7" />
            <span className="text-xl font-bold text-text-primary">
              StaySync
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavigation(link.href)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg
                             text-text-secondary hover:text-text-primary
                             hover:bg-background-muted transition"
                >
                  <Icon size={18} />
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-text-primary"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

           <div className="flex gap-2">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="secondary-btn">
                Logout
              </button>
            ) : (
              <>
                <Link href="/signup">
                  <button className="primary-btn">Try For Free</button>
                </Link>
                <Link href="/signin">
                  <button className="secondary-btn">Login</button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavigation(link.href)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                               text-text-secondary hover:text-text-primary
                               hover:bg-background-muted transition"
                  >
                    <Icon size={18} />
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}    
      </div>
    </nav>
  );
};

export default Navbar;
