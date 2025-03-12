const News = () => {
  return (
    <div>
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Latest News
        </h1>
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">
              New Rental Properties Added
            </h3>
            <p className="text-gray-700">
              We've expanded our listings with new apartments in prime
              locations.
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">BasaFinder App Launch</h3>
            <p className="text-gray-700">
              Our mobile app is now live! Download and find your perfect rental
              easily.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
