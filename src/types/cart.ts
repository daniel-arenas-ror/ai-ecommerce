import type { variant } from '../types/product';

export interface Cart {
  id: string;
  total_cents: Number;
  sub_total_cents: Number;
  formattedTotal: String;
  formattedSubTotal: String;
  cartItems: CartItem[]
}

export interface CartItem {
  id: string;
  quantity: Number;
  total_cents: Number;
  subTotalCents: Number;
  formattedTotal: String;
  formattedSubTotal: String;
  variant: variant;
}
