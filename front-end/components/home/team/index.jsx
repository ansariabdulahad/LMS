import React from 'react';
import { Button, Card } from 'antd';
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined, WhatsAppOutlined } from '@ant-design/icons';
import teamList from "../../../json/team";
import Link from 'next/link';
import Image from 'next/image';
const { Meta } = Card;
const Team = () => {
    return (
        <div className="w-full bg-yellow-50 gap-y-5 p-3 md:p-16 flex flex-col items-center justify-center">
            <h1
                style={{ fontFamily: 'bela-semibold' }}
                className="text-xl text-center md:text-4xl font-semibold">
                Our Teams
            </h1>
            <div className='w-full grid  md:grid-cols-5 gap-4'>
                {
                    teamList.map((item, index) => (
                        <Card
                            key={index}
                            className='flex flex-col justify-center items-center'
                            hoverable
                            cover={
                                <Image
                                    src={item.image}
                                    alt="example"
                                    width={0}
                                    height={0}
                                    unoptimized
                                    className='mt-3'
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: '50%',
                                        border: "7px groove orange"
                                    }}
                                />
                            }
                        >
                            <Meta title={
                                <div className='flex flex-col justify-center items-center'>
                                    <p className='capitalize'>
                                        <b>Name  : </b> {item.name}
                                    </p>
                                    <p className='capitalize'>
                                        <b>Education : </b> {item.education}
                                    </p>
                                </div>
                            } description={
                                <div>
                                    <p className='text-justify'>
                                        <b>About : </b>{item.about}
                                    </p>
                                    <div className='flex justify-around gap-4 py-5'>
                                        <Link target='_blank' href={item.media[0]}>
                                            <Button
                                                size='large'
                                                shape='circle'
                                                className='bg-green-500 text-white'
                                                icon={<WhatsAppOutlined />}
                                            />
                                        </Link>
                                        <Link target='_blank' href={item.media[1]}>
                                            <Button
                                                size='large'
                                                shape='circle'
                                                className='bg-blue-500 text-white'
                                                icon={<TwitterOutlined />}
                                            />
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
    )
}
export default Team;