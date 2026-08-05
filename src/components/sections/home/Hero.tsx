import { homeContent } from "@/content/home";
import { 
  Section, 
  Container, 
  Heading, 
  Text, 
  Button,
  MarketingButton,
  Cluster,
  GridPattern,
  Stack
} from "@/design-system";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Hero Section
 *
 * The high-impact landing area of the homepage.
 * Uses the premium GridPattern in the background, masked to fade out
 * smoothly at the bottom edges.
 *
 * All text content is driven by `src/content/home.ts`.
 */
export default function Hero() {
  const { hero } = homeContent;

  return (
    <Section 
      spacing="xl" 
      className="relative flex items-center justify-center min-h-[90vh] overflow-hidden"
    >
      {/* Premium Background Grid Effect */}
      <GridPattern
        width={40}
        height={40}
        className="text-primary/10 stroke-primary/10 dark:stroke-white/5"
        mask="radial-gradient(100% 100% at center, white, transparent)"
      />

      {/* Decorative gradient orb for premium glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10 opacity-50" />

      <Container size="md" className="relative z-10 text-center">
        <Stack gap="lg" className="items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
            {hero.badge}
          </div>

          {/* Headline with gradient text */}
          <Heading 
            level={1} 
            variant="display" 
            noUppercase 
            className="tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
          >
            {hero.headline}
          </Heading>

          {/* Subheadline */}
          <Text variant="lead" className="max-w-2xl text-muted mx-auto">
            {hero.subheadline}
          </Text>

          {/* Actions */}
          <Cluster gap="md" className="justify-center mt-4">
            <Link href={hero.primaryCta.href} tabIndex={-1}>
              <MarketingButton>
                {hero.primaryCta.label}
              </MarketingButton>
            </Link>
            <Link href={hero.secondaryCta.href} tabIndex={-1}>
              <Button size="lg" variant="secondary" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                {hero.secondaryCta.label}
              </Button>
            </Link>
          </Cluster>

        </Stack>
      </Container>
    </Section>
  );
}