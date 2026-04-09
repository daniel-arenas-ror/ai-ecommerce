import { Minus, Plus } from 'lucide-react';

const Counter = ({ quantity, increment, decrement }) => {

  return (
    <div className="flex items-center w-fit border border-gray-300">
      <button
        onClick={decrement}
        className="p-3 hover:bg-gray-50 text-gray-600 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus size={16} strokeWidth={3} />
      </button>
      
      <div className="w-12 text-center font-medium text-gray-900 select-none">
        {quantity}
      </div>
      
      <button
        onClick={increment}
        className="p-3 hover:bg-gray-50 text-gray-600 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus size={16} strokeWidth={3} />
      </button>
    </div>
  )
}

export default Counter;
