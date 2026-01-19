export interface Message {
  id: number;
  text: string;
  products: Product[] | [];
  sender: 'user' | 'assistant';
  command: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  url: string;
}
