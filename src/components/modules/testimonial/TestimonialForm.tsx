"use client";
import { createTestimonial, getTestimonials } from "@/services/Testmonial";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TestimonialForm = ({
  onNewTestimonial,
}: {
  onNewTestimonial: () => void;
}) => {
  const [formData, setFormData] = useState({
    message: "",
    rating: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createTestimonial(formData);

      if (response?.success) {
        toast.success(response.message);

        // Reset form
        setFormData({ message: "", rating: 5 });

        // Trigger parent function to refresh testimonials
        onNewTestimonial();
      } else {
        toast.error(response.message);
        throw new Error(response?.message || "Failed to submit testimonial");
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Share Your Experience
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message Field */}
        <div>
          <label className="text-gray-600 font-medium">Your Testimonial</label>
          <Textarea
            placeholder="Write your message..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full mt-1"
            required
          />
        </div>

        {/* Rating Slider */}
        <div>
          <label className="text-gray-600 font-medium">Rate Us</label>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-yellow-500">
              {formData.rating} ⭐
            </span>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[formData.rating]}
              onValueChange={(value) =>
                setFormData({ ...formData, rating: value[0] })
              }
              className="w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Submit Testimonial
        </Button>
      </form>
    </div>
  );
};

export default TestimonialForm;
