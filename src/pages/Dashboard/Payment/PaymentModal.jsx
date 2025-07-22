import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';

const PaymentModal = ({ isOpen, onClose, amount = 25, roleRequestId, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosInstance = useAxios();
  const { user } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe is not ready yet. Please wait.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Please enter valid card details.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Create Payment Intent on backend
      const { data } = await axiosInstance.post('/create-payment-intent', {
        amount: amount * 100, // convert to cents
        roleRequestId,
      });

      const clientSecret = data.clientSecret;

      // Step 2: Confirm payment
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName || 'Unknown',
            email: user.email || 'Unknown',
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Step 3: Save payment record
        await axiosInstance.post('/payments', {
          roleRequestId,
          email: user.email,
          amount,
          transactionId: paymentIntent.id,
          paymentMethod: paymentIntent.payment_method_types[0],
        });

        await Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          html: `<strong>Transaction ID:</strong> <code>${paymentIntent.id}</code>`,
        });

        if (onPaymentSuccess) onPaymentSuccess(paymentIntent.id);
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError('Payment failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-4">Complete Your Payment</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border rounded p-3">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#32325d',
                    '::placeholder': { color: '#aab7c4' },
                  },
                  invalid: { color: '#fa755a' },
                },
              }}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <p className="text-sm text-gray-600">
            Amount to pay: <strong>${amount}</strong>
          </p>

          <button
            type="submit"
            disabled={!stripe || loading}
            className="btn btn-primary w-full"
          >
            {loading ? 'Processing...' : `Pay $${amount}`}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default PaymentModal;
