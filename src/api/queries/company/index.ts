import { gql } from '@apollo/client';

export const GET_COMPANY_MAIN_DATA = gql`
  query GetCompany($id: ID!) {
    company(id: $id) {
      id
      title
    }
  }
`;


