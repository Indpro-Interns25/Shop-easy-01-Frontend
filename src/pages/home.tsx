import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { useAuth } from '../hooks/useAuth'

type Props = {
  onCartClick?: () => void
  onWishlistClick?: () => void
  onLoginClick?: () => void
  onAdminClick?: () => void
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
  const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set())
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [cartItems, setCartItems] = useState<Set<string>>(new Set())

  const fetchWishlistItems = React.useCallback(async () => {
    if (isAuthenticated && token) {
      try {
        const response = await api.getWishlistItems(token)
        if (response.success) {
          const wishlistIds = new Set<string>(response.data.map((item: { product_id: string }) => item.product_id))
          setWishlistItems(wishlistIds)
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err)
        // Fallback to localStorage
        const localWishlist = readLocal<Product>(WISHLIST_KEY)
        setWishlistItems(new Set(localWishlist.map(item => item.id)))
      }
    } else {
      // Load from localStorage for non-authenticated users
      const localWishlist = readLocal<Product>(WISHLIST_KEY)
      setWishlistItems(new Set(localWishlist.map(item => item.id)))
    }
  }, [isAuthenticated, token])

  const fetchCartItems = React.useCallback(async () => {
    if (isAuthenticated && token) {
      try {
        const response = await api.getCartItems(token)
        if (response.success) {
          const cartIds = new Set<string>(response.data.map((item: { product_id: string }) => item.product_id))
          setCartItems(cartIds)
        }
      } catch (err) {
        console.error('Error fetching cart:', err)
        // Fallback to localStorage
        const localCart = readLocal<Product>(CART_KEY)
        setCartItems(new Set(localCart.map(item => item.id)))
      }
    } else {
      // Load from localStorage for non-authenticated users
      const localCart = readLocal<Product>(CART_KEY)
      setCartItems(new Set(localCart.map(item => item.id)))
    }
  }, [isAuthenticated, token])

  useEffect(() => {
    fetchProducts()
    fetchWishlistItems()
    fetchCartItems()
  }, [fetchWishlistItems, fetchCartItems, isAuthenticated, token])

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

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type })
    setTimeout(() => setToastMessage(null), 3000)
  }

  const addToCart = async (p: Product) => {
    if (isAuthenticated && token) {
      try {
        await api.addToCart(token, p.id, 1)
        setCartItems(prev => new Set([...prev, p.id]))
        showToast(`${p.name} added to cart!`)
        window.dispatchEvent(new Event('cart-updated'))
        onCartClick?.()
      } catch (err) {
        console.error('Error adding to cart:', err)
        showToast('Failed to add to cart', 'error')
        // Fallback to localStorage
        const cart = readLocal<Product>(CART_KEY)
        const exists = cart.find((c) => c.id === p.id)
        if (exists) {
          const updated = cart.map((c) => (c.id === p.id ? { ...c, quantity: (c.quantity ?? 1) + 1 } : c))
          writeLocal<Product>(CART_KEY, updated)
        } else {
          writeLocal<Product>(CART_KEY, [...cart, { ...p, quantity: 1 }])
        }
        setCartItems(prev => new Set([...prev, p.id]))
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
      setCartItems(prev => new Set([...prev, p.id]))
      showToast(`${p.name} added to cart!`)
      window.dispatchEvent(new Event('cart-updated'))
      onCartClick?.()
    }
  }

  const addToWishlist = async (p: Product) => {
    if (wishlistItems.has(p.id)) {
      // Item is already in wishlist, remove it
      if (isAuthenticated && token) {
        try {
          await api.removeFromWishlist(token, p.id)
          setWishlistItems(prev => new Set([...prev].filter(id => id !== p.id)))
          showToast(`${p.name} removed from wishlist`)
          window.dispatchEvent(new Event('wishlist-updated'))
        } catch (err) {
          console.error('Error removing from wishlist:', err)
          showToast('Failed to remove from wishlist', 'error')
        }
      } else {
        const w = readLocal<Product>(WISHLIST_KEY)
        const filtered = w.filter((x) => x.id !== p.id)
        writeLocal(WISHLIST_KEY, filtered)
        setWishlistItems(prev => new Set([...prev].filter(id => id !== p.id)))
        showToast(`${p.name} removed from wishlist`)
        window.dispatchEvent(new Event('wishlist-updated'))
      }
    } else {
      // Add to wishlist
      if (isAuthenticated && token) {
        try {
          await api.addToWishlist(token, p.id)
          setWishlistItems(prev => new Set([...prev, p.id]))
          showToast(`${p.name} added to wishlist!`)
          window.dispatchEvent(new Event('wishlist-updated'))
          onWishlistClick?.()
        } catch (err) {
          console.error('Error adding to wishlist:', err)
          showToast('Failed to add to wishlist', 'error')
          // Fallback to localStorage
          const w = readLocal<Product>(WISHLIST_KEY)
          if (!w.find((x) => x.id === p.id)) {
            writeLocal(WISHLIST_KEY, [...w, p])
            setWishlistItems(prev => new Set([...prev, p.id]))
          }
          window.dispatchEvent(new Event('wishlist-updated'))
          onWishlistClick?.()
        }
      } else {
        // Fallback to localStorage for non-authenticated users
        const w = readLocal<Product>(WISHLIST_KEY)
        if (!w.find((x) => x.id === p.id)) {
          writeLocal(WISHLIST_KEY, [...w, p])
          setWishlistItems(prev => new Set([...prev, p.id]))
          showToast(`${p.name} added to wishlist!`)
        }
        window.dispatchEvent(new Event('wishlist-updated'))
        onWishlistClick?.()
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-900" style={{ backgroundColor: '#8B4513' }}>
        <div className="bg-gradient-to-br from-rose-100 via-orange-50 to-pink-100 mx-6 my-6 rounded-3xl shadow-2xl" style={{ minHeight: '50vh' }}>
          <div className="flex items-center justify-center h-full min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
              <p className="text-gray-700 text-lg">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-900" style={{ backgroundColor: '#8B4513' }}>
      {/* Hero Section */}
      <div className="relative">
        {/* Main Content Container */}
        <div className="bg-gradient-to-br from-rose-100 via-orange-50 to-pink-100 mx-6 my-6 rounded-3xl shadow-2xl overflow-hidden" style={{ minHeight: '50vh' }}>
          <div className="flex flex-col lg:flex-row">
            {/* Left Content Section */}
            <div className="flex-1 p-12 lg:p-16">
              <nav className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold text-gray-800">ShopEase</div>
                <div className="flex items-center gap-8 text-gray-600">
                  <a href="#" className="hover:text-gray-800 transition-colors">Home</a>
                  <a href="#" className="hover:text-gray-800 transition-colors">Collections</a>
                  <a href="#" className="hover:text-gray-800 transition-colors">Brands</a>
                  <a href="#" className="hover:text-gray-800 transition-colors">About Us</a>
                </div>
              </nav>

              <div className="max-w-lg">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                  Elevate Style.<br />
                  <span className="text-gray-700">Embrace Story</span>
                </h1>
                
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  We provide the most exclusive products for our women. You can 
                  browse brands, or styles to achieve that perfect one. Our 
                  women can choose from several online options.
                </p>

                <button 
                  className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#92400e' }}
                >
                  <span className="font-medium">Explore</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="mt-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Trending <span className="text-gray-600 font-normal">Collections</span>
                </h2>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="flex-1 relative min-h-[50vh] lg:min-h-full">
              <img 
                src="/src/assets/home-bg_1.png" 
                alt="Fashion Model" 
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.background = 'linear-gradient(135deg, #f3e8ff 0%, #ddd6fe 100%)';
                  target.alt = 'Fashion Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-rose-100/20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="px-6 pb-12">
        {error && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6 text-red-800">
            <p className="text-sm">⚠️ {error} - Showing sample data</p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Featured Products</h2>
          <p className="text-white/80">Handpicked products to brighten your day</p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <article key={p.id} className="bg-rose-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-100">
              <div className="h-48 flex items-center justify-center mb-4 bg-white rounded-xl overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOWNhM2FmIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-rose-800">{p.name}</h3>
                <div className="text-xl font-bold text-rose-800">
                  ${typeof p.price === 'number' ? p.price.toFixed(2) : p.price}
                </div>
                
                {p.description && (
                  <p className="text-sm text-rose-600 line-clamp-2">
                    {p.description}
                  </p>
                )}
                
                {p.stock !== undefined && p.stock <= 5 && p.stock > 0 && (
                  <div className="text-xs text-orange-600 font-medium">
                    Only {p.stock} left in stock!
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => addToCart(p)}
                    disabled={p.stock === 0}
                    className={`px-6 py-2 rounded-full flex items-center gap-2 font-medium transition-all duration-300 ${
                      p.stock === 0 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : cartItems.has(p.id)
                          ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 hover:from-amber-500 hover:via-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      {cartItems.has(p.id) ? (
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                      ) : (
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round"/>
                      )}
                    </svg>
                    {p.stock === 0 ? 'Out of Stock' : cartItems.has(p.id) ? 'Added' : 'Add'}
                  </button>

                  <button
                    onClick={() => addToWishlist(p)}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      wishlistItems.has(p.id) 
                        ? 'bg-amber-500 text-white shadow-lg hover:bg-amber-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    aria-label={`${wishlistItems.has(p.id) ? 'Remove from' : 'Add to'} wishlist`}
                    title={`${wishlistItems.has(p.id) ? 'Remove from' : 'Add to'} wishlist`}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill={wishlistItems.has(p.id) ? 'currentColor' : 'none'}>
                      <path d="M20.84 4.61c-.39-.38-1.02-.38-1.41 0L12 11.04 4.57 4.6a1 1 0 0 0-1.41 1.42l7.42 7.46L3.16 20.9a1 1 0 1 0 1.41 1.41l7.43-7.41 7.4 7.38a1 1 0 0 0 1.41-1.41L13.83 13.5l7.01-7.09c.38-.39.38-1.02 0-1.4z" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg mb-4">No products found</p>
            <button 
              onClick={fetchProducts}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg backdrop-blur-md border transition-all duration-300 ${
          toastMessage.type === 'success' 
            ? 'bg-green-500/20 border-green-400/50 text-green-100' 
            : 'bg-red-500/20 border-red-400/50 text-red-100'
        }`}>
          <div className="flex items-center gap-2">
            {toastMessage.type === 'success' ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2}/>
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2}/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth={2}/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth={2}/>
              </svg>
            )}
            <span className="font-medium">{toastMessage.text}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
