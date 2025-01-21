import HelmetAsync from '../../components/shared/HelmetAsync';
import useAuth from '../../hooks/useAuth';
import { notifySuccess } from '../../utils/notification';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router';

const AddProduct = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productImage = form.productImage.value;
    const productDescription = form.productDescription.value;
    const userName = form.name.value;
    const userEmail = form.email.value;
    const userPhoto = user.photoURL;
    const externalLink = form.externalLink.value;
    const tags = form.tags.value;
    const formattedTags = tags.split(',');

    const formData = {
      productName,
      productImage,
      productDescription,
      userName,
      userEmail,
      userPhoto,
      externalLink,
      tags: formattedTags,
    };

    console.log('Form Data:', formData);

    try {
      const res = await axiosPublic.put(`/add-product`, formData);
      console.log(res);
      if (res.data.insertedId) {
        notifySuccess('Product added successfully!');
        form.reset();
        navigate('/dashboard/my-product');
      }
    } catch (error) {
      console.log('Error adding product', error);
    }
  };
  console.log(user);

  return (
    <div>
      <HelmetAsync title="Add Product" />
      <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add a New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div className="form-control">
            <label className="label font-semibold">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="input input-bordered w-full"
              name="productName"
              required
            />
          </div>

          {/* Product Image */}
          <div className="form-control">
            <label className="label font-semibold">Product Image</label>
            <input
              type="url"
              name="productImage"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label font-semibold">Description</label>
            <textarea
              placeholder="Enter product description"
              className="textarea textarea-bordered w-full"
              name="productDescription"
              required
            ></textarea>
          </div>

          {/* Owner Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="form-control">
              <label className="label font-semibold">Owner Name</label>
              <input
                type="text"
                value={user?.displayName || ''}
                name="name"
                className="input input-bordered w-full"
                disabled
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">Owner Email</label>
              <input
                type="email"
                value={user?.email || ''}
                name="email"
                className="input input-bordered w-full"
                disabled
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">Owner Image</label>
              <img
                src={user.photoURL || 'https://via.placeholder.com/150'}
                alt="Owner"
                className="w-16 h-16 rounded-full"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="form-control">
            <label className="label font-semibold">Tags</label>
            <input
              type="text"
              placeholder="Enter tags with commas"
              className="input input-bordered w-full"
              name="tags"
            />
          </div>

          {/* External Link */}
          <div className="form-control">
            <label className="label font-semibold">External Link</label>
            <input
              type="url"
              placeholder="Enter external link (optional)"
              className="input input-bordered w-full"
              name="externalLink"
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Submit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
