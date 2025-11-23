import { create } from "zustand";
import { nanoid } from "nanoid";

export type Block = {
  id: string;
  type: string;
  props: any;
};

type PageState = {
  page: Block[];
  selectedId: string | null;
  addBlock: (type: string) => void;
  updateBlock: (id: string, props: any) => void;
  selectBlock: (id: string | null) => void;
  deleteBlock: (id: string) => void;
};

export const usePageStore = create<PageState>((set) => ({
  page: [],
  selectedId: null,

  addBlock: (type: string) =>
    set((state) => {
      const defaultPropsMap: Record<string, any> = {
        text: {
          text: "Gradial is a great tool and has saved us a lot of time and money.",
          customerName: "Daniel O'Connell",
          company: "Alpha Systems",
          position: "VP of Engineering",
        },
        featureCard: {
          title: "Brand Compliance & QA",
          description: "Enforce brand, SEO, and accessibility standards across every page, then automatically flag and fix issues so teams maintain consistent, high-quality experiences at scale",
          imageUrl: "https://via.placeholder.com/256x192",
        },
        heroSection: {
          title: "Welcome to our website",
          description: "This is a description of our website",
          bgImage: "https://via.placeholder.com/1920x1080",
          textColor: "text-white",
          padding: "8",
          spacing: "4",
          textAlign: "center",
        }
      }

      return {
        page: [
          ...state.page,
          { id: nanoid(), type, props: defaultPropsMap[type] || {} },
        ],
      };
    }),

  updateBlock: (id, props) =>
    set((state) => ({
      page: state.page.map((block) =>
        block.id === id ? { ...block, props: { ...block.props, ...props } } : block
      ),
    })),

  selectBlock: (id) => set({ selectedId: id }),

  deleteBlock: (id) =>
    set((state) => ({
      page: state.page.filter((block) => block.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),
}));
