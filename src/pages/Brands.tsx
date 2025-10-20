import React from "react";

// --- ShopEase Logo Icon (for consistency) ---
const ShopEaseLogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-12 h-12 text-amber-800" // Main accent color
  >
    <path
      fillRule="evenodd"
      d="M1.5 6A2.25 2.25 0 013.75 3h16.5a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0120.25 18H3.75A2.25 2.25 0 011.5 15.75V6zM8.25 9a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75V9zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H9zM12 9a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V9zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12zM15.75 9a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75V9zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H15.75zM12 2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12.75a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Icons for this page ---
const QualityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
    />
  </svg>
);

const DesignIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.43 2.43a3 3 0 001.128 5.78m1.128-5.78l-1.128 5.78m0 0a3 3 0 005.78-1.128 2.25 2.25 0 012.43-2.43a3 3 0 00-1.128-5.78m-1.128 5.78l1.128-5.78m0 0a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.43 2.43a3 3 0 001.128 5.78m1.128-5.78l-1.128 5.78m5.78-1.128a3 3 0 00-5.78-1.128 2.25 2.25 0 01-2.43-2.43a3 3 0 001.128-5.78m1.128 5.78l-1.128-5.78"
    />
  </svg>
);

const EthicalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

// --- SVG Brand Logo Components ---

const LogoAura = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={className}
    aria-label="Aura Logo"
  >
    <path d="M3.63 15.1C2.59 13.9 2 12.5 2 11c0-2.2 1.8-4 4-4 1.5 0 2.9 1 3.6 2.4" />
    <path d="M6.3 18.7C5.25 17.5 4.6 16.1 4.6 14.6c0-2.2 1.8-4 4-4 1.5 0 2.9 1 3.6 2.4" />
    <path d="M9 22.3C7.94 21.1 7.2 19.7 7.2 18.2c0-2.2 1.8-4 4-4 1.5 0 2.9 1 3.6 2.4" />
  </svg>
);

const LogoSolstice = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={className}
    aria-label="Solstice Logo"
  >
    <path d="M4 18h16" />
    <path d="M6 18c0-3.31 2.69-6 6-6s6 2.69 6 6" />
    <path d="M12 2v2" />
    <path d="M18.36 5.64l-1.41 1.41" />
    <path d="M5.64 5.64l1.41 1.41" />
  </svg>
);

const LogoEvolve = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={className}
    aria-label="Evolve Logo"
  >
    <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2c5.52 0 10 4.48 10 10" />
    <path d="M12 4a8 8 0 0 0-8 8h8V4z" />
  </svg>
);

const LogoMomentum = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-label="Momentum Logo"
  >
    <path d="M4.5 4.5h6v15h-6z" />
    <path d="M13.5 4.5h6v15h-6z" />
  </svg>
);

const LogoTerra = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={className}
    aria-label="Terra Logo"
  >
    <path d="M3 18l6-6 4 4 8-8" />
    <path d="M3 12l6-6 4 4 8-8" />
  </svg>
);

const LogoVertex = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={className}
    aria-label="Vertex Logo"
  >
    <path d="M2 3l10 18L22 3" />
    <path d="M12 21V11" />
  </svg>
);

// --- Data for Page ---
const brandLogos = [
  {
    name: "Aura",
    logo: <LogoAura className="w-auto h-12" />, // Use component
  },
  {
    name: "Solstice",
    logo: <LogoSolstice className="w-auto h-12" />, // Use component
  },
  {
    name: "Evolve",
    logo: <LogoEvolve className="w-auto h-12" />, // Use component
  },
  {
    name: "Momentum",
    logo: <LogoMomentum className="w-auto h-12" />, // Use component
  },
  {
    name: "Terra",
    logo: <LogoTerra className="w-auto h-12" />, // Use component
  },
  {
    name: "Vertex",
    logo: <LogoVertex className="w-auto h-12" />, // Use component
  },
];

const brandValues = [
  {
    icon: <QualityIcon />,
    title: "Premium Quality",
    description: "Every item is vetted for superior craftsmanship and durability.",
  },
  {
    icon: <DesignIcon />,
    title: "Trendsetting Design",
    description: "We partner with brands that are at the forefront of fashion.",
  },
  {
    icon: <EthicalIcon />,
    title: "Ethical Practices",
    description: "A focus on sustainability and ethical sourcing you can trust.",
  },
];

// --- The Improved Component ---

type BrandsProps = {
  onNavigate?: (page: "home") => void;
};

const Brands: React.FC<BrandsProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-custom-brown">
      {/* Header Section */}
      <header className="bg-gradient-to-br from-rose-100 via-orange-50 to-pink-100 shadow-lg">
        <div className="max-w-6xl mx-auto py-20 px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <ShopEaseLogoIcon />
            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight ml-4">
              Our Brands
            </h1>
          </div>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore the curated collection of brands we proudly collaborate with.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main>
        {/* Featured Brands Grid */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              Featured Partners
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {brandLogos.map((brand) => (
                <div
                  key={brand.name}
                  className="bg-rose-50 p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105 text-amber-800" // Set color here, and flex-col for name
                >
                  {/* Render the logo component directly */}
                  {brand.logo}
                  <p className="mt-4 text-xl font-semibold text-gray-800">
                    {brand.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Brands Section */}
        <section className="bg-gradient-to-br from-rose-100 via-orange-50 to-pink-100 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
              Our Brand Promise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {brandValues.map((value) => (
                <div
                  key={value.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-white/50 text-amber-800 rounded-full mb-5 shadow-inner">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Back Button Footer */}
      <footer className="py-12 text-center bg-custom-brown">
        <button
          onClick={() => onNavigate?.("home")}
          className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Back to Home
        </button>
      </footer>
    </div>
  );
};

export default Brands;