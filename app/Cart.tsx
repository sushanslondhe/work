"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Eco-Friendly Water Bottle", price: 24.99, quantity: 2 },
    { id: 2, name: "Organic Cotton T-Shirt", price: 29.99, quantity: 1 },
    { id: 3, name: "Recycled Paper Notebook", price: 9.99, quantity: 3 },
  ])

  const updateQuantity = (id: number, change: number) => {
    setProducts(
      products
        .map((product) =>
          product.id === id ? { ...product, quantity: Math.max(0, product.quantity + change) } : product,
        )
        .filter((product) => product.quantity > 0),
    )
  }

  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
  const shipping = 9.99
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="bg-green-600 text-white">
          <CardTitle className="text-2xl">Checkout</CardTitle>
          <CardDescription className="text-green-100">Review your cart and complete your purchase</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
              {products.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <ul className="space-y-4">
                  {products.map((product) => (
                    <li key={product.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(product.id, -1)}
                          aria-label={`Decrease quantity of ${product.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{product.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(product.id, 1)}
                          aria-label={`Increase quantity of ${product.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeProduct(product.id)}
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <RadioGroup defaultValue="credit-card" onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>
              {paymentMethod === "credit-card" && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Separator />
          <div>
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-green-600 hover:bg-green-700" disabled={products.length === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Place Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

