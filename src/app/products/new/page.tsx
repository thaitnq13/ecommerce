import { ProductForm } from "@/components/products/product-form"
import { db } from "@/lib/db"
import { unstable_noStore as noStore } from 'next/cache';

export default async function NewProductPage() {
    noStore();
    const categories = await db.category.findMany({
        orderBy: { name: "asc" }
    })

    return (
        <div className="container mx-auto py-10 px-4">
            <ProductForm categories={categories} />
        </div>
    )
}
