"use client"

import { useState } from "react"
import { useCart } from "@/lib/store/cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

export default function CartPage() {
    const { items, total, removeItem, updateQuantity, itemCount, clearCart } = useCart()
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    // Calculate free shipping
    const freeShippingThreshold = 100
    const progress = Math.min((total / freeShippingThreshold) * 100, 100)
    const remainingForFreeShipping = Math.max(freeShippingThreshold - total, 0)

    // Selection handlers
    const toggleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([])
        } else {
            setSelectedItems(items.map(item => item.id))
        }
    }

    const toggleSelectItem = (id: string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    const removeSelected = () => {
        selectedItems.forEach(id => removeItem(id))
        setSelectedItems([])
    }

    if (itemCount === 0) {
        return (
            <div className="container mx-auto py-20 px-4 text-center space-y-8 max-w-2xl">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center"
                >
                    <div className="bg-muted/50 p-12 rounded-full border-2 border-dashed border-muted-foreground/25">
                        <ShoppingBag className="w-20 h-20 text-muted-foreground/50" />
                    </div>
                </motion.div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Your cart is empty</h1>
                    <p className="text-muted-foreground text-lg mx-auto">
                        Looks like you have not added anything to your cart yet. Explore our premium collection and find something you love.
                    </p>
                </div>
                <Button size="lg" asChild className="mt-8 rounded-full px-8 h-12 text-base">
                    <Link href="/products">
                        Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
                    <p className="text-muted-foreground mt-1">{itemCount} items in your cart</p>
                </div>
                {selectedItems.length > 0 ? (
                    <Button variant="destructive" size="sm" onClick={removeSelected} className="gap-2">
                        <Trash2 className="h-4 w-4" /> Remove Selected ({selectedItems.length})
                    </Button>
                ) : (
                    <Button variant="outline" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive gap-2">
                        <Trash2 className="h-4 w-4" /> Clear Cart
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-6">
                    {/* Free Shipping Banner */}
                    <div className="bg-card border rounded-lg p-5 shadow-sm space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <Truck className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                {remainingForFreeShipping > 0 ? (
                                    <p className="text-sm">
                                        Add <span className="font-bold text-foreground mx-1">${remainingForFreeShipping.toFixed(2)}</span> more to unlock <span className="font-bold text-foreground">Free Shipping</span>
                                    </p>
                                ) : (
                                    <p className="font-medium text-green-600 flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4" /> You have unlocked Free Shipping!
                                    </p>
                                )}
                            </div>
                            <span className="font-bold text-sm">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2 w-full" />
                    </div>

                    {/* Cart Table */}
                    <div className="border rounded-lg shadow-sm overflow-hidden bg-card">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className="w-[50px] text-center">
                                        <Checkbox
                                            checked={itemCount > 0 && selectedItems.length === itemCount}
                                            onCheckedChange={toggleSelectAll}
                                            aria-label="Select all"
                                        />
                                    </TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-center w-[120px]">Quantity</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {items.map((item) => (
                                    <TableRow key={item.id} className="group">
                                        <TableCell className="text-center">
                                            <Checkbox
                                                checked={selectedItems.includes(item.id)}
                                                onCheckedChange={() => toggleSelectItem(item.id)}
                                                aria-label={`Select ${item.name}`}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-20 w-20 rounded-lg overflow-hidden border bg-muted shrink-0">
                                                    {item.images ? (
                                                        <Image
                                                            src={item.images}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full w-full">
                                                            <ShoppingBag className="h-8 w-8 opacity-20" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <Link href={`/products/${item.id}`} className="font-medium hover:underline block leading-tight">
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.category?.name || "Uncategorized"}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            ${Number(item.price).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-1">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm font-medium tabular-nums">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-bold">
                                            ${(Number(item.price) * item.quantity).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => removeItem(item.id)}
                                                title="Remove Item"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <Card className="sticky top-24 border shadow-md overflow-hidden">
                        <CardHeader className="bg-muted/30 pb-4">
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-muted-foreground">Promo Code</span>
                                <div className="flex gap-2">
                                    <Input placeholder="Enter code" className="bg-background" />
                                    <Button variant="outline">Apply</Button>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                                    <span className="font-medium">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className={remainingForFreeShipping === 0 ? "text-green-600 font-medium" : "text-muted-foreground"}>
                                        {remainingForFreeShipping === 0 ? "Free" : "Calculated next step"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax estimate</span>
                                    <span className="text-muted-foreground italic">Calculated at checkout</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">Total</span>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-primary block">${total.toFixed(2)}</span>
                                    {remainingForFreeShipping === 0 && (
                                        <span className="text-[10px] text-green-600 font-medium bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-sm">FREE SHIPPING APPLIED</span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-3 bg-muted/10 pt-6">
                            <Button className="w-full h-12 text-lg shadow-md hover:shadow-lg transition-all" size="lg" asChild>
                                <Link href="/checkout">
                                    Checkout Now <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <div className="flex items-center justify-center gap-4 py-2 w-full">
                                <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <Truck className="w-3 h-3" /> Fast Delivery
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Secure Checkout
                                </div>
                            </div>
                            <Button variant="link" className="text-muted-foreground text-xs" asChild>
                                <Link href="/products">
                                    Continue Shopping
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
