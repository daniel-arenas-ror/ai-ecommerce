import { gql } from '@apollo/client';

export const GET_CART_DATA = gql`
  query getCartData($companyId: ID!) {
    cart (companyId: $companyId){
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
