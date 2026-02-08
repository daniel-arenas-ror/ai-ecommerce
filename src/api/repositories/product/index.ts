import connector from "../../connector";
import type { Product } from "../../../types/product";

export const getProduct = (productId: string): Promise<Product> => {
  return connector.get(`/api/v1/products/${productId}`) as Promise<Product>;
};

export const getProducts = (): Promise<Product[]> => {
  return connector.get(`/api/v1/products`) as Promise<Product[]>;
};
