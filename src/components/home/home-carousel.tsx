"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function HomeCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
        Autoplay({ delay: 5000, stopOnInteraction: true }),
    ])
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

    const onSelect = React.useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    React.useEffect(() => {
        if (!emblaApi) return
        onSelect()
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on("select", onSelect)
    }, [emblaApi, onSelect])

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
            title: "New Season Arrivals",
            subtitle: "Check out the latest trends tailored just for you.",
            color: "bg-teal-900",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=2069&auto=format&fit=crop",
            title: "Exclusive Collection",
            subtitle: "Premium quality products for a sophisticated lifestyle.",
            color: "bg-indigo-900",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
            title: "Limited Edition",
            subtitle: "Act fast. These pieces won't last long.",
            color: "bg-rose-900",
        },
    ]

    return (
        <div className="relative group w-full h-[600px] md:h-[700px] overflow-hidden bg-black text-white">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/30" />
                            </div>


                            {/* Content */}
                            <div className="relative container mx-auto h-full flex flex-col justify-center px-4 md:px-6 z-10 space-y-6">
                                <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                                    <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium border border-white/10 mb-2">
                                        Starting at $99.00
                                    </div>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-neutral-200 max-w-lg leading-relaxed">
                                        {slide.subtitle}
                                    </p>
                                    <div className="flex gap-4 pt-4">
                                        <Button className="h-12 px-8 text-base bg-white text-black hover:bg-white/90">
                                            Shop Now
                                        </Button>
                                        <Button variant="outline" className="h-12 px-8 text-base border-white text-white hover:bg-white hover:text-black bg-transparent">
                                            View Lookbook
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm h-12 w-12"
                onClick={() => emblaApi?.scrollPrev()}
            >
                <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm h-12 w-12"
                onClick={() => emblaApi?.scrollNext()}
            >
                <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
                            }`}
                        onClick={() => emblaApi?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
