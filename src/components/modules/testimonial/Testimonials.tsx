"use client";
import { useEffect, useState } from "react";
import { getTestimonials } from "@/services/Testmonial";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Testimonial {
  _id: string;
  message: string;
  rating: number;
  user: {
    name: string;
    imageUrls: string[]; // Assuming the user image is an array of URLs
  };
}

const Testimonials = ({ refresh }: { refresh: boolean }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = async () => {
    try {
      const response = await getTestimonials();
      if (response.success) {
        setTestimonials(response.data);
      } else {
        console.error("Failed to fetch testimonials:", response.message);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [refresh]); // ✅ Refetch when `refresh` changes

  return (
    <section className="py-10 px-5 md:px-10 lg:px-20  my-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        What Our Users Say
      </h2>

      {/* Testimonial Slider */}
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-4xl mx-auto"
      >
        {testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <div className="bg-white p-6 shadow-lg rounded-xl flex flex-col items-center text-center">
                {/* User Image */}
                <img
                  src={testimonial.user?.imageUrls[0] || "/default-user.png"}
                  alt="User"
                  className="w-16 h-16 rounded-full object-cover mb-3"
                />
                <h3 className="font-semibold text-lg">
                  {testimonial.user?.name || "Anonymous"}
                </h3>
                <p className="text-gray-700 mt-2">
                  {testimonial.message.slice(0, 50)}...
                </p>
                <p className="text-yellow-500 mt-2">
                  {"⭐".repeat(testimonial.rating)}
                </p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center">No testimonials yet.</p>
        )}
      </Swiper>
    </section>
  );
};

export default Testimonials;
