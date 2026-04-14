import { gql } from '@apollo/client';

export const GET_PAYMENT_CONFIG = gql`
  query GetPaymentConfig {
    paymentConfig {
      adapter
      key
    }
  }
`;
