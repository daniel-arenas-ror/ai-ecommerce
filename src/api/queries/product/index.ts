import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_CATEGORY = gql`
  query getCategoryProducts($companyId: ID!, $categorySlug: String!, $filter: JSON) {
    categoryProducts(companyId: $companyId, categorySlug: $categorySlug, filter: $filter) {
      id
      name
      description
      slug
      price
      active
      allImages {
        id
        url
        thumbUrl
        mediumUrl
        largeUrl
      }
    }
  }
`;
