import { CategoriesSection } from "./_sections/categories-section";
import { CertificationsSection } from "./_sections/certifications-section";
import { EnquiryTeaserSection } from "./_sections/enquiry-teaser-section";
import { HeroSection } from "./_sections/hero-section";
import { PillarsSection } from "./_sections/pillars-section";
import { ProcessSection } from "./_sections/process-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <CategoriesSection />
      <ProcessSection />
      <CertificationsSection />
      <EnquiryTeaserSection />
    </>
  );
}
