import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_CATEGORY = gql`
  query getCategoryProducts($companyId: ID!, $categorySlug: String!) {
    categoryProducts(companyId: $companyId, categorySlug: $categorySlug) {
      id
      name
      slug
      price
      images {
        id
        url
        thumbUrl
        mediumUrl
        largeUrl
      }
    }
  }
`;
