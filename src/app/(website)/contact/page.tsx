import ContactHero from "@/components/sections/contact/ContactHero";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactAddress from "@/components/sections/contact/ContactAddress";
import ContactExplore from "@/components/sections/contact/ContactExplore";
import ContactFaq from "@/components/sections/contact/ContactFaq";
import ContactCta from "@/components/sections/contact/ContactCta";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <ContactHero />
      <ContactForm />
      <ContactAddress />
      <ContactExplore />
      <ContactFaq />
      <ContactCta />
    </div>
  );
}