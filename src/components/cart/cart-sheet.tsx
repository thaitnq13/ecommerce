"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Truck, ShieldCheck } from "lucide-react"
import { useCart } from "@/lib/store/cart"
import Image from "next/image"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

export function CartSheet() {
    const { items, removeItem, updateQuantity, itemCount, total, isCartOpen, setCartOpen } = useCart()
    const freeShippingThreshold = 100
    const progress = Math.min((total / freeShippingThreshold) * 100, 100)
    const remainingForFreeShipping = Math.max(freeShippingThreshold - total, 0)

    return (
        <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
                            {itemCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md px-6">
                <SheetHeader className="space-y-2.5 pr-6">
                    <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
                    <SheetDescription className="sr-only">
                        Review your items before checkout.
                    </SheetDescription>
                </SheetHeader>

                {itemCount > 0 && (
                    <div className="py-5 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                            <div className="bg-primary/10 p-1.5 rounded-full">
                                <Truck className="h-4 w-4 text-primary" />
                            </div>
                            {remainingForFreeShipping > 0 ? (
                                <span className="text-muted-foreground text-xs sm:text-sm">
                                    Add <span className="font-bold text-foreground">${remainingForFreeShipping.toFixed(2)}</span> more for <span className="font-bold text-foreground">Free Shipping</span>
                                </span>
                            ) : (
                                <span className="text-green-600 font-medium text-sm flex items-center gap-1">
                                    You have unlocked Free Shipping! 🎉
                                </span>
                            )}
                        </div>
                        <Progress value={progress} className="h-1.5 w-full bg-primary/10" />
                    </div>
                )}

                {itemCount === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                        <div className="bg-muted p-8 rounded-full animate-in zoom-in-50 duration-500">
                            <ShoppingCart className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <div className="text-center space-y-1.5 px-8">
                            <p className="font-semibold text-lg">Your cart is empty</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">Looks like you haven&apos;t added anything to your cart yet.</p>
                        </div>
                        <SheetClose asChild>
                            <Button variant="outline" className="mt-6 rounded-full px-8">
                                Start Shopping
                            </Button>
                        </SheetClose>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 -mx-6 px-6">
                            <div className="space-y-6 py-4" role="list">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-5 group" role="listitem">
                                        <div className="relative h-24 w-24 rounded-xl overflow-hidden border border-border/50 bg-secondary/30 shrink-0">
                                            {item.images ? (
                                                <Image
                                                    src={item.images}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full w-full">
                                                    <ShoppingCart className="h-8 w-8 opacity-20" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-0.5">
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="space-y-1">
                                                    <h4 className="font-medium text-sm leading-tight line-clamp-2 pr-2">{item.name}</h4>
                                                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{item.category?.name}</p>
                                                </div>
                                                <span className="font-semibold text-sm">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border rounded-full h-8 bg-background shadow-sm">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-l-full rounded-r-none hover:bg-muted/50"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-xs font-medium tabular-nums">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-r-full rounded-l-none hover:bg-muted/50"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors p-2 -mr-2"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="space-y-5 pt-8 pb-4 bg-background">
                            <Separator />
                            <div className="space-y-2.5 px-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className={remainingForFreeShipping === 0 ? "text-green-600 font-medium" : "text-muted-foreground"}>
                                        {remainingForFreeShipping === 0 ? "Free" : "Calculated at checkout"}
                                    </span>
                                </div>
                                <div className="flex justify-between font-bold text-xl pt-2">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <SheetFooter className="flex-col sm:flex-col gap-3">
                                <SheetClose asChild>
                                    <Button className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all" asChild>
                                        <Link href="/checkout">
                                            Checkout <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button variant="outline" className="w-full h-11" asChild>
                                        <Link href="/cart">View Full Cart</Link>
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                            <div className="flex justify-center items-center gap-6 text-xs text-muted-foreground pt-4 pb-2">
                                <div className="flex items-center gap-1.5">
                                    <ShieldCheck className="h-3.5 w-3.5" /> Secure Checkout
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Truck className="h-3.5 w-3.5" /> Fast Delivery
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}
