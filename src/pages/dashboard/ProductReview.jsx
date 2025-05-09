import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { notifyError, notifySuccess } from '../../utils/notification';
import HelmetAsync from '../../components/shared/HelmetAsync';

const ProductReview = () => {
  const axiosPublic = useAxiosPublic();

  const fetchPendingProducts = async () => {
    const res = await axiosPublic.get('/all-products');
    return res.data;
  };

  const { data: products = [], refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchPendingProducts,
  });

  const sortedProducts = products.sort((a, b) => {
    const statusOrder = { pending: 1, rejected: 2, accepted: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const handleFeatured = async id => {
    try {
      const res = await axiosPublic.patch(`/featured/${id}`);

      // Updated as featured
      if (res.data.modifiedCount) {
        notifySuccess('This is featured product now!');
        refetch();
      }

      // If already featured
      if (!res.data.modifiedCount) {
        notifySuccess('Already a featured product!');
        refetch();
      }
    } catch (error) {
      notifyError('Error changing product type');
      // console.log(error);
    }
  };

  const handleAccept = async id => {
    try {
      const res = await axiosPublic.patch(`/accept-product/${id}`);

      // If status changed successful
      if (res.data.modifiedCount) {
        notifySuccess('Product status has been changed!');
        refetch();
      }
    } catch (error) {
      notifyError('Error changing product status');
      // console.log(error);
    }
  };

  const handleReject = async id => {
    try {
      const res = await axiosPublic.patch(`/reject-product/${id}`);

      // If reject successful
      if (res.data.modifiedCount) {
        notifySuccess('Product status has been changed!');
        refetch();
      }
    } catch (error) {
      notifyError('Error changing product status');
      // console.log(error);
    }
  };

  return (
    <div className="sm:p-6 bg-base-100 min-h-screen">
      <HelmetAsync title="Product review" />
      <h2 className=" text-center mb-6">Product Review Queue</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-base-300 border-collapse rounded-md text-center">
          <thead className="text-base bg-base-300">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={product._id}>
                <td className="border border-base-300">{index + 1}</td>
                <td className="border border-base-300">{product.name}</td>
                <td className="border border-base-300">
                  <span
                    className={`badge capitalize ${
                      product.status === 'pending'
                        ? 'badge-warning'
                        : product.status === 'accepted'
                        ? 'badge-success'
                        : 'badge-error'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="flex gap-2 flex-wrap">
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-sm btn-info"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleFeatured(product._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Make Featured
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleAccept(product._id)}
                    disabled={product.status === 'accepted' ? true : false}
                  >
                    Accept
                  </button>
                  <button
                    className={`btn btn-sm btn-error`}
                    disabled={product.status === 'rejected' ? true : false}
                    onClick={() => handleReject(product._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReview;
