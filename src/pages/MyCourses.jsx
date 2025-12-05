import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import dayjs from 'dayjs'

const MyCourses = () => {
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get('/subscribe/my-courses')
      .then(res => setSubs(res.data))
      .catch(e => setErr(e.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>
      {loading && <div>Loading...</div>}
      {err && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{err}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subs.length === 0 && !loading && <div>No subscriptions yet</div>}
        {subs.map(s => (
          <div key={s.id} className="bg-white p-4 rounded shadow flex gap-4">
            <img src={s.image || 'https://placeimg.com/120/80/tech'} className="w-28 h-20 object-cover rounded" alt={s.title}/>
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-slate-600">Paid: ₹{s.pricePaid}</p>
              <p className="text-xs text-slate-500">Subscribed: {dayjs(s.subscribedAt).format('DD MMM YYYY')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyCourses;