import React from 'react';
import { ProductCard } from './components/ProductCard';
import { ShoppingCart } from 'lucide-react';

function App() {
  const subtotal = 899.97; // This would normally be calculated from all products

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">3 items</span>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6">
          <ProductCard
            title="Premium Headphones"
            description="High-quality wireless headphones with noise cancellation and premium sound quality."
            price={299.99}
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000"
          />
          
          <ProductCard
            title="Smart Watch"
            description="Advanced fitness tracking, heart rate monitoring, and smartphone notifications."
            price={249.99}
            image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=1000"
          />
          
          <ProductCard
            title="Wireless Earbuds"
            description="True wireless earbuds with active noise cancellation and premium audio quality."
            price={179.99}
            image="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1000"
          />
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${(subtotal * 0.1).toFixed(2)}</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-gray-600">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${(subtotal * 1.1).toFixed(2)}</span>
                </div>
                <button className="w-full sm:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
