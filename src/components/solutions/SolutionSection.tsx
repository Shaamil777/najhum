import type { CSSProperties } from 'react';
import { createSectionSchema } from '@/lib/validation/section-schemas';
import { normalizeContent, type BuilderProduct, type BuilderSection } from '@/lib/builder/document';
import HeroSection from './HeroSection';
import IntroSection from './IntroSection';
import ChallengeSection from './ChallengeSection';
import FeaturesSection from './FeaturesSection';
import BenefitsSection from './BenefitsSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import CustomSection from './CustomSection';
import UseCasesSection from './UseCasesSection';
import MethodologySection from './MethodologySection';
import SolaasSection from './SolaasSection';
import ProductsSection from './ProductsSection';
import GraphSection from './GraphSection';
import ImageSection from './ImageSection';
import VideoSection from './VideoSection';
import ComparisonTableSection from './ComparisonTableSection';
import ProductCardSection from './ProductCardSection';
import './solution-builder.css';

export default function SolutionSection({ section, products = [], availableProducts = [], editing = false }: { section: BuilderSection; products?: BuilderProduct[]; availableProducts?: BuilderProduct[]; editing?: boolean }) {
  const parsed = createSectionSchema.safeParse({ type: section.type, content: normalizeContent(section.content) });
  if (!parsed.success) return editing ? <div className="p-10 bg-amber-50 text-amber-900">Complete the required fields in this section to preview it.</div> : null;
  const data = parsed.data;
  let rendered;
  switch (data.type) {
    case 'HERO': rendered = <HeroSection content={data.content} />; break;
    case 'INTRO': rendered = <IntroSection content={data.content} />; break;
    case 'CHALLENGE': rendered = <ChallengeSection content={data.content} />; break;
    case 'FEATURES': rendered = <FeaturesSection content={data.content} />; break;
    case 'BENEFITS': rendered = <BenefitsSection content={data.content} />; break;
    case 'TESTIMONIALS': rendered = <TestimonialsSection content={data.content} />; break;
    case 'CTA': rendered = <CTASection content={data.content} />; break;
    case 'CUSTOM': rendered = <CustomSection content={data.content} />; break;
    case 'USE_CASES': rendered = <UseCasesSection content={data.content} />; break;
    case 'METHODOLOGY': rendered = <MethodologySection content={data.content} />; break;
    case 'SOLAAS': rendered = <SolaasSection content={data.content} />; break;
    case 'PRODUCTS_CAROUSEL': rendered = <ProductsSection content={data.content} products={products} editing={editing} />; break;
    case 'IMAGE': rendered = <ImageSection content={data.content} />; break;
    case 'VIDEO': rendered = <VideoSection content={data.content} />; break;
    case 'GRAPH': rendered = <GraphSection content={data.content} />; break;
    case 'COMPARISON_TABLE': rendered = <ComparisonTableSection content={data.content} />; break;
    case 'PRODUCT_CARD': {
      const displayProducts = (data.content.displayMode === 'manual' && data.content.productIds?.length)
        ? availableProducts.filter(p => data.content.productIds?.includes(p.id))
        : (products.length ? products : availableProducts);
      rendered = <ProductCardSection content={data.content} products={displayProducts.length ? displayProducts : (editing ? [
        { id: 'sample-1', name: 'Sample Smart Gateway', description: 'Industrial edge IoT gateway with integrated LoRaWAN transceiver.', imageUrl: '/builder-placeholders/image-1-1.svg' },
        { id: 'sample-2', name: 'Sample Ambience Node', description: 'Precision multi-variable environmental sensor.', imageUrl: '/builder-placeholders/image-1-1.svg' },
        { id: 'sample-3', name: 'Sample Power Monitor', description: 'Non-invasive high-precision submetering module.', imageUrl: '/builder-placeholders/image-1-1.svg' }
      ] : [])} />;
      break;
    }
  }
  const design = section.design;
  const styles = {
    '--block-padding': design.paddingY === undefined ? undefined : `${design.paddingY}px`,
    '--block-mobile-padding': design.mobilePaddingY === undefined ? undefined : `${design.mobilePaddingY}px`,
    '--block-heading': design.headingSize === undefined ? undefined : `${design.headingSize}px`,
    '--block-mobile-heading': design.mobileHeadingSize === undefined ? undefined : `${design.mobileHeadingSize}px`,
    '--block-background': design.background,
    '--block-heading-color': design.headingColor,
    '--block-text-color': design.textColor,
    '--block-align': design.alignment,
  } as CSSProperties;
  const classes = ['solution-block', ...Object.entries(design).filter(([, value]) => value !== undefined && value !== false).map(([key]) => `block-${key}`)].join(' ');
  return <div data-section-type={section.type} className={classes} style={styles}>{rendered}</div>;
}
