import { Facebook, Instagram, X, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assests/Basa.svg";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-listings", label: "All Listings" },
    { href: "/about", label: "About Us" },
    { href: "/testimonial", label: "Testimonial" },
    { href: "/faq", label: "FAQ" },
    { href: "/termsconditions", label: "Terms & Conditions" },
    { href: "/news", label: "News" },
    { href: "/privacypolicy", label: "Privacy Policy" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook },
    { href: "https://instagram.com", icon: Instagram },
    { href: "https://twitter.com", icon: X },
  ];

  return (
    <footer className="border-t border-gray-200 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo & Description */}
        <div className="flex flex-col items-center mb-6">
          <Image
            className="w-32 md:w-40 border-4 rounded-b-full"
            src={logo}
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className="text-2xl font-black mt-3">Basa Finder</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base max-w-md">
            Connecting renters with their perfect homes. Hassle-free and secure.
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base text-gray-800 font-medium my-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-purple-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact Information */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-gray-800">
          <a
            href="mailto:gopalbasak2324@gmail.com"
            className="flex items-center gap-2 hover:text-purple-600"
          >
            <Mail className="w-5 h-5" /> gopalbasak2324@gmail.com
          </a>
          <a
            href="tel:+8801747065084"
            className="flex items-center gap-2 hover:text-purple-600"
          >
            <Phone className="w-5 h-5" /> +880 1747-065084
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="mt-6 flex justify-center space-x-6">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link
              href={href}
              key={index}
              target="_blank"
              className="text-gray-600 hover:text-purple-600"
            >
              <Icon className="w-6 h-6" />
            </Link>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Basa Finder. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
