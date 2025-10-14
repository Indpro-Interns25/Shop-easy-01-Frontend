import React, { useEffect, useState } from 'react'

type Product = {
  id: string
  title: string
  price: number
  image?: string
  qty?: number
}

type Props = {
  onBack?: () => void
  onOpenCart?: () => void
}

const WISHLIST_KEY = 'shopeasy_wishlist'
const CART_KEY = 'shopeasy_cart'

function readWishlist(): Product[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeWishlist(items: Product[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items))
}

function readCart(): Product[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCart(items: Product[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

const Wishlist: React.FC<Props> = ({ onBack, onOpenCart }) => {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    setItems(readWishlist())
  }, [])

  useEffect(() => {
    writeWishlist(items)
  }, [items])

  function removeItem(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id))
    window.dispatchEvent(new Event('wishlist-updated'))
  }

  function moveToCart(id: string) {
    const prod = items.find((p) => p.id === id)
    if (!prod) return
    const cart = readCart()
    if (!cart.find((c) => c.id === id)) {
      writeCart([...cart, { ...prod, qty: 1 }])
      window.dispatchEvent(new Event('cart-updated'))
    }
    removeItem(id)
    onOpenCart?.()
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
            <button onClick={onOpenCart} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded text-white text-sm">
              Open Cart
            </button>
            <button onClick={onBack} className="px-3 py-1 bg-white/10 border border-white/10 rounded text-white text-sm">
              Back
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white/6 rounded-xl p-12 text-center shadow-lg backdrop-blur-md border border-white/8 text-white">
            <svg className="mx-auto mb-4 h-12 w-12 text-white/80" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M3 3h18" />
            </svg>
            <h3 className="text-2xl font-semibold">No items in wishlist</h3>
            <p className="text-sm text-white/80 mt-2">Tap the heart icon on products to save them for later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((it) => (
              <div key={it.id} className="bg-white/6 rounded-lg p-4 flex gap-4 items-center shadow-lg backdrop-blur-md border border-white/8 text-white">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-pink-500 rounded overflow-hidden flex items-center justify-center text-white font-bold">
                  {it.image ? <img src={it.image} alt={it.title} className="w-full h-full object-cover" /> : <div className="px-2">IMG</div>}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{it.title}</div>
                  <div className="text-sm text-white/80">${it.price.toFixed(2)}</div>
                  <div className="mt-3 flex items-center gap-3">
                    <button onClick={() => moveToCart(it.id)} className="px-3 py-1 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white rounded">
                      Add to Cart
                    </button>
                    <button onClick={() => removeItem(it.id)} className="px-3 py-1 bg-white/8 rounded text-white">
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

export default Wishlist
