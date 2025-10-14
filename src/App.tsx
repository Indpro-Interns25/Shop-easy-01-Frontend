import { useState } from 'react'
import Home from './pages/home'
import Login from './authentication/login'
import Signup from './authentication/signup'
import Cart from './user/cart'
import Wishlist from './user/wishlist'
import Navbar from './pages/navbar'
import ConnectionTest from './components/ConnectionTest'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

function App() {
  const [page, setPage] = useState<'home' | 'login' | 'signup' | 'cart' | 'wishlist'>('home')

  return (
    <AuthProvider>
      <ConnectionTest />
      {page !== 'login' && page !== 'signup' && (
        <Navbar
          onCart={() => setPage('cart')}
          onWishlist={() => setPage('wishlist')}
          onLogin={() => setPage('login')}
          onProfile={() => alert('Profile clicked')}
          onLogout={() => setPage('home')}
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
    </AuthProvider>
  )
}

export default App
