import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Signup = () => {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try {
      await api.post('/auth/signup', { name, email, password })
      nav('/login')
    } catch (error) {
      setErr(error.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
        {err && <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">{err}</div>}
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" className="w-full p-2 border rounded mb-3" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-3" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded mb-3" />
        <button disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">{loading ? 'Creating...' : 'Sign up'}</button>
      </form>
    </div>
  )
}

export default Signup;
