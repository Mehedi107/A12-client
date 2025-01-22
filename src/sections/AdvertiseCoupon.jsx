import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdvertiseCoupon = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all coupons
  const fetchAllCoupons = async () => {
    try {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data: coupons = [] } = useQuery({
    queryKey: ['coupons'],
    queryFn: fetchAllCoupons,
  });

  console.log(coupons);

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Available Coupons</h2>
      <div>
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          spaceBetween={50}
          autoplay
          loop={true}
          pagination={{ clickable: true }}
          className="swiper-container h-64"
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {coupons.map(coupon => (
            <SwiperSlide key={coupon._id}>
              <div className="card bg-base-200 ">
                <div className="card-body">
                  <p className="text-center text-3xl font-medium">
                    {coupon.code}
                  </p>
                  <p>Expires: {coupon.expiryDate}</p>
                  <p>Description: {coupon.description.slice(0, 60)}</p>
                  <p>Discount: {coupon.discount}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination !mt-6"></div>
      </div>
    </section>
  );
};

export default AdvertiseCoupon;
