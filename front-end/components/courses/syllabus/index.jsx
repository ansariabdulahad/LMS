'use client';
import HomeLayout from '@/components/shared/home-layout'
import { FileOutlined, PlayCircleOutlined, QuestionOutlined } from '@ant-design/icons'
import { Button, Skeleton } from 'antd'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useSWR from 'swr';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINT;

const fetcher = async (url) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        return null;
    }
}

const Syllabus = () => {

    const [course, setCourse] = useState(null);
    const courseSlice = useSelector(state => state.courseSlice);
    const params = useSearchParams();
    const courseId = params.get("id");
    const { data: session } = useSession();

    const { data: topics, error: topicError } = useSWR(
        courseId ? `/topic/course/${courseId}/` : null,
        courseId ? fetcher : null
    );

    const { data: lessons, error: lessonError } = useSWR(
        '/lesson/',
        fetcher
    );

    useEffect(() => {
        if (courseId && courseSlice && courseSlice.data && courseSlice.data.length > 0) {
            const currentCourse = courseSlice.data.find((item) => item.id == courseId);
            setCourse(currentCourse);
        }
    }, [courseId, courseSlice]);

    return (
        <HomeLayout>
            <div className='flex flex-col items-center md:items-center justify-center bg-indigo-300 
            p-3 md:p-8'>

                <div className='w-full md:w-10/12 flex flex-col items-start justify-start'>
                    <h1 className='text-2xl text-black md:text-4xl font-semibold'
                    // style={{ fontFamily: 'bela-semibold' }}
                    >
                        {course && course.title}
                    </h1>
                    <p className='text-gray-600 font-semibold text-justify text-xl py-2'>
                        {course && course.description}
                    </p>
                </div>

                {
                    topics && topics.length > 0 ? (
                        topics.map((topic) => (
                            <div
                                key={topic.id}
                                className='w-full md:w-10/12 my-3 shadow-lg bg-white p-4'>
                                <h1
                                    // style={{ fontFamily: 'bela-semibold' }}
                                    className='text-xl md:text-2xl font-semibold capitalize'
                                >
                                    {topic.title}
                                </h1>

                                {
                                    lessons && lessons.length > 0 ? (
                                        lessons
                                            .filter((lesson) => (lesson.topicId == topic.id))
                                            .map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    className='flex justify-between items-center'>
                                                    <p className='lowercase font-semibold my-4 text-gray-600'>
                                                        {lesson.title}
                                                    </p>

                                                    {
                                                        session &&
                                                        <div className='flex gap-4'>
                                                            <Link target='_blank' href={lesson.videoUrl || "#"}>
                                                                <Button
                                                                    shape='circle'
                                                                    title='Play Online'
                                                                    className='bg-green-500 text-white'
                                                                    type='text'
                                                                    icon={<PlayCircleOutlined />}
                                                                />
                                                            </Link>
                                                            {
                                                                lesson && lesson.accest ? (
                                                                    <Link target='_blank' href={lesson.accest || "#"}>
                                                                        <Button
                                                                            shape='circle'
                                                                            title='Downlaod Notes'
                                                                            className='bg-blue-500 text-white'
                                                                            type='text'
                                                                            icon={<FileOutlined />}
                                                                        />
                                                                    </Link>
                                                                ) : (
                                                                    <Button
                                                                        shape='circle'
                                                                        title='No Notes'
                                                                        className='bg-red-500 text-white'
                                                                        type='text'
                                                                        icon={<QuestionOutlined />}
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            ))
                                    ) : (
                                        <Skeleton active />
                                    )
                                }
                            </div>
                        ))
                    ) : (
                        <div className='w-full p-2 md:w-10/12'>
                            <p className='text-white underline my-2'>No Topics Available Now!</p>
                            <Skeleton active />
                        </div>
                    )
                }

            </div>
        </HomeLayout>
    )
}

export default Syllabus