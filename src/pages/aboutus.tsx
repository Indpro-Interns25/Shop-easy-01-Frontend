import React from "react";

type AboutUsProps = {
  onNavigate?: (page: "home") => void;
};

const AboutUs: React.FC<AboutUsProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-custom-brown">
      {/* Header Section */}
      <header className="bg-gradient-to-br from-rose-100 via-orange-50 to-pink-100 py-12 px-6 rounded-b-3xl shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="text-lg text-gray-600 mt-4">
            Learn more about ShopEase and our mission to provide the best
            shopping experience.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              At ShopEase, our mission is to make shopping easy, accessible, and
              enjoyable for everyone. We aim to provide high-quality products at
              affordable prices while delivering exceptional customer service.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600">
              We envision a world where shopping is seamless and personalized.
              Our goal is to become the leading e-commerce platform, empowering
              customers to express themselves through style and innovation.
            </p>
          </div>

          {/* Values Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Customer satisfaction is our top priority.</li>
              <li>We believe in transparency and trust.</li>
              <li>Innovation drives our growth.</li>
              <li>We are committed to sustainability and ethical practices.</li>
            </ul>
          </div>

          {/* Team Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600">
              Our team is made up of passionate individuals dedicated to
              creating the best shopping experience for you. From developers to
              customer support, we work together to bring you the best.
            </p>
          </div>
        </div>
      </main>

      {/* Back Button */}
      <footer className="py-6 text-center">
        <button
          onClick={() => onNavigate?.("home")}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-semibold shadow-md"
        >
          Back to Home
        </button>
      </footer>
    </div>
  );
};

export default AboutUs;
