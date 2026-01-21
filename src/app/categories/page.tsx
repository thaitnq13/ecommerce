import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { db } from "@/lib/db"
import { unstable_noStore as noStore } from 'next/cache';
import { CategoriesGrid } from "@/components/categories/categories-grid"

export default async function CategoriesPage() {
    noStore();
    const categories = await db.category.findMany({
        include: {
            _count: {
                select: { products: true }
            }
        },
        orderBy: { createdAt: "desc" }
    })

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-muted-foreground mt-1">Manage and explore product categories</p>
                </div>
                <Button asChild>
                    <Link href="/categories/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Link>
                </Button>
            </div>

            {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-muted/10">
                    <p className="text-muted-foreground mb-4">No categories found.</p>
                    <Button variant="outline" asChild>
                        <Link href="/categories/new">Create your first category</Link>
                    </Button>
                </div>
            ) : (
                <CategoriesGrid categories={categories} />
            )}
        </div>
    )
}
