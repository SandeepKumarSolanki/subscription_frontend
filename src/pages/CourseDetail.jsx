import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

const CourseDetail = () =>  {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    let mounted = true
    api.get(`/courses/${id}`).then(res => { if (mounted) setCourse(res.data) }).catch(() => { if (mounted) setCourse(null) })
    return () => { mounted = false }
  }, [id])

  const applyPromo = () => {
    if (!promo) { setMessage('Enter promo code'); setPromoApplied(false); return }
    if (promo.trim().toUpperCase() === 'BFSALE25') {
      setPromoApplied(true)
      setMessage('Promo applied — 50% off')
    } else {
      setPromoApplied(false)
      setMessage('Invalid promo code')
    }
  }

  const subscribe = async () => {
    setMessage(null)
    setLoading(true)
    try {
      const body = { courseId: id }
      if (course.price > 0) body.promoCode = promo
      await api.post('/subscribe', body)
      setMessage('Subscribed successfully')
    } catch (e) {
      setMessage(e.response?.data?.message || 'Subscription failed')
    } finally {
      setLoading(false)
    }
  }

  if (course === null) return <div className="p-6">Course not found</div>
  if (!course) return <div className="p-6">Loading...</div>

  const computedPrice = course.price === 0 ? 0 : (promoApplied ? course.price * 0.5 : course.price)

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded shadow">
        <img src={course.image || 'https://placeimg.com/1000/300/tech'} alt={course.title} className="w-full h-64 object-cover rounded" />
        <h2 className="mt-4 text-2xl font-bold">{course.title}</h2>
        <p className="mt-3 text-slate-600">{course.description}</p>

        <div className="mt-4">
          <p className="font-semibold">Price: {course.price === 0 ? 'Free' : `₹${course.price}`}</p>

          {course.price === 0 ? (
            <button onClick={subscribe} className="mt-3 bg-green-600 text-white px-4 py-2 rounded">Subscribe</button>
          ) : (
            <div className="mt-3 space-y-3">
              <div className="flex gap-2 items-center">
                <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code" className="p-2 border rounded" />
                <button onClick={applyPromo} className="bg-indigo-600 text-white px-3 py-2 rounded">Apply</button>
              </div>

              <div>
                <div className="text-sm text-slate-600">Final Price: <span className="font-semibold">₹{computedPrice}</span></div>
                <button
                  onClick={subscribe}
                  disabled={course.price > 0 && !promoApplied}
                  className={`mt-2 px-4 py-2 rounded text-white ${course.price === 0 || promoApplied ? 'bg-green-600' : 'bg-gray-300'}`}>
                  {loading ? 'Processing...' : 'Subscribe'}
                </button>
              </div>
            </div>
          )}

          {message && <div className="mt-3 p-2 rounded bg-slate-100 text-slate-800">{message}</div>}
        </div>
      </div>
    </div>
  )
}

export default CourseDetail;