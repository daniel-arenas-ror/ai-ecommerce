import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($variantId: ID!, $quantity: Int!) {
    addToCart(input: { variantId: $variantId, quantity: $quantity }) {
      id
      totalCents
      subTotalCents
      formattedTotal
      formattedSubTotal
      cartItems {
        id
        quantity
        variant {
          id
          name
          sku
        }
      }
    }
  }
`;

export const REMOVE_TO_CART = gql`
  mutation removeToCart($variantId: ID!, $quantity: Int!) {
    removeToCart(input: { variantId: $variantId, quantity: $quantity }) {
      id
      totalCents
      subTotalCents
      formattedTotal
      formattedSubTotal
      cartItems {
        id
        quantity
        variant {
          id
          name
          sku
        }
      }
    }
  }
`;
