import CourseList from '@/components/courses/courseList';
import React from 'react'

const Trending = ({ data }) => {
    let trendingCourses = data.filter((item) => item.courseType === 'trending');

    return (
        <div className='w-full bg-rose-50 gap-y-5 p-3 md:p-16 flex flex-col items-center justify-center'>
            <h1 className='text-xl text-center md:text-4xl font-semibold'
                style={{ fontFamily: 'bela-semibold' }}
            >
                Trending Courses
            </h1>

            <CourseList data={trendingCourses} />
        </div>
    )
}

export default Trending