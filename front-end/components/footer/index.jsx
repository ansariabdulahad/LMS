'use client';
import Logo from "../shared/logo";
import { Button } from "antd";
import {
    PhoneOutlined,
    YoutubeOutlined,
    LinkedinOutlined,
    WhatsAppOutlined
} from "@ant-design/icons";
import Link from "next/link";
const FooterEl = () => {
    return (
        <div className="px-3 md:px-16 py-16 grid gap-y-8 md:gap-y-0 md:grid-cols-4 bg-gray-50">
            <div>
                <Logo text="JUST FOR CODE" />
                <div className="flex gap-x-3 ml-4 mt-8 items-center">
                    <Button
                        shape="circle"
                        style={{ border: 0 }}
                        className="bg-indigo-100 text-indigo-600"
                        icon={<PhoneOutlined />}
                    />
                    <p className="font-semibold">+91-7860171055</p>
                    <p className="font-semibold">+91-6393640841</p>
                </div>
                <div className="flex gap-x-6 mt-8 ml-4 items-center ">
                    <Link legacyBehavior href='https://www.youtube.com/@Justforcode/playlists'>
                        <Button
                            shape="circle"
                            size="large"
                            className="text-white bg-red-500"
                            icon={<YoutubeOutlined
                                style={{
                                    fontSize: '30px'
                                }} />}
                        />
                    </Link>
                    <Link legacyBehavior href='linkedin.com/in/just-for-code-32927b246'>
                        <Button
                            shape="circle"
                            size="large"
                            className="text-blue-400 bg-blue-100"
                            icon={<LinkedinOutlined
                                style={{
                                    fontSize: '30px'
                                }} />}
                        />
                    </Link>
                    <Link legacyBehavior href="https://chat.whatsapp.com/IQ4Od7CDaar7zkfmBnMgXf">
                        <Button
                            shape="circle"
                            size="large"
                            className="text-green-400 bg-green-100"
                            icon={<WhatsAppOutlined
                                style={{
                                    fontSize: '30px'
                                }} />}
                        />
                    </Link>
                </div>
            </div>
            <div className="flex px-0 md:px-16 ml-4 flex-col gap-y-3 text-md">
                <h3 className="font-semibold text-xl">Navlinks</h3>
                <Link href='/'>Home</Link>
                <Link href='/course'>Course</Link>
                <Link href='/students'>Students</Link>
                <Link href='/contact-us'>Contact-us</Link>
                <Link href='/reviews'>Reviews</Link>
                <Link href='/login'>Login</Link>
                <Link href='/register'>Signup</Link>
            </div>
            <div className="flex flex-col ml-4 text-slate-700 gap-y-3 text-md">
                <h3 className="font-semibold text-xl">YouTube videos</h3>
                <Link target="_blank" href='https://www.youtube.com/playlist?list=PLoi8PK3q1sGHaez5XpoULSesWZtaXNZhM'>JavaScript Full Course (2024) - Beginners to Pro</Link>
                <Link target="_blank" href='https://www.youtube.com/playlist?list=PLoi8PK3q1sGHaez5XpoULSesWZtaXNZhM'>INTERVIEW QUESTIONS</Link>
                <Link target="_blank" href='https://www.youtube.com/playlist?list=PLoi8PK3q1sGGJMgqdVISbwxcUjsVrfRXH'>HOTEL MANAGEMENT SYSTEM</Link>
                <Link target="_blank" href='https://www.youtube.com/playlist?list=PLoi8PK3q1sGFgI7Fcz79X7TwhBVy5hX2m'>JAVASCRIPT REAL TIME PROJECTS</Link>
                <Link target="_blank" href='https://www.youtube.com/playlist?list=PLoi8PK3q1sGFC71MuGmgwrKdOxRsgL5Zv'>REACT+ REDUX PROJECT FOR BIGINNERS</Link>
                <Link target="_blank" href='https://www.youtube.com/playlist?list=PLoi8PK3q1sGFNuP8kpGzmcWei_Tq_fgIz'>NEW REACTJS 01-09-2023 BATCH</Link>
                <Link target="_blank" href='https://www.youtube.com/playlist?list=PLoi8PK3q1sGEPbSI2fFmsLcXH3iGA2NoI'>CHATBOT DEVELOPMENT</Link>
            </div>
            <div className="flex flex-col ml-4 gap-y-3 text-md">
                <h3 className="font-semibold text-xl">Devtools</h3>
                <Link target="_blank" href='https://stackoverflow.com/'>Stackoverflow</Link>
                <Link target="_blank" href='https://hostingchecker.com/'>Hosting checker</Link>
                <Link target="_blank" href='https://dnschecker.org/'>Dns checker</Link>
                <Link target="_blank" href='https://chatgpt.com'>Coding solutions</Link>
                <Link target="_blank" href='https://randomkeygen.com/'>Secret key generator</Link>
            </div>
        </div>
    )
}
export default FooterEl;