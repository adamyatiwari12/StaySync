"use client";

import HeroImg from "@/assets/hero.png";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SlideUp } from "@/components/animation/animate";
import { useEffect, useState } from "react";

const MotionImage = motion.create(Image);

const Hero = () => {
  const [dashboardLink, setDashboardLink] = useState("/signin");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === "admin") {
        setDashboardLink("/admin/dashboard");
      } else if (parsedUser.role === "tenant") {
        setDashboardLink("/tenant/dashboard");
      }
    } else {
      setDashboardLink("/signin");
    }
  }, []);

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-150 gap-10">
        {/* Text section */}
        <div className="flex flex-col justify-center gap-7 md:pr-8 xl:pr-52 text-center md:text-left pt-20 md:pt-0 px-10">
          <motion.h1
            variants={SlideUp(0.2)}
            initial="initial"
            animate="animate"
            className="text-4xl font-bold font-serif"
          >
            Manage Your Stay <br />
            <span className="text-primary">Without Chaos</span>
          </motion.h1>

          <motion.p
            variants={SlideUp(0.5)}
            initial="initial"
            animate="animate"
            className="text-sm md:text-base text-text-secondary leading-7"
          >
            A unified stay management platform to manage rooms, residents,
            issues, and daily operations — all from one place.
          </motion.p>

          <div className="space-x-4">
            <Link href={dashboardLink}>
              <motion.button
                variants={SlideUp(0.8)}
                initial="initial"
                animate="animate"
                className="primary-btn"
              >
                Start Managing
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Image section */}
        <div className="flex flex-col items-center justify-center">
          <MotionImage
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            src={HeroImg}
            alt=""
            className="w-[80%] md:w-175 object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
