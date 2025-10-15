import React, { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'
import { api } from '../utils/api'

type Props = {
  onCart?: () => void
  onWishlist?: () => void
  onLogin?: () => void
  onProfile?: () => void
  onLogout?: () => void
}

const CART_KEY = 'shopeasy_cart'
const WISHLIST_KEY = 'shopeasy_wishlist'

function readCount(key: string) {
  try {
    const raw = localStorage.getItem(key)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0) : 0
  } catch {
    return 0
  }
}

const Navbar: React.FC<Props> = ({ onCart, onWishlist, onLogin, onProfile, onLogout }) => {
  const { isAuthenticated, logout, token } = useAuth()
  const [cartCount, setCartCount] = useState(0)
  const [wishCount, setWishCount] = useState(0)

  const fetchCounts = useCallback(async () => {
    if (isAuthenticated && token) {
      try {
        // Fetch database counts
        const [cartResponse, wishlistResponse] = await Promise.all([
          api.getCartCount(token),
          api.getWishlistCount(token)
        ])
        
        if (cartResponse.success) {
          setCartCount(cartResponse.data.count)
        }
        if (wishlistResponse.success) {
          setWishCount(wishlistResponse.data.count)
        }
      } catch (error) {
        console.error('Error fetching counts:', error)
        // Fallback to localStorage
        setCartCount(readCount(CART_KEY))
        setWishCount(readCount(WISHLIST_KEY))
      }
    } else {
      // Use localStorage for non-authenticated users
      setCartCount(readCount(CART_KEY))
      setWishCount(readCount(WISHLIST_KEY))
    }
  }, [isAuthenticated, token])

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout()
      // Reset counts after logout
      setCartCount(readCount(CART_KEY))
      setWishCount(readCount(WISHLIST_KEY))
      onLogout?.()
    } else {
      onLogin?.()
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [fetchCounts])

  useEffect(() => {
    const onStorage = () => {
      if (!isAuthenticated) {
        setCartCount(readCount(CART_KEY))
        setWishCount(readCount(WISHLIST_KEY))
      }
    }
    
    const onCartUpdated = () => {
      if (isAuthenticated && token) {
        fetchCounts()
      } else {
        setCartCount(readCount(CART_KEY))
      }
    }
    
    const onWishUpdated = () => {
      if (isAuthenticated && token) {
        fetchCounts()
      } else {
        setWishCount(readCount(WISHLIST_KEY))
      }
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener('cart-updated', onCartUpdated as EventListener)
    window.addEventListener('wishlist-updated', onWishUpdated as EventListener)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('cart-updated', onCartUpdated as EventListener)
      window.removeEventListener('wishlist-updated', onWishUpdated as EventListener)
    }
  }, [isAuthenticated, token, fetchCounts])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 px-6 py-3 flex items-center justify-between transition-all duration-200 backdrop-blur-md bg-white/6 border-b border-white/8"
    >
      <div>
        <button onClick={onProfile} title="Profile" aria-label="Open profile" className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center text-white">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={onCart}
            aria-label="Open cart"
            title="Cart"
            className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center text-white"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-500 text-white">{cartCount}</span>
        </div>

        <div className="relative">
          <button
            onClick={onWishlist}
            aria-label="Open wishlist"
            title="Wishlist"
            className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center text-white"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61c-.39-.38-1.02-.38-1.41 0L12 11.04 4.57 4.6a1 1 0 0 0-1.41 1.42l7.42 7.46L3.16 20.9a1 1 0 1 0 1.41 1.41l7.43-7.41 7.4 7.38a1 1 0 0 0 1.41-1.41L13.83 13.5l7.01-7.09c.38-.39.38-1.02 0-1.4z" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-400 text-white">{wishCount}</span>
        </div>

        <button
          onClick={handleAuthAction}
          aria-label={isAuthenticated ? "Logout" : "Login"}
          title={isAuthenticated ? "Logout" : "Login"}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 flex items-center justify-center text-white"
        >
          {isAuthenticated ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12H9" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 17L15 12 10 7" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
