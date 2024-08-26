'use client';

import { Button, Carousel } from "antd";
import { signOut } from "next-auth/react";
import HomeLayout from "../shared/home-layout";
import Carousel1 from "./carousel";
import HowToStart from "./howToStart";
import Services from "./services";
import Team from "./team";
import Project from "./project";
import Progress1 from "./progress";

const Homepage = () => {
    return (
        <HomeLayout>
            <Carousel1 />
            <HowToStart />
            <Services />
            <Team />
            <Project />
            <Progress1 />
        </HomeLayout>
    )
}

export default Homepage;