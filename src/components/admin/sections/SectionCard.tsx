"use client";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SectionType, SectionContent } from "@/types/section";
import HeroSectionForm from "./forms/HeroSectionForm";
import IntroSectionForm from "./forms/IntroSectionForm";
import FeaturesSectionForm from "./forms/FeaturesSectionForm";
import BenefitsSectionForm from "./forms/BenefitsSectionForm";
import TestimonialsSectionForm from "./forms/TestimonialsSectionForm";
import CTASectionForm from "./forms/CTASectionForm";
import CustomSectionForm from "./forms/CustomSectionForm";
import ChallengeSectionForm from "./forms/ChallengeSectionForm";
import UseCasesSectionForm from "./forms/UseCasesSectionForm";
import MethodologySectionForm from "./forms/MethodologySectionForm";
import SolaasSectionForm from "./forms/SolaasSectionForm";
import ProductsCarouselSectionForm from "./forms/ProductsCarouselSectionForm";
import { createSectionSchema } from "@/lib/validation/section-schemas";
interface Section {
  id: string;
  type: string;
  order: number;
  isDraft: boolean;
  content: SectionContent;
}
interface SectionCardProps {
  section: Section;
  solutionId: string;
  onDelete: (sectionId: string) => Promise<void>;
  onUpdate: (sectionId: string, content: SectionContent) => Promise<void>;
  onToggleDraft: (sectionId: string, isDraft: boolean) => Promise<void>;
}
export default function SectionCard({
  section,
  solutionId,
  onDelete,
  onUpdate,
  onToggleDraft,
}: SectionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(section.id);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };
  const handleFormSubmit = async (data: SectionContent) => {
    setIsUpdating(true);
    try {
      await onUpdate(section.id, data);
      setIsEditing(false);
    } catch {
      // The manager displays the error; keep the form open for correction.
    } finally {
      setIsUpdating(false);
    }
  };
  const getSectionTypeColor = (type: string) => {
    switch (type) {
      case SectionType.HERO:
        return "bg-purple-100 text-purple-800";
      case SectionType.INTRO:
        return "bg-blue-100 text-blue-800";
      case SectionType.CHALLENGE:
        return "bg-indigo-100 text-indigo-800";
      case SectionType.FEATURES:
        return "bg-green-100 text-green-800";
      case SectionType.BENEFITS:
        return "bg-yellow-100 text-yellow-800";
      case SectionType.TESTIMONIALS:
        return "bg-pink-100 text-pink-800";
      case SectionType.CTA:
        return "bg-orange-100 text-orange-800";
      case SectionType.CUSTOM:
        return "bg-gray-100 text-gray-800";
      case SectionType.USE_CASES:
        return "bg-teal-100 text-teal-800";
      case SectionType.METHODOLOGY:
        return "bg-emerald-100 text-emerald-800";
      case SectionType.SOLAAS:
        return "bg-blue-100 text-blue-800";
      case SectionType.PRODUCTS_CAROUSEL:
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getSectionPreview = () => {
    const content = section.content;
    if ("heading" in content && content.heading) return content.heading;
    if ("challenges" in content && content.challenges) return content.challenges.length + " challenges";
    if ("features" in content && content.features) return content.features.length + " features";
    if ("benefits" in content && content.benefits) return content.benefits.length + " benefits";
    if ("testimonials" in content && content.testimonials)
      return content.testimonials.length + " testimonials";
    if ("tabs" in content && content.tabs) return content.tabs.length + " use cases";
    if ("steps" in content && content.steps) return content.steps.length + " steps";
    if (section.type === SectionType.SOLAAS)
      return "SolaaS Delivery Model Component";
    if (section.type === SectionType.PRODUCTS_CAROUSEL)
      return "Products Carousel";
    return "No preview available";
  };
  const renderForm = () => {
    const parsed = createSectionSchema.safeParse({ type: section.type, content: section.content });
    if (!parsed.success) return <p role="alert">This section has invalid content. Please correct its saved data.</p>;
    const formProps = {
      solutionId: solutionId,
      onSubmit: handleFormSubmit,
      onCancel: () => setIsEditing(false),
      isLoading: isUpdating,
    };
    switch (parsed.data.type) {
      case SectionType.HERO:
        return <HeroSectionForm defaultValues={parsed.data.content} {...formProps} />;
      case SectionType.INTRO:
        return <IntroSectionForm defaultValues={parsed.data.content} {...formProps} />;
      case SectionType.CHALLENGE:
        return <ChallengeSectionForm defaultValues={parsed.data.content} {...formProps} />;
      case SectionType.FEATURES:
        return <FeaturesSectionForm defaultValues={parsed.data.content} {...formProps} />;
      case SectionType.BENEFITS:
        return <BenefitsSectionForm defaultValues={parsed.data.content} {...formProps} />;
      case SectionType.TESTIMONIALS:
        return <TestimonialsSectionForm defaultValues={parsed.data.content} {...formProps} />;
      case SectionType.CTA:
        return <CTASectionForm defaultValues={parsed.data.content} {...formProps} />;
      case SectionType.CUSTOM:
        return <CustomSectionForm defaultValues={parsed.data.content} {...formProps} />;
      case SectionType.USE_CASES:
        return <UseCasesSectionForm defaultValues={parsed.data.content} {...formProps} />;
      case SectionType.METHODOLOGY:
        return <MethodologySectionForm defaultValues={parsed.data.content} {...formProps} />;
      case SectionType.SOLAAS:
        return <SolaasSectionForm defaultValues={parsed.data.content} {...formProps} />;
      case SectionType.PRODUCTS_CAROUSEL:
        return <ProductsCarouselSectionForm defaultValues={parsed.data.content} {...formProps} />;
      default:
        return (
          <p className="text-sm text-gray-500">
            Form not available for this section type
          </p>
        );
    }
  };
  return (
    <>
      {" "}
      <div
        ref={setNodeRef}
        style={style}
        className={
          "bg-white rounded-lg border-2 " +
          (isDragging ? "border-blue-500 shadow-lg" : "border-gray-200") +
          (section.isDraft ? " opacity-60" : "")
        }
      >
        {" "}
        <div className="p-4">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded"
            >
              {" "}
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />{" "}
              </svg>{" "}
            </button>{" "}
            <span
              className={
                "px-3 py-1 text-xs font-semibold rounded-full " +
                getSectionTypeColor(section.type)
              }
            >
              {" "}
              {section.type}{" "}
            </span>{" "}
            {section.isDraft && (
              <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-600">
                {" "}
                Disabled{" "}
              </span>
            )}{" "}
            <div className="flex-1">
              {" "}
              <p className="text-sm font-medium text-gray-900 truncate">
                {" "}
                {getSectionPreview()}{" "}
              </p>{" "}
            </div>{" "}
            <div className="flex items-center gap-2">
              {" "}
              <label className="flex items-center cursor-pointer">
                {" "}
                <input
                  type="checkbox"
                  checked={!section.isDraft}
                  onChange={(e) => onToggleDraft(section.id, !e.target.checked)}
                  className="sr-only peer"
                />{" "}
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>{" "}
                <span className="ml-2 text-sm text-gray-600">
                  {" "}
                  {section.isDraft ? "Disabled" : "Enabled"}{" "}
                </span>{" "}
              </label>{" "}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {" "}
                {isEditing ? "Cancel" : "Edit"}{" "}
              </button>{" "}
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800"
              >
                {" "}
                Delete{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          {isEditing && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              {" "}
              {renderForm()}{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {" "}
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {" "}
            <div className="p-6">
              {" "}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {" "}
                Delete Section{" "}
              </h3>{" "}
              <p className="text-sm text-gray-600 mb-4">
                {" "}
                Are you sure you want to delete this section? This action cannot
                be undone.{" "}
              </p>{" "}
              <div className="flex justify-end gap-3">
                {" "}
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
                >
                  {" "}
                  Cancel{" "}
                </button>{" "}
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
                >
                  {" "}
                  {isDeleting ? "Deleting..." : "Delete"}{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </>
  );
}
