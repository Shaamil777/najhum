// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import ProductsGrid from './ProductsGrid';
import { getProductClassification } from '@/lib/product-classification';
function render(products: Parameters<typeof ProductsGrid>[0]['initialProducts']) {
 const container = document.createElement('div');
 container.innerHTML = renderToStaticMarkup(<ProductsGrid initialProducts={products}/>);
 return container;
}
function counts(container: HTMLElement) {
 return Array.from(container.querySelectorAll('li button')).map(button => button.textContent);
}
describe('database-backed product counts', () => {
 it('counts the saved platform selections rather than legacy brochure tags', () => {
  const products = [
   {id:'sensor',name:'Najhum AI Occupancy Sensor',description:'Saved as agriculture only.',platforms:['cropifai'],details:{model:'NT321'}},
   {id:'gateway',name:'Gateway',description:'Saved on two platforms.',platforms:['iotrics','evoltics']},
   {id:'unassigned',name:'Unassigned product',description:'No platform selected.',platforms:[]},
  ].map(product => ({...product,...getProductClassification(product)}));
  const container = render(products);
  expect(counts(container)).toEqual(['All Products3','IoTRICs1','EVOLTICS1','cropifAI1']);
  expect(container.querySelectorAll('a[aria-label^="Explore "]')).toHaveLength(3);
 });
 it('shows zero counts and no dummy products when there are no published records', () => {
  for(const input of [[],undefined]) {
   const container = render(input);
   expect(counts(container)).toEqual(['All Products0','IoTRICs0','EVOLTICS0','cropifAI0']);
   expect(container.querySelectorAll('a[aria-label^="Explore "]')).toHaveLength(0);
   expect(container.textContent).toContain('No products found');
  }
 });
});
