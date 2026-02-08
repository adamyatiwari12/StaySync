import Image from "next/image";
import type { TestimonialType } from "../data/testimonials";

interface TestimonialProps {
    testimonialData: TestimonialType[];
}

const Testimonial = ({testimonialData}: TestimonialProps) => {
  return (
    <div className="py-14">
      
      {/* Heading */}
      <div className="space-y-4 text-center max-w-137.5 mx-auto mb-8">
        <h1 className="text-4xl font-bold font-serif">
          Words from our customers
        </h1>

        <p className="text-text-secondary text-sm max-w-87.5 mx-auto">
          Bring your dream home to life with one-on-one design help & hand-picked products
        </p>
      </div>

      {/* Scroll Section */}
      <div className="bg-background-muted py-12">
        <div className="flex gap-6 overflow-x-auto overflow-y-hidden px-6 scroll-smooth no-scrollbar">
          
          {testimonialData.map((card) => (
            <div
              key={card.id}
              className="min-w-[320px] max-w-[320px] border border-border-muted px-5 py-10 bg-background-card text-text-primary group hover:bg-primary hover:text-white duration-300"
            >
              {/* Top */}
              <div className="flex items-center gap-3">
                <Image src={card.img} alt={card.name} width={60} height={60} className="w-15 rounded-full"
                />

                <div>
                  <p className="text-sm font-bold group-hover:text-white">
                    {card.name}
                  </p>
                  <p className="text-xs text-text-muted group-hover:text-white">
                    {card.designation}
                  </p>
                  <div className="text-xs mt-2">⭐⭐⭐⭐⭐</div>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-5 border-t-2 border-border-muted pt-5">
                <p className="text-sm text-text-secondary group-hover:text-white duration-300">
                  {card.text}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Testimonial;
