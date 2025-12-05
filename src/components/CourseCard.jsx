import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img src={course.image || 'https://placeimg.com/640/360/tech'} alt={course.title} className="h-40 w-full object-cover rounded" />
      <h3 className="mt-3 font-semibold text-lg">{course.title}</h3>
      <p className="mt-1 text-sm text-slate-600 line-clamp-3">{course.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold">{course.price === 0 ? 'Free' : `₹${course.price}`}</span>
        <Link to={`/courses/${course._id}`} className="text-indigo-600 text-sm">View</Link>
      </div>
    </div>
  )
}

export default CourseCard;
