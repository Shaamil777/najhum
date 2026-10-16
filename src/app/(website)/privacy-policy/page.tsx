import type { Metadata } from "next";
import LegalPage from "@/components/shared/legal/LegalPage";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy Policy for the Najhum Technologies LLC website.", alternates: { canonical: "/privacy-policy" } };

export default function Page() { return <LegalPage document={privacyPolicy} />; }
