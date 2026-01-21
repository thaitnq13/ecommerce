"use client"

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, History, Users, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Counter } from '@/components/ui/counter';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] md:h-[600px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
                    alt="Office space"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        Refining the Art of Retail
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 font-light"
                    >
                        LuxeMarket isn&apos;t just a store. It&apos;s a curator of quality, style, and innovation for the discerning individual.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-white/90" asChild>
                            <Link href="/products">Explore Our Collection</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="w-full md:w-1/2"
                        >
                            <div className="relative aspect-square md:aspect-4/5 rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop"
                                    alt="Our Story"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="w-full md:w-1/2 space-y-6"
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase">
                                Our Origins
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                                From a Simple Idea to a Global Standard
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Founded in 2024, LuxeMarket began with a singular mission: to bridge the gap between high-end design and everyday accessibility. We started as a small team of designers and engineers frustrated by the choice between quality and convenience.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Today, we curate thousands of products across fashion, electronics, and home goods. But our core philosophy remains unchanged—every item we sell must meet our rigorous standards for durability, aesthetic appeal, and ethical production.
                            </p>
                            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: CheckCircle2, text: "Ethically Sourced" },
                                    { icon: CheckCircle2, text: "Quality Guaranteed" },
                                    { icon: CheckCircle2, text: "Sustainable Practices" },
                                    { icon: CheckCircle2, text: "Customer First" },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-3"
                                    >
                                        <item.icon className="h-6 w-6 text-green-500 shrink-0" />
                                        <span className="font-medium">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
                        {[
                            { type: 'number', value: 50000, suffix: "+", label: "Happy Customers" },
                            { type: 'number', value: 1200, suffix: "+", label: "Products Curated" },
                            { type: 'text', value: "24/7", label: "Premium Support" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="p-6"
                            >
                                <div className="text-5xl font-bold mb-2">
                                    {stat.type === 'number' ? (
                                        <Counter value={stat.value as number} suffix={stat.suffix} />
                                    ) : (
                                        stat.value
                                    )}
                                </div>
                                <div className="text-lg text-primary-foreground/80">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Driven by Values</h2>
                            <p className="text-xl text-muted-foreground">
                                We believe that business can be a force for good. Here is what drives us every day.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: History,
                                title: "Timeless Design",
                                description: "We prioritize products that stand the test of time, both in style and durability, reducing the need for constant replacement."
                            },
                            {
                                icon: Users,
                                title: "Community Focused",
                                description: "We build meaningful relationships with our customers and partners, fostering a community built on trust and respect."
                            },
                            {
                                icon: Globe2,
                                title: "Global Inspiration",
                                description: "Our team scours the globe to find unique, high-quality items that bring a touch of worldly elegance to your doorstep."
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-muted/10 p-8 rounded-2xl border transition-all hover:bg-muted/30 hover:shadow-lg"
                            >
                                <div className="bg-background w-14 h-14 rounded-xl flex items-center justify-center shadow-sm mb-6">
                                    <value.icon className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team CTA */}
            <section className="py-20 bg-muted/20">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Ready to experience the best?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Join thousands of satisfied customers who have elevated their lifestyle with LuxeMarket.
                        </p>
                        <Button size="lg" className="rounded-full px-8" asChild>
                            <Link href="/products">
                                Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
