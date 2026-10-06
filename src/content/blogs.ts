export interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug?: string;
}

export const categories: string[] = [
  "All", 
  "Design", 
  "Engineering", 
  "UI/UX", 
  "Architecture", 
  "Performance"
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Design Systems in Modern Web Development",
    excerpt: "Explore how unified design systems are bridging the gap between designers and developers, leading to faster shipping and more cohesive user experiences.",
    category: "Design",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
    slug: "future-of-design-systems"
  },
  {
    id: 2,
    title: "Mastering React Server Components and Next.js App Router",
    excerpt: "A deep dive into server-side rendering, streaming, and how the new App Router paradigm changes the way we build React applications for the better.",
    category: "Engineering",
    date: "Oct 05, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    slug: "mastering-rsc-and-app-router"
  },
  {
    id: 3,
    title: "Why Typography Matters More Than Ever in Minimalist UI",
    excerpt: "When you strip away gradients and heavy shadows, typography becomes the loudest voice in your design. Learn how to choose and pair fonts effectively.",
    category: "UI/UX",
    date: "Sep 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    slug: "typography-in-minimalist-ui"
  },
  {
    id: 4,
    title: "Building Scalable Architecture for High-Traffic Applications",
    excerpt: "Discover the core principles of designing backend systems that can handle millions of requests without breaking a sweat.",
    category: "Architecture",
    date: "Sep 20, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    slug: "scalable-architecture"
  },
  {
    id: 5,
    title: "The Psychology of Color in Enterprise Dashboards",
    excerpt: "Enterprise tools don't have to be boring. Learn how strategic color usage can improve user retention, reduce fatigue, and highlight critical data.",
    category: "Design",
    date: "Sep 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    slug: "psychology-of-color"
  },
  {
    id: 6,
    title: "Optimizing Web Vitals: A Practical Guide to 100/100",
    excerpt: "Step-by-step techniques to improve your Largest Contentful Paint, Cumulative Layout Shift, and First Input Delay for maximum SEO performance.",
    category: "Performance",
    date: "Sep 08, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    slug: "optimizing-web-vitals"
  }
];
