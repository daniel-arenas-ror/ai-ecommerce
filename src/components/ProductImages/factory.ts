import ProductDefaultGallery from './styles/default';
import { useCompany } from '../../context/CompanyContext';
import type { ProductImageStyle, ProductImageComponent } from './types'

export const cardFactory = (style: ProductImageStyle = 'default'): ProductImageComponent => {
  const productDetailRegistry: Record<ProductImageStyle, ProductImageComponent> ={
    default: {
      component: ProductDefaultGallery,
      description: 'Default Design',
    },
  };

  return productDetailRegistry[style] || productDetailRegistry.default
}

export const getProductImagesFromConfig = (
  companyConfig?: Record<string, unknown>
): ProductImageStyle => {
  const { company } = useCompany();

  const productDeatailStyle = companyConfig || company?.productImagesConfiguration

  if(productDeatailStyle){
    return productDeatailStyle as ProductImageStyle
  }

  return 'default'
}
