"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/home/Banner";
import Banner2 from "@/components/home/Banner2";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Services from "@/components/home/Services";
import Footer from "@/components/layout/Footer";
import LandingNavbar from "@/components/layout/LandingNavbar";
import { testimonialData } from "@/components/data/testimonials";
import Testimonial from "@/components/home/Testimonials";
import Navbar from "@/components/layout/Navbar";

const HomePage = () => {
  const [role, setRole] = useState<"admin" | "tenant" | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const user = localStorage.getItem("user");
    if (!user) return;

    const parsedUser = JSON.parse(user);
    if(parsedUser.role){
      setRole(parsedUser.role);
    }
  }, []);

  return (
    <div>
      {role ? <Navbar role={role} /> : <LandingNavbar />}
      <Hero />
      <Services />
      <Banner />
      <Banner2 />
      <Testimonial testimonialData={testimonialData} />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default HomePage;
