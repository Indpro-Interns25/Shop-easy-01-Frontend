import React, { useState } from 'react'
import { api } from '../utils/api'
import { useAuth } from '../hooks/useAuth'

type Props = {
  onClose?: () => void
  onSignupClick?: () => void
}

const Login: React.FC<Props> = ({ onClose, onSignupClick }) => {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('') // Clear error when user types
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    try {
      const response = await api.login({
        email: formData.email,
        password: formData.password
      })

      setSuccess('Login successful!')
      console.log('Login successful:', response)
      
      // Update auth context with user data
      login(response.user, response.token)
      
      // Redirect to home immediately
      onClose?.()

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }
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

            {error && (
              <div className="mb-3 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-3 p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm text-white/80">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                aria-label="email"
                className="w-full px-4 py-3 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none"
                required
              />

              <label className="block text-sm text-white/80">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                aria-label="password"
                className="w-full px-4 py-3 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none"
                required
              />

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-amber-600 text-white font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Continue'} 
                {!isLoading && <span className="ml-3">→</span>}
              </button>

              <p className="text-center text-white/80">Don't have an account? <button type="button" onClick={onSignupClick} className="underline hover:text-white transition-colors">Sign up</button></p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
