import bg1 from '../assets/banner/banner_img_1.svg';
import bg2 from '../assets/banner/banner_img_2.svg';
import bg3 from '../assets/banner/banner_img_3.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

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
    <div>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {bannerSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col md:flex-row gap-20 justify-center  items-center bg-white py-10">
              <div className="w-1/2">
                <img
                  className="w-full max-h-80vh object-cover"
                  src={slide.img}
                />
              </div>
              <div className="w-1/2">
                <h1 className="text-xl md:text-3xl font-bold">{slide.title}</h1>
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
