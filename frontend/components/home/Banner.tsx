"use client";

import Banner1 from "@/assets/banner.png";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SlideUp } from "@/components/animation/animate";
import { useEffect, useState } from "react";

const MotionImage = motion.create(Image);

const Banner = () => {
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
    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image section */}
        <div className="flex flex-col justify-center">
          <MotionImage
            src={Banner1}
            alt="Room management illustration"
            className="w-[95%] md:w-full mx-auto"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Text section */}
        <div className="space-y-5 flex flex-col justify-center xl:max-w-125">
          <motion.h1
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView="animate"
            className="text-4xl font-bold font-serif"
          >
            Room & Unit Management Made Simple
          </motion.h1>

          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView="animate"
            className="text-text-secondary text-sm leading-7"
          >
            Organize your building structure with ease. Create rooms or units,
            define capacity, and track real-time occupancy insights at a glance.
          </motion.p>

          <div>
            <Link href={dashboardLink}>
              <motion.button
                variants={SlideUp(0.6)}
                initial="initial"
                whileInView="animate"
                className="primary-btn"
              >
                Start Organizing
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
