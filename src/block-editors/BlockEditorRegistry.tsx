import { TextBlockEditor } from "./TextBlockEditor";
import { FeatureCardBlockEditor } from "./FeatureCardBlockEditor";
import { HeroSectionBlockEditor } from "./hero-section/HeroSectionBlockEditor";

export const BLOCK_EDITOR_REGISTRY: Record<string, any> = {
  text: TextBlockEditor,
  featureCard: FeatureCardBlockEditor,
  heroSection: HeroSectionBlockEditor,
};
