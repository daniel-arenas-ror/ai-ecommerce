import type { CardStyle } from "../components/ProductCard/types"
import type { ProductDetailStyle } from "../components/ProductDetailComponent/types"
export interface Company {
  id: number;
  name: string;
  iconUrl: string;
  productCardConfiguration?: CardStyle;
  productDetailConfiguration?: ProductDetailStyle;
  companyItemConfigurations: [CompanyItemConfigurations]
}

export interface CompanyItemConfigurations {
  id: number;
  name: string;
  value: string;
}
