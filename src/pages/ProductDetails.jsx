import { useNavigate, useParams } from 'react-router';
import LoadingSpinner from '../utils/LoadingSpinner';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { handleUpvote } from '../utils/handleUpVote';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { BsTriangle } from 'react-icons/bs';
import { notifyError, notifySuccess } from '../utils/notification';
import ReviewSlide from '../components/ReviewSlide';

const ProductDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const fetchProductDetails = async () => {
    try {
      const res = await axiosPublic.get(`/product/details/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: product = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['product'],
    queryFn: fetchProductDetails,
  });

  const fetchReviews = async () => {
    try {
      const res = await axiosPublic.get(`/product/${id}/reviews`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: reviews = [],
    // isLoading: isLoadingReviews,
    // isError: isErrorReviews,
    // refetch: refetchReviews,
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: fetchReviews,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-center text-red-500 my-5">{isError}</p>;
  }

  const handleReport = async () => {
    try {
      const res = await axiosPublic.patch(`/product/report/${id}`, {
        email: user.email,
      });

      if (res.data === 'already reported') {
        notifyError('You have already reported this product');
        return;
      }

      notifySuccess('Product reported successfully!');
    } catch (error) {
      console.error(error);
      notifyError(error);
    }
  };

  const handleReviewSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const reviewDescription = form.description.value;
    const rating = form.rating.value;

    const formData = {
      reviewDescription,
      rating,
      name,
      photo,
      email: user?.email,
    };
    try {
      const res = await axiosPublic.patch(`/product/${id}/reviews`, formData);

      if (res.data.modifiedCount === 1) {
        notifySuccess('You review has been submitted successfully!');
      }

      if (res.data === 'already reviewed') {
        notifyError('You have already reviewed this product');
      }
      form.reset();
    } catch (error) {
      console.error(error);
      notifyError(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Product Details Section */}
      <div className="product-details shadow-lg p-6 rounded-md">
        <h2 className="text-xl font-semibold mb-3">{product.name}</h2>
        <img
          className="w-20"
          src="https://placehold.co/400"
          alt={product.name}
        />
        <p className="my-3">
          <strong>Description: </strong>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <button
            onClick={() =>
              handleUpvote(product._id, user, navigate, axiosPublic, refetch)
            }
            className="upvote-btn btn btn-primary  "
          >
            <BsTriangle />
            {product.vote}
          </button>
          <button className="btn btn-error text-white" onClick={handleReport}>
            Report
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews shadow-lg p-6 rounded-md my-6">
        <h3 className="text-2xl font-semibold mb-5">User Reviews</h3>
        {reviews ? (
          <ReviewSlide reviews={reviews} />
        ) : (
          'No reviews available for this product'
        )}
      </div>

      {/* Post Review Section */}
      <div className="post-review">
        <form
          onSubmit={handleReviewSubmit}
          className="mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4"
        >
          <h3 className="text-xl font-semibold text-center">Post a Review</h3>

          <div className="grid grid-cols-2 gap-6">
            {/* Reviewer Name */}
            <div className="form-control md:col-span-1 col-span-2">
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
            <div className="form-control md:col-span-1 col-span-2">
              <label className="label">
                <span className="label-text font-medium">Reviewer Image</span>
              </label>
              <input
                type="text"
                name="photo"
                value={user?.photoURL}
                readOnly
                placeholder="Reviewer Image"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control md:col-span-1 col-span-2">
            <label className="label">
              <span className="label-text font-medium">Review Description</span>
            </label>
            <textarea
              placeholder="Write your review here..."
              className="textarea textarea-bordered"
              required
              rows={1}
              name="description"
            ></textarea>
          </div>

          {/* Rating */}
          <div className="form-control md:col-span-1 col-span-2">
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

          <button type="submit" className="btn btn-primary w-full mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
