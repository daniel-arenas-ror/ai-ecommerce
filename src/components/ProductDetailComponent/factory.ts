import DefaultProductDetail from './styles/default';
import ProductDetailPremium from './styles/premium';
import { useCompany } from '../../context/CompanyContext';
import type { ProductDetailStyle, CardComponent } from './types'

export const cardFactory = (style: ProductDetailStyle = 'default'): CardComponent => {
  const productDetailRegistry: Record<ProductDetailStyle, CardComponent> ={
    default: {
      component: DefaultProductDetail,
      description: 'Default Design',
    },
    premium: {
      component: ProductDetailPremium,
      description: 'Default Design',
    },
  };

  return productDetailRegistry[style] || productDetailRegistry.default
}

export const getProductDetailFromConfig = (
  companyConfig?: Record<string, unknown>
): ProductDetailStyle => {
  const { company } = useCompany();

  const productDeatailStyle = companyConfig || company?.productDetailConfiguration

  if(productDeatailStyle){
    return productDeatailStyle as ProductDetailStyle
  }

  return 'default'
}
