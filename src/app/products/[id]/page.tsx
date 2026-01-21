import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Truck, Shield } from "lucide-react"
import { AddToCartButton } from "@/components/products/add-to-cart-button"
import { unstable_noStore as noStore } from 'next/cache';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    noStore();
    const { id } = await params;
    const product = await db.product.findUnique({
        where: { id },
        include: { category: true }
    })

    if (!product) {
        notFound()
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-6">
                <Link href="/products" className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                {/* Product Image */}
                <div className="relative aspect-square md:aspect-auto md:h-[600px] bg-muted rounded-xl overflow-hidden border">
                    {product.images ? (
                        <Image
                            src={product.images}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground bg-secondary/20">
                            No Image Available
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <Badge variant="secondary" className="mb-4">
                            {product.category.name}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{product.name}</h1>
                    </div>

                    <div className="flex items-baseline space-x-4">
                        <span className="text-3xl font-bold text-primary">
                            ${Number(product.price).toFixed(2)}
                        </span>
                        {product.stock > 0 ? (
                            <span className="text-sm text-green-600 font-medium flex items-center">
                                <Check className="mr-1 h-4 w-4" /> In Stock ({product.stock})
                            </span>
                        ) : (
                            <span className="text-sm text-destructive font-medium">Out of Stock</span>
                        )}
                    </div>

                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {product.description || "No description provided for this product."}
                        </p>
                    </div>

                    <div className="pt-6 space-y-4 border-t">
                        <AddToCartButton product={product} />

                        <div className="grid grid-cols-2 gap-4 pt-6 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <Truck className="mr-2 h-4 w-4" /> Free Shipping
                            </div>
                            <div className="flex items-center">
                                <Shield className="mr-2 h-4 w-4" /> 2 Year Warranty
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
