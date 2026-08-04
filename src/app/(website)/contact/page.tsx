import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactAddress from "@/components/contact/ContactAddress";
import ContactExplore from "@/components/contact/ContactExplore";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactCta from "@/components/contact/ContactCta";

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