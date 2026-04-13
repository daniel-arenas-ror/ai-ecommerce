import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useCart } from '../context/CartContext'

const Checkout: React.FC = () => {
  const {
    cart
  } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px]">
        <div className="p-6 md:p-12 lg:pr-16 border-r border-gray-100">
          
          {/* 1. Contact Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Contacto</h2>
            </div>
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <label className="flex items-center mt-3 gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm text-gray-700">Enviarme novedades y ofertas por correo electrónico</span>
            </label>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Entrega</h2>
            <div className="space-y-4">
              <div className="relative">
                <select className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Colombia</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre" className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" placeholder="Apellidos" className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <input type="text" placeholder="Cédula" className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Dirección" className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Casa, apartamento, etc. (opcional)" className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />

              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="Ciudad" className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                <div className="relative">
                  <select className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white outline-none">
                    <option>Valle del Cauca</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
                <input type="text" placeholder="Código postal (opc.)" className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="relative">
                <input type="text" placeholder="Teléfono" className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                <HelpCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </section>

          {/* 3. Shipping Method */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Métodos de envío</h2>
            <div className="p-4 bg-blue-50/50 border border-blue-600 rounded-lg flex justify-between items-center">
              <span className="text-sm font-medium">Envío Estándar Local</span>
              <span className="text-sm font-bold">GRATIS</span>
            </div>
          </section>

          {/* 4. Payment & Footer */}
          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-md transition-all">
            Continuar
          </button>
          
          <footer className="mt-12 flex gap-4 text-[11px] text-blue-600 underline">
            <a href="#">Política de reembolso</a>
            <a href="#">Envío</a>
            <a href="#">Política de privacidad</a>
            <a href="#">Términos del servicio</a>
          </footer>
        </div>

        {/* --- RIGHT COLUMN: Summary --- */}
        <aside className="bg-gray-50/80 p-6 md:p-10 lg:sticky lg:top-0 lg:h-screen">
          <div className="space-y-6">
            {/* Item 1 */}

            {cart?.cartItems?.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">El carrito está vacío</p>
            ) : (
              cart?.cartItems?.map((item, index) => (
              <div key={`${item.variant.id}-${index}`} className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <img src={item.variant?.images[0]?.mediumUrl} alt="Product" className="object-cover" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.variant.name}</h3>
                  <p className="text-xs text-gray-500">US 5 / 35</p>
                </div>
                <span className="text-sm font-medium">{item.variant.formattedPrice}</span>
              </div>
              ))
            )}

            {/* Discount Code */}
            { false && <div className="flex gap-2 pt-4 border-t border-gray-200">
              <input type="text" placeholder="Código de descuento o tarjeta de regalo" className="flex-1 p-3 border border-gray-300 rounded-md text-sm outline-none" />
              <button className="bg-gray-100 px-4 py-2 rounded-md text-sm font-medium text-gray-500">Aplicar</button>
            </div>
            }

            {/* Calculations */}
            <div className="space-y-2 pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal · {cart?.cartItems?.length} artículos</span>
                <span className="font-medium">{cart?.formattedSubTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">Envío <HelpCircle size={14} className="text-gray-400" /></span>
                <span className="text-xs text-gray-500">GRATIS</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-bold">Total</span>
                <div className="text-right">
                  <span className="text-xs text-gray-500 mr-2">COP</span>
                  <span className="text-2xl font-black">{cart?.formattedTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}

export default Checkout;
