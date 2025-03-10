"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Heart, ShoppingBag, LogOut, Sun, Moon, Menu } from "lucide-react";
import logo from "../../assests/Basa.svg";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { protectedRoutes } from "@/contants";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b w-full bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container flex justify-between items-center mx-auto h-[70px] px-3 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="h-[70px] rounded-b-full border-4"
            src={logo}
            alt="Basa Finder"
            width={100}
            height={100}
          />
          <span className="text-2xl font-black dark:text-white">
            Basa Finder
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 dark:text-white hover:text-violet-600 transition"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 dark:text-white hover:text-violet-600 transition"
          >
            About Us
          </Link>
          <Link
            href="/all-listings"
            className="text-gray-700 dark:text-white hover:text-violet-600 transition"
          >
            All Listings
          </Link>
          {user && (
            <Link
              href={`/${user?.role}/dashboard`}
              className="text-gray-700 dark:text-white hover:text-violet-600 transition"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right-side Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <Heart className="text-gray-700 dark:text-white" />
          </Button>
          <Button variant="outline" className="rounded-full p-0 size-10">
            <ShoppingBag className="text-gray-700 dark:text-white" />
          </Button>

          {/* Dark Mode Toggle */}
          {mounted && (
            <Button
              variant="outline"
              className="rounded-full p-0 size-10"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="text-yellow-400" />
              ) : (
                <Moon className="text-gray-700" />
              )}
            </Button>
          )}

          {/* User Profile Dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={user?.imageUrls || "/default-avatar.png"} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`/${user?.role}/settings/profile`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 cursor-pointer"
                  onClick={handleLogOut}
                >
                  <LogOut className="mr-2" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="rounded-full" variant="outline">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden">
            <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
}
