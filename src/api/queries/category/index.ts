import { gql } from '@apollo/client';

export const GET_CATEGORY_DATA = gql`
  query getCompanyCategory($companyId: ID!, $categorySlug: ID!) {
    category(companyId: $companyId, categorySlug: $categorySlug) {
      id
      name
      slug
      images {
        id 
        url
      }
      subCategories {
        id
        name
        slug
      }
    }
  }
`;

export const GET_CATEGORIES_DATA = gql`
  query getCompanyCategory($companyId: ID!) {
    categories(companyId: $companyId) {
      id
      name
      slug
      subCategories {
        id
        name
        slug
      }
    }
  }
`;
