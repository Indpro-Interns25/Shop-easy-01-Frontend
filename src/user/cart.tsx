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
  onOpenWishlist?: () => void
}

const Cart: React.FC<Props> = ({ onBack, onOpenWishlist }) => {
  const { token, isAuthenticated } = useAuth()
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCartItems = useCallback(async () => {
    if (!token) return
    
    try {
      setLoading(true)
      setError(null)
      const response = await api.getCartItems(token)
      
      if (response.success) {
        // Transform database response to match frontend Product type
        const cartItems = response.data.map((item: {
          product_id: string;
          name: string;
          price: string;
          image: string;
          quantity: number;
          description: string;
          stock: number;
        }) => ({
          id: item.product_id,
          name: item.name,
          price: parseFloat(item.price),
          image: item.image,
          quantity: item.quantity,
          description: item.description,
          stock: item.stock
        }))
        setItems(cartItems)
      }
    } catch (err) {
      console.error('Error fetching cart:', err)
      setError(err instanceof Error ? err.message : 'Failed to load cart')
      // Fallback to localStorage
      setItems(readCart())
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCartItems()
    } else {
      // Fallback to localStorage for non-authenticated users
      setItems(readCart())
      setLoading(false)
    }
  }, [isAuthenticated, token, fetchCartItems])

  const total = items.reduce((s, i) => s + i.price * (i.quantity || 1), 0)

  const changeQty = async (id: string, delta: number) => {
    const item = items.find(i => i.id === id)
    if (!item) return

    const newQuantity = Math.max(1, (item.quantity || 1) + delta)

    if (isAuthenticated && token) {
      try {
        await api.updateCartItem(token, id, newQuantity)
        setItems(prev => 
          prev.map(p => (p.id === id ? { ...p, quantity: newQuantity } : p))
        )
      } catch (err) {
        console.error('Error updating cart:', err)
        setError(err instanceof Error ? err.message : 'Failed to update cart')
      }
    } else {
      // Fallback to localStorage
      setItems(prev => 
        prev.map(p => (p.id === id ? { ...p, quantity: newQuantity } : p))
      )
      writeCart(items.map(p => (p.id === id ? { ...p, quantity: newQuantity } : p)))
      window.dispatchEvent(new Event('cart-updated'))
    }
  }

  const removeItem = async (id: string) => {
    if (isAuthenticated && token) {
      try {
        await api.removeFromCart(token, id)
        setItems(prev => prev.filter(p => p.id !== id))
      } catch (err) {
        console.error('Error removing from cart:', err)
        setError(err instanceof Error ? err.message : 'Failed to remove item')
      }
    } else {
      // Fallback to localStorage
      setItems(prev => prev.filter(p => p.id !== id))
      writeCart(items.filter(p => p.id !== id))
      window.dispatchEvent(new Event('cart-updated'))
    }
  }

  const moveToWishlist = async (id: string) => {
    const prod = items.find(p => p.id === id)
    if (!prod) return

    if (isAuthenticated && token) {
      try {
        await api.addToWishlist(token, id)
        await removeItem(id)
        window.dispatchEvent(new Event('wishlist-updated'))
      } catch (err) {
        console.error('Error moving to wishlist:', err)
        setError(err instanceof Error ? err.message : 'Failed to move to wishlist')
      }
    } else {
      // Fallback to localStorage
      const wishlist = readWishlist()
      if (!wishlist.find(w => w.id === id)) {
        writeWishlist([...wishlist, { ...prod, quantity: 1 }])
        window.dispatchEvent(new Event('wishlist-updated'))
      }
      // Remove from cart after successfully adding to wishlist
      setItems(prev => prev.filter(p => p.id !== id))
      writeCart(items.filter(p => p.id !== id))
      window.dispatchEvent(new Event('cart-updated'))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen page-bg py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white/80">Loading cart...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-custom-brown py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white drop-shadow">Shopping Cart</h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onOpenWishlist}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded text-white text-sm"
              >
                <svg className="inline w-4 h-4 mr-2 align-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61c-.39-.38-1.02-.38-1.41 0L12 11.04 4.57 4.6a1 1 0 0 0-1.41 1.42l7.42 7.46L3.16 20.9a1 1 0 1 0 1.41 1.41l7.43-7.41 7.4 7.38a1 1 0 0 0 1.41-1.41L13.83 13.5l7.01-7.09c.38-.39.38-1.02 0-1.4z" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                Wishlist
              </button>
              <button
                onClick={onBack}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded text-white text-sm"
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
            <div className="bg-rose-50 rounded-xl p-12 text-center shadow-lg backdrop-blur-md border border-rose-100">
              <svg className="mx-auto mb-4 h-14 w-14 text-rose-400" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="20" r="1" stroke="currentColor" strokeWidth={1.5} />
                <circle cx="18" cy="20" r="1" stroke="currentColor" strokeWidth={1.5} />
              </svg>
              <h3 className="text-2xl font-semibold text-rose-800">Your cart is empty</h3>
              <p className="text-sm mt-2 text-rose-600">Add products to your cart to see them here.</p>
              {!isAuthenticated && (
                <p className="text-xs mt-2 text-rose-500">💡 Sign in to sync your cart across devices</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="bg-rose-50 rounded-2xl p-6 flex gap-6 items-center shadow-lg border border-rose-100 hover:shadow-xl transition-shadow">
                  <div className="w-24 h-24 bg-white rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {it.image ? (
                      <img 
                        src={it.image} 
                        alt={it.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = '<div class="text-sm font-medium text-rose-400">IMG</div>';
                        }}
                      />
                    ) : (
                      <div className="text-sm font-medium text-rose-400">IMG</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-lg text-rose-800">{it.name}</div>
                        <div className="text-sm mt-1 text-rose-600">
                          {it.description || 'Product description'}
                        </div>
                        {it.stock !== undefined && it.stock <= 5 && it.stock > 0 && (
                          <div className="text-xs text-orange-600 font-medium mt-1">
                            Only {it.stock} left in stock
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-rose-800">${typeof it.price === "number" ? it.price.toFixed(2) : "0.00"}</div>
                        <div className="text-sm text-rose-500">each</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
                        <button
                          onClick={() => changeQty(it.id, -1)}
                          className="w-8 h-8 bg-rose-100 hover:bg-rose-200 rounded-lg flex items-center justify-center text-rose-700 transition-colors"
                        >
                          -
                        </button>
                        <div className="w-10 text-center font-medium text-rose-800">{it.quantity || 1}</div>
                        <button
                          onClick={() => changeQty(it.id, +1)}
                          className="w-8 h-8 bg-rose-100 hover:bg-rose-200 rounded-lg flex items-center justify-center text-rose-700 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => moveToWishlist(it.id)} 
                          className="text-sm text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61c-.39-.38-1.02-.38-1.41 0L12 11.04 4.57 4.6a1 1 0 0 0-1.41 1.42l7.42 7.46L3.16 20.9a1 1 0 1 0 1.41 1.41l7.43-7.41 7.4 7.38a1 1 0 0 0 1.41-1.41L13.83 13.5l7.01-7.09c.38-.39.38-1.02 0-1.4z" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Save
                        </button>
                        <button 
                          onClick={() => removeItem(it.id)} 
                          className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 font-medium transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M3 6h18" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary panel */}
        <aside className="bg-rose-50 rounded-2xl p-6 shadow-lg border border-rose-100 h-fit">
          <h3 className="text-lg font-semibold mb-4 text-rose-800">Order Summary</h3>
          <div className="flex justify-between text-sm mb-2 text-rose-600">
            <span>Items</span>
            <span>{items.reduce((sum, item) => sum + (item.quantity || 1), 0)}</span>
          </div>
          <div className="flex justify-between text-sm mb-4 text-rose-600">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-6 text-rose-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button 
            disabled={items.length === 0}
            className={`w-full px-4 py-3 rounded-lg mb-3 font-medium transition-all shadow-lg ${
              items.length === 0 
                ? 'bg-rose-200 cursor-not-allowed text-rose-400' 
                : 'bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white hover:from-amber-500 hover:via-pink-600 hover:to-rose-600 hover:shadow-xl'
            }`}
          >
            Proceed to Checkout
          </button>
          <button 
            onClick={onBack}
            className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-lg text-white hover:bg-white/12"
          >
            Continue Shopping
          </button>
        </aside>
      </div>
    </div>
  )
}

// Fallback localStorage functions for non-authenticated users
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

export default Cart
