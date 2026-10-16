import LegalPage from "@/components/shared/legal/LegalPage";
import { termsAndConditions } from "@/content/legal";
import { pageSeo } from "@/content/page-seo";
import { buildMetadata, pageSchema } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export const metadata = buildMetadata(pageSeo.terms);
export default function Page() { return <><StructuredData data={pageSchema(pageSeo.terms,termsAndConditions.sections.map((section,index)=>({id:`section-${index+1}`,name:section.title})))} /><LegalPage document={termsAndConditions} /></>; }
