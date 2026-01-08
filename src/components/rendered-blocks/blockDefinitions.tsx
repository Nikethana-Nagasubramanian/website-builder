import { FeatureCardBlock } from "./FeatureCardBlock";
import { HeroSection } from "./HeroSection";
import { TestimonialSection } from "./TestimonialSection";
import { FeatureCardBlockEditor } from "../editor-blocks/FeatureCardBlockEditor";
import { HeroSectionBlockEditor } from "../editor-blocks/hero-section/HeroSectionBlockEditor";
import { TestimonialSectionEditor } from "../editor-blocks/TestimonialSectionEditor";
import { NavBarEditor } from "../editor-blocks/NavBarEditor";
import { FooterEditor } from "../editor-blocks/FooterEditor";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { Quotes, Cards, Star, Rectangle } from "@phosphor-icons/react";
import hero8 from "../../assets/background8.jpg";
import brandImage from "../../assets/brand-image.jpg";
import workflowImage from "../../assets/automation-image.jpg";
import performanceImage from "../../assets/performance-image.jpg";



export type BlockDefinition = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  editor: React.ComponentType<any>;
  defaultProps: any;
};

export const BLOCK_DEFINITIONS: Record<string, BlockDefinition> = {
  navBar: {
    id: "navBar",
    name: "Navigation Bar",
    description: "Add a navigation bar",
    icon: <Star className="w-5 h-5" weight="fill" />,
    component: NavBar,
    editor: NavBarEditor,
    defaultProps: {
      logo: "",
      links: [
        { label: "Features", url: "" },
        { label: "Testimonial", url: "" }
      ]
    }
  },
  heroSection: {
    id: "heroSection",
    name: "Hero Section",
    description: "Add a hero section",
    icon: <Star className="w-5 h-5" weight="fill" />,
    component: HeroSection,
    editor: HeroSectionBlockEditor,
    defaultProps: {
      title: "Welcome to our website",
      description: "This is a description of our website",
      bgImage: hero8,
      textColor: "text-black",
      padding: "8",
      spacing: "4",
      textAlign: "center",
      sectionHeight: "tall",
    },
  },
  featureCard: {
    id: "featureCard",
    name: "Feature Card",
    description: "Add a feature card element",
    icon: <Cards className="w-5 h-5" weight="fill" />,
    component: FeatureCardBlock,
    editor: FeatureCardBlockEditor,
    defaultProps: {
      features: [
        {
          title: "Brand Compliance & QA",
          description:
            "Enforce brand, SEO, and accessibility standards across every page, then automatically flag and fix issues so teams maintain consistent experiences.",
          imageUrl: brandImage,
          linkUrl: "#",
          linkText: "Learn more",
        },
        {
          title: "Workflow Automation",
          description: "Automate repetitive page updates with simple workflows that keep teams focused on high-impact work.",
          imageUrl: workflowImage,
          linkUrl: "#",
          linkText: "Read more",
        },
        {
          title: "Performance Insights",
          description: "Monitor conversion, accessibility, and SEO metrics for every page in real-time.",
          imageUrl: performanceImage,
          linkUrl: "#",
          linkText: "See insights",
        },
      ],
    },
  },
  testimonialSection: {
    id: "testimonialSection",
    name: "Testimonial Section",
    description: "Add a customer testimonial",
    icon: <Quotes className="w-5 h-5" weight="fill" />,
    component: TestimonialSection,
    editor: TestimonialSectionEditor,
    defaultProps: {
      text: "Cursor is a great tool and has saved us a lot of time and money.",
      customerName: "Daniel O'Connell",
      company: "Alpha Systems",
      position: "VP of Engineering",
    },
  },
  footer: {
    id: "footer",
    name: "Footer",
    description: "Add a footer",
    icon: <Rectangle className="w-5 h-5" weight="fill" />,
    component: Footer,
    editor: FooterEditor,
    defaultProps: {
      text: "© 2024 Nike | Page Builder Demo"
    }
  },
}

// Derive registries from definitions
export const BLOCKS = Object.fromEntries(
  Object.entries(BLOCK_DEFINITIONS).map(([key, def]) => [key, def.component])
);

export const BLOCK_EDITOR_REGISTRY = Object.fromEntries(
  Object.entries(BLOCK_DEFINITIONS).map(([key, def]) => [key, def.editor])
);

// Get block types for AddBlocksPanel
export const BLOCK_TYPES = Object.values(BLOCK_DEFINITIONS).map((def) => ({
  id: def.id,
  name: def.name,
  description: def.description,
  icon: def.icon,
}));

// Get default props map for store
export const DEFAULT_PROPS_MAP = Object.fromEntries(
  Object.entries(BLOCK_DEFINITIONS).map(([key, def]) => [key, def.defaultProps])
);

