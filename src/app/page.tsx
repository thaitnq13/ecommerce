import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, Clock } from "lucide-react";
import { HomeCarousel } from "@/components/home/home-carousel";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PromoBanner } from "@/components/home/promo-banner";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from 'next/cache';

export default async function Home() {
  noStore();

  // Fetch real data
  const categories = await db.category.findMany({
    take: 6,
    orderBy: { products: { _count: 'desc' } } // Order by most products roughly implies popularity/importance
  });

  const featuredProducts = await db.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HomeCarousel />

      {/* Features Grid */}
      <section className="py-12 bg-muted/20 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-3 p-6 bg-background rounded-xl shadow-sm border transition-shadow hover:shadow-md">
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-2">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">Free Shipping</h3>
              <p className="text-muted-foreground text-sm max-w-[200px]">On all orders over $100. Delivered to your doorstep.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 bg-background rounded-xl shadow-sm border transition-shadow hover:shadow-md">
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-2">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">Secure Payment</h3>
              <p className="text-muted-foreground text-sm max-w-[200px]">We ensure 100% secure payment with SSL encryption.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 bg-background rounded-xl shadow-sm border transition-shadow hover:shadow-md">
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-2">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">24/7 Support</h3>
              <p className="text-muted-foreground text-sm max-w-[200px]">Dedicated support team available around the clock.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoryGrid categories={categories} />

      {/* Featured Products */}
      <FeaturedCollection products={featuredProducts} />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract background pattern could go here */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Join the community</h2>
              <p className="text-primary-foreground/80 text-lg">
                Sign up for our newsletter to receive exclusive offers, early access to new arrivals, and style inspiration tailored to you.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex h-12 w-full rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ring-offset-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button variant="secondary" size="lg" className="h-12 rounded-full px-8 font-semibold shadow-lg hover:shadow-xl transition-all">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-primary-foreground/60">
              By subscribing you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
