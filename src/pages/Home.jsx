import Banner from '../components/Banner';
import HelmetAsync from '../components/shared/HelmetAsync';
import AdvertiseCoupon from '../sections/AdvertiseCoupon';
import FeaturedProducts from '../sections/FeaturedProduct';
import SectionLatestDiscuss from '../sections/SectionLatestDiscuss';
import SectionUpcomingLaunche from '../sections/SectionUpcomingLaunche';
import TrendingProducts from '../sections/TreandingProducts';

const Home = () => {
  return (
    <div>
      <HelmetAsync title="Home" />
      <Banner />
      <FeaturedProducts />
      <SectionLatestDiscuss />
      <SectionUpcomingLaunche />
      <TrendingProducts />
      <AdvertiseCoupon />
    </div>
  );
};

export default Home;
