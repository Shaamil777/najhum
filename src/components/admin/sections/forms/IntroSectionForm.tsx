"use client";

import { useId, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Check, Monitor, Plus, Smartphone, Trash2 } from 'lucide-react';
import { introContentSchema } from '@/lib/validation/section-schemas';
import type { IntroContent } from '@/types/section';
import { ImageUploadField } from '@/components/admin/ui/ImageUploadField';
import IntroSection from '@/components/solutions/IntroSection';
import styles from './IntroSectionForm.module.css';

interface IntroSectionFormProps {
  solutionId: string;
  defaultValues?: IntroContent;
  onSubmit: (data: IntroContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

type TextField = 'heading' | 'headingAccent' | 'summary' | 'bodyText' | 'imageAlt' | 'secondaryImageAlt' | 'imageCaption' | 'buttonText' | 'buttonLink';
type EditorTab = 'story' | 'images' | 'appearance' | 'details';
type ChoiceField = 'imageLayout' | 'headingStyle' | 'decorationStyle' | 'animationStyle' | 'metricStyle' | 'featuredMetricTone' | 'buttonStyle';
const surfaces = [
  { value: 'white', label: 'White', color: '#ffffff', description: 'Website default' },
  { value: 'warm', label: 'Cloud', color: '#f8f9fa', description: 'Website grey' },
  { value: 'cool', label: 'Blue wash', color: '#eff6ff', description: 'Platform accent' },
] as const;
const accents = [
  { value: 'blue', label: 'Najhum blue', color: '#3b82f6' },
  { value: 'teal', label: 'Platform green', color: '#059669' },
  { value: 'clay', label: 'Slate', color: '#334155' },
] as const;

export default function IntroSectionForm({ solutionId, defaultValues, onSubmit, onCancel, isLoading = false }: IntroSectionFormProps) {
  const id = useId();
  const [activeTab, setActiveTab] = useState<EditorTab>('story');
  const [previewWidth, setPreviewWidth] = useState<'wide' | 'mobile'>('wide');
  const methods = useForm<IntroContent>({
    resolver: zodResolver(introContentSchema),
    defaultValues: {
      heading: '', headingAccent: '', bodyText: '', image: '', secondaryImage: '', secondaryImageAlt: '', summary: '',
      bodyFormat: defaultValues ? 'html' : 'text', imageAlt: '', imageCaption: '',
      imagePosition: 'left', surfaceTone: 'white', accentTone: 'blue',
      imageLayout: 'collage', headingStyle: 'uppercase', decorationStyle: 'grid', animationStyle: 'subtle',
      metricStyle: 'cards', featuredMetricIndex: 0, featuredMetricTone: 'soft', buttonStyle: 'solid',
      highlights: [], stats: [], flowSteps: [], buttonText: '', buttonLink: '',
      ...defaultValues,
      theme: 'light',
    },
  });
  const { register, handleSubmit, control, formState: { errors, isSubmitting, isDirty } } = methods;
  const busy = isLoading || isSubmitting;
  const highlights = useFieldArray({ control, name: 'highlights' });
  const stats = useFieldArray({ control, name: 'stats' });
  const flowSteps = useFieldArray({ control, name: 'flowSteps' });
  const watched = useWatch({ control }) as IntroContent;
  const preview: IntroContent = {
    ...watched,
    heading: watched.heading || 'Your solution, clearly introduced.',
    bodyText: watched.bodyText || 'Your description will appear here. Give readers the context they need to understand your solution.',
  };
  const tabErrors: Record<EditorTab, boolean> = {
    story: Boolean(errors.heading || errors.headingAccent || errors.summary || errors.bodyText || errors.buttonText || errors.buttonLink),
    images: Boolean(errors.image || errors.imageAlt || errors.secondaryImage || errors.secondaryImageAlt || errors.imageCaption || errors.imagePosition || errors.imageLayout),
    appearance: Boolean(errors.surfaceTone || errors.accentTone || errors.headingStyle || errors.decorationStyle || errors.animationStyle || errors.metricStyle || errors.featuredMetricIndex || errors.featuredMetricTone || errors.buttonStyle),
    details: Boolean(errors.highlights || errors.stats || errors.flowSteps),
  };

  const field = (name: TextField, label: string, placeholder = '', rows?: number, maxLength?: number) => (
    <div className={styles.field}>
      <label htmlFor={`${id}-${name}`} className={styles.label}>{label}</label>
      {rows ? (
        <textarea id={`${id}-${name}`} {...register(name)} rows={rows} placeholder={placeholder} maxLength={maxLength} className={styles.input} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${id}-${name}-error` : undefined} />
      ) : (
        <input id={`${id}-${name}`} {...register(name)} placeholder={placeholder} maxLength={maxLength} className={styles.input} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${id}-${name}-error` : undefined} />
      )}
      {errors[name] && <p id={`${id}-${name}-error`} className={styles.error}>{errors[name]?.message}</p>}
    </div>
  );
  const choice = (name: ChoiceField, label: string, options: [string, string][]) => (
    <div className={styles.field}>
      <label htmlFor={`${id}-${name}`} className={styles.label}>{label}</label>
      <select id={`${id}-${name}`} {...register(name)} className={styles.input} aria-invalid={Boolean(errors[name])}>
        {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
      </select>
      {errors[name] && <p className={styles.error}>{errors[name]?.message}</p>}
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.builder}>
        <input type="hidden" {...register('theme')} />
        <div className={styles.header}>
          <div><p className={styles.kicker}>Solution builder</p><h3 className={styles.title}>Introduction</h3><p className={styles.subtitle}>Build a clear introduction that fits the Najhum website.</p></div>
          <span className={styles.lightBadge}><span aria-hidden="true" />Light appearance</span>
        </div>
        <div className={styles.tabs} aria-label="Introduction settings">
          {(['story', 'images', 'appearance', 'details'] as const).map((tab) => (
            <button key={tab} type="button" aria-pressed={activeTab === tab} onClick={() => setActiveTab(tab)} className={styles.tab}>
              {{ story: 'Story', images: 'Images', appearance: 'Appearance', details: 'Highlights & metrics' }[tab]}
              {tabErrors[tab] && <span className={styles.errorDot} aria-label="Contains errors" />}
            </button>
          ))}
        </div>
        {Object.keys(errors).length > 0 && <p role="alert" className={styles.errorSummary}>Some fields need attention. Open the marked settings to review them.</p>}

        <fieldset disabled={busy} className={styles.editor}>
          {activeTab === 'story' && (
            <div className={styles.storyFields}>
              <div className={styles.group}>
                <div className={styles.groupHeading}><span className={styles.step}>01</span><div><h4>The opening</h4><p>A clear headline and a short lead paragraph.</p></div></div>
                {field('heading', 'Heading *', 'A better way to run your buildings.', 2, 200)}
                {field('headingAccent', 'Emphasised phrase', 'A phrase from your heading', undefined, 100)}
                <p className={styles.note}>This phrase gets the blue underline used in the About page intro.</p>
                {field('summary', 'Lead paragraph', 'The central idea, in one or two sentences.', 3, 300)}
              </div>
              <div className={styles.group}>
                <div className={styles.groupHeading}><span className={styles.step}>02</span><div><h4>The context</h4><p>What it does, who it serves, and why it matters.</p></div></div>
                {field('bodyText', 'Description *', 'Introduce the solution in your own words.', 6, 2000)}
                <div className={styles.field}><label htmlFor={`${id}-format`} className={styles.label}>Text format</label><select id={`${id}-format`} {...register('bodyFormat')} className={styles.input}><option value="text">Plain text</option><option value="html">Rich text / HTML</option></select></div>
                <div className={styles.divider} />
                <p className={styles.smallHeading}>Optional next step</p>
                <div className={styles.fieldPair}>{field('buttonText', 'Link text', 'Discuss your project', undefined, 50)}{field('buttonLink', 'Destination', '/contact')}</div>
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className={styles.group}>
              <div className={styles.groupHeading}><span className={styles.step}>01</span><div><h4>Intro images</h4><p>Add a main image and an optional second image that overlaps it.</p></div></div>
              <fieldset className={styles.choiceFieldset}><legend className={styles.label}>Number of images</legend><div className={styles.accentChoices}>
                <label className={styles.accentChoice}><input type="radio" value="single" {...register('imageLayout')} /><span>One image</span><Check size={13} className={styles.choiceCheck} aria-hidden="true" /></label>
                <label className={styles.accentChoice}><input type="radio" value="collage" {...register('imageLayout')} /><span>Two images</span><Check size={13} className={styles.choiceCheck} aria-hidden="true" /></label>
              </div></fieldset>
              <div className={styles.imageFields}>
                <div className={styles.imageSlot}>
                  <ImageUploadField key={watched.image || 'no-image'} name="image" label="Main image" solutionId={solutionId} currentImageUrl={watched.image} />
                  {watched.image && <button type="button" className={styles.textButton} onClick={() => methods.setValue('image', '', { shouldValidate: true, shouldDirty: true })}>Remove main image</button>}
                  {field('imageAlt', 'Main image description', 'Describe the main image for screen readers.', undefined, 200)}
                </div>
                <div className={styles.imageSlot}>
                  <ImageUploadField key={watched.secondaryImage || 'no-secondary-image'} name="secondaryImage" label="Second image (optional)" solutionId={solutionId} currentImageUrl={watched.secondaryImage} onImageChange={() => methods.setValue('imageLayout', 'collage', { shouldValidate: true, shouldDirty: true })} />
                  {watched.secondaryImage && <button type="button" className={styles.textButton} onClick={() => methods.setValue('secondaryImage', '', { shouldValidate: true, shouldDirty: true })}>Remove second image</button>}
                  {field('secondaryImageAlt', 'Second image description', 'Describe the second image for screen readers.', undefined, 200)}
                  <p className={styles.note}>Adding a second image selects Two images automatically. Add a main image to display the pair.</p>
                </div>
              </div>
              <div className={styles.fieldPair}>
                <div className={styles.field}><label htmlFor={`${id}-position`} className={styles.label}>Image placement</label><select id={`${id}-position`} {...register('imagePosition')} className={styles.input}><option value="right">Highlights left · image right</option><option value="left">Image left · highlights right</option></select></div>
                {field('imageCaption', 'Caption', 'A short note beneath the images.', undefined, 160)}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div>
              <div className={styles.group}>
                <div className={styles.groupHeading}><span className={styles.step}>01</span><div><h4>Website theme</h4><p>Najhum colours, light surfaces and rounded cards.</p></div></div>
                <fieldset className={styles.choiceFieldset}><legend className={styles.label}>Section background</legend><div className={styles.surfaceChoices}>
                  {surfaces.map((surface) => <label key={surface.value} className={styles.surfaceChoice}><input type="radio" value={surface.value} {...register('surfaceTone')} /><span className={styles.surfaceSwatch} style={{ backgroundColor: surface.color }}><span className={styles.sampleLine} /><span className={styles.sampleLine} /><span className={styles.sampleLine} /><Check size={15} className={styles.choiceCheck} aria-hidden="true" /></span><strong>{surface.label}</strong><span>{surface.description}</span></label>)}
                </div></fieldset>
                <fieldset className={styles.choiceFieldset}><legend className={styles.label}>Accent colour</legend><div className={styles.accentChoices}>
                  {accents.map((accent) => <label key={accent.value} className={styles.accentChoice}><input type="radio" value={accent.value} {...register('accentTone')} /><span className={styles.accentDot} style={{ backgroundColor: accent.color }} /><span>{accent.label}</span><Check size={13} className={styles.choiceCheck} aria-hidden="true" /></label>)}
                </div></fieldset>
                <p className={styles.note}>Najhum blue matches the website. Platform green and slate provide coordinated alternatives.</p>
                <div className={styles.divider} />
                <div className={styles.fieldPair}>
                  {choice('headingStyle', 'Heading style', [['uppercase', 'Najhum uppercase'], ['sentence', 'Sentence case']])}
                  {choice('buttonStyle', 'Button appearance', [['solid', 'Filled blue'], ['outline', 'Outline']])}
                  {choice('decorationStyle', 'Background detail', [['grid', 'About page grid'], ['lines', 'Architectural lines'], ['none', 'None']])}
                  {choice('animationStyle', 'Motion', [['subtle', 'Subtle entrance & hover'], ['none', 'None']])}
                  {choice('metricStyle', 'Metric presentation', [['cards', 'About page metric cards'], ['inline', 'Minimal metric tiles']])}
                  {choice('featuredMetricTone', 'Featured metric colour', [['soft', 'Pale blue'], ['blue', 'Solid blue']])}
                </div>
                <div className={styles.field}><label htmlFor={`${id}-featuredMetricIndex`} className={styles.label}>Featured metric</label><select id={`${id}-featuredMetricIndex`} {...register('featuredMetricIndex', { valueAsNumber: true })} className={styles.input}>
                  <option value={-1}>None · use neutral metric cards</option>
                  {stats.fields.map((item, index) => <option key={item.id} value={index}>Metric {index + 1} · {watched.stats?.[index]?.label || 'Untitled'}</option>)}
                  {stats.fields.length === 0 && <option value={0}>First metric · add one in Highlights & metrics</option>}
                </select></div>
                <p className={styles.note}>Changes appear immediately in the preview and are saved with this section.</p>
              </div>

            </div>
          )}

          {activeTab === 'details' && (
            <div className={styles.storyFields}>
              <div className={styles.group}>
                <div className={styles.groupHeading}><span className={styles.step}>01</span><div><h4>What sets it apart</h4><p>Up to four highlights, presented as rounded website cards.</p></div></div>
                {highlights.fields.map((item, index) => <div key={item.id} className={styles.arrayItem}>
                  <div className={styles.itemHeading}><span>Highlight {String(index + 1).padStart(2, '0')}</span><button type="button" onClick={() => highlights.remove(index)} aria-label={`Remove highlight ${index + 1}`} className={styles.removeButton}><Trash2 size={15} /></button></div>
                  <label className={styles.label}>Title<input {...register(`highlights.${index}.title`)} className={styles.input} maxLength={100} placeholder="Works with your existing systems" aria-invalid={Boolean(errors.highlights?.[index]?.title)} /></label>
                  {errors.highlights?.[index]?.title && <p className={styles.error}>{errors.highlights[index]?.title?.message}</p>}
                  <label className={styles.label}>Description<textarea {...register(`highlights.${index}.description`)} className={styles.input} rows={2} maxLength={250} placeholder="A little more context, if needed." aria-invalid={Boolean(errors.highlights?.[index]?.description)} /></label>
                  {errors.highlights?.[index]?.description && <p className={styles.error}>{errors.highlights[index]?.description?.message}</p>}
                  <div className={styles.fieldPair}>
                    <label className={styles.label}>Card icon<select {...register(`highlights.${index}.icon`)} defaultValue={item.icon || ['network', 'layers', 'shield', 'cpu'][index % 4]} className={styles.input}><option value="network">Connectivity</option><option value="layers">Layers</option><option value="shield">Shield</option><option value="cpu">Processor</option><option value="chart">Analytics</option><option value="none">None</option></select></label>
                    <label className={styles.label}>Card colour<select {...register(`highlights.${index}.tone`)} defaultValue={item.tone || 'white'} className={styles.input}><option value="white">White</option><option value="soft">Pale accent</option><option value="neutral">Website grey</option></select></label>
                  </div>
                  {errors.highlights?.[index]?.icon && <p className={styles.error}>{errors.highlights[index]?.icon?.message}</p>}
                  {errors.highlights?.[index]?.tone && <p className={styles.error}>{errors.highlights[index]?.tone?.message}</p>}
                </div>)}
                <button type="button" onClick={() => highlights.append({ title: '', description: '' })} disabled={highlights.fields.length >= 4} className={styles.addButton}><Plus size={15} />Add highlight<span>{highlights.fields.length}/4</span></button>
              </div>
              <div className={styles.group}>
                <div className={styles.groupHeading}><span className={styles.step}>02</span><div><h4>The evidence</h4><p>Up to four metrics, arranged in the About page card layout.</p></div></div>
                {stats.fields.map((item, index) => <div key={item.id} className={styles.arrayItem}>
                  <div className={styles.itemHeading}><span>Metric {String(index + 1).padStart(2, '0')}</span><button type="button" onClick={() => { stats.remove(index); const featured = methods.getValues('featuredMetricIndex') ?? 0; if (index <= featured) methods.setValue('featuredMetricIndex', index === featured ? -1 : featured - 1, { shouldDirty: true }); }} aria-label={`Remove metric ${index + 1}`} className={styles.removeButton}><Trash2 size={15} /></button></div>
                  <div className={styles.fieldPair}>
                    <label className={styles.label}>Value<input {...register(`stats.${index}.value`)} className={styles.input} maxLength={30} placeholder="30%" aria-invalid={Boolean(errors.stats?.[index]?.value)} /></label>
                    <label className={styles.label}>Label<input {...register(`stats.${index}.label`)} className={styles.input} maxLength={80} placeholder="Less energy used" aria-invalid={Boolean(errors.stats?.[index]?.label)} /></label>
                  </div>
                  {errors.stats?.[index]?.value && <p className={styles.error}>{errors.stats[index]?.value?.message}</p>}
                  {errors.stats?.[index]?.label && <p className={styles.error}>{errors.stats[index]?.label?.message}</p>}
                </div>)}
                <button type="button" onClick={() => stats.append({ value: '', label: '' })} disabled={stats.fields.length >= 4} className={styles.addButton}><Plus size={15} />Add metric<span>{stats.fields.length}/4</span></button>
              </div>
              <div className={styles.group}>
                <div className={styles.groupHeading}><span className={styles.step}>03</span><div><h4>Connected flow</h4><p>Optional steps linking the story together, like the About page ecosystem flow.</p></div></div>
                {flowSteps.fields.map((item, index) => <div key={item.id} className={styles.arrayItem}>
                  <div className={styles.itemHeading}><span>Step {index + 1}</span><button type="button" onClick={() => flowSteps.remove(index)} aria-label={`Remove flow step ${index + 1}`} className={styles.removeButton}><Trash2 size={15} /></button></div>
                  <label className={styles.label}>Step label<input {...register(`flowSteps.${index}.label`)} className={styles.input} maxLength={50} placeholder="Collect data" aria-invalid={Boolean(errors.flowSteps?.[index]?.label)} /></label>
                  {errors.flowSteps?.[index]?.label && <p className={styles.error}>{errors.flowSteps[index]?.label?.message}</p>}
                </div>)}
                <button type="button" onClick={() => flowSteps.append({ label: '' })} disabled={flowSteps.fields.length >= 6} className={styles.addButton}><Plus size={15} />Add flow step<span>{flowSteps.fields.length}/6</span></button>
              </div>
            </div>
          )}
        </fieldset>

        <div className={styles.previewPanel}>
          <div className={styles.previewBar}><div><span className={styles.previewDot} />Section preview</div><div className={styles.viewportButtons} aria-label="Preview width"><button type="button" aria-label="Wide preview" aria-pressed={previewWidth === 'wide'} onClick={() => setPreviewWidth('wide')}><Monitor size={16} /></button><button type="button" aria-label="Mobile preview" aria-pressed={previewWidth === 'mobile'} onClick={() => setPreviewWidth('mobile')}><Smartphone size={16} /></button></div></div>
          <div className={styles.previewCanvas} data-width={previewWidth}><div className={styles.previewPage} inert><IntroSection content={preview} /></div></div>
        </div>
        <div className={styles.footer}><span className={styles.saveStatus}>{isDirty ? 'Unsaved changes' : 'Ready to edit'}</span><div><button type="button" onClick={onCancel} disabled={busy} className={styles.cancelButton}>Cancel</button><button type="submit" disabled={busy} className={styles.saveButton}>{busy ? 'Saving…' : 'Save introduction'}<ArrowRight size={16} /></button></div></div>
      </form>
    </FormProvider>
  );
}
