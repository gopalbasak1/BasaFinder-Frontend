"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-6 bg-white rounded-2xl shadow-lg max-w-md"
      >
        <motion.h1
          className="text-6xl font-bold text-primary"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          404
        </motion.h1>
        <p className="mt-4 text-gray-600 text-lg">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button
          className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          onClick={() => (window.location.href = "/")}
        >
          Go Home
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
