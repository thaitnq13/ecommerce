"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function PromoBanner() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background with parallax-like feeling or just fixed */}
            <div
                className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1556906781-9a412961d289?q=80&w=2000&auto=format&fit=crop')"
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-sm font-semibold tracking-wider uppercase mb-4">
                        Limited Time Offer
                    </span>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        End of Season Sale
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
                        Up to <span className="font-bold text-white">50% OFF</span> on selected premium items. Upgrade your style for less.
                    </p>

                    <div className="pt-8">
                        <Button size="lg" className="h-14 px-10 rounded-full text-lg bg-white text-black hover:bg-white/90 shadow-xl" asChild>
                            <Link href="/products">Shop the Sale</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
