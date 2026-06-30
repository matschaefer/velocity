import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import HeroStats from "@/components/hero/HeroStats";
import Fleet from "@/components/fleet/Fleet";
import Features from "@/components/features/FeaturesSection";
import Brands from "@/components/brands/BrandsSection";
import Testimonials from "@/components/testimonials/TestimonialsSection";
import FAQ from "@/components/faq/FAQSection";
import CTA from "@/components/cta/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <HeroStats />

        <Fleet />

        <Features />

        <Brands />

        <Testimonials />

        <FAQ />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
