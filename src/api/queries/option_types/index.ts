import { gql } from '@apollo/client';

export const GET_FILTERING_OPTION_TYPE = gql`
  query GetOptionFieldFilter($companyId: ID!) {
    optionsFieldFilter(companyId: $companyId) {
      id
			name
      optionValues {
        id
        name
      }
    }
  }
`;
