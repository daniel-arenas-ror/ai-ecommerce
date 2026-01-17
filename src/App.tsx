import React, { useState } from 'react';
import { ShoppingCart, User, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "¡Hola! Soy tu asistente de compras con IA. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
  ]);

  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMessage: Message = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInputText("");
    // Aquí luego conectaremos con Gemini
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* 1. BARRA SUPERIOR (NAVBAR) */}
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
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              0
            </span>
          </button>
        </div>
      </header>

      {/* 2. SECCIÓN CENTRAL (CHAT & PRODUCTOS) */}
      <main className="flex-1 overflow-y-auto p-4 md:px-20 lg:px-40 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
            }`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {/* Aquí renderizaremos los productos en el paso 3 */}
      </main>

      {/* 3. BARRA DE TEXTO (INPUT) */}
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
    </div>
  )
}

export default App
