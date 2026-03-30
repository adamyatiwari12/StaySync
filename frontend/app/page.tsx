"use client";

import { useEffect } from "react";
import Banner from "@/components/home/Banner";
import Banner2 from "@/components/home/Banner2";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Services from "@/components/home/Services";
import Footer from "@/components/layout/Footer";
import LandingNavbar from "@/components/layout/LandingNavbar";
import { testimonialData } from "@/components/data/testimonials";
import Testimonial from "@/components/home/Testimonials";

const HomePage = () => {
  useEffect(() => {
    // Logout user when visiting home page
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return (
    <div>
      <LandingNavbar />
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
