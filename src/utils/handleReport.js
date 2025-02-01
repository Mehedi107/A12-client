import { notifySuccess } from './notification';

export const handleReport = async (productId, user, axiosPublic, refetch) => {
  try {
    const { data } = await axiosPublic.patch(`/product/report/${productId}`, {
      user: user?.email,
    });

    notifySuccess(
      data.product.reportedBy.includes(user.email)
        ? 'Reported this product!'
        : 'Product is no longer reported!'
    );

    refetch();
  } catch (error) {
    console.error('Error reporting product:', error);
  }
};
