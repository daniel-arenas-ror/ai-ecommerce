export interface Message {
  id: number;
  text: string;
  products: [];
  sender: 'user' | 'assistant';
  command: string;
}

export interface Coupon {
  code: string;
  discount: number;
}
