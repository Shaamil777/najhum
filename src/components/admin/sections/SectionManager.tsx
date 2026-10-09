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
      <div className="flex justify-between items-center">
        {" "}
        <h3 className="text-lg font-semibold text-gray-900">
          {" "}
          Page Sections ({sections.length}){" "}
        </h3>{" "}
        <div className="relative">
          {" "}
          <select
            onChange={(e) => {
              if (e.target.value) {
                handleAddSection(e.target.value as SectionType);
                e.target.value = "";
              }
            }}
            disabled={isAddingSection}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {" "}
            <option value="">+ Add Section</option>{" "}
            <option value={SectionType.HERO}>Hero</option>{" "}
            <option value={SectionType.INTRO}>Introduction</option>{" "}
            <option value={SectionType.CHALLENGE}>Challenge</option>{" "}
            <option value={SectionType.FEATURES}>Features</option>{" "}
            <option value={SectionType.BENEFITS}>Benefits</option>{" "}
            <option value={SectionType.TESTIMONIALS}>Testimonials</option>{" "}
            <option value={SectionType.CTA}>Call to Action</option>{" "}
            <option value={SectionType.CUSTOM}>Custom</option>{" "}
            <option value={SectionType.USE_CASES}>Use Cases</option>{" "}
            <option value={SectionType.METHODOLOGY}>Methodology</option>{" "}
            <option value={SectionType.SOLAAS}>
              SolaaS Delivery Model
            </option>{" "}
            <option value={SectionType.PRODUCTS_CAROUSEL}>Products Carousel</option>{" "}
          </select>{" "}
        </div>{" "}
      </div>{" "}
      {sections.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          {" "}
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />{" "}
          </svg>{" "}
          <p className="mt-2 text-sm text-gray-500">
            {" "}
            No sections yet. Add your first section above.{" "}
          </p>{" "}
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {" "}
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {" "}
            <div className="space-y-3">
              {" "}
              {sections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  solutionId={solutionId}
                  onDelete={handleDeleteSection}
                  onUpdate={handleUpdateSection}
                  onToggleDraft={handleToggleDraft}
                />
              ))}{" "}
            </div>{" "}
          </SortableContext>{" "}
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
        eyebrow: "THE SOLUTION",
        heading: "Introduction",
        bodyText: "Add your introduction text here",
        bodyFormat: "text",
        imagePosition: "right",
        theme: "light",
        highlights: [],
        stats: [],
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
          { title: "CONNECT", description: "LoRaWAN connectivity." },
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
    default:
      return {};
  }
}
