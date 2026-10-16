"use client";
import { useEffect, useState , useCallback} from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SectionCard from "./SectionCard";
import { SectionType, SectionContent } from "@/types/section";
interface Section {
  id: string;
  type: string;
  order: number;
  isDraft: boolean;
  content: SectionContent;
  createdAt: string;
  updatedAt: string;
}
interface SectionManagerProps {
  solutionId: string;
}
export default function SectionManager({ solutionId }: SectionManagerProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const fetchSections = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/solutions/" + solutionId, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch sections");
      }
      const data = await response.json();
      setSections(data.sections || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load sections");
    } finally {
      setLoading(false);
    }
  }, [solutionId]);
  useEffect(() => {
    // State updates occur after network I/O, not synchronously in the effect.

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSections();
  }, [fetchSections]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    const newSections = arrayMove(sections, oldIndex, newIndex);
    setSections(newSections);
    fetch("/api/admin/solutions/" + solutionId + "/sections/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ sectionIds: newSections.map((s) => s.id) }),
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to reorder sections");
    }).catch(() => {
      setError("Failed to reorder sections");
      setSections(sections);
    });
  };
  const handleAddSection = async (type: SectionType) => {
    setIsAddingSection(true);
    try {
      const defaultContent = getDefaultContent(type);
      const response = await fetch(
        "/api/admin/solutions/" + solutionId + "/sections",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ type, content: defaultContent }),
        },
      );
      if (!response.ok) throw new Error("Failed to create section");
      const newSection = await response.json();
      setSections([...sections, newSection]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create section");
    } finally {
      setIsAddingSection(false);
    }
  };
  const handleDuplicateSection = async (sectionId: string) => {
    const target = sections.find((s) => s.id === sectionId);
    if (!target) return;
    try {
      const response = await fetch(
        "/api/admin/solutions/" + solutionId + "/sections",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ type: target.type, content: target.content }),
        },
      );
      if (!response.ok) throw new Error("Failed to duplicate section");
      const newSection = await response.json();
      setSections([...sections, newSection]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to duplicate section");
    }
  };
  const handleApplyPreset = async (presetKey: string) => {
    if (!presetKey) return;
    if (sections.length > 0 && !confirm("Loading a template will add these preset sections to your current solution. Continue?")) {
      return;
    }
    const presetMap: Record<string, SectionType[]> = {
      starter: [
        SectionType.HERO,
        SectionType.INTRO,
        SectionType.CHALLENGE,
        SectionType.FEATURES,
        SectionType.PRODUCTS_CAROUSEL,
        SectionType.CTA,
      ],
      showcase: [
        SectionType.HERO,
        SectionType.FEATURES,
        SectionType.PRODUCTS_CAROUSEL,
        SectionType.SOLAAS,
        SectionType.CTA,
      ],
      deepdive: [
        SectionType.HERO,
        SectionType.INTRO,
        SectionType.CHALLENGE,
        SectionType.METHODOLOGY,
        SectionType.USE_CASES,
        SectionType.BENEFITS,
        SectionType.CTA,
      ],
    };
    const typesToAdd = presetMap[presetKey];
    if (!typesToAdd) return;
    setIsAddingSection(true);
    try {
      const addedSections: Section[] = [];
      for (const type of typesToAdd) {
        const defaultContent = getDefaultContent(type);
        const response = await fetch(
          "/api/admin/solutions/" + solutionId + "/sections",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ type, content: defaultContent }),
          },
        );
        if (response.ok) {
          const newSection = await response.json();
          addedSections.push(newSection);
        }
      }
      setSections((prev) => [...prev, ...addedSections]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load template");
    } finally {
      setIsAddingSection(false);
    }
  };
  const handleDeleteSection = async (sectionId: string) => {
    try {
      const response = await fetch(
        "/api/admin/solutions/" + solutionId + "/sections/" + sectionId,
        { method: "DELETE", credentials: "include" },
      );
      if (!response.ok) throw new Error("Failed to delete section");
      setSections(sections.filter((s) => s.id !== sectionId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete section");
    }
  };
  const handleUpdateSection = async (sectionId: string, content: SectionContent) => {
    try {
      const response = await fetch(
        "/api/admin/solutions/" + solutionId + "/sections/" + sectionId,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content }),
        },
      );
      if (!response.ok) throw new Error("Failed to update section");
      const updatedSection = await response.json();
      setSections(
        sections.map((s) => (s.id === sectionId ? updatedSection : s)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update section");
      throw err;
    }
  };
  const handleToggleDraft = async (sectionId: string, isDraft: boolean) => {
    try {
      const response = await fetch(
        "/api/admin/solutions/" + solutionId + "/sections/" + sectionId,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ isDraft }),
        },
      );
      if (!response.ok) throw new Error("Failed to toggle section status");
      const updatedSection = await response.json();
      setSections(
        sections.map((s) => (s.id === sectionId ? updatedSection : s)),
      );
    } catch (err) {
      setError("Failed to toggle section status");
    }
  };
  if (loading) {
    return (
      <div className="space-y-4">
        {" "}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        ))}{" "}
      </div>
    );
  }
  if (error && sections.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        {" "}
        <p className="text-red-800">{error}</p>{" "}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {" "}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Page Sections ({sections.length})
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <select
            onChange={(e) => {
              if (e.target.value) {
                handleApplyPreset(e.target.value);
                e.target.value = "";
              }
            }}
            disabled={isAddingSection}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium"
          >
            <option value="">⚡ Load Template</option>
            <option value="starter">Complete Starter (6 sections)</option>
            <option value="showcase">Product & SolaaS (5 sections)</option>
            <option value="deepdive">Deep Dive Case Study (7 sections)</option>
          </select>

          <select
            onChange={(e) => {
              if (e.target.value) {
                handleAddSection(e.target.value as SectionType);
                e.target.value = "";
              }
            }}
            disabled={isAddingSection}
            className="px-4 py-2 border border-blue-600 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-sm font-medium"
          >
            <option value="" className="text-gray-900 bg-white">+ Add Section</option>
            <option value={SectionType.HERO} className="text-gray-900 bg-white">Hero</option>
            <option value={SectionType.INTRO} className="text-gray-900 bg-white">Introduction</option>
            <option value={SectionType.CHALLENGE} className="text-gray-900 bg-white">Challenge</option>
            <option value={SectionType.FEATURES} className="text-gray-900 bg-white">Features</option>
            <option value={SectionType.BENEFITS} className="text-gray-900 bg-white">Benefits</option>
            <option value={SectionType.TESTIMONIALS} className="text-gray-900 bg-white">Testimonials</option>
            <option value={SectionType.CTA} className="text-gray-900 bg-white">Call to Action</option>
            <option value={SectionType.CUSTOM} className="text-gray-900 bg-white">Custom</option>
            <option value={SectionType.USE_CASES} className="text-gray-900 bg-white">Use Cases</option>
            <option value={SectionType.METHODOLOGY} className="text-gray-900 bg-white">Methodology</option>
            <option value={SectionType.SOLAAS} className="text-gray-900 bg-white">
              SolaaS Delivery Model
            </option>
            <option value={SectionType.PRODUCTS_CAROUSEL} className="text-gray-900 bg-white">Products Carousel</option>
            <option value={SectionType.IMAGE} className="text-gray-900 bg-white">Image Showcase</option>
            <option value={SectionType.VIDEO} className="text-gray-900 bg-white">Video Showcase</option>
            <option value={SectionType.GRAPH} className="text-gray-900 bg-white">Graph & Metrics</option>
            <option value={SectionType.COMPARISON_TABLE} className="text-gray-900 bg-white">Comparison Table (EVOLTICS Style)</option>
            <option value={SectionType.PRODUCT_CARD} className="text-gray-900 bg-white">Product Cards</option>
          </select>
        </div>
      </div>
      {sections.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">
            No sections yet. Add your first section or load a template above.
          </p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {sections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  solutionId={solutionId}
                  onDelete={handleDeleteSection}
                  onUpdate={handleUpdateSection}
                  onToggleDraft={handleToggleDraft}
                  onDuplicate={handleDuplicateSection}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}{" "}
    </div>
  );
}
function getDefaultContent(type: SectionType): SectionContent {
  switch (type) {
    case SectionType.HERO:
      return {
        heading: "New Hero Section",
        subheading: "Add your subheading here",
        ctaText: "Get Started",
        ctaLink: "#",
      };
    case SectionType.INTRO:
      return {
        heading: "Introduction",
        bodyText: "Add your introduction text here",
        bodyFormat: "text",
        imagePosition: "left",
        theme: "light",
        surfaceTone: "white",
        accentTone: "blue",
        imageLayout: "collage",
        headingStyle: "uppercase",
        decorationStyle: "grid",
        animationStyle: "subtle",
        metricStyle: "cards",
        featuredMetricIndex: 0,
        featuredMetricTone: "soft",
        buttonStyle: "solid",
        highlights: [],
        stats: [],
        flowSteps: [],
      };
    case SectionType.CHALLENGE:
      return {
        heading: "Four forces squeezing margins",
        challenges: [
          {
            title: "Energy Costs",
            description:
              "HVAC, lighting, kitchens & pools drive utility bills to 6% of revenue.",
          },
        ],
      };
    case SectionType.FEATURES:
      return {
        features: [
          { title: "Feature 1", description: "Description of feature 1" },
        ],
      };
    case SectionType.BENEFITS:
      return {
        benefits: [
          { title: "Benefit 1", description: "Description of benefit 1" },
        ],
      };
    case SectionType.TESTIMONIALS:
      return {
        testimonials: [
          {
            quote: "Great product!",
            author: "John Doe",
            role: "CEO",
            company: "Company Name",
          },
        ],
      };
    case SectionType.CTA:
      return {
        heading: "Ready to get started?",
        bodyText: "Join thousands of satisfied customers today",
        primaryButtonText: "Get Started",
        primaryButtonLink: "#",
      };
    case SectionType.CUSTOM:
      return {
        heading: "Custom Section",
        bodyHtml: "<p>Add your custom HTML content here</p>",
      };
    case SectionType.USE_CASES:
      return {
        eyebrow: "11 USE CASES",
        heading: "From room to rooftop — every system covered",
        tabs: [
          {
            id: "smart-guest",
            label: "Smart Guest Environment",
            solutionDetails: "Sensors: NI308 Indoor Ambience Sensor",
            statValue: "30%",
            statDescription: "Reduction in HVAC energy",
            bullets: [
              "Real-time temp, humidity",
              "Occupancy-linked HVAC",
              "Proactive alerts",
              "Centralised dashboard",
            ],
          },
        ],
      };
    case SectionType.METHODOLOGY:
      return {
        eyebrow: "THE METHODOLOGY",
        heading: "How we build intelligent solutions",
        bodyText:
          "We use a proven 3C methodology to transform physical data into actionable insights.",
        steps: [
          {
            title: "COLLECT",
            description: "Intelligent sensors capture data.",
          },
          { title: "CONNECT", description: "LPWAN connectivity." },
          { title: "COLLABORATE", description: "AI-driven dashboards." },
        ],
      };
    case SectionType.SOLAAS:
      return {};
    case SectionType.PRODUCTS_CAROUSEL:
      return {
        heading: "Related Products",
        description: "Explore the products that power this solution.",
      };
    case SectionType.IMAGE:
      return {
        eyebrow: "ARCHITECTURE DIAGRAM",
        heading: "End-to-End System Integration",
        description: "Visual breakdown of our hardware edge nodes streaming telemetry to cloud analytics.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
        altText: "System Architecture",
        layout: "contained",
        aspectRatio: "16:9",
        rounded: true,
      };
    case SectionType.VIDEO:
      return {
        eyebrow: "LIVE DEMONSTRATION",
        heading: "See The Solution In Action",
        subheading: "Watch our telemetry and deployment framework in real-world scenarios.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        layout: "contained",
      };
    case SectionType.GRAPH:
      return {
        eyebrow: "PERFORMANCE METRICS",
        heading: "Quantifiable Industrial Impact",
        description: "Benchmarking telemetry and efficiency gains against legacy setups.",
        chartType: "bar",
        primaryLabel: "Our Architecture",
        secondaryLabel: "Legacy Setup",
        dataPoints: [
          { label: "Data Transmission Latency", value: 12, secondaryValue: 85, unit: "ms" },
          { label: "Energy Efficiency Factor", value: 94, secondaryValue: 62, unit: "%" },
          { label: "Uptime Availability SLA", value: 99.98, secondaryValue: 94.2, unit: "%" },
          { label: "Deployment Speed", value: 4, secondaryValue: 24, unit: "days" },
        ],
        metrics: [
          { title: "Latency Reduction", value: "-85%", change: "12ms avg", isPositive: true },
          { title: "Annual Opex Savings", value: "38%", change: "+$120K", isPositive: true },
          { title: "System Reliability", value: "99.98%", change: "Field Verified", isPositive: true },
        ],
      };
    case SectionType.COMPARISON_TABLE:
      return {
        header: {
          leftTitle: "Traditional Setup",
          rightTitlePart1: "The Modern",
          rightTitlePart2: "Advantage",
          eyebrow: "Side-by-Side Comparison",
        },
        items: [
          {
            id: "comp-1",
            traditional: {
              title: "Fragmented Vendors",
              description: "High Integration Complexity",
              details: "Multi-vendor systems cause finger-pointing during network downtime and slow deployment cycles.",
            },
            solution: {
              title: "Unified Turnkey Stack",
              description: "Zero Integration Friction",
              details: "Pre-validated hardware, edge firmware, and cloud protocols deliver instant plug-and-play operation.",
            },
          },
          {
            id: "comp-2",
            traditional: {
              title: "Manual Monitoring",
              description: "Reactive Maintenance",
              details: "Field technicians dispatched only after hardware fails, resulting in costly downtime.",
            },
            solution: {
              title: "Predictive Telemetry",
              description: "Autonomous Remediation",
              details: "Continuous edge diagnostics detect thermal and electrical anomalies before failures occur.",
            },
          },
        ],
        footer: {
          leftLabel: "Legacy Ongoing Cost:",
          leftValue: "+42% Higher TCO",
          rightLabel: "Estimated Payback:",
          rightValue: "< 9 Months ROI",
        },
      };
    case SectionType.PRODUCT_CARD:
      return {
        eyebrow: "COMPATIBLE HARDWARE",
        heading: "Field-Proven Platform Products",
        description: "Explore connected edge appliances and devices engineered to power this architecture.",
        displayMode: "solution-tagged",
        columns: 3,
      };
    default:
      return {};
  }
}
