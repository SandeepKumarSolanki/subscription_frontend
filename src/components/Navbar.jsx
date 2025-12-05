import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearAuth, getUser } from '../utils/auth'

const Navbar = () => {
  const nav = useNavigate()
  const user = getUser()

  const logout = () => {
    clearAuth()
    nav('/login')
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg text-indigo-600">BlackFriday Courses</Link>
        <div className="flex items-center gap-4">
          <Link to="/my-courses" className="text-slate-700 hover:text-indigo-600">My Courses</Link>
          {!user && <Link to="/login" className="text-slate-700 hover:text-indigo-600">Login</Link>}
          {!user && <Link to="/signup" className="text-slate-700 hover:text-indigo-600">Sign up</Link>}
          {user && (
            <>
              <span className="text-sm text-slate-600">Hi, {user.name || user.email}</span>
              <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
