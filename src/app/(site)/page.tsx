import { CategoriesSection } from "./_sections/categories-section";
import { HeroSection } from "./_sections/hero-section";
import { JoinSection } from "./_sections/join-section";
import { ProcessSection } from "./_sections/process-section";
import { PurposeSection } from "./_sections/purpose-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PurposeSection />
      <CategoriesSection />
      <ProcessSection />
      <JoinSection />
    </>
  );
}
