import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { notifyError, notifySuccess } from './../../utils/notification';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const ManageCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    code: '',
    expiryDate: '',
    description: '',
    discount: '',
  });

  // Fetch all coupons
  const fetchAllCoupons = async () => {
    try {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const {
    data: coupons = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['coupons'],
    queryFn: fetchAllCoupons,
  });

  const handleAddCoupon = async e => {
    e.preventDefault();
    const form = e.target;

    try {
      const res = await axiosSecure.post('/add-coupon', { formData });

      if (res.data.insertedId) {
        notifySuccess('Coupon added successfully!');
        refetch();
        form.reset();
      }
    } catch (error) {
      notifyError(error);
    }
  };

  const deleteItem = async (id, refetch) => {
    try {
      const res = await axiosSecure.delete(`/delete-coupon/${id}`);

      if (res.data.deletedCount) {
        refetch();
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      }
    } catch (error) {
      console.log(error);
      notifyError('Something went wrong.');
    }
  };

  const deleteCoupon = async (couponId, refetch) => {
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
        deleteItem(couponId, refetch);
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Coupons</h1>

      {/* Add Coupon Form */}
      <form
        onSubmit={handleAddCoupon}
        className="mb-6 grid grid-cols-1 gap-4 max-w-lg"
      >
        <input
          type="text"
          placeholder="Coupon Code"
          value={formData.code}
          onChange={e => setFormData({ ...formData, code: e.target.value })}
          className="input input-bordered"
          required
        />
        <input
          type="date"
          placeholder="Expiry Date"
          value={formData.expiryDate}
          required
          onChange={e =>
            setFormData({ ...formData, expiryDate: e.target.value })
          }
          className="input input-bordered"
        />
        <textarea
          placeholder="Coupon Description"
          required
          value={formData.description}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="textarea textarea-bordered"
        ></textarea>
        <input
          type="number"
          required
          placeholder="Discount Amount"
          value={formData.discount}
          onChange={e => setFormData({ ...formData, discount: e.target.value })}
          className="input input-bordered"
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Coupon
        </button>
      </form>

      <h2 className="text-2xl my-10 font-bold">Coupons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Coupon List */}
        {isLoading && <p>Loading coupons...</p>}
        {isError && <p>Failed to load coupons.</p>}
        {coupons.length === 0 ? (
          <>
            <p>No Coupon available...</p>
          </>
        ) : (
          ''
        )}
        {coupons.map(coupon => (
          <div
            key={coupon._id}
            className="bg-white card shadow-lg p-4 border rounded"
          >
            <h2 className="font-bold text-lg">{coupon.code}</h2>
            <p>Expires: {coupon.expiryDate}</p>
            <p>{coupon.description}</p>
            <p>Discount: ${coupon.discount}</p>
            <div className="flex justify-between items-center gap-5 mt-5">
              <Link
                to={`/dashboard/update-coupon/${coupon._id}`}
                className="btn btn-primary"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteCoupon(coupon._id, refetch)}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCoupon;
