'use client';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import Image from 'next/image';

const HeroSwiper: React.FC = () => {
  return (
    <div id="img" className="h-full w-full absolute -z-10">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop={true}
        className="h-full"
        modules={[Autoplay]}
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

export default HeroSwiper;
