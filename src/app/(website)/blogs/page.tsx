"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

import { blogPosts, categories } from "@/content/blogs";
export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 mb-20 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-h1 font-bold text-foreground mb-6 leading-tight tracking-tight">
            Insights, Stories, and <span className="text-primary">Ideas</span>
          </h1>
          <p className="text-body-lg text-muted max-w-2xl leading-relaxed">
            Thoughts on software engineering, product design, and building the future of the web. 
            Discover our latest articles, tutorials, and perspectives.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap gap-3 mt-10"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                index === 0 
                  ? "bg-foreground text-background shadow-md" 
                  : "bg-surface text-muted hover:text-foreground hover:bg-surface-alt border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Featured/Latest Grid */}
      <section className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col h-full bg-surface border border-border rounded-[var(--radius-lg)] overflow-hidden hover:shadow-card transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative w-full h-60 overflow-hidden bg-surface-alt">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-foreground uppercase tracking-wider shadow-sm">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-8">
                <div className="flex items-center gap-4 text-xs font-medium text-muted mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.id}`} className="block group/link">
                  <h3 className="text-h4 font-semibold text-foreground mb-3 leading-snug group-hover/link:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-muted text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary/5 border border-primary/10 rounded-[var(--radius-xl)] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left"
        >
          <div className="max-w-xl">
            <h2 className="text-h3 font-bold text-foreground mb-4">Subscribe to our newsletter</h2>
            <p className="text-muted">Get the latest articles, resources, and updates delivered straight to your inbox. No spam, just pure value.</p>
          </div>
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted/70"
            />
            <button className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors whitespace-nowrap shadow-md">
              Subscribe Now
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
