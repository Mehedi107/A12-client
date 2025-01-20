import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropTypes from 'prop-types';

const ReviewSlide = ({ reviews }) => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        // dir="rtl"
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review, i) => (
          <SwiperSlide key={i}>
            <div
              key={i}
              className="review-card flex flex-col items-center text-center gap-4 p-10 pb-20 border border-gray-200 rounded-lg shadow-lg bg-white"
            >
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                src="https://placehold.co/400"
                alt={review?.reviewerName || review?.name}
              />
              <h4 className="text-xl font-bold text-gray-800">
                {review?.reviewerName || review?.name}
              </h4>
              <p className="text-gray-600 italic">
                {review?.reviewDescription}
              </p>
              <p className="font-medium text-gray-500">
                Rating:
                <span className="text-yellow-500 ml-1 text-2xl">
                  {Array.from({ length: review?.rating }, (_, index) => (
                    <span key={index}>★</span>
                  ))}
                </span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

ReviewSlide.propTypes = {
  reviews: PropTypes.array,
};

export default ReviewSlide;
