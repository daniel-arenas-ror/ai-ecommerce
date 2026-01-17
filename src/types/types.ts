export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}
