"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { useCart } from "@/lib/store/cart"
import { CartSheet } from "@/components/cart/cart-sheet"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { itemCount } = useCart()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tighter">LuxeMarket</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link href="/products" className="transition-colors hover:text-primary">
                        Shop
                    </Link>
                    <Link href="/categories" className="transition-colors hover:text-primary">
                        Categories
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-primary">
                        About
                    </Link>
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                        <Search className="h-5 w-5" />
                    </Button>
                    <CartSheet />
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                        <User className="h-5 w-5" />
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t bg-background"
                    >
                        <nav className="flex flex-col p-4 space-y-4">
                            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                            <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                Shop
                            </Link>
                            <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                Categories
                            </Link>
                            <div className="flex items-center space-x-4 pt-4 border-t">
                                <Button variant="ghost" size="sm" className="w-full justify-start">
                                    <Search className="mr-2 h-4 w-4" /> Search
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                                    <Link href="/cart">
                                        <ShoppingCart className="mr-2 h-4 w-4" /> Cart ({itemCount})
                                    </Link>
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
