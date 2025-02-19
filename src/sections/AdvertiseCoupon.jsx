import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import CardSkeleton from '../components/shared/cardSkeleton';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const AdvertiseCoupon = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all coupons
  const {
    data: coupons = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => (await axiosSecure.get('/coupons')).data,
  });

  return (
    <section className="py-24 bg-base-300 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-6">Available Coupons</h2>
        {/* If no coupon are found */}
        {isError && <p className="text-center text-lg">No coupons found...</p>}
        {/* When fetching coupon */}
        {isLoading && <LoadingSpinner />}

        {/* When coupon loaded successfully */}
        {coupons.length > 0 && (
          <div>
            <Swiper
              modules={[Pagination, A11y, Autoplay]}
              spaceBetween={50}
              autoplay
              loop={true}
              pagination={{ clickable: true }}
              className="swiper-container h-72"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
            >
              {coupons.map(coupon => (
                <SwiperSlide key={coupon._id}>
                  <div className="card bg-base-100 ">
                    <div className="card-body">
                      <p className="text-center text-3xl font-medium">
                        {coupon.code}
                      </p>
                      <p>
                        <strong>Expires: </strong>
                        {coupon.expiryDate}
                      </p>
                      <p>
                        <strong>Description: </strong>
                        {coupon.description.slice(0, 60)}
                      </p>
                      <p>
                        <strong>Discount: </strong>
                        {coupon.discount}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdvertiseCoupon;
