"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Category } from "@prisma/client"
import { ArrowRight, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategoryGridProps {
    categories: Category[]
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
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    // If no categories, show nothing or a fallback (we'll assume at least seeded data)
    if (categories.length === 0) return null

    // Helper to get diverse sizes for grid items to create a "bento" feel if possible,
    // or just a nice grid. Let's do a tailored grid for the first few items.

    return (
        <section className="py-20 md:py-24 bg-linear-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Shop by Category</h2>
                        <p className="text-muted-foreground">Curated collections for every style.</p>
                    </div>
                    <Button variant="ghost" asChild className="hidden md:flex">
                        <Link href="/categories" className="group text-primary font-medium">
                            View all categories
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
                >
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            variants={item}
                            className={`group relative rounded-2xl overflow-hidden cursor-pointer border shadow-sm hover:shadow-xl transition-all duration-500 ${index === 0 || index === 3 ? "md:col-span-2" : "md:col-span-1"
                                }`}
                        >
                            <Link href={`/categories/${category.id}`} className="block h-full w-full">
                                {category.image ? (
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-secondary/30 text-muted-foreground">
                                        <Layers className="h-16 w-16 opacity-20" />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-white">
                                    <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                                        <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                                            <span className="inline-flex items-center text-sm font-medium hover:underline mt-2">
                                                Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-8 flex justify-center md:hidden">
                    <Button variant="outline" asChild>
                        <Link href="/categories">View all categories</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
