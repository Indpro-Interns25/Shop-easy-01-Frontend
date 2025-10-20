import React from "react";

// --- ShopEase Logo Icon (New SVG) ---
const ShopEaseLogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-12 h-12 text-[#C18855]" // Using your accent color
  >
    <path
      fillRule="evenodd"
      d="M1.5 6A2.25 2.25 0 013.75 3h16.5a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0120.25 18H3.75A2.25 2.25 0 011.5 15.75V6zM8.25 9a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75V9zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H9zM12 9a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V9zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12zM15.75 9a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75V9zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H15.75zM12 2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12.75a.75.75 0 01-.75-.75z"
    clipRule="evenodd"
    />
  </svg>
);


// --- Other Icon Components (Heroicons) ---
// Using inline SVGs so you don't need to install a new library.

const FlagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-[#C18855]" // Adjusted to match the button/accent color
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3v1.5M3 21v-6m0 6H.75m0 0v-6.128a1.125 1.125 0 011.125-1.125h11.25M3 21h18M3 21v-6.128a1.125 1.125 0 00-1.125-1.125H.75m11.25 0v-1.5c0-.621.504-1.125 1.125-1.125h3.375c.621 0 1.125.504 1.125 1.125v1.5m0 0h1.5m-1.5 0l-3.75-3.75M12.75 9l-3.75 3.75m0 0V3.75M9 12.75h3.75M3 3h1.5M3.75 3h16.5M21 3v1.5m0 16.5v-6.128a1.125 1.125 0 00-1.125-1.125h-3.375c-.621 0-1.125.504-1.125 1.125v1.5m0 0H18m-1.5 0l3.75-3.75M18 9l3.75 3.75m0 0V3.75m-3.75 9h3.75"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-[#C18855]" // Adjusted
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const ValueIcon = ({ type }: { type: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    customer: (
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
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A1.875 1.875 0 0118 22.5H6.001c-.966 0-1.801-.73-1.874-1.688z"
        />
      </svg>
    ),
    trust: (
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
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    innovation: (
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
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-3.75 0m3.75 0a12.06 12.06 0 00-3.75 0m-3.75 0l.117-.008c.03-.002.06-.005.09-.008m-3.181 0l.117-.008c.03-.002.06-.005.09-.008m0-7.478l-.117.008c-.03.002-.06.005-.09.008M3 12l.117.008c.03.002.06.005.09.008m0 0l.117.008c.03.002.06.005.09.008M3 12a9 9 0 0118 0m-18 0a9 9 0 0018 0m-9 9c3.866 0 7-4.03 7-9s-3.134-9-7-9-7 4.03-7 9 3.134 9 7 9z"
        />
      </svg>
    ),
    sustainability: (
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
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  };
  return icons[type] || null;
};

// --- Data for sections (cleaner) ---

const values = [
  {
    icon: "customer",
    title: "Customer First",
    description: "Our customers are at the heart of everything we do.",
  },
  {
    icon: "trust",
    title: "Transparency & Trust",
    description: "We believe in open communication and ethical practices.",
  },
  {
    icon: "innovation",
    title: "Drive Innovation",
    description: "We relentlessly pursue new ways to improve.",
  },
  {
    icon: "sustainability",
    title: "Be Sustainable",
    description: "We are committed to a healthier planet.",
  },
];

const team = [
  {
    name: "Alex Johnson",
    title: "CEO & Founder",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&q=80&auto=format",
  },
  {
    name: "Maria Garcia",
    title: "Head of Engineering",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29130?w=100&h=100&fit=crop&q=80&auto=format",
  },
  {
    name: "David Kim",
    title: "Lead Designer",
    img: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=100&h=100&fit=crop&q=80&auto=format",
  },
];

// --- The Improved Component ---

type AboutUsProps = {
  onNavigate?: (page: "home") => void;
};

const AboutUs: React.FC<AboutUsProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FDF9F6] text-gray-800">
      {/* Header Section */}
      <header className="bg-gradient-to-br from-rose-100 via-orange-50 to-pink-100 shadow-sm">
        <div className="max-w-6xl mx-auto py-20 px-6 text-center">
          <div className="flex items-center justify-center mb-4"> {/* Flex container for icon and text */}
            <ShopEaseLogoIcon />
            <h1 className="text-5xl font-extrabold text-[#2C2C2C] leading-tight ml-4"> {/* Added margin-left */}
              We're ShopEase.
            </h1>
          </div>
          <p className="text-xl text-gray-500 mt-4 max-w-2xl mx-auto">
            Our mission is to make shopping easy, accessible, and enjoyable for
            everyone.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main>
        {/* Mission & Vision Section */}
        <section className="py-16 px-6 bg-[#FDF9F6]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex-shrink-0 p-3 bg-[#F4E3D2] rounded-full mb-4">
                <FlagIcon />
              </div>
              <h2 className="text-3xl font-bold text-[#2C2C2C] mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600">
                We aim to provide high-quality products at affordable prices
                while delivering exceptional customer service. We believe in a
                shopping experience that's simple, fun, and reliable.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex-shrink-0 p-3 bg-[#F4E3D2] rounded-full mb-4">
                <EyeIcon />
              </div>
              <h2 className="text-3xl font-bold text-[#2C2C2C] mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600">
                We envision a world where shopping is seamless and
                personalized. Our goal is to empower customers to express
                themselves through style and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#2C2C2C] mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#F4E3D2] text-[#C18855] rounded-full mx-auto mb-4">
                    <ValueIcon type={value.icon} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2C2C2C] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-[#FDF9F6] py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#2C2C2C] mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#F4E3D2] object-cover"
                  />
                  <h3 className="text-xl font-semibold text-[#2C2C2C]">
                    {member.name}
                  </h3>
                  <p className="text-[#C18855] font-medium">{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Back Button Footer */}
      <footer className="py-12 text-center bg-[#FDF9F6]">
        <button
          onClick={() => onNavigate?.("home")}
          className="px-8 py-3 bg-[#C18855] hover:bg-[#A8764B] text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C18855] focus:ring-opacity-50 transform hover:scale-105"
        >
          Back to Home
        </button>
      </footer>
    </div>
  );
};

export default AboutUs;