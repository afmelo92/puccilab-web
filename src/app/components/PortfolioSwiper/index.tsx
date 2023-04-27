'use client';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import Image from 'next/image';

const PortfolioSwiper: React.FC = () => {
  return (
    <div id="img" className="h-full w-full">
      <Swiper
        spaceBetween={4}
        slidesPerView={2}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="h-full"
        navigation
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination]}
        breakpoints={{
          480: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        }}
      >
        <SwiperSlide className="h-full relative">
          <Image
            alt="banner"
            src="/banner1.jpg"
            fill
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcunZtPQAGvgKQVfI1IgAAAABJRU5ErkJggg=="
            quality={100}
          />
        </SwiperSlide>
        <SwiperSlide className="h-full relative">
          <Image
            alt="banner"
            src="/protese1.jpg"
            fill
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcunZtPQAGvgKQVfI1IgAAAABJRU5ErkJggg=="
            quality={100}
          />
        </SwiperSlide>
        <SwiperSlide className="h-full relative">
          <Image
            alt="banner"
            src="/protese2.jpg"
            fill
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcunZtPQAGvgKQVfI1IgAAAABJRU5ErkJggg=="
            quality={100}
          />
        </SwiperSlide>
        <SwiperSlide className="h-full relative">
          <Image
            alt="banner"
            src="/protese3.jpg"
            fill
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcunZtPQAGvgKQVfI1IgAAAABJRU5ErkJggg=="
            quality={100}
          />
        </SwiperSlide>
        <SwiperSlide className="h-full relative">
          <Image
            alt="banner"
            src="/protese4.jpg"
            fill
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcunZtPQAGvgKQVfI1IgAAAABJRU5ErkJggg=="
            quality={100}
          />
        </SwiperSlide>
        <SwiperSlide className="h-full relative">
          <Image
            alt="banner"
            src="/protese5.jpg"
            fill
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcunZtPQAGvgKQVfI1IgAAAABJRU5ErkJggg=="
            quality={100}
          />
        </SwiperSlide>
        <SwiperSlide className="h-full relative">
          <Image
            alt="banner"
            src="/protese6.jpg"
            fill
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcunZtPQAGvgKQVfI1IgAAAABJRU5ErkJggg=="
            quality={100}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PortfolioSwiper;
