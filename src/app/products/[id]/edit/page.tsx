import { ProductForm } from "@/components/products/product-form"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from 'next/cache';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    noStore();
    const { id } = await params;
    const [product, categories] = await Promise.all([
        db.product.findUnique({ where: { id } }),
        db.category.findMany({ orderBy: { name: "asc" } })
    ])

    if (!product) {
        notFound()
    }

    // Convert Decimal to number for form
    const initialData = {
        ...product,
        price: Number(product.price),
        description: product.description || "",
        images: product.images || ""
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <ProductForm initialData={initialData} isEdit categories={categories} />
        </div>
    )
}
