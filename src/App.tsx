import { useState } from 'react'
import Home from './pages/home'
import Login from './authentication/login'
import Signup from './authentication/signup'
import Cart from './user/cart'
import Wishlist from './user/wishlist'
import Navbar from './pages/navbar'
import Admin from './admin';
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import './index.css'

function AppContent() {
  const [page, setPage] = useState<'home' | 'login' | 'signup' | 'cart' | 'wishlist'>('home')
  const { isAuthenticated, user, logout } = useAuth()

  // Check if current user is admin (hardcoded email)
  const isAdmin = isAuthenticated && user?.email === 'tester@gmail.com'

  // If admin is logged in, show admin dashboard
  if (isAdmin) {
    return (
      <div className="relative">
        <Admin />
        {/* Add logout button for admin */}
        <button
          onClick={() => {
            logout()
            setPage('home')
          }}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg"
        >
          Logout Admin
        </button>
      </div>
    )
  }

  return (
    <>
      {page !== 'login' && page !== 'signup' && (
        <Navbar
          onCart={() => setPage('cart')}
          onWishlist={() => setPage('wishlist')}
          onLogin={() => setPage('login')}
          onProfile={() => alert('Profile clicked')}
          onLogout={() => {
            logout()
            setPage('home')
          }}
        />
      )}
      <div className={page !== 'login' && page !== 'signup' ? "mt-4" : ""}>
        {page === 'home' && (
          <Home
            onLoginClick={() => setPage('login')}
            onCartClick={() => setPage('cart')}
            onWishlistClick={() => setPage('wishlist')}
          />
        )}
        {page === 'login' && <Login onClose={() => setPage('home')} onSignupClick={() => setPage('signup')} />}
        {page === 'signup' && <Signup onClose={() => setPage('home')} onLoginClick={() => setPage('login')} />}
        {page === 'cart' && (
          <Cart onBack={() => setPage('home')} onOpenWishlist={() => setPage('wishlist')} />
        )}
        {page === 'wishlist' && <Wishlist onBack={() => setPage('home')} onOpenCart={() => setPage('cart')} />}
      </div>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
