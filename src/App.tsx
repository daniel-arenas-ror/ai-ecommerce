import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User, Send } from 'lucide-react';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import type { Product, Message } from './types/types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "MacBook Pro M3",
    price: 1999,
    image: "https://images.unsplash.com/photo-1517336714460-d1306604297e?auto=format&fit=crop&q=80&w=400",
    description: "El laptop más potente para profesionales con el chip M3 de Apple."
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    price: 1999,
    image: "https://images.unsplash.com/photo-1517336714460-d1306604297e?auto=format&fit=crop&q=80&w=400",
    description: "El laptop más potente para profesionales con el chip M3 de Apple."
  },
  {
    id: 3,
    name: "MacBook Pro M3",
    price: 1999,
    image: "https://images.unsplash.com/photo-1517336714460-d1306604297e?auto=format&fit=crop&q=80&w=400",
    description: "El laptop más potente para profesionales con el chip M3 de Apple."
  },
  {
    id: 4,
    name: "MacBook Pro M3",
    price: 1999,
    image: "https://images.unsplash.com/photo-1517336714460-d1306604297e?auto=format&fit=crop&q=80&w=400",
    description: "El laptop más potente para profesionales con el chip M3 de Apple."
  }
];

function App() {
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "¡Hola! Soy tu asistente de compras con IA. ¿En qué puedo ayudarte hoy?", sender: 'bot', timestamp: new Date() }
  ]);

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    console.log("Scrolling to bottom");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMessage: Message = { id: Date.now(), text: inputText, sender: 'user', timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter(p => p.id !== productId));
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            G
          </div>
          <h1 className="text-xl font-bold text-gray-800">Gemini Store</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600 border-r pr-4">
            <User size={20} />
            <span className="font-medium">Juan Perez</span>
          </div>
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {cart.length}
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:px-20 lg:px-40 space-y-4">
        {
          messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                }`}>
                  <p>{msg.text}</p>
                </div>
              </div>

              {/* Si el mensaje es del bot y es una recomendación (Simulado) */}
              {msg.sender === 'bot' && msg.id === 1 && (
                <div className="flex flex-wrap gap-4 justify-start pl-4">
                  {MOCK_PRODUCTS.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={(p) => addToCart(p)}
                      onViewDetail={(p) => alert(`Abriendo detalle de: ${p.name}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        }

        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-white border-t">
        <form 
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all"
        >
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregúntale a Gemini por un producto..."
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 py-2"
          />
          <button 
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            disabled={!inputText.trim()}
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          Gemini puede cometer errores. Revisa la información importante.
        </p>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={removeFromCart} />
    </div>
  )
}

export default App
