import { useQuery } from '@tanstack/react-query';
import HelmetAsync from '../../components/shared/HelmetAsync';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { notifyError } from '../../utils/notification';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const deleteProduct = async (productId, refetch) => {
    try {
      const res = await axiosSecure.delete(`/delete-product/${productId}`);

      // If delete successful
      if (res.data.deletedCount) {
        refetch();
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      }
    } catch (error) {
      console.log(error);
      notifyError('Something went wrong.');
    }
  };

  const fetchProductByEmail = async () => {
    const res = await axiosSecure.get(`/my-product/${user?.email}`);
    return res.data;
  };

  const { data: products = [], refetch } = useQuery({
    queryKey: ['my-products'],
    queryFn: fetchProductByEmail,
  });

  const handleDelete = productId => {
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
        deleteProduct(productId, refetch);
      }
    });
  };

  return (
    <div>
      <HelmetAsync title="My Product" />
      <div className="max-w-7xl mx-auto px-4 sm:py-10">
        <h2 className="text-center mb-8">My Products</h2>
        <div className="rounded-md">
          <table className="table w-full border border-base-300 border-collapse text-center overflow-auto">
            {/* Table Header */}
            <thead className="bg-base-200 text-base">
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Product Name</th>
                <th className="text-center">Votes</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product._id} className="hover:bg-base-100">
                    <td>{index + 1}</td>
                    <td className="border border-base-300">{product.name}</td>
                    <td className="border border-base-300">{product.vote}</td>
                    <td className="border border-base-300">
                      <span
                        className={` capitalize badge ${
                          product.status === 'accepted'
                            ? 'badge-success'
                            : product.status === 'rejected'
                            ? 'badge-error'
                            : 'badge-warning'
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="flex justify-center gap-3">
                      {/* Update Button */}
                      <Link
                        to={`/dashboard/update/${product._id}`}
                        className="btn btn-sm btn-info"
                      >
                        Update
                      </Link>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
