import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import CourseCard from '../components/CourseCard'

const Home = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(() => {
    let mounted = true

    async function loadCourses() {
      try {
        setLoading(true)

        const res = await api.get('/courses')

        const data = Array.isArray(res.data) ? res.data : res.data.courses

        if (mounted) setCourses(data)
      } catch (e) {
        if (mounted) setErr(e.response?.data?.message || 'Failed to load')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadCourses()
    
    return () => { mounted = false }
  }, [])
  console.log(courses)
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
      </header>

      {loading && <div>Loading courses...</div>}
      {err && <div className="bg-red-100 text-red-700 p-2 rounded">{err}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <CourseCard key={c._id} course={c} />
        ))}
      </div>
    </div>
  )
}

export default Home;