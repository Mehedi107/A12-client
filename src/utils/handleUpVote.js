import { notifyError, notifySuccess } from './notification';

export const handleUpvote = async (
  productId,
  user,
  navigate,
  axiosPublic,
  refetch
) => {
  if (!user) {
    notifyError('Please login to upvote a product');
    navigate('/login');
    return;
  }

  try {
    const res = await axiosPublic.patch(`/product/upvote/${productId}`, {
      user: user?.email,
    });
    if (res.data === 'already liked') {
      notifyError('You have already upvoted this product');
      return;
    }

    if (res.data.modifiedCount === 1) {
      notifySuccess('You have successfully upvoted this product');
      refetch();
    }
  } catch (error) {
    console.error('Error upvoting product:', error);
  }
};
