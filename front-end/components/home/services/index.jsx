import React from 'react';
import { Card, Button, } from 'antd';
import { BuildOutlined, PhoneOutlined, PlayCircleOutlined } from '@ant-design/icons';
const { Meta } = Card;

const service = [
    {
        title: 'Live call supports',
        desc: 'Real-time Communication : Students can engage with faculty members instantly, either through voice call or google meet, allowing for immediate interaction and feedback.',
        icon: <PhoneOutlined style={{ fontSize: 30 }} />,
        color: 'bg-red-500'
    },
    {
        title: 'Life time video access',
        desc: 'You can access all videos online : We gives you the life time access of our video, so that you can read the same video more and more times and it will help you to improove your coding skill`s',
        icon: <PlayCircleOutlined style={{ fontSize: 30 }} />,
        color: 'bg-violet-500'
    },
    {
        title: '100% project based video',
        desc: 'Total project`s based learning : Always our focus is to teach you every topic with small project & We build more than 1 real world major projects in each language and don`t worry. The project devided in seprate video`s ',
        icon: <BuildOutlined style={{ fontSize: 30 }} />,
        color: 'bg-slate-500'
    }
]

const Services = () => {
    return (
        <div className="w-full bg-green-50 gap-y-5 p-3 md:p-16 flex flex-col items-center justify-center">
            <h1
                style={{ fontFamily: 'bela-semibold' }}
                className="text-xl text-center md:text-4xl font-semibold">
                Facilities For Premium Students
            </h1>
            <div className='grid gap-8 md:grid-cols-3'>
                {
                    service.map((item, index) => (
                        <Card
                            key={index}
                            hoverable >
                            <Meta title={
                                <div className='flex gap-4 items-center justify-center flex-col'>
                                    <Button
                                        className={`${item.color} text-white`}
                                        shape='circle'
                                        size='large'
                                        style={{
                                            width: 70,
                                            height: 70,
                                        }}
                                        icon={item.icon}
                                    />
                                    <p className='font-bold text-center text-xl'>{item.title}</p>
                                </div>
                            } description={
                                <p className='font-semibold text-justify'>{item.desc}</p>
                            } />
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}
export default Services;