import bg1 from '../assets/banner/banner_img_1.svg';
import bg2 from '../assets/banner/banner_img_2.svg';
import bg3 from '../assets/banner/banner_img_3.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/autoplay';
import Lottie from 'lottie-react';
import globe from '../assets/globe.json';

const bannerSlides = [
  {
    img: bg1,
    title: 'Discover the latest tech marvels.',
    description:
      'Join ProdVent to share, explore, and elevate groundbreaking products.',
  },
  {
    img: bg2,
    title: 'Spotlight the future of innovation.',
    description:
      'Unleash ideas and connect with a community that builds the extraordinary.',
  },
  {
    img: bg3,
    title: 'Turn your vision into a movement.',
    description: 'Discover, support, and showcase products shaping the future.',
  },
];

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        autoplay
        loop={true}
        // navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {bannerSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col md:flex-row gap-20 justify-center items-center py-10 px-4 mt-[68px] bg-base-100">
              <div className="md:w-1/2">
                {/* <img
                  className="h-screen object-contain max-h-[400px] mx-auto"
                  src={slide.img}
                /> */}
                <Lottie animationData={globe} loop={true} />
              </div>
              <div className="md:w-1/2">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral">
                  {slide.title}
                </h1>
                <p>{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
