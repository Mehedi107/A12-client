import PropTypes from 'prop-types';

const Modal = ({ handlePaymentSuccess }) => {
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="payment-form text-center p-6">
            <h3 className="text-2xl font-semibold mb-4">Payment Checkout</h3>
            <p className="mb-6">You are subscribing for 49.99.</p>
            <button
              onClick={handlePaymentSuccess}
              className="pay-btn px-6 py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg text-lg"
            >
              Pay Now
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

Modal.propTypes = {
  handlePaymentSuccess: PropTypes.func.isRequired,
};

export default Modal;
