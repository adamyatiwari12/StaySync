import Banner1 from "@/assets/banner.png";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Image section */}
        <div className="flex flex-col justify-center">
          <Image
            src={Banner1}
            alt="Room management illustration"
            className="w-[95%] md:w-full mx-auto"
          />
        </div>

        {/* Text section */}
        <div className="space-y-5 flex flex-col justify-center xl:max-w-125">
          <h1 className="text-4xl font-bold font-serif">
            Room & Unit Management Made Simple
          </h1>

          <p className="text-text-secondary text-sm leading-7">
            Organize your building structure with ease. Create rooms or units,
            define capacity, and track real-time occupancy insights at a glance.
          </p>

          <div>
            <Link href="/signup">
              <button className="primary-btn">
                Start Organizing
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
