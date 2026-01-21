"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Edit, Layers } from "lucide-react"
import { DeleteButton } from "@/components/ui/delete-button"
import { Category } from "@prisma/client"
import { motion } from "framer-motion"

interface CategoriesPageProps {
    categories: (Category & { _count: { products: number } })[]
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

export function CategoriesGrid({ categories }: CategoriesPageProps) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
            {categories.map((category) => (
                <motion.div key={category.id} variants={item} className="group relative rounded-xl overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-xl transition-all duration-300">
                    <Link href={`/categories/${category.id}`} className="block relative aspect-video overflow-hidden bg-muted">
                        {category.image ? (
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <Layers className="h-10 w-10 opacity-20" />
                            </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-bold text-lg">{category.name}</h3>
                            <p className="text-xs text-white/80">{category._count.products} products</p>
                        </div>
                    </Link>

                    <div className="p-4 flex items-center justify-between border-t bg-background/50 backdrop-blur-sm">
                        <div className="flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 w-full">
                            <Button variant="secondary" size="sm" className="w-full h-8 text-xs" asChild>
                                <Link href={`/categories/${category.id}/edit`}>
                                    <Edit className="mr-2 h-3 w-3" /> Edit
                                </Link>
                            </Button>
                            <DeleteButton id={category.id} resource="categories" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}
