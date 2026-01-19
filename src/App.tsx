import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User, Send } from 'lucide-react';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import TypingIndicator from './components/TypingIndicator';
import type { Product, Message } from './types/types';
import { createSubscription, sendMessage, unsubscribe } from './service/actionCableService';
import { motion, useAnimation } from 'framer-motion';

function App() {
  const assistantSlug = "laura-5";
  const controls = useAnimation();
  //const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>("174");
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
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

    sendMessage(assistantSlug, conversationId!, inputText);
    setInputText("");
  };

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);

    controls.start({
      scale: [1, 1.3, 1],
      transition: { duration: 0.4 }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter(p => p.id !== productId));

    controls.start({
      scale: [1, 1.3, 1],
      transition: { duration: 0.4 }
    });
  };

  useEffect(() => {
    const handleReceiveDate = (data: {id: number, type: string, content: string, message?: string, messages?: Array<any>}) => {
      switch(data.type) {
        case 'typing_start':
          setIsTyping(true);
          break;
        case 'typing_end':
          setIsTyping(false);
          break;
        case 'answered_message':
          console.log("Answered message received:", data);

          const parsedContent = JSON.parse(data.content.replace('```json', '').replace('```', ''));

          const newAssistantMessage: Message = {
            id: data.id,
            text: parsedContent.text,
            products: parsedContent.products,
            command: parsedContent.command,
            sender: 'assistant'
          };
          
          switch(newAssistantMessage.command) {
            case 'add_cart':
              parsedContent.products.forEach((product: Product) => {
                addToCart(product);
              });

              newAssistantMessage.products = [];
              break;
            case 'start_purchase':
              alert("Iniciando proceso de compra...");
              break;
          }

          console.log("New assistant message:", newAssistantMessage);
          setMessages((prevMessages) => [...prevMessages, newAssistantMessage]);

          break;
        case 'user_message_added':
          console.log("Answered message received:", data);
          const newMessage: Message = {
            id: data.id,
            text: data.content || "",
            products: [],
            sender: 'user',
            command: 'text'
          };

          setMessages((prevMessages) => [...prevMessages, newMessage]);
          break;
        case 'initial_load':
          setConversationId(data.content)

          if(data.messages) {
            const messages = data.messages.map(message => {
              let text = "";
              let products: Product[] = [];
              let command = "text"

              if(message.role === 'assistant'){
                const parsedContent = JSON.parse(message.content.replace('```json', '').replace('```', ''));
                text = parsedContent.text;
                products = parsedContent.products;
                command = parsedContent.command;

                switch(command) {
                case 'add_cart':
                  products = [];
                  break;
                }

              } else if(message.role === 'user'){
                text = message.content;
              }

              return {
                id: message.id,
                text: text,
                products: products,
                sender: message.role,
                command: command
              };
            });

            setMessages(messages);
          }

          break;
      }
    }

    createSubscription(assistantSlug, conversationId, {
      onReceived: handleReceiveDate
    });

    return () => { unsubscribe(); };
  }, []);

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
            <span className="font-medium">Daniel Arenas</span>
          </div>
          <motion.button
            animate={controls}
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {cart.length}
            </span>
          </motion.button>
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
              {msg.sender === 'assistant' && msg.products.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-start pl-4">
                  {msg.products.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={(p) => addToCart(p)}
                      onViewDetail={(p) => window.open(p.url, p.name)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        }

        {isTyping && <TypingIndicator />}
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
