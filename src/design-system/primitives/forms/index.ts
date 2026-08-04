// Forms Primitives — barrel export
// import { Input, Textarea, Select, Checkbox, Radio, Switch } from "@/design-system/primitives/forms";

export { Input } from "./Input";
export type { InputProps } from "./Input";

export { Textarea } from "./Textarea";
export type { TextareaProps } from "./Textarea";

export { Select } from "./Select";
export type { SelectProps, SelectOption } from "./Select";

export { Checkbox } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox";

export { Radio } from "./Radio";
export type { RadioProps } from "./Radio";

export { Switch } from "./Switch";
export type { SwitchProps } from "./Switch";

// Shared types & variants — importable without pulling in React components
export type { FieldSize } from "./formFieldVariants";
export {
  FIELD_BASE_STYLES,
  FIELD_SIZE_STYLES,
  FIELD_ERROR_STYLES,
  CHOICE_BASE_STYLES,
  CHOICE_SIZE_STYLES,
} from "./formFieldVariants";
