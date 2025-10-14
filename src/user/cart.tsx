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
  onOpenWishlist?: () => void
}

const CART_KEY = 'shopeasy_cart'
const WISHLIST_KEY = 'shopeasy_wishlist'

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

const Cart: React.FC<Props> = ({ onBack, onOpenWishlist }) => {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    setItems(readCart())
  }, [])

  useEffect(() => {
    writeCart(items)
  }, [items])

  const total = items.reduce((s, i) => s + i.price * (i.qty || 1), 0)

  function changeQty(id: string, delta: number) {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(1, (p.qty || 1) + delta) } : p))
        .filter(Boolean),
    )
    window.dispatchEvent(new Event('cart-updated'))
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id))
    window.dispatchEvent(new Event('cart-updated'))
  }

  function moveToWishlist(id: string) {
    const prod = items.find((p) => p.id === id)
    if (!prod) return
    const wishlist = readWishlist()
    if (!wishlist.find((w) => w.id === id)) {
      writeWishlist([...wishlist, { ...prod, qty: 1 }])
      window.dispatchEvent(new Event('wishlist-updated'))
    }
    removeItem(id)
  }

  return (
    <div className="min-h-screen page-bg py-12 px-4">
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

          {items.length === 0 ? (
            <div className="bg-white/6 rounded-xl p-12 text-center shadow-lg backdrop-blur-md border border-white/8">
              <svg className="mx-auto mb-4 h-14 w-14 text-white/70" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="20" r="1" stroke="currentColor" strokeWidth={1.5} />
                <circle cx="18" cy="20" r="1" stroke="currentColor" strokeWidth={1.5} />
              </svg>
              <h3 className="text-2xl font-semibold text-white">Your cart is empty</h3>
              <p className="text-sm text-white/80 mt-2">Add products to your cart to see them here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="bg-white/6 rounded-lg p-4 flex gap-4 items-center shadow-lg backdrop-blur-md border border-white/8">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-pink-500 rounded overflow-hidden flex-shrink-0 flex items-center justify-center text-white font-bold">
                    {it.image ? <img src={it.image} alt={it.title} className="w-full h-full object-cover" /> : <div className="px-2">IMG</div>}
                  </div>

                  <div className="flex-1 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-lg">{it.title}</div>
                        <div className="text-sm text-white/80 mt-1">Product variant, color or short description</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${it.price.toFixed(2)}</div>
                        <div className="text-sm text-white/80">each</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-white/6 rounded px-3 py-1">
                        <button
                          onClick={() => changeQty(it.id, -1)}
                          className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white"
                        >
                          -
                        </button>
                        <div className="w-10 text-center">{it.qty || 1}</div>
                        <button
                          onClick={() => changeQty(it.id, +1)}
                          className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button onClick={() => moveToWishlist(it.id)} className="text-sm text-amber-300 flex items-center gap-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61c-.39-.38-1.02-.38-1.41 0L12 11.04 4.57 4.6a1 1 0 0 0-1.41 1.42l7.42 7.46L3.16 20.9a1 1 0 1 0 1.41 1.41l7.43-7.41 7.4 7.38a1 1 0 0 0 1.41-1.41L13.83 13.5l7.01-7.09c.38-.39.38-1.02 0-1.4z" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Save
                        </button>
                        <button onClick={() => removeItem(it.id)} className="text-sm text-rose-300 flex items-center gap-1">
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
        <aside className="bg-white/6 rounded-lg p-6 shadow-lg backdrop-blur-md border border-white/8 text-white">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Items</span>
            <span>{items.length}</span>
          </div>
          <div className="flex justify-between text-sm text-white/80 mb-4">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="w-full px-4 py-3 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white rounded-lg mb-3 shadow">Proceed to Checkout</button>
          <button className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-lg">Continue Shopping</button>
        </aside>
      </div>
    </div>
  )
}

export default Cart
