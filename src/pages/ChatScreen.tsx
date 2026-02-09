import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ProductCard from './../components/ProductCard';
import CartDrawer from './../components/CartDrawer';
import TypingIndicator from './../components/TypingIndicator';
import type { Product, Message, Coupon } from './../types/types';
import { createSubscription, sendMessage, unsubscribe } from './../service/actionCableService';
import Header from '../components/Header';
import { loginUser } from '../api/repositories/auth';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { GoogleOAuthProvider, useGoogleOneTapLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';

const OneTapLogin = () => {
  const { login } = useAuth();

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse: CredentialResponse) => {
      const token = credentialResponse.credential;

      loginUser(token || "")
        .then(user => {
          console.log('Logged in user:', user);
          login(token || "");
        })
        .catch(error => {
          console.error('Login error:', error);
        });
    },
    onError: () => {
      console.log('One Tap Login Failed');
    },
  });

  return null;
};

const ChatScreen: React.FC = () => {
  const assistantSlug = "laura-5";
  //const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>("203");
  const { items, addItem, removeItem } = useCart();
  //const [coupon, setCoupon] = useState<Coupon[]>([{ code: "DISCOUNT", discount: 10 }]);
  const [coupon, setCoupon] = useState<Coupon[]>([]);
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

  // Cart persistence is handled by CartContext

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(assistantSlug, conversationId!, inputText);
    setInputText("");
  };

  const addToCart = (product: Product) => {
    addItem(product);
  };

  const removeFromCart = (productId: number) => {
    removeItem(productId);
  };

  const startPurchase = () => {
    alert("Iniciando proceso de compra...");
  };

  useEffect(() => {
    const handleReceiveDate = (data: {id: number, type: string, content: string, message?: string, messages?: Array<any>}) => {
      switch(data.type) {
        case 'typing_start':
          setIsTyping(true);
          scrollToBottom();
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
              startPurchase();
              break;
            case 'view_detail':
              if(parsedContent.products.length > 0) {
                const product = parsedContent.products[0];
                window.open(product.url, product.name);
              }
              break;
            case 'apply_coupon':
              setCoupon((prev) => [...prev, { code: "DISCOUNT", discount: 10 }]);
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

          console.log("Initial load data:", data);
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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <OneTapLogin />
      <div className="flex flex-col h-screen w-full bg-gray-100">
        <Header cartLength={items.length} onCartButtonClick={() => setIsCartOpen(true)} />

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
            E-commerce Desarrollador por <a href="https://www.linkedin.com/in/dev-darenas/" target="_blank" rel="noopener noreferrer">Daniel Arenas</a>
          </p>
        </footer>

        <CartDrawer
          coupon={coupon}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={items}
          onRemove={removeFromCart}
          startPurchase={startPurchase}
        />
      </div>
    </GoogleOAuthProvider>
  )
}

export default ChatScreen;
