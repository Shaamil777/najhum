import { notFound } from 'next/navigation';
import LocalBuilderPreview from '@/components/admin/builder/LocalBuilderPreview';

export const dynamic = 'force-dynamic';
export default function PreviewBuilderPage() {
  if (process.env.NODE_ENV !== 'development' || process.env.BUILDER_LOCAL_PREVIEW !== '1') notFound();
  return <LocalBuilderPreview />;
}
