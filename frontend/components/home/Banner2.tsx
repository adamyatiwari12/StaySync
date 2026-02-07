import Banner1 from "@/assets/banner2.png";
import Link from "next/link";
import Image from "next/image";

const Banner2 = () => {
  return (
    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Text section */}
        <div className="space-y-5 flex flex-col justify-center xl:max-w-125">
          <h1 className="text-4xl font-bold font-serif">
            Secure & Unified Management Dashboard
          </h1>

          <p className="text-text-secondary text-sm leading-7">
            Manage residents, issues, and building occupancy with role-based
            access control. Our platform provides tailored dashboards for
            managers and residents to streamline daily operations.
          </p>

          <div className="flex gap-3">
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
          </div>

          <div>
            <Link href="/signin">
              <button className="primary-btn">
                Explore Dashboard
              </button>
            </Link>
          </div>
        </div>

        {/* Image section */}
        <div className="flex flex-col justify-center">
          <Image
            src={Banner1}
            alt="Dashboard preview illustration"
            className="w-[95%] md:w-full mx-auto"
          />
        </div>

      </div>
    </div>
  );
};

export default Banner2;
