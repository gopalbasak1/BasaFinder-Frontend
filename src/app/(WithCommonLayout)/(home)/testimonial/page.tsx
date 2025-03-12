"use client";
import { useState } from "react";
import TestimonialForm from "@/components/modules/testimonial/TestimonialForm";
import Testimonials from "@/components/modules/testimonial/Testimonials";

const TestimonialPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleNewTestimonial = () => {
    setRefresh((prev) => !prev); // ✅ Toggle refresh to trigger re-fetch
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Testimonials</h1>
      <TestimonialForm onNewTestimonial={handleNewTestimonial} />
      <Testimonials refresh={refresh} />
    </div>
  );
};

export default TestimonialPage;
