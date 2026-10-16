import { buildMetadata, pageSchema } from "@/lib/seo";
import { pageSeo } from "@/content/page-seo";
import { pageSections } from "@/content/page-sections";
import StructuredData from "@/components/seo/StructuredData";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactAddress from "@/components/sections/contact/ContactAddress";
import ContactExplore from "@/components/sections/contact/ContactExplore";
import ContactFaq from "@/components/sections/contact/ContactFaq";

export const metadata = buildMetadata(pageSeo.contact);

export default function ContactPage() {
  return (
    <><StructuredData data={pageSchema(pageSeo.contact, pageSections.contact)} /><div className="flex flex-col w-full">
      <ContactHero />
      <ContactForm />
      <ContactAddress />
      <ContactExplore />
      <ContactFaq />
    </div></>
  );
}
