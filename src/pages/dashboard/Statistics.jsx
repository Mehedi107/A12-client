import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ComponentPieChart from '../../components/shared/chart/ComponentPieChart';
import { notifyError } from '../../utils/notification';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Statistics = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const fetchAllProducts = async () => {
    try {
      const res = await axiosPublic.get('/all-products');
      return res.data;
    } catch (error) {
      console.error('Error fetching trending products:', error);
    }
  };

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const fetchAllReviews = async () => {
    try {
      const res = await axiosPublic.get('/reviews');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchAllReviews,
  });

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get('/users');
      return res.data;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      notifyError('Failed to fetch users.');
    }
  };

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const data = { products, users, reviews };

  return (
    <div>
      <h2>Statistics</h2>
      <div className="flex flex-wrap gap-5">
        {/* Product Status */}
        <div className="bg-white shadow-lg rounded-md p-5 ">
          <p className="text-center text-xl font-medium">
            Total Products: {products.length}
          </p>
          <ComponentPieChart pieData={data} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
