import Logo from "@/assets/Logo.png";
import Image from "next/image";
import Link from "next/link";

const LandingNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src={Logo} alt="StaySync" className="w-7" />
            <span className="text-xl font-bold text-text-primary">StaySync</span>
          </div>

          <div className="flex gap-2">
            <Link href="/signup">
              <button className="primary-btn">Try For Free</button>
            </Link>
            <Link href="/signin">
              <button className="secondary-btn">Login</button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;