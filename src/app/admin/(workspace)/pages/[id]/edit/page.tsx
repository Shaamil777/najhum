import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function EditPageServer() {
  redirect('/admin/dashboard');
}
