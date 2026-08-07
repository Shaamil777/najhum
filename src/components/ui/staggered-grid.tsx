'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imagesLoaded from 'imagesloaded'
import { cn } from '@/lib/utils'
import { Cpu, Zap, Leaf, Cloud } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export interface BentoItem {
    id: number | string
    title: string
    subtitle: string
    description: string
    icon: React.ReactNode
    content?: React.ReactNode
    image?: string
}

export interface StaggeredGridProps {
    images: string[]
    bentoItems: BentoItem[]
    centerText?: string
    credits?: {
        madeBy: { text: string; href: string }
        moreDemos: { text: string; href: string }
    }
    className?: string
    showFooter?: boolean
    scroller?: string | Element | Window | null
}

export function StaggeredGrid({
    images,
    bentoItems,
    centerText = "Halcyon",
    credits = {
        madeBy: { text: "@codrops", href: "https://x.com/codrops" },
        moreDemos: { text: "More demos", href: "https://tympanus.net/codrops/demos" }
    },
    className,
    showFooter = true,
    scroller
}: StaggeredGridProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const gridFullRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    // Bento Grid State
    const [activeBento, setActiveBento] = useState<number>(0);

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>{char === ' ' ? '\u00A0' : char}</span>
        ))
    }

    useEffect(() => {
        const handleLoad = () => {
            document.body.classList.remove('loading')
            setIsLoaded(true)
        }

        // Wait for background images to load
        imagesLoaded(document.querySelectorAll('.grid__item-img'), { background: true }, handleLoad)
    }, [])

    useEffect(() => {
        if (!isLoaded) return

        // Animate Text Element
        if (textRef.current) {
            const chars = textRef.current.querySelectorAll('.char')
            gsap.timeline({
                scrollTrigger: {
                    trigger: textRef.current,
                    scroller: scroller || undefined,
                    start: 'top bottom',
                    end: 'center center-=25%',
                    scrub: 1,
                }
            })
                .from(chars, {
                    ease: 'sine.out',
                    yPercent: 300,
                    autoAlpha: 0,
                    stagger: {
                        each: 0.05,
                        from: 'center'
                    }
                })
        }

        // Animate Full Grid
        if (gridFullRef.current) {
            const gridFullItems = gridFullRef.current.querySelectorAll('.grid__item')
            const numColumns = getComputedStyle(gridFullRef.current).getPropertyValue('grid-template-columns').split(' ').length
            const middleColumnIndex = Math.floor(numColumns / 2)

            const columns: Element[][] = Array.from({ length: numColumns }, () => [])
            gridFullItems.forEach((item) => {
                const colAttr = item.getAttribute('data-col');
                const columnIndex = colAttr !== null ? parseInt(colAttr, 10) : 0;
                if (columns[columnIndex]) {
                    columns[columnIndex].push(item)
                }
            })

            columns.forEach((columnItems, columnIndex) => {
                const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2

                gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top bottom',
                        end: 'center center',
                        scrub: 1.5,
                    }
                })
                    .from(columnItems, {
                        yPercent: 450,
                        autoAlpha: 0,
                        delay: delayFactor,
                        ease: 'sine.out',
                    })
                    .from(columnItems.map(item => item.querySelector('.grid__item-img')), {
                        transformOrigin: '50% 0%',
                        ease: 'sine.out',
                    }, 0)
            })

            // Specific animation for Bento Container
            const bentoContainer = gridFullRef.current.querySelector('.bento-container')

            if (bentoContainer) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top top+=15%',
                        end: 'bottom center',
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                })

                tl.to(bentoContainer, {
                    y: window.innerHeight * 0.1,
                    scale: 1.5,
                    zIndex: 1000,
                    ease: 'power2.out',
                    duration: 1,
                    force3D: true
                }, 0)
            }
        }
    }, [isLoaded, scroller])

    // Prepare grid items: fill up to the end of Row 3 (21 slots)
    const mixedGridItems: (string | 'BENTO_GROUP')[] = Array.from({ length: 21 }, (_, i) => images[i % images.length]);

    // Replace the slot where we want the bento group
    mixedGridItems[16] = 'BENTO_GROUP';

    /* ── Grid cell icons (cycling through Lucide icons to match the project) ── */
    const CELL_ICONS = [Cpu, Zap, Leaf, Cloud];
    const CELL_LABELS = ["IoT", "Energy", "Agri", "Cloud"];

    return (
        <div
            className={cn("relative overflow-hidden w-full", className)}
            style={{
                '--grid-item-translate': '0px',
            } as React.CSSProperties}
        >
            {/* Center Text — uses foreground color + display font */}
            <section className="grid place-items-center w-full relative mt-[10vh]">
                <div ref={textRef} className="font-display uppercase flex content-center text-[clamp(3rem,14vw,10rem)] leading-[0.7] text-foreground/10 font-black tracking-tighter">
                    {splitText(centerText)}
                </div>
            </section>

            <section className="grid place-items-center w-full relative">
                <div ref={gridFullRef} className="grid--full relative w-full my-[10vh] h-auto aspect-[1.1] max-w-none p-4 grid gap-4 grid-cols-7 grid-rows-5">
                    {/* Overlay for focus states */}
                    <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-white/80 rounded-lg transition-opacity duration-500" />

                    {mixedGridItems.map((item, i) => {
                        if (item === 'BENTO_GROUP') {
                            if (!bentoItems || bentoItems.length === 0) return null;

                            return (
                                <div key="bento-group" data-col={2} className="grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-3 h-full w-full will-change-transform">
                                    {bentoItems.map((bentoItem, index) => {
                                        const isActive = activeBento === index;
                                        return (
                                            <div
                                                key={bentoItem.id}
                                                className={cn(
                                                    "relative cursor-pointer overflow-hidden rounded-3xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                                                    isActive
                                                        ? "bg-white/60 shadow-[var(--shadow-lg)]"
                                                        : "bg-surface-alt/80"
                                                )}
                                                style={{ width: isActive ? "60%" : "20%" }}
                                                onMouseEnter={() => setActiveBento(index)}
                                                onClick={() => setActiveBento(index)}
                                            >
                                                {/* Border Overlay */}
                                                <div className={cn(
                                                    "absolute inset-0 rounded-3xl border z-50 pointer-events-none transition-colors duration-700",
                                                    isActive
                                                        ? "border-primary/30"
                                                        : "border-border/60"
                                                )} />

                                                {/* Content Container */}
                                                <div className="relative z-10 w-full h-full flex flex-col p-0">
                                                    {/* Active State Content */}
                                                    <div className={cn(
                                                        "absolute inset-0 flex flex-col transition-all duration-500 ease-in-out",
                                                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                                                    )}>
                                                        {/* Image - Full Coverage */}
                                                        <div className="absolute inset-0 bg-surface-alt overflow-hidden z-0 group/img rounded-3xl">
                                                            {bentoItem.image && (
                                                                <>
                                                                    <img
                                                                        src={bentoItem.image}
                                                                        alt={bentoItem.title}
                                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90 group-hover/img:opacity-100"
                                                                    />
                                                                    {/* Text Protection Gradient — light mode friendly */}
                                                                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent pointer-events-none" />
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Footer Row */}
                                                        <div className="absolute bottom-0 left-0 w-full h-16 flex items-center justify-between px-5 z-20">
                                                            <div className="flex flex-col relative z-10">
                                                                <h3 className="text-sm font-bold text-white drop-shadow-md leading-none tracking-tight">{bentoItem.title}</h3>
                                                            </div>
                                                            <div className="text-white/80 transition-colors hover:text-white drop-shadow-md relative z-10">
                                                                {bentoItem.icon}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Inactive State - Icon + Title - Centered */}
                                                <div className={cn(
                                                    "absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500",
                                                    isActive ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                                                )}>
                                                    <div className="text-muted/60 transition-colors">
                                                        {bentoItem.icon}
                                                    </div>
                                                    <span className="text-[10px] font-bold text-muted/50 transition-colors uppercase tracking-widest">{bentoItem.title}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }

                        // Skip rendering for the slots that the group takes up
                        if (i === 17 || i === 18) return null;

                        if (typeof item === 'string') {
                            const IconComponent = CELL_ICONS[i % CELL_ICONS.length];
                            const label = CELL_LABELS[i % CELL_LABELS.length];

                            return (
                                <figure key={`img-${i}`} data-col={i % 7} className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer">
                                    <div className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-3xl overflow-hidden shadow-[var(--shadow-card)] border border-border/50 bg-white/60 backdrop-blur-md flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-[var(--shadow-lg)] group-hover:border-primary/30">

                                        {/* Hover Gradient Overlay — blue-tinted */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-foreground backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 rounded-3xl" />

                                        {/* Content Container */}
                                        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                                            <IconComponent className="w-7 h-7 text-muted/40 transition-all duration-300 group-hover:text-white group-hover:scale-110" />

                                            {/* Text Reveal on Hover */}
                                            <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                                <span className="block text-[10px] font-bold text-white/80 uppercase tracking-widest mb-0.5">Platform</span>
                                                <span className="block text-sm font-bold text-white tracking-tight">{label}</span>
                                            </div>
                                        </div>
                                    </div>
                                </figure>
                            )
                        }
                        return null;
                    })}
                </div>
            </section>

            {showFooter && (
                <footer className="frame__footer w-full p-8 flex justify-between items-center relative z-50 text-foreground uppercase font-medium text-xs tracking-wider">
                    <a href={credits.madeBy.href} className="hover:text-primary transition-colors">{credits.madeBy.text}</a>
                    <a href={credits.moreDemos.href} className="hover:text-primary transition-colors">{credits.moreDemos.text}</a>
                </footer>
            )}
        </div>
    )
}

export default StaggeredGrid
