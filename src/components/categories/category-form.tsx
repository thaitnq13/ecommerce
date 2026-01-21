"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { categorySchema, CategoryFormValues } from "@/lib/validations/category"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface CategoryFormProps {
    initialData?: CategoryFormValues & { id?: string }
    isEdit?: boolean
}

export function CategoryForm({ initialData, isEdit }: CategoryFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: initialData || {
            name: "",
            slug: "",
            image: "",
        },
    })

    const onSubmit = async (data: CategoryFormValues) => {
        setLoading(true)
        try {
            const url = isEdit && initialData?.id
                ? `/api/categories/${initialData.id}`
                : `/api/categories`

            const method = isEdit ? "PATCH" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.error || "Something went wrong")
            }

            router.push("/categories")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert(error instanceof Error ? error.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>{isEdit ? "Edit Category" : "Create Category"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Electronics"
                            {...form.register("name")}
                        />
                        {form.formState.errors.name && (
                            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            placeholder="e.g. electronics"
                            {...form.register("slug")}
                        />
                        {form.formState.errors.slug && (
                            <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            placeholder="https://example.com/image.jpg"
                            {...form.register("image")}
                        />
                        {form.formState.errors.image && (
                            <p className="text-sm text-destructive">{form.formState.errors.image.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/categories")}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEdit ? "Update" : "Create"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
