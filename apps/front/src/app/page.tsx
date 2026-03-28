import { HeroSection } from '@/components/hero-section'
import { ManifestoStrip } from '@/components/manifesto-strip'
import { ProductGrid } from '@/components/product-grid'
import { AgentsSection } from '@/components/agents-section'
import { WorkflowSteps } from '@/components/workflow-steps'
import { PricingBlocks } from '@/components/pricing-blocks'
import { ServicesHumains } from '@/components/services-humains'
import { AddonBanner } from '@/components/addon-banner'
import { CtaSection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <HeroSection />
      <ManifestoStrip />
      <ProductGrid />
      <AgentsSection />
      <WorkflowSteps />
      <PricingBlocks />
      <ServicesHumains />
      <AddonBanner />
      <CtaSection />
      <Footer />
    </main>
  )
}
