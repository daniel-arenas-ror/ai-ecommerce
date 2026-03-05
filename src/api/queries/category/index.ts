import { gql } from '@apollo/client';

export const GET_CATEGORIES_DATA = gql`
  query getCompanyCategory($companyId: ID!) {
    companyCategories(companyId: $companyId) {
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
