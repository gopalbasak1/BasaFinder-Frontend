import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - BasaFinder",
  description:
    "Read our privacy policy to understand how we collect, use, and protect your personal data.",
};

const PrivacyPolicy = () => {
  return (
    <div>
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-700 mt-6">
          We respect your privacy and ensure that your personal data is
          protected. Any information collected is used to improve services.
        </p>
        <p className="text-gray-700 mt-2">
          We do not share your personal data with third parties without your
          consent.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
