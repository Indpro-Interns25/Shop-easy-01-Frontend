import React from 'react'

type Props = {
  onLoginClick?: () => void
  onAdminClick?: () => void
}

const Home: React.FC<Props> = ({ onLoginClick, onAdminClick }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-amber-50">
      <div className="max-w-2xl text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShopEasy</h1>
        <p className="text-lg text-gray-700 mb-6">Discover curated products and great deals — shop smarter, live better.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onLoginClick}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold shadow-lg transition-colors"
          >
            Login
          </button>
          <button
            onClick={onAdminClick}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg transition-colors"
          >
            Admin Panel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
