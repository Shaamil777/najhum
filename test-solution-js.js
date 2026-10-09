/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS diagnostic script. */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Creating test solution...');
  
  const testSolution = await prisma.solution.create({
    data: {
      title: 'Demo Solution: AI Analytics',
      slug: 'demo-ai-analytics',
      metaDescription: 'A comprehensive AI analytics solution for modern businesses.',
      isDraft: false,
      sections: {
        create: [
          {
            type: 'HERO',
            order: 0,
            content: {
              heading: 'AI-Powered Analytics Platform',
              subheading: 'Unlock the hidden potential of your data with our next-generation machine learning algorithms.',
              backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
              ctaText: 'Start Free Trial',
              ctaLink: '/contact',
            }
          },
          {
            type: 'INTRO',
            order: 1,
            content: {
              heading: 'Why Choose AI Analytics?',
              bodyText: 'Traditional analytics tools only tell you what happened. Our platform uses predictive AI to tell you what will happen next, enabling proactive decision-making across your entire organization.',
              image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
            }
          },
          {
            type: 'FEATURES',
            order: 2,
            content: {
              features: [
                {
                  title: 'Real-time Processing',
                  description: 'Process millions of data points in milliseconds.',
                  icon: 'Zap'
                },
                {
                  title: 'Predictive Modeling',
                  description: 'Forecast trends with 99.9% accuracy using historical data.',
                  icon: 'TrendingUp'
                },
                {
                  title: 'Automated Reporting',
                  description: 'Generate beautiful, insightful reports automatically.',
                  icon: 'FileText'
                }
              ]
            }
          },
          {
            type: 'BENEFITS',
            order: 3,
            content: {
              benefits: [
                {
                  title: 'Reduce Operational Costs',
                  description: 'Identify inefficiencies and automate routine analysis to save up to 40% on operational costs.',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
                },
                {
                  title: 'Increase Revenue',
                  description: 'Discover cross-selling opportunities and predict customer churn before it happens.',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
                }
              ]
            }
          },
          {
            type: 'TESTIMONIALS',
            order: 4,
            content: {
              testimonials: [
                {
                  quote: 'This platform completely transformed how we approach quarterly planning. The predictive insights are uncanny.',
                  author: 'Jane Doe',
                  role: 'Chief Data Officer',
                  company: 'TechCorp Global',
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150'
                },
                {
                  quote: 'Implementation was seamless and our team was generating ROI within the first two weeks.',
                  author: 'John Smith',
                  role: 'VP of Engineering',
                  company: 'InnovateX',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150'
                }
              ]
            }
          },
          {
            type: 'CUSTOM',
            order: 5,
            content: {
              heading: 'Integration Ecosystem',
              bodyHtml: '<div class="p-6 bg-gray-50 rounded-lg dark:bg-gray-800"><h3 class="text-xl font-bold mb-4">Connect with your favorite tools</h3><p>Our open API allows seamless integration with Salesforce, HubSpot, Slack, and over 100+ enterprise applications.</p></div>'
            }
          },
          {
            type: 'CTA',
            order: 6,
            content: {
              heading: 'Ready to Transform Your Data?',
              bodyText: 'Join over 5,000 forward-thinking companies that rely on our platform every day.',
              primaryButtonText: 'Request a Demo',
              primaryButtonLink: '/demo',
              secondaryButtonText: 'View Pricing',
              secondaryButtonLink: '/pricing'
            }
          }
        ]
      }
    }
  });

  console.log('Successfully created test solution with ID:', testSolution.id);
  console.log('You can view it in the admin panel.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
