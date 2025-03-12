import React from "react";

const FAQPage = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 text-center">FAQ</h1>
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">
            How do I find a rental property?
          </h3>
          <p className="text-gray-700">
            You can browse our listings and use filters to narrow down your
            search.
          </p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">What is BasaFinder?</h3>
          <p className="text-gray-700">
            BasaFinder is a platform connecting renters with landlords easily
            and securely.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
