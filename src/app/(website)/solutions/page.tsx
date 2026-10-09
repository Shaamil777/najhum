import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Heading, Text, Container, Stack, Grid, Card, CardBody } from '@/design-system';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Solutions | Najhum Technologies',
  description: 'Explore our comprehensive solutions designed to drive digital excellence.',
};

async function getPublishedSolutions() {
  const solutions = await prisma.solution.findMany({
    where: { isDraft: false },
    select: {
      slug: true,
      title: true,
      metaDescription: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  });
  return solutions;
}

export default async function SolutionsPage() {
  const solutions = await getPublishedSolutions();

  return (
    <Container size="lg" className="py-24">
      <Stack gap="2xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Heading level={1} variant="h1" className="mb-4">
            Our Solutions
          </Heading>
          <Text className="text-lg text-muted">
            Discover innovative solutions designed to transform your business and drive sustainable growth.
          </Text>
        </div>

        {/* Solutions Grid */}
        {solutions.length > 0 ? (
          <Grid cols={3} gap="lg">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group block h-full"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50 border border-border rounded-lg">
                  <CardBody padding="lg">
                    <Stack gap="md">
                      <Heading
                        level={3}
                        variant="h4"
                        className="group-hover:text-primary transition-colors"
                      >
                        {solution.title}
                      </Heading>
                      <Text className="text-muted line-clamp-3">
                        {solution.metaDescription || 'Learn more about this solution.'}
                      </Text>
                      <Text variant="caption" className="text-primary font-semibold">
                        Learn more →
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </Grid>
        ) : (
          <div className="text-center py-16">
            <Text className="text-lg text-muted">
              No solutions available at the moment.
            </Text>
          </div>
        )}
      </Stack>
    </Container>
  );
}
