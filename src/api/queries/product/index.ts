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
      optionValues {
        id
        name
        label
        optionTypeName
      }
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

export const GET_PRODUCT_DETAIL = gql`
query getproduct($companyId: ID!, $productSlug: ID!) {
  product(companyId: $companyId, productSlug: $productSlug) {
    id
    name
    description
    slug
    price
    active
    __typename
    groupedOptionValues {
      id
      name
      optionValues {
        id
        name
        label
      }
    }
    categories {
      id
      name
      slug
    }
    optionValues {
      id
      name
      label
      optionTypeName
    }
    variants {
      id
      sku
      price
      optionValues {
        id
        name
        label
        optionTypeName
      }
      images{
        id
        url
        thumbUrl
        mediumUrl
        largeUrl
      }
    }
    images {
      id
      url
      thumbUrl
      mediumUrl
      largeUrl
    }
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
