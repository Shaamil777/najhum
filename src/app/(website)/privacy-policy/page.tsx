import LegalPage from "@/components/shared/legal/LegalPage";
import { privacyPolicy } from "@/content/legal";
import { pageSeo } from "@/content/page-seo";
import { buildMetadata, pageSchema } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export const metadata = buildMetadata(pageSeo.privacy);
export default function Page() { return <><StructuredData data={pageSchema(pageSeo.privacy,privacyPolicy.sections.map((section,index)=>({id:`section-${index+1}`,name:section.title})))} /><LegalPage document={privacyPolicy} /></>; }
