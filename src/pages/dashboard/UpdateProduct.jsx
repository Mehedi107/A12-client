import { useNavigate, useParams } from 'react-router';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { notifyError, notifySuccess } from '../../utils/notification';
import HelmetAsync from '../../components/shared/HelmetAsync';
import { useEffect, useState } from 'react';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [product, setAllProduct] = useState({});

  useEffect(() => {
    const fetchProductById = async () => {
      const res = await axiosPublic.get(`/product/${id}`);
      setAllProduct(res.data);
    };
    fetchProductById();
  }, [axiosPublic, id]);

  console.log(product);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productImage = form.productImage.value;
    const productDescription = form.productDescription.value;
    const externalLink = form.externalLink.value;
    const tags = form.tags.value;
    const formattedTags = tags.split(' ');

    const formData = {
      productName,
      productImage,
      productDescription,
      externalLink,
      tags: formattedTags,
    };

    console.log('update', formData);

    try {
      const res = await axiosPublic.patch(`/update-product/${id}`, formData);
      console.log(res);
      if (res.data.modifiedCount) {
        notifySuccess('Product updated successfully!');
        form.reset();
        navigate('/dashboard/my-product');
      }
    } catch (error) {
      console.log(error);
      notifyError('Error adding product');
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 shadow rounded sm:mt-10">
      <HelmetAsync title={'Update product'} />
      <h2 className="text-2xl font-bold text-center mb-6">Update Product</h2>
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
            defaultValue={product?.name}
          />
        </div>

        {/* Product Image */}
        <div className="form-control">
          <label className="label font-semibold">Product Image url</label>
          <input
            type="url"
            name="productImage"
            className="input input-bordered w-full"
            required
            defaultValue={product?.image}
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
            defaultValue={product?.description}
          ></textarea>
        </div>

        {/* Tags */}
        <div className="form-control">
          <label className="label font-semibold">Tags</label>
          <input
            type="text"
            placeholder="Enter tags with space"
            className="input input-bordered w-full"
            name="tags"
            defaultValue={product?.tags}
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
            required
            defaultValue={product?.externalLinks}
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-neutral w-full">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
