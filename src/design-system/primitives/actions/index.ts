// Action Primitives — barrel export
// import { Button, buttonVariants } from "@/design-system/primitives/actions";

export { Button } from "./Button";
export type { ButtonProps } from "./Button";

export { MarketingButton } from "./MarketingButton";
export type { MarketingButtonProps } from "./MarketingButton";

// Re-export variant types and maps for external usage
// (e.g. styling anchor tags to look like buttons without importing the component)
export { VARIANT_STYLES, SIZE_STYLES, BASE_STYLES } from "./buttonVariants";
export type { ButtonVariant, ButtonSize, IconPosition } from "./buttonVariants";
