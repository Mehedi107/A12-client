import useAxiosSecure from '../../hooks/useAxiosSecure';
import HelmetAsync from '../../components/shared/HelmetAsync';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { notifyError, notifySuccess } from '../../utils/notification';

const UpdateCoupon = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: coupon = [] } = useQuery({
    queryKey: ['coupon'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/coupon/${id}`);

      return data;
    },
  });

  const editCoupon = async e => {
    e.preventDefault();
    const form = e.target;
    const code = e.target.code.value;
    const expiryDate = e.target.date.value;
    const description = e.target.des.value;
    const discount = e.target.num.value;
    const formData = { code, expiryDate, description, discount };

    console.log(formData);

    try {
      const res = await axiosSecure.patch(`/update-coupon/${id}`, formData);
      console.log(res);
      if (res.data.modifiedCount) {
        notifySuccess('Coupon updated successfully!');
        form.reset();
        navigate('/dashboard/coupon');
      }
    } catch (error) {
      console.log(error);
      notifyError('Error updating coupon');
    }
  };

  console.log(coupon);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg mt-10">
      <HelmetAsync title={'Update Coupon'} />
      <h2 className="text-2xl font-bold text-center mb-6">Update Coupon</h2>
      <form onSubmit={editCoupon} className="mb-6 grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Coupon Code"
          defaultValue={coupon.code}
          //   onChange={e => setFormData({ ...formData, code: e.target.value })}
          className="input input-bordered"
          name="code"
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Expiry Date"
          defaultValue={coupon?.expiryDate}
          required
          //   onChange={e =>
          //     setFormData({ ...formData, expiryDate: e.target.value })
          //   }
          className="input input-bordered"
        />
        <textarea
          placeholder="Coupon Description"
          required
          name="des"
          defaultValue={coupon.description}
          //   onChange={e =>
          //     setFormData({ ...formData, description: e.target.value })
          //   }
          className="textarea textarea-bordered"
        ></textarea>
        <input
          type="number"
          required
          name="num"
          placeholder="Discount Amount"
          defaultValue={coupon.discount}
          //   onChange={e => setFormData({ ...formData, discount: e.target.value })}
          className="input input-bordered"
        />
        <button type="submit" className="btn btn-primary w-full">
          Update Coupon
        </button>
      </form>
    </div>
  );
};

export default UpdateCoupon;
