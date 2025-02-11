
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Truck, Shield, Clock } from 'lucide-react';

function App() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's the battery life?",
      answer: "The battery lasts up to 20 hours on a single charge with normal usage. In standby mode, it can last up to 45 days."
    },
    {
      question: "Is international shipping available?",
      answer: "Yes, we ship to over 180 countries worldwide. Shipping times and costs vary by location."
    },
    {
      question: "What's included in the warranty?",
      answer: "Our 2-year warranty covers manufacturing defects, battery issues, and normal wear and tear. It includes free repairs or replacement if needed."
    },
    {
      question: "Can I return if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee. The product must be in original condition with all accessories."
    }
  ];

  const suggestedProducts = [
    {
      id: 1,
      name: "Premium Carrying Case",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b",
      rating: 4.8
    },
    {
      id: 2,
      name: "Bluetooth Adapter Pro",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1563770660941-20978e870e26",
      rating: 4.5
    },
    {
      id: 3,
      name: "Memory Foam Ear Cushions",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
      rating: 4.9
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
              alt="Premium Wireless Headphones"
              className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
              New Release
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-500">(128 reviews)</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Premium Wireless Headphones
            </h1>
            <p className="text-3xl font-bold text-indigo-600 mb-6">$299.99</p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Experience unparalleled sound quality with our latest wireless headphones. 
              Featuring advanced noise cancellation, premium materials, and up to 20 hours 
              of battery life. The perfect companion for music enthusiasts and professionals alike.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Truck className="text-indigo-600" size={24} />
                <span className="text-gray-700">Free shipping worldwide</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="text-indigo-600" size={24} />
                <span className="text-gray-700">2-year warranty included</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-indigo-600" size={24} />
                <span className="text-gray-700">Ships within 24 hours</span>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <h2 className="text-lg font-semibold mb-4">Cost Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product Price</span>
                  <span>$299.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>$24.00</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$323.99</span>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-4 mb-12">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {activeQuestion === index ? (
                      <ChevronUp className="text-gray-500" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-500" size={20} />
                    )}
                  </button>
                  {activeQuestion === index && (
                    <div className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 w-4 h-4 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="font-semibold text-indigo-600">{product.price}</span>
                  </div>
                  <button className="w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
