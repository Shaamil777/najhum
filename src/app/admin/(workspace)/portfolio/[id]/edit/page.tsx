import {notFound} from 'next/navigation';
import ImportEditor from '@/components/admin/solution-import/ImportEditor';
import {getPortfolioImportSession} from '@/lib/portfolio/import-server';
export default async function EditProject({params}:{params:Promise<{id:string}>}){const session=await getPortfolioImportSession((await params).id);if(!session)notFound();return <ImportEditor kind="portfolio" initialSession={session}/>;}
