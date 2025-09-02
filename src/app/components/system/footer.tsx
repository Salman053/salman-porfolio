import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Heart,
  ArrowUp,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background  pt-16 pb-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Muhammad Salman Khan
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Passionate web developer turning ideas into interactive reality
              through innovative solutions and clean code.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Salman053"
                className="p-2  hover:bg-blue-600/30 rounded-lg transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="www.linkedin.com/in/muhammadsalmankhan12"
                className="p-2  hover:bg-blue-600/30 rounded-lg transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              {/* <a
                href="https://twitter.com"
                className="p-2  hover:bg-blue-600 rounded-lg transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a> */}
              <a
                href="mailto:salmankhanm859@gamil.com"
                className="p-2  hover:bg-blue-600/30 rounded-lg transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-foreground transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-foreground transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-400 hover:text-foreground transition-colors duration-300"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-gray-400 hover:text-foreground transition-colors duration-300"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-foreground transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

    
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">Web Development</li>
              <li className="text-gray-400">UI/UX Design</li>
              <li className="text-gray-400">Frontend Development</li>
              <li className="text-gray-400">Responsive Design</li>
              <li className="text-gray-400">Performance Optimization</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">salmankhanm859gmail.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">
                  Babri Banda Kohat, Country
                </span>
              </div>
              <div className="flex items-start">
                <Phone className="mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">+92 344991704</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription (Optional) */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400">
                Get notified about new projects and updates
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-background border border-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-gray-400 mr-2">
              © {currentYear} Made with
            </span>
            <Heart size={16} className="text-red-500 mx-1" />
            <span className="text-gray-400 ml-1">by Salman Khan</span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a
              href="/privacy"
              className="hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center text-white hover:text-blue-400 transition-colors duration-300"
              aria-label="Scroll to top"
            >
              Back to Top
              <ArrowUp size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
