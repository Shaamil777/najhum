import {redirect} from 'next/navigation';
export default async function PreviewProject({params}:{params:Promise<{id:string}>}){redirect(`/api/admin/portfolio/${(await params).id}/preview`);}
