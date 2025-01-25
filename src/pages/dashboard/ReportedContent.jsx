import { notifyError } from '../../utils/notification';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import HelmetAsync from '../../components/shared/HelmetAsync';

const ReportedContent = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const fetchReportedProduct = async () => {
    try {
      const res = await axiosSecure.get('/reported');
      return res.data;
    } catch (error) {
      notifyError(error);
    }
  };

  const { data: products = [], refetch } = useQuery({
    queryKey: ['reportedProduct'],
    queryFn: fetchReportedProduct,
  });

  const deleteProduct = async (productId, refetch) => {
    try {
      const res = await axiosPublic.delete(`/delete-product/${productId}`);
      // console.log(res.data);
      if (res.data.deletedCount) {
        refetch();
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      }
    } catch (error) {
      console.log(error);
      notifyError('Something went wrong.');
    }
  };

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        // delete from database
        deleteProduct(id, refetch);
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <HelmetAsync title="Reported product" />
      <h2 className="text-2xl font-bold text-center mb-6">Reported Contents</h2>

      {products.length === 0 ? (
        <div className="text-center text-gray-500">
          No reported products to review.
        </div>
      ) : (
        <div className="overflow-x-auto ">
          <table className="table w-full bg-white table-zebra">
            {/* Table Head */}
            <thead className="text-base bg-base-300">
              <tr>
                <th className="text-left">#</th>
                <th className="text-left">Product Name</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td className="flex justify-center items-center gap-4">
                    <Link
                      to={`/product/${product._id}`}
                      href={product.detailsLink}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportedContent;
