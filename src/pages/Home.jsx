import Banner from '../components/Banner';
import AdvertiseCoupon from '../sections/AdvertiseCoupon';
import FeaturedProducts from '../sections/FeaturedProduct';
import TrendingProducts from '../sections/TreandingProducts';

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <TrendingProducts />
      <AdvertiseCoupon />
    </div>
  );
};

export default Home;
