import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentModal from "./PaymentModal";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = ({ isOpen, onClose, amount, roleRequestId, onPaymentSuccess }) => {
  if (!isOpen) return null; // Important: do not render anything if not open

  return (
    <Elements stripe={stripePromise}>
      <PaymentModal
        isOpen={isOpen}
        onClose={onClose}
        amount={amount}
        roleRequestId={roleRequestId}
        onPaymentSuccess={onPaymentSuccess}
      />
    </Elements>
  );
};

export default Payment;
