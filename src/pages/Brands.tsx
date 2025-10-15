import React from "react";

type BrandsProps = {
  onNavigate?: (page: "home") => void;
};

const Brands: React.FC<BrandsProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-custom-brown">
      {/* Header Section */}
      <header className="bg-gradient-to-br from-rose-100 via-orange-50 to-pink-100 py-12 px-6 rounded-b-3xl shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800">Brands</h1>
          <p className="text-lg text-gray-600 mt-4">
            Explore the top brands we collaborate with to bring you the best
            products.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Brands Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Featured Brands
            </h2>
            <p className="text-gray-600">
              We partner with globally recognized brands to ensure quality and
              style. Some of our featured brands include:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-4">
              <li>Brand A - Known for its premium quality.</li>
              <li>Brand B - A leader in sustainable fashion.</li>
              <li>Brand C - Trendsetting designs for all.</li>
              <li>Brand D - Affordable and stylish options.</li>
            </ul>
          </div>

          {/* Why Choose Our Brands Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Why Choose Our Brands?
            </h2>
            <p className="text-gray-600">
              Our brands are carefully selected to provide you with the best
              shopping experience. We prioritize:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-4">
              <li>Quality assurance.</li>
              <li>Innovative designs.</li>
              <li>Ethical and sustainable practices.</li>
              <li>Affordable pricing.</li>
            </ul>
          </div>

          {/* Customer Favorites Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Customer Favorites
            </h2>
            <p className="text-gray-600">
              Discover the brands our customers love the most. From timeless
              classics to modern trends, we have something for everyone.
            </p>
          </div>

          {/* Collaboration Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Collaborations
            </h2>
            <p className="text-gray-600">
              We work closely with our brand partners to bring you exclusive
              collections and limited-edition products.
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

export default Brands;
