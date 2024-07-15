import { memo } from "react";
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

function SliderCustom({ images }) {
    console.log(images);
    return (
        <div className="w-full">
            <Slider  {...settings}>
                {
                    images?.length > 0 && images?.map((item, index) => {
                        return (
                            <div className="bg-black flex justify-center h-[500px] px-12">
                                <img src={item} alt="slider" className="object-contain m-auto h-full">
                                </img>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    );
}

export default memo(SliderCustom);