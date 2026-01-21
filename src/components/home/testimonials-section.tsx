"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Fashion Blogger",
        content: "LuxeMarket has transformed my wardrobe! The quality of the 'Classic Leather Jacket' is unmatched. Fast shipping and beautiful packaging.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" // Unsplash face
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Tech Enthusiast",
        content: "I picked up the Noise Cancelling Headphones and they are a game changer for my commute. Excellent customer support when I had a question.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Interior Designer",
        content: "The home decor selection is curated perfectly. The Ceramic Vase Set added just the right touch of elegance to my living room.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80"
    }
]

export function TestimonialsSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Customers Say</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. Hear from our community of style enthusiasts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full border-none shadow-lg bg-muted/30 relative overflow-visible">
                                <div className="absolute -top-6 left-8 bg-primary text-primary-foreground p-3 rounded-full shadow-md">
                                    <Quote className="h-6 w-6" />
                                </div>
                                <CardContent className="pt-12 pb-8 px-8 flex flex-col h-full">
                                    <div className="flex-1 mb-6">
                                        <p className="text-lg italic text-muted-foreground leading-relaxed">
                                            &quot;{testimonial.content}&quot;
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-background shadow-sm">
                                            {/* Using img for simplicity in this demo component, ideally Next Image */}
                                            <Image
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
