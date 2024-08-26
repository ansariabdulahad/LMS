import React from 'react';
import { Card, Button, Badge, Typography } from 'antd';

let learn = [
    {
        title: 'AS BIGINNER`S CHOOSE THESE',
        topic: [
            {
                title: 'HTML',
                color: 'cyan',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'CSS',
                color: 'pink',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'JAVASCRIPT',
                color: 'green',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'BOOTSTRAP',
                color: 'yellow',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'TAILWIND CSS',
                color: 'blue',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
        ]
    },
    {
        title: 'FOR FRONT-END CHOOSE THESE',
        topic: [
            {
                title: 'REACT JS',
                color: 'cyan',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'MATERIAL UI',
                color: 'pink',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'ANT DESIGN',
                color: 'green',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'REDUX',
                color: 'yellow',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'ANGULAR JS',
                color: 'blue',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
        ]
    },
    {
        title: 'FOR BACKEND CHOOSE THESE',
        topic: [
            {
                title: 'PHP',
                color: 'cyan',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'NODE JS',
                color: 'pink',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'PYTHON',
                color: 'green',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'JAVA',
                color: 'yellow',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'ASP.NET',
                color: 'blue',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
        ]
    },
    {
        title: 'FOR MERN CHOOSE THESE',
        topic: [
            {
                title: 'MONGODB',
                color: 'cyan',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'EXPRESS',
                color: 'pink',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'REACT JS',
                color: 'green',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'NODE JS',
                color: 'blue',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            }
        ]
    },
    {
        title: 'FULL STACK WITH PYTHON',
        topic: [
            {
                title: 'PYTHON',
                color: 'cyan',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'DJANGO',
                color: 'pink',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'NEXT OR REACT',
                color: 'green',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'ANT D OR MATERIAL UI',
                color: 'blue',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            }
        ]
    },
    {
        title: 'FOR FULL STACK DEVELOPMENT',
        topic: [
            {
                title: 'REACT JS',
                color: 'cyan',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'NEXT JS',
                color: 'pink',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'MATERAIL UI',
                color: 'green',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            },
            {
                title: 'REDUX',
                color: 'blue',
                link: '',
                text: 'FROM JUST FOR CODE YOUTUBE'
            }
        ]
    },
]

const HowToStart = () => {
    return (
        <div className="w-full bg-violet-50 gap-y-5 py-3 md:p-16 flex flex-col items-center justify-center">
            <h1
                style={{ fontFamily: 'bela-semibold' }}
                className="text-xl text-center md:text-4xl font-semibold mt-3 md:mt-0">HOW TO START LEARNING AS BIGINNER</h1>
            <div className="w-full p-4 md:p-0 md:w-11/12 gap-4 md:gap-8 grid md:grid-cols-3">
                {
                    learn.map((item, index) => (
                        <div key={index}>
                            <Card
                                className="flex flex-col justify-between mt-0 md:mt-5"
                                title={
                                    <Typography className='text-center text-md md:text-xl font-bold'>{item.title}</Typography>
                                }
                                bordered={false}>
                                {
                                    item.topic.map((topic, index) => (
                                        <Badge.Ribbon key={index} color={topic.color} text={topic.title}>
                                            <Card title={
                                                <Typography className='text-sm md:text-md'>{topic.text}</Typography>
                                            } size="small" />
                                        </Badge.Ribbon>
                                    ))
                                }
                            </Card>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default HowToStart;