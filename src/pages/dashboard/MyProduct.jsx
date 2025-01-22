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
      console.log(res.data);
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
    try {
      const res = await axiosSecure.get(`/my-product/${user?.email}`);
      return res.data;
    } catch (error) {
      console.log(error);
      notifyError('Something went wrong.');
    }
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
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">My Products</h1>
        <div className="overflow-x-auto">
          <table className="table w-full border-2">
            {/* Table Header */}
            <thead className="bg-base-200 text-base">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Votes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product._id} className="hover:bg-base-100">
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.vote}</td>
                    <td>
                      <span
                        className={`font-medium capitalize badge ${
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
                    <td className="space-x-2">
                      {/* Update Button */}
                      <Link
                        to={`/dashboard/update/${product._id}`}
                        className="btn btn-sm btn-primary"
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
