"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/lib/store/cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CreditCard, Truck, ShieldCheck, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function CheckoutPage() {
    const { items, total } = useCart()
    const [shippingMethod, setShippingMethod] = useState("standard")
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    // Calculations
    const shippingCost = shippingMethod === "express" ? 15.00 : 0.00
    const taxRate = 0.08 // 8%
    const taxAmount = total * taxRate
    const finalTotal = total + shippingCost + taxAmount

    return (
        <div className="min-h-screen bg-muted/40 py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-8">
                    <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
                        <Link href="/cart" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Cart
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold mt-2">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT COLUMN: FORMS */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Contact & Shipping */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Information</CardTitle>
                                <CardDescription>Enter the address where you want your order delivered.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First name</Label>
                                        <Input id="first-name" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last name</Label>
                                        <Input id="last-name" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="123 Main St" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" placeholder="New York" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Select>
                                            <SelectTrigger id="state">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ny">NY</SelectItem>
                                                <SelectItem value="ca">CA</SelectItem>
                                                <SelectItem value="tx">TX</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zip">Zip Code</Label>
                                        <Input id="zip" placeholder="10001" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipping Method */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Method</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div
                                        className={`flex flex-col items-start justify-between rounded-md border-2 p-4 hover:bg-muted/50 cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-muted'}`}
                                        onClick={() => setShippingMethod("standard")}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <RadioGroupItem value="standard" id="standard" />
                                            <Label htmlFor="standard" className="font-semibold cursor-pointer">Standard Shipping</Label>
                                        </div>
                                        <div className="pl-6">
                                            <span className="text-sm text-muted-foreground mb-1 block">5-7 Business Days</span>
                                            <span className="font-bold text-foreground">Free</span>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex flex-col items-start justify-between rounded-md border-2 p-4 hover:bg-muted/50 cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-muted'}`}
                                        onClick={() => setShippingMethod("express")}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <RadioGroupItem value="express" id="express" />
                                            <Label htmlFor="express" className="font-semibold cursor-pointer">Express Shipping</Label>
                                        </div>
                                        <div className="pl-6">
                                            <span className="text-sm text-muted-foreground mb-1 block">1-2 Business Days</span>
                                            <span className="font-bold text-foreground">$15.00</span>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </CardContent>
                        </Card>

                        {/* Payment */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Method</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <RadioGroup defaultValue="card" className="grid grid-cols-1 gap-4"> {/* Card Only for demo */}
                                    <div className="flex items-center space-x-2 border p-4 rounded-md bg-card">
                                        <RadioGroupItem value="card" id="card" />
                                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer font-medium">
                                            <CreditCard className="w-4 h-4" /> Credit or Debit Card
                                        </Label>
                                    </div>
                                </RadioGroup>
                                <div className="grid grid-cols-1 gap-4 pt-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-number">Card Number</Label>
                                        <Input id="cc-number" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cc-exp">Expiry Date</Label>
                                            <Input id="cc-exp" placeholder="MM/YY" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cc-cvc">CVC</Label>
                                            <Input id="cc-cvc" placeholder="123" type="password" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN: SUMMARY */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-10 space-y-6">
                            <Card className="border-2 border-primary/10 shadow-lg">
                                <CardHeader className="bg-muted/40 pb-4">
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-6">
                                    <div className="space-y-4 max-h-[300px] overflow-auto pr-2 custom-scrollbar">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="relative h-16 w-16 bg-muted rounded-md overflow-hidden shrink-0 border">
                                                    {item.images && (
                                                        <Image
                                                            src={item.images}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                                                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                                                        <span>Qty: {item.quantity}</span>
                                                        <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator />

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-medium">${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className="font-medium">
                                                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Estimated Tax (8%)</span>
                                            <span className="font-medium">${taxAmount.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">Total</span>
                                        <motion.div
                                            key={finalTotal}
                                            initial={{ scale: 1.2, color: "#22c55e" }}
                                            animate={{ scale: 1, color: "var(--primary)" }}
                                            className="text-2xl font-bold"
                                        >
                                            ${finalTotal.toFixed(2)}
                                        </motion.div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex-col gap-4 bg-muted/40 pt-6">
                                    <Button className="w-full h-12 text-lg shadow-md" size="lg">
                                        Place Order (${finalTotal.toFixed(2)})
                                    </Button>
                                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                        <Lock className="w-3 h-3" /> Secure SSL Encrypted Transaction
                                    </div>
                                </CardFooter>
                            </Card>

                            <div className="flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Trust Badges Placeholders */}
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="text-xs font-medium">Buyer Protection</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck className="w-5 h-5" />
                                    <span className="text-xs font-medium">Fast Shipping</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
