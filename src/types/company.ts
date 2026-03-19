import type { CardStyle } from "../components/ProductCard/types"
import type { ProductDetailStyle } from "../components/ProductDetailComponent/types"
import type { ProductImageStyle } from "../components/ProductImages/types"
export interface Company {
  id: number;
  name: string;
  iconUrl: string;
  productCardConfiguration?: CardStyle;
  productDetailConfiguration?: ProductDetailStyle;
  companyItemConfigurations: [CompanyItemConfigurations]
  productImagesConfiguration?: ProductImageStyle; 
}

export interface CompanyItemConfigurations {
  id: number;
  name: string;
  value: string;
}
