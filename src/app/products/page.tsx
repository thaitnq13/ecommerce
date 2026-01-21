import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { db } from "@/lib/db"
import { unstable_noStore as noStore } from 'next/cache';
import { ProductGrid } from "@/components/products/product-grid"

export default async function ProductsPage() {
    noStore();
    const products = await db.product.findMany({
        include: {
            category: true
        },
        orderBy: { createdAt: "desc" }
    })

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground mt-1">Manage your product inventory</p>
                </div>
                <Button asChild>
                    <Link href="/products/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Link>
                </Button>
            </div>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-muted/10">
                    <p className="text-muted-foreground mb-4">No products found.</p>
                    <Button variant="outline" asChild>
                        <Link href="/products/new">Create your first product</Link>
                    </Button>
                </div>
            ) : (
                <ProductGrid products={products} />
            )}
        </div>
    )
}
