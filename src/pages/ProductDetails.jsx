import { useNavigate, useParams } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { handleUpvote } from '../utils/handleUpVote';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { BsTriangleFill } from 'react-icons/bs';
import { notifyError, notifySuccess } from '../utils/notification';
import ReviewSlide from '../components/ReviewSlide';
import HelmetAsync from '../components/shared/HelmetAsync';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const ProductDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const fetchCurrentUser = async () => {
    const res = await axiosPublic.get(`/user/${user.email}`);
    return res.data;
  };

  const { data: currentUser = {} } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
  });

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

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: fetchReviews,
  });

  if (isLoading) return <LoadingSpinner />;

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
    }
  };

  const handleReviewSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = currentUser.photo;
    const reviewDescription = form.description.value;
    const rating = form.rating.value;

    const formData = {
      reviewDescription,
      rating,
      name,
      photo,
      email: currentUser.email,
    };

    try {
      const res = await axiosPublic.post(`/product/${id}/reviews`, formData);

      if (res.data.insertedId) {
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
    <div className="sm:py-16 py-4">
      <HelmetAsync title="Product details" />
      <h2 className="text-center mb-10 mt-5">Product Details</h2>
      <div className="grid grid-cols-1 gap-5">
        {/* Product Details Section */}
        <div className="flex md:flex-row flex-col gap-5 md:justify-between md:items-center shadow bg-base-200 p-6 rounded">
          <div className="flex flex-col md:flex-row gap-5 md:items-center">
            <div>
              <img
                className="w-20"
                src={product.image || 'https://placehold.co/400'}
                alt={product.name}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">{product.name}</h2>
              <p className="my-3">
                <strong>Description: </strong>
                {product.description}
              </p>
            </div>
          </div>
          <div className="flex md:items-center items-start flex-row md:flex-col gap-3">
            <button
              onClick={() =>
                handleUpvote(product._id, user, navigate, axiosPublic, refetch)
              }
              className="btn btn-primary text-white"
            >
              <BsTriangleFill className="text-base" />
              {product.vote}
            </button>
            <button className="btn btn-error" onClick={handleReport}>
              Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Reviews Section */}
          <div className="reviews shadow p-6 rounded bg-base-200">
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
              className="mx-auto bg-base-200 shadow rounded p-6 space-y-4"
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
