'use client';
import { getCourse } from '@/redux/slices/course.slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeLayout from '../shared/home-layout';
import { Skeleton } from 'antd';
import CourseList from './courseList';

const Courses = () => {
    const courseSlice = useSelector(state => state.courseSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCourse());
    }, [dispatch]);

    return (
        <HomeLayout>
            {
                courseSlice.loading ? (
                    <Skeleton active />
                ) : (
                    <CourseList data={courseSlice?.data} />
                )
            }
        </HomeLayout>
    )
}

export default Courses