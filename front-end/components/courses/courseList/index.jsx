import { Button, Card } from 'antd'
import Image from 'next/image'
import Link from 'next/link';
import React, { Fragment } from 'react'

const { Meta } = Card;

const CourseList = ({ data }) => {
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-4'>
            {
                data && data.map((item, index) => (
                    <Card
                        key={index}
                        hoverable
                        cover={
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={100}
                                height={100}
                                unoptimized
                            />
                        }
                    >
                        <Meta
                            title={
                                <div className='flex justify-between items-center'>
                                    <p>{item.title}</p>
                                    {
                                        item.discount > 0 ? (
                                            <Fragment>
                                                <del>₹{item.price}</del>
                                                <p>
                                                    ₹{item.price - ((item.price * item.discount) / 100)}
                                                </p>
                                            </Fragment>
                                        ) : (
                                            <p>₹{item.price}</p>
                                        )
                                    }
                                </div>
                            }
                            description={
                                <div>
                                    <div className='flex justify-between py-5'>
                                        <Button className={`text-white 
                                            ${item.free ? 'bg-violet-500' : 'bg-pink-500'}
                                            `}>
                                            {item.free ? 'Free' : 'Paid'}
                                        </Button>
                                        <Button className={`text-white 
                                            ${item.live ? 'bg-red-500' : 'bg-green-500'}
                                            `}>
                                            {item.live ? 'Live' : 'Completed'}
                                        </Button>
                                    </div>

                                    <Link href={`/courses/${item.id}/`}>
                                        <Button
                                            type='primary'
                                            className='w-full mb-2 font-semibold bg-purple-500'
                                        >
                                            Syllabus
                                        </Button>
                                        <Button
                                            type='primary'
                                            className='w-full mb-2 font-semibold bg-blue-500'
                                        >
                                            Register
                                        </Button>
                                    </Link>
                                </div>
                            }
                        />
                    </Card>
                ))
            }
        </div>
    )
}

export default CourseList