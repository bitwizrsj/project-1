import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-br py-16 text-purple-900 rounded-lg relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-center text-4xl font-bold mb-12">
          What Our <span className="text-purple-600">Clients Say</span>
        </h2>

        {/* Swiper Slider */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          breakpoints={{
            1024: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 1,
            },
          }}
          modules={[Navigation, Pagination]}
          className="testimonial-slider"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="p-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
                  <div className="flex text-yellow-400 mb-4 justify-center">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-center mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-purple-800">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="swiper-button-prev absolute left-4 top-2/3 transform -translate-y-1/2 z-10 text-purple-600 p-2 rounded-full cursor-pointer "></div>
        <div className="swiper-button-next absolute right-4 top-2/3 transform -translate-y-1/2 z-10 text-purple-600 p-2 rounded-full cursor-pointer "></div>

        {/* Swiper Pagination */}
        <div className="swiper-pagination mt-6"></div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    content: "Xyphramin transformed our business with their innovative solutions. Their team's expertise were exceptional.",
    name: "John Smith",
    role: "CEO, TechCorp",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    stars: 5
  },
  {
    content: "The mobile app they developed exceeded our expectations. Professional team and outstanding results.",
    name: "Lisa Johnson",
    role: "Product Manager, InnovateTech",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    stars: 4,
  },
  {
    content: "Their cloud solutions helped us scale our operations efficiently. Highly recommended for any business.",
    name: "Michael Chen",
    role: "CTO, CloudScale",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    stars: 5,
  },
  {
    content: "The team at Xyphramin went above and beyond. Their creative designs brought our vision to life.",
    name: "Emily Davis",
    role: "Creative Director, Brandify",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    stars: 4,
  },
  {
    content: "We’ve seen a significant boost in our analytics capabilities, thanks to their data expertise.",
    name: "Chris Wilson",
    role: "Data Scientist, Insight360",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    stars: 5,
  },
  {
    content: "Their SEO strategies put us ahead of our competitors. A fantastic experience working with the team.",
    name: "Sarah Thompson",
    role: "Marketing Head, GrowBiz",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    stars: 4,
  },
  {
    content: "Their team was incredibly professional and provided timely delivery. Highly recommend them for all your IT needs.",
    name: "Rachel Green",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1603415526960-2d4b80a6c26e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    stars: 5,
  },
  {
    content: "Their innovative approach helped us stand out in a competitive market. Absolutely brilliant team to work with.",
    name: "Kevin Wright",
    role: "CEO, BrightFuture",
    image: "https://images.unsplash.com/photo-1573497019576-21b1be0b20de?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    stars: 5,
  },
];

export default Testimonials;
