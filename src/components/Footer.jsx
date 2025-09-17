import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-300 text-purple-900 py-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://www.linkedin.com/in/shruti-tokekar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href="https://github.com/shrutitokekar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://twitter.com/shrutitokekar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800"
          >
            <FaTwitter size={30} />
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-purple-600">
          © {new Date().getFullYear()} Shruti Tokekar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
