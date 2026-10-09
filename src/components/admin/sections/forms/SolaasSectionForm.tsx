'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { solaasContentSchema } from '@/lib/validation/section-schemas';
import type { SolaasContent } from '@/types/section';
import { defaultSolaasContent } from '@/content/solaas';

interface Props {
  defaultValues?: SolaasContent;
  onCancel: () => void;
  isLoading?: boolean;
  onSubmit: (data: SolaasContent) => Promise<void>;
}
const inputClass = 'mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm';

export default function SolaasSectionForm({ defaultValues, onCancel, isLoading = false, onSubmit }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<SolaasContent>({
    resolver: zodResolver(solaasContentSchema),
    defaultValues: { ...defaultSolaasContent, ...defaultValues },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'cards' });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <fieldset disabled={isLoading} className="space-y-5">
        <label className="block text-sm font-medium text-gray-700">Section label<input {...register('eyebrow')} className={inputClass} /></label>
        <label className="block text-sm font-medium text-gray-700">Heading<input {...register('heading')} className={inputClass} /></label>
        {errors.heading && <p role="alert" className="text-sm text-red-600">{errors.heading.message}</p>}
        <label className="block text-sm font-medium text-gray-700">Description<textarea {...register('bodyText')} rows={3} className={inputClass} /></label>
        {errors.bodyText && <p role="alert" className="text-sm text-red-600">{errors.bodyText.message}</p>}
        {fields.map((field, index) => <div key={field.id} className="space-y-3 rounded-xl border border-gray-200 p-4">
          <div className="flex justify-between"><span className="text-sm font-semibold">Card {index + 1}</span><button type="button" onClick={() => remove(index)} className="text-sm text-red-600">Remove</button></div>
          <label className="block text-sm">Title<input {...register(`cards.${index}.title`)} className={inputClass} /></label>
          {errors.cards?.[index]?.title && <p role="alert" className="text-sm text-red-600">{errors.cards[index]?.title?.message}</p>}
          <label className="block text-sm">Description<textarea {...register(`cards.${index}.description`)} rows={2} className={inputClass} /></label>
          {errors.cards?.[index]?.description && <p role="alert" className="text-sm text-red-600">{errors.cards[index]?.description?.message}</p>}
        </div>)}
        {errors.cards?.root?.message && <p role="alert" className="text-sm text-red-600">{errors.cards.root.message}</p>}
        <button type="button" onClick={() => append({ title: '', description: '' })} disabled={fields.length >= 6} className="rounded-lg border px-4 py-2 text-sm disabled:opacity-50">Add card</button>
      </fieldset>
      <div className="flex justify-end gap-3"><button type="button" onClick={onCancel} disabled={isLoading} className="rounded-lg border px-4 py-2 text-sm">Cancel</button><button type="submit" disabled={isLoading} className="rounded-lg bg-primary px-4 py-2 text-sm text-white">{isLoading ? 'Saving...' : 'Save section'}</button></div>
    </form>
  );
}
