import type { CardStyle } from "../components/ProductCard/types"
export interface Company {
  id: number;
  name: string;
  iconUrl: string;
  productCardConfiguration?: CardStyle;
  companyItemConfigurations: [CompanyItemConfigurations]
}

export interface CompanyItemConfigurations {
  id: number;
  name: string;
  value: string;
}
