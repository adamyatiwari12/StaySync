import HeroImg from "@/assets/hero.png";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-150 gap-10">
        
        {/* Text section */}
        <div className="flex flex-col justify-center gap-7 md:pr-8 xl:pr-52 text-center md:text-left pt-20 md:pt-0 px-10">
          <h1 className="text-4xl font-bold font-serif">
            Manage Your Stay <br />
            <span className="text-primary">Without Chaos</span>
          </h1>

          <p className="text-sm md:text-base text-text-secondary leading-7">
            A unified stay management platform to manage rooms, residents,
            issues, and daily operations — all from one place.
          </p>

          <div className="space-x-4">
            <Link href="/signup">
              <button className="primary-btn">
                Start Managing
              </button>
            </Link>
          </div>
        </div>

        {/* Image section */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src={HeroImg}
            alt="Stay management illustration"
            className="w-[80%] md:w-175 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

