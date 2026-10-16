import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import PlatformSolutionsCarousel from './PlatformSolutionsCarousel';
import PlatformProductsCarousel from './PlatformProductsCarousel';

describe('shared platform carousel', () => {
  it('keeps product titles, images, and destinations when using the shared layout', () => {
    const html = renderToStaticMarkup(<PlatformProductsCarousel products={[{id:'charger',name:'AC HOME CHARGER',description:'Home charging',imageUrl:'/images/hardware.webp'}]}/>);
    expect(html).toContain('AC Home Charger');
    expect(html).toContain('/products/ac-home-charger');
    expect(html).toContain('Previous product');
    expect(html).toContain('Next product');
  });
  it('uses the same card layout for solutions and falls back to hero images and plain descriptions', () => {
    const html = renderToStaticMarkup(<PlatformSolutionsCarousel platformId="evoltics" solutions={[{id:'hotel',title:'Hotels',slug:'hotel-charging',sections:[{type:'HERO',content:{backgroundImage:'/solutions/details/hotel-ev-charging.jpg',subheading:'<p>Charging for guests</p>'}}]}]}/>);
    expect(html).toContain('platform-card-track');
    expect(html).toContain('/solutions/hotel-charging');
    expect(html).toContain('/solutions/details/hotel-ev-charging.jpg');
    expect(html).toContain('Charging for guests');
    expect(html).not.toContain('&lt;p&gt;');
    expect(html).toContain('Previous solution');
  });
  it('does not show an empty carousel', () => {
    expect(renderToStaticMarkup(<PlatformSolutionsCarousel platformId="cropifai" solutions={[]}/>)).toBe('');
    expect(renderToStaticMarkup(<PlatformProductsCarousel products={[]}/>)).toBe('');
  });
});
