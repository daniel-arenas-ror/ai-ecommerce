import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

interface StripePaymentFormProps {
  publishableKey: string;
  clientSecret: string;
  orderId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

// Inner form — must be inside <Elements>
const StripeForm: React.FC<{ onSuccess: () => void; onCancel: () => void }> = ({
  onSuccess, onCancel
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/success`,
      },
      redirect: 'if_required', // stay in-page if possible
    });

    if (stripeError) {
      setError(stripeError.message ?? 'Error al procesar el pago');
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </p>
      )}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white font-bold rounded-md text-sm transition-all"
        >
          {loading ? 'Procesando...' : 'Pagar ahora'}
        </button>
      </div>
    </form>
  );
};

// Outer wrapper — initializes Stripe with the publishable key
const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  publishableKey, clientSecret, onSuccess, onCancel
}) => {
  const stripePromise = loadStripe(publishableKey);

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripeForm onSuccess={onSuccess} onCancel={onCancel} />
    </Elements>
  );
};

export default StripePaymentForm;
