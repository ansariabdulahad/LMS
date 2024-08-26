import React from 'react';
import { Carousel, Button, Card } from 'antd';
import teamList from "../../../json/team";
import Link from 'next/link';
import projectList from "../../../json/project";
import Image from 'next/image';
const { Meta } = Card;
const Project = () => {
    return (
        <Carousel autoplay arrows infinite={true}>
            {
                projectList.map((item, index) => (
                    <div key={index} className='w-full p-3 md:p-16 bg-orange-200'>
                        <h1
                            style={{ fontFamily: 'bela-semibold' }}
                            className="text-xl my-4 text-center md:text-4xl font-semibold">
                            Popular Projects
                        </h1>
                        <div className='w-full grid  md:grid-cols-5 gap-4'>
                            {
                                item.one.map((obj, idx) => (
                                    <Card
                                        key={idx}
                                        className='flex flex-col justify-center items-center'
                                        hoverable
                                        cover={
                                            <Image
                                                src={obj.image}
                                                alt="example"
                                                width={100}
                                                height={100}
                                                unoptimized
                                            />
                                        }
                                    >
                                        <Meta title={
                                            <div className='flex flex-col justify-center items-center'>
                                                <p className='capitalize'>
                                                    <b>{obj.title}</b>
                                                </p>
                                            </div>
                                        } description={
                                            <div>
                                                <div className='flex flex-col justify-around gap-4 py-5'>
                                                    {
                                                        !obj.isFree ?
                                                            <Button className='bg-red-500 text-white'>
                                                                <b>Paid : </b>₹ {obj.price}
                                                            </Button>
                                                            :
                                                            <Button className='bg-green-500 text-white'>
                                                                <b>Free : </b>₹ {obj.price}
                                                            </Button>
                                                    }
                                                    <Link target='_blank' href={obj.link}>
                                                        <Button className='w-full bg-indigo-500 text-white'>Visit</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                        />
                                    </Card>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </Carousel>
    )
}
export default Project;