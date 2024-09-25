'use client';

import { Button, Carousel, Skeleton } from "antd";
import { signOut } from "next-auth/react";
import HomeLayout from "../shared/home-layout";
import Carousel1 from "./carousel";
import HowToStart from "./howToStart";
import Services from "./services";
import Team from "./team";
import Project from "./project";
import Progress1 from "./progress";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCourse } from "@/redux/slices/course.slice";
import Trending from "./trending";

const Homepage = () => {
    const dispatch = useDispatch();
    const courseSlice = useSelector(state => state.courseSlice);

    useEffect(() => {
        dispatch(getCourse());
    }, [dispatch]);

    return (
        <HomeLayout>
            <Carousel1 />
            <HowToStart />
            {
                courseSlice.loading ? (
                    <Skeleton active />
                ) : (
                    <Trending data={courseSlice?.data} />
                )
            }
            <Services />
            <Team />
            <Project />
            <Progress1 />
        </HomeLayout>
    )
}

export default Homepage;