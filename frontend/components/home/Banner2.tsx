"use client";

import Banner1 from "@/assets/banner2.png";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SlideUp } from "@/components/animation/animate";
import { useEffect, useState } from "react";

const MotionImage = motion.create(Image);

const Banner2 = () => {
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
        {/* Text section */}
        <div className="space-y-5 flex flex-col justify-center xl:max-w-125">
          <motion.h1
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold font-serif"
          >
            Secure & Unified Management Dashboard
          </motion.h1>

          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-text-secondary text-sm leading-7"
          >
            Manage residents, issues, and building occupancy with role-based
            access control. Our platform provides tailored dashboards for
            managers and residents to streamline daily operations.
          </motion.p>

          <motion.div
            variants={SlideUp(0.6)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <div className="max-w-20 space-y-2">
              <p className="text-3xl font-bold font-serif">100+</p>
              <p className="text-text-secondary text-sm">Rooms Managed</p>
            </div>

            <div className="max-w-20 space-y-2">
              <p className="text-3xl font-bold font-serif">500+</p>
              <p className="text-text-secondary text-sm">Happy Residents</p>
            </div>

            <div className="max-w-20 space-y-2">
              <p className="text-3xl font-bold font-serif">24/7</p>
              <p className="text-text-secondary text-sm">Issue Tracking</p>
            </div>
          </motion.div>

          <div>
            <Link href={dashboardLink}>
              <motion.button
                variants={SlideUp(0.8)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="primary-btn"
              >
                Explore Dashboard
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Image section */}
        <div className="flex flex-col justify-center">
          <MotionImage
            src={Banner1}
            alt="Dashboard preview illustration"
            className="w-[95%] md:w-full mx-auto"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner2;
