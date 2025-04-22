import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star, Quote, ChevronDown, ChevronUp } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);
  
  // Character limit for testimonial preview
  const CHAR_LIMIT = 130;

  const toggleExpand = (id) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/testimonials");
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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 text-center">
        <p>{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  const isContentLong = (content) => content.length > CHAR_LIMIT;

  return (
    <section className="bg-white py-16 text-purple-900 rounded-lg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <h2 className="text-center text-4xl font-bold mb-4 text-purple-800">
          What Our <span className="text-purple-600">Clients Say</span>
        </h2>
        
        <p className="text-center text-purple-600 mb-12 max-w-2xl mx-auto">
          Discover why clients love working with us – real feedback from real people who have experienced our services firsthand.
        </p>
        
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
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
          modules={[Navigation, Pagination, Autoplay]}
          className="testimonial-slider"
        >
          {testimonials.map((testimonial, index) => {
            const isExpanded = expandedIds.includes(index);
            const needsExpansion = isContentLong(testimonial.content);
            
            return (
              <SwiperSlide key={index}>
                <div className="p-6">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative border border-purple-100">
                    <div className="absolute -top-4 right-8">
                      <Quote className="w-10 h-10 text-purple-200" />
                    </div>
                    
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    
                    <div className="text-gray-600 mb-6 italic">
                      {needsExpansion && !isExpanded ? (
                        <p>
                          "{testimonial.content.substring(0, CHAR_LIMIT)}...{" "}
                          <button 
                            onClick={() => toggleExpand(index)}
                            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-normal transition-colors"
                          >
                            Read more
                            <ChevronDown className="ml-1 w-4 h-4" />
                          </button>
                          "
                        </p>
                      ) : needsExpansion && isExpanded ? (
                        <p>
                          "{testimonial.content}{" "}
                          <button 
                            onClick={() => toggleExpand(index)}
                            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-normal transition-colors"
                          >
                            Show less
                            <ChevronUp className="ml-1 w-4 h-4" />
                          </button>
                          "
                        </p>
                      ) : (
                        <p>"{testimonial.content}"</p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      {testimonial.avatar && (
                        <div className="mr-4">
                          <img 
                            src={testimonial.avatar || "/api/placeholder/48/48"} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-purple-800">
                          {testimonial.name}
                        </div>
                        <div className="text-purple-500 text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        
        <div className="swiper-button-prev hidden sm:flex absolute left-0 top-2/3 transform -translate-y-1/2 z-10  text-purple-600 w-10 h-10 items-center justify-center   cursor-pointer  transition-colors"></div>
        <div className="swiper-button-next hidden sm:flex absolute right-0 top-2/3 transform -translate-y-1/2 z-10  text-purple-600 w-10 h-10 items-center justify-center   cursor-pointer  transition-colors"></div>
        
        <div className="swiper-pagination mt-8"></div>
      </div>
    </section>
  );
};

export default Testimonials;