import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ProductGrid } from "@/components/products/product-grid"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface CategoryDetailPageProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: CategoryDetailPageProps) {
    const { id } = await params
    const category = await db.category.findUnique({
        where: { id },
        select: { name: true }
    })

    if (!category) {
        return {
            title: "Category Not Found",
        }
    }

    return {
        title: `${category.name} | LuxeMarket`,
        description: `Explore our collection of ${category.name} at LuxeMarket.`,
    }
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
    const { id } = await params

    const category = await db.category.findUnique({
        where: { id },
        include: {
            products: {
                include: {
                    category: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })

    if (!category) {
        notFound()
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-black">
                {category.image && (
                    <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-12">
                    <Button variant="ghost" className="text-white/80 hover:text-white w-fit mb-4 pl-0 hover:bg-transparent" asChild>
                        <Link href="/categories">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
                        </Link>
                    </Button>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{category.name}</h1>
                    <p className="text-white/80 mt-2 text-lg max-w-xl">
                        Explore our curated collection of {category.name.toLowerCase()}.
                        {/* Placeholder description as DB doesn't have description field for Category yet */}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">
                            {category.products.length} {category.products.length === 1 ? 'Product' : 'Products'} Available
                        </h2>
                        <p className="text-muted-foreground">Find the best items for your needs.</p>
                    </div>

                    {/* Placeholder for filters/sort - can be added later */}
                    <div className="flex gap-2">
                        {/* <Button variant="outline" size="sm">Price: Low to High</Button> */}
                    </div>
                </div>

                {category.products.length > 0 ? (
                    <ProductGrid products={category.products} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center border rounded-xl bg-muted/20 border-dashed">
                        <div className="bg-muted p-4 rounded-full mb-4">
                            <span className="text-4xl">🛍️</span>
                        </div>
                        <h3 className="text-xl font-semibold">No products found</h3>
                        <p className="text-muted-foreground mt-2 max-w-sm">
                            We haven&apos;t added any products to this category yet. Check back soon!
                        </p>
                        <Button className="mt-6" asChild>
                            <Link href={`/products/new?categoryId=${category.id}`}>Add Product</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
