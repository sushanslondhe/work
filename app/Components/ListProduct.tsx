import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

// Sample product data - in a real app, this would come from an API
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80",
    description: "Comfortable office chair with lumbar support"
  },
  {
    id: 3,
    name: "Smart Watch Series X",
    category: "Electronics",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
    description: "Latest smartwatch with health tracking features"
  },
  {
    id: 4,
    name: "Modern Coffee Table",
    category: "Furniture",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1532372320978-9b4d6a3a854c?w=500&q=80",
    description: "Sleek design coffee table for your living room"
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse",
    category: "Electronics",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    description: "High-precision gaming mouse with RGB lighting"
  }
];

const categories = [...new Set(products.map(product => product.category))];

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-blue-600 font-bold">${product.price}</span>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Product Dashboard</h1>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="text-gray-400" size={20} />
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
