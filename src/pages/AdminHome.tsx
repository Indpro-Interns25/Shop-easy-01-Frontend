import React from 'react'

type Props = {
  onLoginClick?: () => void
  onAdminClick?: () => void
  onBackClick?: () => void
}

const AdminHome: React.FC<Props> = ({ onLoginClick, onAdminClick, onBackClick }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-amber-50">
      <div className="max-w-2xl text-center p-8">
        {/* Back to Home Button */}
        <div className="mb-8">
          <button
            onClick={onBackClick}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium shadow-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to ShopEasy
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-4">Welcome to ShopEasy Admin</h1>
        <p className="text-lg text-gray-700 mb-6">Manage your products, orders, and customers from the admin dashboard.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onLoginClick}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold shadow-lg transition-colors"
          >
            Admin Login
          </button>
          <button
            onClick={onAdminClick}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg transition-colors"
          >
            Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminHome