"use client";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-white shadow-lg rounded-2xl"
      >
        <AlertCircle className="text-red-500 w-16 h-16 mx-auto" />
        <h1 className="text-3xl font-bold mt-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mt-2">
          We couldn’t load the page you requested.
        </p>

        <div className="flex justify-center space-x-4 mt-6">
          <Button onClick={() => (window.location.href = "/")}>Go Home</Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="w-5 h-5 mr-2" />
            Reload
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
