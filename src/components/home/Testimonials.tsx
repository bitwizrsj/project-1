import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/testimonials"); // Your backend URL
        setTestimonials(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load testimonials");
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="bg-gradient-to-br py-16 text-purple-900 rounded-lg relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-center text-4xl font-bold mb-12">
          What Our <span className="text-purple-600">Clients Say</span>
        </h2>

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
                    {/* Fetch the image URL dynamically from the backend */}
                    <img
                      src={`http://localhost:5002/${testimonial.image}`} // Backend URL
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

        <div className="swiper-button-prev absolute left-4 top-2/3 transform -translate-y-1/2 z-10 text-purple-600 p-2 rounded-full cursor-pointer "></div>
        <div className="swiper-button-next absolute right-4 top-2/3 transform -translate-y-1/2 z-10 text-purple-600 p-2 rounded-full cursor-pointer "></div>

        <div className="swiper-pagination mt-6"></div>
      </div>
    </section>
  );
};

export default Testimonials;
