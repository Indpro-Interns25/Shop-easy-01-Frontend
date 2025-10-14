import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { useAuth } from '../hooks/useAuth'

type Props = {
  onCartClick?: () => void
  onWishlistClick?: () => void
  onLoginClick?: () => void
}

type Product = {
  id: string
  name: string
  price: number
  image: string
  description?: string
  stock?: number
  category_id?: number
  seller_id?: number
  is_active?: boolean
  quantity?: number  // For cart items
}

const CART_KEY = 'shopeasy_cart'
const WISHLIST_KEY = 'shopeasy_wishlist'

function readLocal<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeLocal<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items))
}

const Home: React.FC<Props> = ({ onCartClick, onWishlistClick }) => {
  const { token, isAuthenticated } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.getProducts()
      
      if (response.success) {
        setProducts(response.data)
      } else {
        setError('Failed to load products')
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      setError(err instanceof Error ? err.message : 'Failed to load products')
      // Fallback to sample data if API fails
      setProducts([
        { id: 'p1', name: 'Sunset Ceramic Mug', price: 12.99, image: '/src/assets/product-1.svg' },
        { id: 'p2', name: 'Teal Runner Scarf', price: 24.5, image: '/src/assets/product-2.svg' },
        { id: 'p3', name: 'Minimal Desk Lamp', price: 39.0, image: '/src/assets/product-3.svg' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (p: Product) => {
    if (isAuthenticated && token) {
      try {
        await api.addToCart(token, p.id, 1)
        // Show success message or update cart count
        window.dispatchEvent(new Event('cart-updated'))
        onCartClick?.()
      } catch (err) {
        console.error('Error adding to cart:', err)
        // Fallback to localStorage
        const cart = readLocal<Product>(CART_KEY)
        const exists = cart.find((c) => c.id === p.id)
        if (exists) {
          const updated = cart.map((c) => (c.id === p.id ? { ...c, quantity: (c.quantity ?? 1) + 1 } : c))
          writeLocal<Product>(CART_KEY, updated)
        } else {
          writeLocal<Product>(CART_KEY, [...cart, { ...p, quantity: 1 }])
        }
        window.dispatchEvent(new Event('cart-updated'))
        onCartClick?.()
      }
    } else {
      // Fallback to localStorage for non-authenticated users
      const cart = readLocal<Product>(CART_KEY)
      const exists = cart.find((c) => c.id === p.id)
      if (exists) {
        const updated = cart.map((c) => (c.id === p.id ? { ...c, quantity: (c.quantity ?? 1) + 1 } : c))
        writeLocal<Product>(CART_KEY, updated)
      } else {
        writeLocal<Product>(CART_KEY, [...cart, { ...p, quantity: 1 }])
      }
      window.dispatchEvent(new Event('cart-updated'))
      onCartClick?.()
    }
  }

  const addToWishlist = async (p: Product) => {
    if (isAuthenticated && token) {
      try {
        await api.addToWishlist(token, p.id)
        window.dispatchEvent(new Event('wishlist-updated'))
        onWishlistClick?.()
      } catch (err) {
        console.error('Error adding to wishlist:', err)
        // Fallback to localStorage
        const w = readLocal<Product>(WISHLIST_KEY)
        if (!w.find((x) => x.id === p.id)) {
          writeLocal(WISHLIST_KEY, [...w, p])
        }
        window.dispatchEvent(new Event('wishlist-updated'))
        onWishlistClick?.()
      }
    } else {
      // Fallback to localStorage for non-authenticated users
      const w = readLocal<Product>(WISHLIST_KEY)
      if (!w.find((x) => x.id === p.id)) {
        writeLocal(WISHLIST_KEY, [...w, p])
      }
      window.dispatchEvent(new Event('wishlist-updated'))
      onWishlistClick?.()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen page-bg py-12 px-6">
        <div className="max-w-6xl mx-auto text-white">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white/80">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen page-bg py-12 px-6">
      <div className="max-w-6xl mx-auto text-white">
        <header className="flex items-center justify-between mb-10">
          <div>
            <div className="font-serif text-2xl">ShopEase</div>
            <h1 className="text-4xl font-bold -mt-1">Curated picks</h1>
            <p className="text-white/80 mt-1">Handpicked products to brighten your day.</p>
            {error && (
              <p className="text-red-400 text-sm mt-2">
                ⚠️ {error} - Showing sample data
              </p>
            )}
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <article key={p.id} className="bg-white/6 rounded-xl p-4 shadow-lg backdrop-blur border border-white/8 text-white">
              <div className="h-40 flex items-center justify-center mb-4 bg-white/5 rounded-lg">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              <div className="font-semibold text-lg">{p.name}</div>
              <div className="text-sm text-white/80 mb-2">
                ${typeof p.price === 'number' ? p.price.toFixed(2) : p.price}
              </div>
              {p.description && (
                <div className="text-xs text-white/60 mb-4 line-clamp-2">
                  {p.description}
                </div>
              )}
              {p.stock !== undefined && p.stock <= 5 && (
                <div className="text-xs text-amber-400 mb-2">
                  Only {p.stock} left in stock!
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={() => addToCart(p)}
                  disabled={p.stock === 0}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 text-white ${
                    p.stock === 0 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 hover:from-amber-500 hover:via-pink-600 hover:to-rose-600'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {p.stock === 0 ? 'Out of Stock' : 'Add'}
                </button>

                <button
                  onClick={() => addToWishlist(p)}
                  className="p-2 rounded-full bg-white/6 border border-white/8 text-white hover:bg-white/10"
                  aria-label={`Add ${p.name} to wishlist`}
                  title={`Add ${p.name} to wishlist`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M20.84 4.61c-.39-.38-1.02-.38-1.41 0L12 11.04 4.57 4.6a1 1 0 0 0-1.41 1.42l7.42 7.46L3.16 20.9a1 1 0 1 0 1.41 1.41l7.43-7.41 7.4 7.38a1 1 0 0 0 1.41-1.41L13.83 13.5l7.01-7.09c.38-.39.38-1.02 0-1.4z" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </section>

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No products found</p>
            <button 
              onClick={fetchProducts}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-amber-400 to-pink-500 text-white rounded-full hover:from-amber-500 hover:to-pink-600"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
