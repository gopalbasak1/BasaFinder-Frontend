"use client";

import { createTips } from "@/services/Tips";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const TipsForm = ({ onNewTip }: { onNewTip: () => void }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await createTips(formData);
      if (response.success) {
        alert("✅ Tip Submitted Successfully!");
        setFormData({ title: "", content: "" });
        onNewTip(); // Refresh the tips list
      } else {
        setError(response.message || "Failed to submit tip.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white/60  rounded-3xl">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-[#36185e] ">
        ✨ Share a Useful Tip
      </h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title Field */}
        <div>
          <label className="text-[#324f9f] font-medium">Title</label>
          <Input
            type="text"
            placeholder="Enter tip title..."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="mt-2 p-3 w-full border rounded-lg text-[#36185e] bg-white/20  placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />
        </div>

        {/* Content Field */}
        <div>
          <label className="text-[#324f9f] font-medium">Content</label>
          <Textarea
            placeholder="Write your tip..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
            className="mt-2 p-3 w-full border rounded-lg text-[#36185e] bg-white/20  placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 rounded-full text-white font-bold bg-[#c9d6d6] hover:text-amber-800 hover:bg-white/30 transition duration-300 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "Submit Tip"
          )}
        </Button>
      </form>
    </div>
  );
};

export default TipsForm;
