import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { carouselImage } from '../constant';
import 'swiper/css';
import 'swiper/css/navigation';

const Carousel = () => {
    return (
        <section className="h-fit max-w-full overflow-hidden md:flex md:justify-center md:py-10">
            <div className='md:w-[60%]'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                >
                    {carouselImage.map((image) => (
                        <SwiperSlide key={image.alt} className="flex justify-center">
                            <img
                                loading="lazy"
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-contain"
                                sizes="(max-width: 480px) 100vw, (max-width: 768px) 75vw, 50vw"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section >
    );
};

export default Carousel;
