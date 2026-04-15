import { gql } from '@apollo/client';

export const CREATE_ORDER_FROM_CART = gql`
  mutation CreateOrderFromCart($cartId: ID!) {
    createOrderFromCart(cartId: $cartId) {
      id
      status
    }
  }
`;

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($orderId: ID!) {
    createPaymentIntent(orderId: $orderId) {
      clientSecret
    }
  }
`;

export const CHECKOUT = gql`
  mutation Checkout($companyId: ID!){
    checkout(input: {companyId: $companyId}) {
      paymentIntent {
        adapter
        publicKey
        clientSecret
        orderId
      }
      errors
    }
  }
`;
