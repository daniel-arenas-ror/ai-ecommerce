export interface Message {
  id: string;
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
