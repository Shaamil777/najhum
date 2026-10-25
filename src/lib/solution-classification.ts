export const solutionClassifications = ['INDUSTRY', 'USE_CASE', 'BOTH'] as const;
export type SolutionClassification = (typeof solutionClassifications)[number];
export const classificationLabels: Record<SolutionClassification, string> = {
  INDUSTRY: 'By industry', USE_CASE: 'By use case', BOTH: 'Both industry and use case',
};
export function matchesClassification(value: SolutionClassification | undefined, group: 'industry' | 'usecase') {
  return value === 'BOTH' || (value ?? 'INDUSTRY') === (group === 'industry' ? 'INDUSTRY' : 'USE_CASE');
}
