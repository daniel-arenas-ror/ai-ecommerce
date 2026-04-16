import React from 'react';
import StripePaymentForm from './StripePaymentForm';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  adapter: string;
  paymentKey: string;
  orderId: string;
  clientSecret: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen, onClose, adapter, paymentKey, orderId, clientSecret
}) => {
  if (!isOpen) return null;

  const renderPaymentForm = () => {
    switch (adapter) {
      case 'STRIPE':
        return (
          <StripePaymentForm
            publishableKey={paymentKey}
            clientSecret={clientSecret}
            orderId={orderId}
            onSuccess={() => { window.location.href = `/success/order/${orderId}` }}
            onCancel={onClose}
          />
        );
      // case 'PAYU':
      //   return <PayUPaymentForm ... />;
      default:
        return <p className="text-red-500">Método de pago no soportado: {adapter}</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Pago seguro</h2>
        {renderPaymentForm()}
      </div>
    </div>
  );
};

export default PaymentModal;
