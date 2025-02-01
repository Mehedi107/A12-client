import { useParams } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { notifyError, notifySuccess } from '../utils/notification';
import ReviewSlide from '../components/ReviewSlide';
import HelmetAsync from '../components/shared/HelmetAsync';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import BtnUpvote from '../components/shared/buttons/BtnUpvote';
import BtnReport from '../components/shared/buttons/BtnReport';

const ProductDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  // Fetch current user
  const { data: currentUser = {} } = useQuery({
    queryKey: ['user'],
    queryFn: async () => (await axiosPublic.get(`/user/${user.email}`)).data,
  });

  // Fetch product
  const {
    data: product = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['product'],
    queryFn: async () => (await axiosPublic.get(`/product/details/${id}`)).data,
  });

  // Fetch reviews
  const { data: reviews = [], refetch: reviewProductRefetch } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => (await axiosPublic.get(`/product/${id}/reviews`)).data,
  });

  console.log(reviews);

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return <p className="text-center text-red-500 my-5">{isError}</p>;
  }

  const handleReviewSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = currentUser.photo;
    const reviewDescription = form.description.value;
    const rating = +form.rating.value;

    const formData = {
      reviewDescription,
      rating,
      name,
      photo,
      email: currentUser.email,
    };

    try {
      const res = await axiosPublic.post(`/product/${id}/reviews`, formData);

      if (res.data === 'already reviewed') {
        notifyError('You have already reviewed this product');
      }

      if (res.data.insertedId) {
        notifySuccess('Review has been submitted successfully!');
        reviewProductRefetch();
      }

      form.reset();
    } catch (error) {
      console.error(error);
      notifyError(error);
    }
  };

  return (
    <div className="sm:py-8 py-4">
      <HelmetAsync title="Product details" />
      <h2 className="text-center mb-10 mt-5">Product Details</h2>
      <div className="grid grid-cols-1 gap-5">
        {/* Product Details Section */}
        <div className="flex lg:flex-row flex-col gap-5 md:justify-between lg:items-center shadow bg-base-200 sm:p-6 p-4 rounded">
          <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
            <div>
              <img
                className="w-20 h-20 object-contain"
                src={product.image || 'https://placehold.co/400'}
                alt={product.name}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">{product.name}</h2>
              <p className="text-sm text-gray-500 mt-2">
                {product.tags.join(', ')}
              </p>
              <p className="my-3">
                <strong>Description: </strong>
                {product.description}
              </p>
              <p>
                <strong>External Link: </strong>
                {product.externalLink}
              </p>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex lg:items-center items-start flex-row lg:flex-col gap-3 flex-wrap">
            <BtnUpvote
              class={'btn-block'}
              product={product}
              refetch={refetch}
            />
            <BtnReport product={product} refetch={refetch} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Reviews Section */}
          <div className="reviews shadow sm:p-6 p-4 rounded bg-base-200">
            <h3 className="text-xl font-semibold text-center mb-5">
              User Reviews
            </h3>
            {reviews.length > 0 ? (
              <ReviewSlide reviews={reviews} />
            ) : (
              'This product has no review yet...'
            )}
          </div>

          {/* Post Review Section */}
          <div className="post-review">
            <form
              onSubmit={handleReviewSubmit}
              className="mx-auto bg-base-200 shadow rounded sm:p-6 p-4 space-y-4"
            >
              <h3 className="text-xl font-semibold text-center">
                Post a Review
              </h3>
              {/* Reviewer Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Reviewer Name</span>
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  name="name"
                  readOnly
                  placeholder="Reviewer Name"
                  className="input input-bordered w-full"
                />
              </div>
              {/* Reviewer Image */}
              <div className="form-control">
                <label className="label font-semibold">Reviewer Image</label>
                <img
                  src={user.photoURL || 'https://via.placeholder.com/150'}
                  alt="Owner"
                  className="w-16 h-16 rounded-full"
                />
              </div>
              {/* Review description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Review Description
                  </span>
                </label>
                <textarea
                  placeholder="Write your review here..."
                  className="textarea textarea-bordered"
                  required
                  name="description"
                ></textarea>
              </div>
              {/* Rating */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Rating</span>
                </label>
                <input
                  type="number"
                  name="rating"
                  placeholder="Rating (1-5)"
                  min="1"
                  max="5"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              {/* Submit */}
              <button type="submit" className="btn btn-neutral w-full">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
