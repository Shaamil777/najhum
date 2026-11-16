import { redirect } from 'next/navigation';
export default async function Preview({params}:{params:Promise<{id:string}>}){redirect(`/admin/solutions/${(await params).id}/edit`);}
