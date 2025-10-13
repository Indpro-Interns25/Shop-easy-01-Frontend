import { useState } from 'react'
import Home from './pages/home'
import Login from './authentication/login'
import Admin from './admin'
import './index.css'

function App() {
  const [page, setPage] = useState<'home' | 'login' | 'admin'>('home')

  return (
    <>
      {page === 'home' && (
        <Home 
          onLoginClick={() => setPage('login')}
          onAdminClick={() => setPage('admin')} 
        />
      )}
      {page === 'login' && <Login onClose={() => setPage('home')} />}
      {page === 'admin' && <Admin />}
    </>
  )
}

export default App
