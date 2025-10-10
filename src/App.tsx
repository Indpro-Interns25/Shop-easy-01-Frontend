import { useState } from 'react'
import Home from './pages/home'
import Login from './pages/login'
import './index.css'

function App() {
  const [page, setPage] = useState<'home' | 'login'>('home')

  return (
    <>
      {page === 'home' && <Home onLoginClick={() => setPage('login')} />}
      {page === 'login' && <Login onClose={() => setPage('home')} />}
    </>
  )
}

export default App
