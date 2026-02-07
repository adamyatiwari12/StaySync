"use client";

import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import { navLinks } from "@/components/nav/navLinks";

const HomePage = () => {
  return (
    <div>
      <Navbar navLinks={navLinks.landing} />
      <Hero />
    </div>
  );
}

export default HomePage;
