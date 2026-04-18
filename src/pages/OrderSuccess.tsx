import React, { useEffect } from 'react';
import { CheckCircle, Package, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Main Success Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 text-center border-b border-gray-50">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
            <p className="text-gray-500 mt-2">
              Thank you for your purchase. Your order <span className="font-mono font-medium text-gray-700">#{id || '12345'}</span> has been placed.
            </p>
          </div>

          <div className="p-8">
            <h2 className="text-lg font-semibold mb-6">Order Status</h2>
            
            {/* Status Stepper (Connecting to our Dual State Machines) */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100"></div>
              
              <div className="space-y-8">
                {/* Step 1: Payment */}
                <div className="relative flex items-start gap-4">
                  <div className="z-10 flex items-center justify-center w-8 h-8 bg-green-600 rounded-full ring-4 ring-white">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Payment Confirmed</h3>
                    <p className="text-sm text-gray-500">Transaction completed successfully via Stripe.</p>
                  </div>
                </div>

                {/* Step 2: Processing (Initial state of Delivery Machine) */}
                <div className="relative flex items-start gap-4">
                  <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full ring-4 ring-white">
                    <Package className="w-5 h-5 text-blue-600 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Preparing Order</h3>
                    <p className="text-sm text-gray-500">The store is currently preparing your items for shipment.</p>
                  </div>
                </div>

                {/* Step 3: Shipped (Future state) */}
                <div className="relative flex items-start gap-4 opacity-40">
                  <div className="z-10 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full ring-4 ring-white">
                    <Truck className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Out for Delivery</h3>
                    <p className="text-sm text-gray-500">We'll notify you once your order is on the way.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <Link 
              to="/dashboard/orders" 
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
            >
              View Order History
            </Link>
            <Link 
              to="/shop" 
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition shadow-sm gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Support Footer */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Having trouble? <a href="mailto:support@company.com" className="underline hover:text-gray-600">Contact Support</a>
        </p>
      </div>
    </div>
  )
}

export default OrderSuccess;
