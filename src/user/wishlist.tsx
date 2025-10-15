import React, { useEffect, useState, useCallback } from 'react'
import { api } from '../utils/api'
import { useAuth } from '../hooks/useAuth'

type Product = {
  id: string
  name: string
  price: number
  image?: string
  quantity?: number
  description?: string
  stock?: number
}

type Props = {
  onBack?: () => void
  onOpenCart?: () => void
}

const Wishlist: React.FC<Props> = ({ onBack, onOpenCart }) => {
  const { token, isAuthenticated } = useAuth()
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWishlistItems = useCallback(async () => {
    if (!token) return
    
    try {
      setLoading(true)
      setError(null)
      const response = await api.getWishlistItems(token)
      
      if (response.success) {
        // Transform database response to match frontend Product type
        const wishlistItems = response.data.map((item: {
          product_id: string;
          name: string;
          price: string;
          image: string;
          description: string;
          stock: number;
        }) => ({
          id: item.product_id,
          name: item.name,
          price: parseFloat(item.price),
          image: item.image,
          description: item.description,
          stock: item.stock
        }))
        setItems(wishlistItems)
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err)
      setError(err instanceof Error ? err.message : 'Failed to load wishlist')
      // Fallback to localStorage
      setItems(readWishlist())
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchWishlistItems()
    } else {
      // Fallback to localStorage for non-authenticated users
      setItems(readWishlist())
      setLoading(false)
    }
  }, [isAuthenticated, token, fetchWishlistItems])

  const removeItem = async (id: string) => {
    if (isAuthenticated && token) {
      try {
        await api.removeFromWishlist(token, id)
        setItems(prev => prev.filter(p => p.id !== id))
        window.dispatchEvent(new Event('wishlist-updated'))
      } catch (err) {
        console.error('Error removing from wishlist:', err)
        setError(err instanceof Error ? err.message : 'Failed to remove item')
      }
    } else {
      // Fallback to localStorage
      setItems(prev => prev.filter(p => p.id !== id))
      writeWishlist(items.filter(p => p.id !== id))
      window.dispatchEvent(new Event('wishlist-updated'))
    }
  }

  const moveToCart = async (id: string) => {
    const prod = items.find(p => p.id === id)
    if (!prod) return

    if (isAuthenticated && token) {
      try {
        await api.addToCart(token, id, 1)
        await removeItem(id)
        window.dispatchEvent(new Event('cart-updated'))
        onOpenCart?.()
      } catch (err) {
        console.error('Error moving to cart:', err)
        setError(err instanceof Error ? err.message : 'Failed to move to cart')
      }
    } else {
      // Fallback to localStorage
      const cart = readCart()
      if (!cart.find(c => c.id === id)) {
        writeCart([...cart, { ...prod, quantity: 1 }])
        window.dispatchEvent(new Event('cart-updated'))
      }
      // Remove from wishlist after successfully adding to cart
      setItems(prev => prev.filter(p => p.id !== id))
      writeWishlist(items.filter(p => p.id !== id))
      window.dispatchEvent(new Event('wishlist-updated'))
      onOpenCart?.()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen page-bg py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white/80">Loading wishlist...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen page-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61c-.39-.38-1.02-.38-1.41 0L12 11.04 4.57 4.6a1 1 0 0 0-1.41 1.42l7.42 7.46L3.16 20.9a1 1 0 1 0 1.41 1.41l7.43-7.41 7.4 7.38a1 1 0 0 0 1.41-1.41L13.83 13.5l7.01-7.09c.38-.39.38-1.02 0-1.4z" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 className="text-3xl font-bold text-white drop-shadow">Your Wishlist</h2>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={onOpenCart} 
              className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded text-white text-sm hover:bg-white/20"
            >
              Open Cart
            </button>
            <button 
              onClick={onBack} 
              className="px-3 py-1 bg-white/10 border border-white/10 rounded text-white text-sm hover:bg-white/20"
            >
              Back
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4 text-red-200">
            <p className="text-sm">⚠️ {error}</p>
          </div>
        )}

        {items.length === 0 ? (
          <div className="bg-white/6 rounded-xl p-12 text-center shadow-lg backdrop-blur-md border border-white/8 text-white">
            <svg className="mx-auto mb-4 h-12 w-12 text-white/80" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61c-.39-.38-1.02-.38-1.41 0L12 11.04 4.57 4.6a1 1 0 0 0-1.41 1.42l7.42 7.46L3.16 20.9a1 1 0 1 0 1.41 1.41l7.43-7.41 7.4 7.38a1 1 0 0 0 1.41-1.41L13.83 13.5l7.01-7.09c.38-.39.38-1.02 0-1.4z" />
            </svg>
            <h3 className="text-2xl font-semibold">No items in wishlist</h3>
            <p className="text-sm text-white/80 mt-2">Tap the heart icon on products to save them for later.</p>
            {!isAuthenticated && (
              <p className="text-xs text-amber-300 mt-2">💡 Sign in to sync your wishlist across devices</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((it) => (
              <div key={it.id} className="bg-white/6 rounded-lg p-4 flex gap-4 items-center shadow-lg backdrop-blur-md border border-white/8 text-white">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-pink-500 rounded overflow-hidden flex items-center justify-center text-white font-bold">
                  {it.image ? (
                    <img 
                      src={it.image} 
                      alt={it.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '<div class="px-2">IMG</div>';
                      }}
                    />
                  ) : (
                    <div className="px-2">IMG</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{it.name}</div>
                  <div className="text-sm text-white/80">${it.price.toFixed(2)}</div>
                  {it.description && (
                    <div className="text-xs text-white/60 mt-1 line-clamp-2">
                      {it.description}
                    </div>
                  )}
                  {it.stock !== undefined && it.stock <= 5 && it.stock > 0 && (
                    <div className="text-xs text-amber-400 mt-1">
                      Only {it.stock} left in stock
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-3">
                    <button 
                      onClick={() => moveToCart(it.id)} 
                      disabled={it.stock === 0}
                      className={`px-3 py-1 rounded text-white ${
                        it.stock === 0 
                          ? 'bg-gray-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 hover:from-amber-500 hover:via-pink-600 hover:to-rose-600'
                      }`}
                    >
                      {it.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <button 
                      onClick={() => removeItem(it.id)} 
                      className="px-3 py-1 bg-white/8 rounded text-white hover:bg-white/12"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Fallback localStorage functions for non-authenticated users
function readWishlist(): Product[] {
  try {
    const raw = localStorage.getItem('shopeasy_wishlist')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeWishlist(items: Product[]) {
  localStorage.setItem('shopeasy_wishlist', JSON.stringify(items))
}

function readCart(): Product[] {
  try {
    const raw = localStorage.getItem('shopeasy_cart')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCart(items: Product[]) {
  localStorage.setItem('shopeasy_cart', JSON.stringify(items))
}

export default Wishlist
