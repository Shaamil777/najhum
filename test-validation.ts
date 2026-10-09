import { createSectionSchema } from './src/lib/validation/section-schemas';
import { SectionType } from './src/types/section';

const body = {
  type: "CHALLENGE",
  content: {
    label: 'THE CHALLENGE',
    heading: 'Four forces squeezing margins',
    challenges: [
      {
        title: 'Energy Costs',
        description: 'HVAC, lighting, kitchens & pools drive utility bills to 6% of revenue.'
      }
    ]
  }
};

try {
  const result = createSectionSchema.parse(body);
  console.log("Validation successful:", result);
} catch (error) {
  console.error("Validation failed:", error);
}
