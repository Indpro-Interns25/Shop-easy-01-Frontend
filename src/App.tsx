import { useState } from 'react'
import Home from './pages/home'
import Login from './authentication/login'
import Cart from './user/cart'
import Wishlist from './user/wishlist'
import './index.css'

function App() {
  const [page, setPage] = useState<'home' | 'login' | 'cart' | 'wishlist'>('home')

  return (
    <>
      {page === 'home' && (
        <Home
          onLoginClick={() => setPage('login')}
          onCartClick={() => setPage('cart')}
          onWishlistClick={() => setPage('wishlist')}
        />
      )}

      {page === 'login' && <Login onClose={() => setPage('home')} />}

      {page === 'cart' && (
        <Cart onBack={() => setPage('home')} onOpenWishlist={() => setPage('wishlist')} />
      )}

      {page === 'wishlist' && <Wishlist onBack={() => setPage('home')} onOpenCart={() => setPage('cart')} />}
    </>
  )
}

export default App
