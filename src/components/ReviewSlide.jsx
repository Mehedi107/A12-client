import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropTypes from 'prop-types';
import avatar from '../assets/avatar.png';

const ReviewSlide = ({ reviews }) => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        // navigation={true}
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
        {reviews.map(review => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center text-center gap-4 p-4 sm:p-10 pb-20 border border-gray-200 rounded-lg shadow bg-white">
              {/* Reviewer Image */}
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                src={review?.photo || avatar}
                alt={review?.reviewerName || review?.name}
              />
              {/* Reviewer name */}
              <h4 className="text-xl font-bold text-gray-800">
                {review?.reviewerName || review?.name}
              </h4>
              {/* Review text */}
              <p className="text-gray-600 italic text-sm sm:text-base">{`"${review?.review}"`}</p>
              {/* Rating */}
              <div className="">
                <span className="text-yellow-500 ml-1 text-2xl">
                  {Array.from({ length: review?.rating }, (_, index) => (
                    <span key={index}>★</span>
                  ))}
                </span>
              </div>
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
