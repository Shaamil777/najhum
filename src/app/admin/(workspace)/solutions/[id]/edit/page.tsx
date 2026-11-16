import { notFound } from 'next/navigation';
import ImportEditor from '@/components/admin/solution-import/ImportEditor';
import { getImportSession } from '@/lib/solution-import/server';
export const dynamic='force-dynamic';
export const metadata={title:'Edit HTML solution | Admin'};
export default async function Edit({params}:{params:Promise<{id:string}>}){const session=await getImportSession((await params).id);if(!session)notFound();return <ImportEditor initialSession={session}/>;}
