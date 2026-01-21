"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Product, Category } from "@prisma/client"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeaturedCollectionProps {
    products: (Product & { category: Category })[]
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export function FeaturedCollection({ products }: FeaturedCollectionProps) {
    if (products.length === 0) return null

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Featured Collection</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover our most popular products, selected just for you. Quality and design in every detail.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {products.map((product) => (
                        <motion.div key={product.id} variants={item} className="group">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-4 border border-transparent group-hover:border-border transition-colors">
                                <Link href={`/products/${product.id}`}>
                                    {product.images ? (
                                        <Image
                                            src={product.images}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground/30">
                                            <ShoppingBag className="h-12 w-12" />
                                        </div>
                                    )}
                                    {/* Quick Add Overlay - Could Implement later */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                </Link>
                                <div className="absolute top-2 left-2">
                                    <span className="px-2 py-1 text-xs font-semibold bg-background/80 backdrop-blur-sm rounded-md border shadow-sm">
                                        {product.category.name}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg leading-none truncate">
                                    <Link href={`/products/${product.id}`} className="hover:underline">
                                        {product.name}
                                    </Link>
                                </h3>
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-lg text-primary">${Number(product.price).toFixed(2)}</p>
                                    <Button variant="ghost" size="sm" className="h-8 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" asChild>
                                        <Link href={`/products/${product.id}`}>
                                            View Details <ArrowRight className="ml-1 h-3 w-3" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="flex justify-center mt-12">
                    <Button size="lg" className="px-8 rounded-full h-12" asChild>
                        <Link href="/products">View All Products</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
