import React, { useState } from 'react'
import { api } from '../utils/api'
import { useAuth } from '../hooks/useAuth'

type Props = {
  onClose?: () => void
  onLoginClick?: () => void
}

const Signup: React.FC<Props> = ({ onClose, onLoginClick }) => {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('') // Clear error when user types
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (!formData.role) {
      setError('Please select a role')
      setIsLoading(false)
      return
    }

    try {
      const response = await api.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        address: formData.address,
        city: formData.city
      })

      setSuccess('Account created successfully!')
      console.log('Signup successful:', response)
      
      // Update auth context with user data (auto-login after signup)
      login(response.user, response.token)
      
      // Redirect to home immediately
      onClose?.()

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="relative flex h-screen login-bg">
      <aside className="w-[65%] relative text-white p-12 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="z-10">
          <div className="font-serif text-2xl">ShopEase</div>
          <div className="mt-10">
            <h1 className="text-5xl font-bold">Join</h1>
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

      <main className="absolute inset-y-0 right-0 w-[35%] right-bg">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-20 w-9 h-9 rounded-full border border-white/30 bg-white/10 text-white"
        >
          ×
        </button>

        <div className="h-full w-full p-8 text-white bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border-l border-white/10">
          <div className="max-w-md mx-auto h-full flex flex-col justify-center">
            <div className="mb-4">
              <h3 className="text-sm tracking-widest text-white/80">NEW MEMBER</h3>
              <p className="text-xs text-white/70">Create your account!</p>
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

            <form onSubmit={handleSubmit} className="space-y-3 max-h-[80vh] overflow-y-auto scrollbar-hide">
              <div>
                <label className="block text-sm text-white/80 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  aria-label="full name"
                  className="w-full px-4 py-2.5 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none placeholder:text-white/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  aria-label="email"
                  className="w-full px-4 py-2.5 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none placeholder:text-white/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  aria-label="role"
                  className="w-full px-4 py-2.5 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none appearance-none cursor-pointer dropdown-arrow"
                  required
                >
                  <option value="" disabled className="bg-gray-800">Select your role</option>
                  <option value="customer" className="bg-gray-800">Customer</option>
                  <option value="seller" className="bg-gray-800">Seller</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create Password"
                  aria-label="password"
                  className="w-full px-4 py-2.5 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none placeholder:text-white/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  aria-label="confirm password"
                  className="w-full px-4 py-2.5 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none placeholder:text-white/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  aria-label="phone number"
                  className="w-full px-4 py-2.5 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none placeholder:text-white/40"
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  aria-label="street address"
                  className="w-full px-4 py-2.5 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none placeholder:text-white/40"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm text-white/80 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    aria-label="city"
                    className="w-full px-4 py-2.5 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none placeholder:text-white/40"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-white/80 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    aria-label="zip code"
                    className="w-full px-4 py-2.5 rounded-full border border-dashed border-white/20 bg-transparent text-white outline-none placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-full bg-amber-600 text-white font-semibold flex items-center justify-center hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'} 
                  {!isLoading && <span className="ml-3">→</span>}
                </button>
              </div>

              <p className="text-center text-white/80 text-sm pt-2">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={onLoginClick}
                  className="underline hover:text-white transition-colors"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Signup
