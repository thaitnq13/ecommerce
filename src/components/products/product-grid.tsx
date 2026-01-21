"use client"

import { Product, Category } from "@prisma/client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Edit, Image as ImageIcon } from "lucide-react"
import { DeleteButton } from "@/components/ui/delete-button"
import { Badge } from "@/components/ui/badge"

interface ProductGridProps {
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

export function ProductGrid({ products }: ProductGridProps) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            {products.map((product) => (
                <motion.div key={product.id} variants={item}>
                    <Card className="overflow-hidden flex flex-col group h-full border-0 shadow-md bg-card/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                        <Link href={`/products/${product.id}`} className="block relative aspect-square bg-muted overflow-hidden">
                            {product.images ? (
                                <Image
                                    src={product.images}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground bg-secondary/30">
                                    <ImageIcon className="h-10 w-10 opacity-20" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                                <Badge variant="secondary" className="backdrop-blur-md bg-background/80">
                                    {product.category.name}
                                </Badge>
                            </div>
                        </Link>

                        <CardContent className="p-4 flex-1">
                            <div className="flex justify-between items-start mb-2 gap-2">
                                <Link href={`/products/${product.id}`} className="flex-1 hover:text-primary transition-colors">
                                    <h3 className="font-semibold text-lg line-clamp-1 truncate" title={product.name}>{product.name}</h3>
                                </Link>
                                <span className="font-bold text-primary">${Number(product.price).toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                                {product.description || "No description provided."}
                            </p>

                            <div className="mt-4 flex items-center text-xs text-muted-foreground">
                                <div className={`flex items-center gap-1.5 ${product.stock > 0 ? "text-green-600" : "text-destructive"}`}>
                                    <span className={`h-2 w-2 rounded-full ${product.stock > 0 ? "bg-green-600" : "bg-destructive"}`} />
                                    <span className="font-medium">
                                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-4 pt-0 flex justify-between gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <Button variant="secondary" size="sm" className="w-full shadow-sm hover:shadow" asChild>
                                <Link href={`/products/${product.id}/edit`}>
                                    <Edit className="mr-2 h-3 w-3" /> Edit
                                </Link>
                            </Button>
                            <DeleteButton id={product.id} resource="products" />
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    )
}
