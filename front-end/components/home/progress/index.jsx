import React from 'react';
import { Flex, Progress } from 'antd';
const Progress1 = () => {
    return (
        <div className="w-full bg-white gap-y-5 p-3 md:p-16 flex flex-col items-center justify-center">
            <h1
                style={{ fontFamily: 'bela-semibold' }}
                className="text-xl text-center md:text-4xl font-semibold">
                Growth After Premium Facilities
            </h1>
            <Flex className='w-full' gap="small" vertical>
                <p style={{ fontSize: '16px' }}>Coding Doubts And Queries Solution</p>
                <Progress strokeColor='violet' percent={99} />
                <p style={{ fontSize: '16px' }}>Regular Learning Upto</p>
                <Progress percent={75} />
                <p style={{ fontSize: '16px' }}>Jobs And Interview Crack Chances</p>
                <Progress strokeColor='green' percent={95} />
                <p style={{ fontSize: '16px' }}>Part Time Earning Posiblities Upto</p>
                <Progress strokeColor='pink' percent={75} />
                <p style={{ fontSize: '16px' }}>Communication Skills Improved Upto</p>
                <Progress strokeColor='red' percent={85} />
            </Flex>
        </div>
    )
}
export default Progress1;