"use client";

import Banner from "@/components/home/Banner";
import Banner2 from "@/components/home/Banner2";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { navLinks } from "@/components/nav/navLinks";

const HomePage = () => {
  return (
    <div>
      <Navbar navLinks={navLinks.landing} />
      <Hero />
      <Banner />
      <Banner2 />
      <Footer/>
    </div>
  );
}

export default HomePage;
