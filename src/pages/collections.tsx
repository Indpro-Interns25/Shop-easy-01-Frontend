import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { useAuth } from '../hooks/useAuth'

type Product = {
  id: string
  name: string
  price: number | string
  image: string
  description?: string
  stock?: number
  quantity?: number
}

type Props = {
  onBack: () => void
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

const Collections: React.FC<Props> = ({ onBack }) => {
  const { token, isAuthenticated } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState<Set<string>>(new Set())
  const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchCart()
    fetchWishlist()
  }, [isAuthenticated, token])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await api.getProducts()
      if (res.success) {
        const data = res.data.map((p: any) => ({
          ...p,
          price: Number(p.price) || 0
        }))
        setProducts(data)
      } else {
        setError('Failed to fetch products')
      }
    } catch (err) {
      console.error(err)
      setError('Error fetching products')
    } finally {
      setLoading(false)
    }
  }

  const fetchCart = async () => {
    if (isAuthenticated && token) {
      try {
        const res = await api.getCartItems(token)
        if (res.success) {
          setCartItems(new Set(res.data.map((item: any) => item.product_id)))
        }
      } catch {
        const local = readLocal<Product>(CART_KEY)
        setCartItems(new Set(local.map(p => p.id)))
      }
    } else {
      const local = readLocal<Product>(CART_KEY)
      setCartItems(new Set(local.map(p => p.id)))
    }
  }

  const fetchWishlist = async () => {
    if (isAuthenticated && token) {
      try {
        const res = await api.getWishlistItems(token)
        if (res.success) {
          setWishlistItems(new Set(res.data.map((item: any) => item.product_id)))
        }
      } catch {
        const local = readLocal<Product>(WISHLIST_KEY)
        setWishlistItems(new Set(local.map(p => p.id)))
      }
    } else {
      const local = readLocal<Product>(WISHLIST_KEY)
      setWishlistItems(new Set(local.map(p => p.id)))
    }
  }

  const addToCart = async (p: Product) => {
    if (isAuthenticated && token) {
      try {
        await api.addToCart(token, p.id, 1)
        setCartItems(prev => new Set(prev).add(p.id))
        window.dispatchEvent(new Event('cart-updated'))
      } catch {
        fallbackCart(p)
      }
    } else {
      fallbackCart(p)
    }
  }

  const fallbackCart = (p: Product) => {
    const local = readLocal<Product>(CART_KEY)
    const exists = local.find(item => item.id === p.id)
    if (exists) {
      const updated = local.map(item =>
        item.id === p.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
      writeLocal(CART_KEY, updated)
    } else {
      writeLocal(CART_KEY, [...local, { ...p, quantity: 1 }])
    }
    setCartItems(prev => new Set(prev).add(p.id))
    window.dispatchEvent(new Event('cart-updated'))
  }

  const addToWishlist = async (p: Product) => {
    if (wishlistItems.has(p.id)) {
      // remove
      if (isAuthenticated && token) {
        try {
          await api.removeFromWishlist(token, p.id)
          setWishlistItems(prev => {
            const newSet = new Set(prev)
            newSet.delete(p.id)
            return newSet
          })
          window.dispatchEvent(new Event('wishlist-updated'))
        } catch {
          fallbackWishlistRemove(p)
        }
      } else {
        fallbackWishlistRemove(p)
      }
    } else {
      // add
      if (isAuthenticated && token) {
        try {
          await api.addToWishlist(token, p.id)
          setWishlistItems(prev => new Set(prev).add(p.id))
          window.dispatchEvent(new Event('wishlist-updated'))
        } catch {
          fallbackWishlistAdd(p)
        }
      } else {
        fallbackWishlistAdd(p)
      }
    }
  }

  const fallbackWishlistAdd = (p: Product) => {
    const local = readLocal<Product>(WISHLIST_KEY)
    if (!local.find(item => item.id === p.id)) {
      writeLocal(WISHLIST_KEY, [...local, p])
      setWishlistItems(prev => new Set(prev).add(p.id))
      window.dispatchEvent(new Event('wishlist-updated'))
    }
  }

  const fallbackWishlistRemove = (p: Product) => {
    const local = readLocal<Product>(WISHLIST_KEY)
    const filtered = local.filter(item => item.id !== p.id)
    writeLocal(WISHLIST_KEY, filtered)
    setWishlistItems(prev => {
      const newSet = new Set(prev)
      newSet.delete(p.id)
      return newSet
    })
    window.dispatchEvent(new Event('wishlist-updated'))
  }

  if (loading) return <div className="text-center mt-12">Loading products...</div>
  if (error) return <div className="text-center mt-12 text-red-600">{error}</div>

  return (
    <div className="min-h-screen bg-custom-brown px-6 py-6">
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-rose-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-100">
            <div className="h-48 flex items-center justify-center mb-4 bg-white rounded-xl overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-semibold text-lg text-rose-800">{p.name}</h3>
            <div className="text-xl font-bold text-rose-800">${typeof p.price === 'number' ? p.price.toFixed(2) : parseFloat(p.price || '0').toFixed(2)}</div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => addToCart(p)}
                className={`px-6 py-2 rounded-full text-white font-medium transition-all duration-300 ${
                  cartItems.has(p.id)
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 hover:from-amber-500 hover:via-pink-600 hover:to-rose-600'
                }`}
              >
                {cartItems.has(p.id) ? 'Added' : 'Add to Cart'}
              </button>

              <button
                onClick={() => addToWishlist(p)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  wishlistItems.has(p.id)
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                ♥
              </button>
            </div>
          </div>
          
        ))}
        
      </div>
      <button
        onClick={onBack}
        className="mb-6 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-semibold"
      >
        Back to Home
      </button>
    </div>
  )
}

export default Collections
