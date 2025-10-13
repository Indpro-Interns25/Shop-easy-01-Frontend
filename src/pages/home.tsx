import React from 'react'

type Props = {
  onLoginClick?: () => void
  onCartClick?: () => void
  onWishlistClick?: () => void
}

type Product = {
  id: string
  title: string
  price: number
  image: string
  qty?: number
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: 'p1', title: 'Sunset Ceramic Mug', price: 12.99, image: '/src/assets/product-1.svg' },
  { id: 'p2', title: 'Teal Runner Scarf', price: 24.5, image: '/src/assets/product-2.svg' },
  { id: 'p3', title: 'Minimal Desk Lamp', price: 39.0, image: '/src/assets/product-3.svg' },
]

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

const Home: React.FC<Props> = ({ onLoginClick, onCartClick, onWishlistClick }) => {
  function addToCart(p: Product) {
    const cart = readLocal<Product>(CART_KEY)
    const exists = cart.find((c) => c.id === p.id)
    if (exists) {
      // increment qty if present
      const updated = cart.map((c) => (c.id === p.id ? { ...c, qty: (c.qty ?? 1) + 1 } : c))
      writeLocal<Product>(CART_KEY, updated)
    } else {
      writeLocal<Product>(CART_KEY, [...cart, { ...p, qty: 1 }])
    }
    onCartClick?.()
  }

  function addToWishlist(p: Product) {
    const w = readLocal<Product>(WISHLIST_KEY)
    if (!w.find((x) => x.id === p.id)) {
      writeLocal(WISHLIST_KEY, [...w, p])
    }
    onWishlistClick?.()
  }

  return (
    <div className="min-h-screen page-bg py-12 px-6">
      <div className="max-w-6xl mx-auto text-white">
        <header className="flex items-center justify-between mb-10">
          <div>
            <div className="font-serif text-2xl">ShopEase</div>
            <h1 className="text-4xl font-bold -mt-1">Curated picks</h1>
            <p className="text-white/80 mt-1">Handpicked products to brighten your day.</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onLoginClick}
              className="px-5 py-2 rounded-full bg-white/10 backdrop-blur text-white"
            >
              Login
            </button>
            <button
              onClick={onCartClick}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white"
            >
              Cart
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_PRODUCTS.map((p) => (
            <article key={p.id} className="bg-white/6 rounded-xl p-4 shadow-lg backdrop-blur border border-white/8 text-white">
              <div className="h-40 flex items-center justify-center mb-4">
                <img src={p.image} alt={p.title} className="max-h-full max-w-full" />
              </div>
              <div className="font-semibold text-lg">{p.title}</div>
              <div className="text-sm text-white/80 mb-4">${p.price.toFixed(2)}</div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => addToCart(p)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white flex items-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Add
                </button>

                <button
                  onClick={() => addToWishlist(p)}
                  className="p-2 rounded-full bg-white/6 border border-white/8 text-white"
                  aria-label={`Add ${p.title} to wishlist`}
                  title={`Add ${p.title} to wishlist`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61c-.39-.38-1.02-.38-1.41 0L12 11.04 4.57 4.6a1 1 0 0 0-1.41 1.42l7.42 7.46L3.16 20.9a1 1 0 1 0 1.41 1.41l7.43-7.41 7.4 7.38a1 1 0 0 0 1.41-1.41L13.83 13.5l7.01-7.09c.38-.39.38-1.02 0-1.4z" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Home
