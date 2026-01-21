import { CategoryForm } from "@/components/categories/category-form"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from 'next/cache';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    noStore();
    const { id } = await params;
    const category = await db.category.findUnique({
        where: { id }
    })

    if (!category) {
        notFound()
    }

    const initialData = {
        ...category,
        image: category.image || ""
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <CategoryForm initialData={initialData} isEdit />
        </div>
    )
}
