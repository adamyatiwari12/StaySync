"use client";

import Navbar from "@/components/layout/Navbar";
import { navLinks } from "@/components/nav/navLinks";

const HomePage = () => {
  return (
    <div>
      <Navbar navLinks={navLinks.tenant} />
    </div>
  );
}

export default HomePage;
