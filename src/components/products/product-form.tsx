"use client"

import { useForm, Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { productSchema, ProductFormValues } from "@/lib/validations/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
    Loader2,
    ChevronLeft,
    Save,
    ImageIcon,
    DollarSign,
    Package,
    Layers,
    Type
} from "lucide-react"
import { Category } from "@prisma/client"
import { motion } from "framer-motion"


interface ProductFormProps {
    initialData?: ProductFormValues & { id?: string }
    isEdit?: boolean
    categories: Category[]
}

export function ProductForm({ initialData, isEdit, categories }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
        defaultValues: initialData || {
            name: "",
            slug: "",
            description: "",
            price: 0,
            stock: 0,
            categoryId: "",
            images: "",
        },
    })

    const onSubmit = async (data: ProductFormValues) => {
        setLoading(true)
        try {
            const url = isEdit && initialData?.id
                ? `/api/products/${initialData.id}`
                : `/api/products`

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

            if (isEdit && initialData?.id) {
                router.push(`/products/${initialData.id}`)
            } else {
                router.push("/products")
            }
            router.refresh()
        } catch (error) {
            console.error(error)
            alert(error instanceof Error ? error.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto space-y-8"
        >
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" onClick={() => router.back()}>
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Products</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                        {isEdit ? "Edit Product" : "Create New Product"}
                    </h1>
                    <p className="text-muted-foreground">
                        {isEdit ? "Update your product details and settings." : "Add a new product to your catalog."}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                        disabled={loading}
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={loading}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                    >
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        {isEdit ? "Save Changes" : "Publish Product"}
                    </Button>
                </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-base font-semibold">Product Name</Label>
                                        <Input
                                            id="name"
                                            {...form.register("name")}
                                            placeholder="e.g., Premium Leather Jacket"
                                            className="h-12 bg-background/50 text-lg"
                                        />
                                        {form.formState.errors.name && (
                                            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-base font-semibold">Description</Label>
                                        <textarea
                                            id="description"
                                            className="flex min-h-[200px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                            placeholder="Describe your product perfectly..."
                                            {...form.register("description")}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <Label className="text-base font-semibold mb-4 block">Product Images</Label>
                                <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 hover:bg-muted/30 transition-colors text-center group cursor-pointer relative overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {form.watch("images") ? (
                                        <div className="relative z-10 space-y-4">
                                            <img src={form.watch("images")} alt="Preview" className="h-48 mx-auto object-cover rounded-lg shadow-md" />
                                            <Input
                                                id="images"
                                                {...form.register("images")}
                                                placeholder="https://..."
                                                className="bg-background/80"
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-4 relative z-10">
                                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Paste Image URL</p>
                                                <p className="text-xs text-muted-foreground mt-1">Direct image link required</p>
                                            </div>
                                            <Input
                                                id="images"
                                                {...form.register("images")}
                                                placeholder="https://example.com/image.jpg"
                                                className="max-w-sm mx-auto bg-background/80"
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Meta Info */}
                    <div className="space-y-6">
                        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-6 space-y-4">
                                <Label className="text-base font-semibold flex items-center gap-2">
                                    <Layers className="w-4 h-4" />
                                    Organization
                                </Label>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="categoryId">Category</Label>
                                        <div className="relative">
                                            <select
                                                id="categoryId"
                                                className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                                {...form.register("categoryId")}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map(c => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-3 pointer-events-none opacity-50">▼</div>
                                        </div>
                                        {form.formState.errors.categoryId && (
                                            <p className="text-sm text-destructive">{form.formState.errors.categoryId.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="slug">URL Slug</Label>
                                        <div className="relative">
                                            <Type className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="slug"
                                                {...form.register("slug")}
                                                placeholder="product-slug"
                                                className="pl-9 bg-background/50"
                                            />
                                        </div>
                                        {form.formState.errors.slug && (
                                            <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-6 space-y-4">
                                <Label className="text-base font-semibold flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    Inventory & Pricing
                                </Label>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price</Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="number"
                                                step="0.01"
                                                id="price"
                                                {...form.register("price")}
                                                className="pl-9 bg-background/50 font-mono"
                                            />
                                        </div>
                                        {form.formState.errors.price && (
                                            <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="stock">Stock Count</Label>
                                        <Input
                                            type="number"
                                            id="stock"
                                            {...form.register("stock")}
                                            className="bg-background/50 font-mono"
                                        />
                                        {form.formState.errors.stock && (
                                            <p className="text-sm text-destructive">{form.formState.errors.stock.message}</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </motion.div>
    )
}
