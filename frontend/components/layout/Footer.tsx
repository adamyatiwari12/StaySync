import Logo from "@/assets/Logo.png";
import { Phone, MessageSquare } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="container py-11">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4 font-semibold">
            <div className="flex items-center space-x-3">
              <Image src={Logo} alt="StaySync logo" className="w-6" />
              <p className="text-xl font-semibold">StaySync</p>
            </div>

            <p>
              Simplifying stay operations by managing rooms, tenants,
              and complaints in one unified platform.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-4">
              <h1 className="text-xl font-semibold">About us</h1>
              <ul className="text-sm space-y-4">
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Designer</a></li>
                <li><a href="#">Craftmanship</a></li>
                <li><a href="#">Sustainability</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h1 className="text-xl font-semibold">Support</h1>
              <ul className="text-sm space-y-4">
                <li><a href="#">FAQ&apos;s</a></li>
                <li><a href="#">Shipping & Returns</a></li>
                <li><a href="#">Care Guide</a></li>
                <li><a href="#">Guarantee</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h1 className="text-xl font-semibold">Contact us</h1>
            <ul className="text-base font-semibold space-y-4">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <a
                  href="tel:+911234567890"
                  className="hover:text-primary duration-300"
                >
                  +91 1234567890
                </a>
              </li>

              <li className="flex items-center space-x-3">
                <MessageSquare size={18} className="text-secondary" />
                <a
                  href="mailto:adamyatiwari99@gmail.com"
                  className="hover:text-primary duration-300"
                >
                  adamyatiwari99@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm font-semibold border-t-2 border-border-muted pt-5 mt-5 text-text-muted">
          © {new Date().getFullYear()} StaySync. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
