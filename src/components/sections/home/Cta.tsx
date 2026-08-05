import { homeContent } from "@/content/home";
import { 
  Section, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Cluster,
  Stack
} from "@/design-system";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Cta Section
 *
 * Bottom of page call to action banner.
 */
export default function Cta() {
  const { cta } = homeContent;

  return (
    <Section spacing="xl" background="dark" className="text-center relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <Container size="md" className="relative z-10">
        <Stack gap="lg" className="items-center">
          
          <Heading level={2} variant="h1" align="center" className="text-white">
            {cta.headline}
          </Heading>
          
          <Text variant="lead" className="text-white/70 max-w-xl mx-auto">
            {cta.subheadline}
          </Text>
          
          <Cluster gap="md" className="justify-center mt-6">
            <Link href={cta.primaryCta.href} tabIndex={-1}>
              <Button size="lg" variant="primary">
                {cta.primaryCta.label}
              </Button>
            </Link>
            <Link href={cta.secondaryCta.href} tabIndex={-1}>
              <Button size="lg" variant="ghost" className="text-white hover:text-white hover:bg-white/10" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                {cta.secondaryCta.label}
              </Button>
            </Link>
          </Cluster>

        </Stack>
      </Container>
    </Section>
  );
}