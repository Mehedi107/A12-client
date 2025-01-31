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
    return navigate('/login');
  }

  try {
    const { data } = await axiosPublic.patch(`/product/upvote/${productId}`, {
      user: user?.email,
    });

    notifySuccess(
      data.product.likedUsers.includes(user.email)
        ? 'Successfully upvoted!'
        : 'Successfully downvoted!'
    );

    refetch();
  } catch (error) {
    console.error('Error upvoting product:', error);
  }
};
