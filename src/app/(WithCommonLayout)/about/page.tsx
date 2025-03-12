"use client";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      {/* Mission Statement */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">About Us</h1>
        <p className="text-gray-600 mt-2">
          Connecting renters with their perfect homes, hassle-free.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-blue-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
        <p className="text-gray-700 mt-2">
          At <span className="font-bold">BasaFinder</span>, we simplify the
          rental experience by ensuring a seamless connection between landlords
          and tenants.
        </p>
      </div>

      {/* Team Section */}
      <div className="mt-8 p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">Meet Our Team</h2>
        <p className="text-gray-700 mt-2">
          Our dedicated team of real estate experts and tech enthusiasts work to
          make home searching smooth and efficient.
        </p>
      </div>

      {/* Contact Section */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Get in Touch</h2>
        <p className="text-gray-700 mt-2">We're here to help you!</p>

        {/* Contact Info */}
        <div className="mt-4 flex items-center gap-4 text-gray-800">
          <Mail className="w-5 h-5" />
          <a
            href="mailto:gopalbasak2324@gmail.com"
            className="text-blue-600 hover:underline"
          >
            gopalbasak2324@gmail.com
          </a>
        </div>
        <div className="mt-2 flex items-center gap-4 text-gray-800">
          <Phone className="w-5 h-5" />
          <a
            href="tel:+8801747065084"
            className="text-blue-600 hover:underline"
          >
            +880 1747-065084
          </a>
        </div>

        {/* Social Media */}
        <div className="mt-4 flex gap-4">
          <a
            href="https://www.facebook.com/your-page"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
