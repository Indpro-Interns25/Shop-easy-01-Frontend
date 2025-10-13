import React from 'react'

type Props = {
  onClose?: () => void
}

const Login: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="relative flex h-screen login-bg">
      <aside className="w-[70%] relative text-white p-12 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="z-10">
          <div className="font-serif text-2xl">ShopEase</div>
          <div className="mt-10">
            <h1 className="text-5xl font-bold">Shop</h1>
            <ul className="mt-6 space-y-3 text-white/90 text-sm">
              <li className="font-semibold">New Arrivals</li>
              <li>Winters</li>
              <li>Women's</li>
              <li>Men's</li>
              <li>Kids</li>
            </ul>
          </div>
        </div>
  </aside>

      <main className="absolute inset-y-0 right-0 w-[30%] right-bg">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 w-9 h-9 rounded-full border border-white/30 bg-white/10 text-white">×</button>

  <div className="h-full w-full p-8 text-white bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border-l border-white/10">
          <div className="max-w-md mx-auto h-full flex flex-col justify-center">
            <div className="mb-2">
              <h3 className="text-sm tracking-widest text-white/80">EXISTING MEMBER</h3>
              <p className="text-xs text-white/70">Welcome Back!</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <label className="block text-sm text-white/80">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                aria-label="email"
                className="w-full px-4 py-3 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none"
              />

              <label className="block text-sm text-white/80">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                aria-label="password"
                className="w-full px-4 py-3 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none"
              />

              <button className="w-full py-3 rounded-full bg-amber-600 text-white font-semibold flex items-center justify-center">
                Continue <span className="ml-3">→</span>
              </button>

              <p className="text-center text-white/80">Don't have an account? <a className="underline" href="#">Sign up</a></p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
