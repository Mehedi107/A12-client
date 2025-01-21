import { useState } from 'react';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import { notifyError } from '../../utils/notification';
import { useQuery } from '@tanstack/react-query';

const ReportedContent = () => {
  const axiosPublic = useAxiosPublic();

  const fetchReportedProduct = async () => {
    try {
      const res = await axiosPublic.get('/all-products');
      return res.data;
    } catch (error) {
      notifyError(error);
    }
  };

  const { data: products = [] } = useQuery({
    queryKey: ['reported_product'],
    queryFn: fetchReportedProduct,
  });

  const [reportedProducts, setReportedProducts] = useState([
    { id: 1, name: 'Product A', detailsLink: '/product/1' },
    { id: 2, name: 'Product B', detailsLink: '/product/2' },
    { id: 3, name: 'Product C', detailsLink: '/product/3' },
  ]);

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Remove the product from the database (mocked here)
      setReportedProducts(
        reportedProducts.filter(product => product.id !== id)
      );
      alert('Product deleted successfully!');
    }
  };

  console.log(products);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Reported Contents</h2>

      {reportedProducts.length === 0 ? (
        <div className="text-center text-gray-500">
          No reported products to review.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            {/* Table Head */}
            <thead className="text-base">
              <tr>
                <th className="text-left">#</th>
                <th className="text-left">Product Name</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {reportedProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td className="flex justify-center items-center gap-4">
                    <a
                      href={product.detailsLink}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </a>
                    <button
                      onClick={() => handleDelete(product.id)}
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
