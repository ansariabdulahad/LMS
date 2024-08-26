import { Carousel } from "antd";
import Image from "next/image";
const Carousel1 = () => {
    return (
        <Carousel autoplaySpeed={10000} autoplay arrows infinite={false}>
            <video
                autoPlay={true}
                muted
                loop
            >
                <source
                    src="/carousel/vi-1.mp4"
                />
            </video>
            <video
                autoPlay={true}
                muted
                loop
            >
                <source
                    src="/carousel/vi-2.mp4"
                />
            </video>
            <video
                autoPlay={true}
                muted
                loop
            >
                <source
                    src="/carousel/vi-4.mp4"
                />
            </video>
            <video
                autoPlay={true}
                muted
                loop
            >
                <source
                    src="/carousel/vi-3.mp4"
                />
            </video>
        </Carousel>
    )
}
export default Carousel1;
