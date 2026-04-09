import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($variantId: ID!, $companyId: ID!, $quantity: Int!) {
    addToCart(input: { variantId: $variantId, companyId: $companyId, quantity: $quantity }) {
      id
      totalCents
      subTotalCents
      formattedTotal
      formattedSubTotal
      cartItems {
        id
        quantity
        totalCents
        subTotalCents
        formattedTotal
        formattedSubTotal
        variant {
          id
          name
          sku
          formattedPrice
          images{
            id
            url
            thumbUrl
            mediumUrl
            largeUrl
          }
        }
      }
    }
  }
`;

export const REMOVE_TO_CART = gql`
  mutation removeToCart($variantId: ID!, $companyId: ID!, $quantity: Int!) {
    removeToCart(input: { variantId: $variantId, quantity: $quantity, companyId: $companyId }) {
      id
      totalCents
      subTotalCents
      formattedTotal
      formattedSubTotal
      cartItems {
        id
        quantity
        totalCents
        subTotalCents
        formattedTotal
        formattedSubTotal
        variant {
          id
          name
          sku
          formattedPrice
          images{
            id
            url
            thumbUrl
            mediumUrl
            largeUrl
          }
        }
      }
    }
  }
`;
