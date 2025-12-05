import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { saveAuth } from '../utils/auth'

const Login = () => {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      saveAuth(data.token, data.user)
      nav('/')
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {err && <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">{err}</div>}
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-3" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded mb-3" />
        <button disabled={loading} className="w-full bg-indigo-600 text-white p-2 rounded">{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  )
}

export default Login;