"use client";

import Banner from "@/components/home/Banner";
import Banner2 from "@/components/home/Banner2";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Services from "@/components/home/Services";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { navLinks } from "@/components/data/navLinks";
import { testimonialData } from "@/components/data/testimonials";
import Testimonial from "@/components/home/Testimonials";

const HomePage = () => {
  return (
    <div>
      <Navbar navLinks={navLinks.landing} />
      <Hero />
      <Services />
      <Banner />
      <Banner2 />
      <Testimonial testimonialData={testimonialData} />
      <Newsletter />
      <Footer/>
    </div>
  );
}

export default HomePage;
