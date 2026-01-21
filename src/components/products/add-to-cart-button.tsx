"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store/cart"
import { Product } from "@prisma/client"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

interface AddToCartButtonProps {
    product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem } = useCart()
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = () => {
        addItem(product)
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <Button
            size="lg"
            className="w-full md:w-auto text-lg h-12 px-8 transition-all"
            disabled={product.stock <= 0}
            onClick={handleAddToCart}
        >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.stock > 0
                ? (isAdded ? "Added to Cart!" : "Add to Cart")
                : "Out of Stock"
            }
        </Button>
    )
}
