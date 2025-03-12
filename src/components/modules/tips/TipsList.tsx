"use client";

import { getTips } from "@/services/Tips";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Tip {
  _id: string;
  title: string;
  content: string;
}

const TipsList = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState("");

  const fetchTips = async () => {
    setLoading(true);
    try {
      const response = await getTips();
      const tipsData = response?.data || [];

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userRole = storedUser?.role || "";
      setCurrentUserRole(userRole);

      const filteredTips =
        userRole === "admin"
          ? tipsData
          : tipsData.filter((tip: any) => tip.user?.role !== "admin");

      setTips(filteredTips);
    } catch (error) {
      console.error("Error fetching tips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  return (
    <section className="max-w-5xl  mx-auto py-12 px- bg-white/60  rounded-xl shadow-xl my-10">
      <h2 className="text-4xl font-extrabold text-center text-[#b735e3] ">
        🏡 Rental Tips for Smart Choices
      </h2>

      {loading ? (
        <p className="text-center mt-6 text-gray-300 animate-pulse">
          Loading tips...
        </p>
      ) : tips.length > 0 ? (
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="mt-8"
        >
          {tips.map((tip) => (
            <SwiperSlide key={tip._id}>
              <div className="p-6 border-t-2 border-b-white border-b-2  shadow-lg rounded-2xl border-l-8 border-yellow-500 hover:shadow-2xl transition-all duration-300 text-red-900">
                <h3 className="text-2xl font-semibold ">{tip.title}</h3>
                <p className="text-gray-700 mt-3 leading-relaxed">
                  {tip.content}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-300 mt-6">No tips available yet.</p>
      )}
    </section>
  );
};

export default TipsList;
