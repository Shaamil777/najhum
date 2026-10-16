import type { Metadata } from "next";
import LegalPage from "@/components/shared/legal/LegalPage";
import { termsAndConditions } from "@/content/legal";

export const metadata: Metadata = { title: "Terms & Conditions", description: "Terms & Conditions for the Najhum Technologies LLC website.", alternates: { canonical: "/terms-and-conditions" } };

export default function Page() { return <LegalPage document={termsAndConditions} />; }
