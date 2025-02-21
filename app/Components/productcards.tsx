import React, { useState } from 'react';
import { Plus, Minus, Users, Calendar } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

export function ProductCard({ title, description, price, image }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [users, setUsers] = useState(1);
  const [days, setDays] = useState(1);

  const incrementValue = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(prev => Math.max(1, prev + value));
  };

  const total = price * quantity * users * days;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col sm:flex-row">
      <img 
        src={image} 
        alt={title} 
        className="w-full sm:w-48 h-48 sm:h-full object-cover"
      />
      
      <div className="p-4 sm:p-6 flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
          </div>
          <span className="text-lg font-semibold text-blue-600 sm:text-right">${price}</span>
        </div>
        
        <div className="space-y-3">
          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-sm">Quantity</span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => incrementValue(setQuantity, -1)}
                className="p-1.5 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button 
                onClick={() => incrementValue(setQuantity, 1)}
                className="p-1.5 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Users Controls */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => incrementValue(setUsers, -1)}
                className="p-1.5 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{users}</span>
              <button 
                onClick={() => incrementValue(setUsers, 1)}
                className="p-1.5 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Days Controls */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Days
            </span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => incrementValue(setDays, -1)}
                className="p-1.5 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{days}</span>
              <button 
                onClick={() => incrementValue(setDays, 1)}
                className="p-1.5 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm font-medium">Total:</span>
            <span className="text-lg font-bold text-blue-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
