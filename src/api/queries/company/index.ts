import { gql } from '@apollo/client';

export const GET_COMPANY_MAIN_DATA = gql`
  query GetCompany($companyId: ID!) {
    company(companyId: $companyId) {
      id
      name
      iconUrl
      productCardConfiguration
      productDetailConfiguration
      productImagesConfiguration
      companyItemConfigurations {
        id
        name
        value
      }
    }
  }
`;


