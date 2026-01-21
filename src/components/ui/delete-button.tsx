"use client"

import { Button } from "@/components/ui/button"
import { Trash, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface DeleteButtonProps {
    id: string
    resource: "categories" | "products"
}

export function DeleteButton({ id, resource }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        setLoading(true)
        try {
            const res = await fetch(`/api/${resource}/${id}`, {
                method: "DELETE",
            })

            if (res.ok) {
                router.refresh()
            } else {
                alert("Failed to delete")
            }
        } catch (error) {
            console.error(error)
            alert("Error deleting item")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            onClick={handleDelete}
            disabled={loading}
        >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
        </Button>
    )
}
