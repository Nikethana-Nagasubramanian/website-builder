import { create } from "zustand";
import { nanoid } from "nanoid";
import { DEFAULT_PROPS_MAP } from "../blocks/blockDefinitions";

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
  reorderBlocks: (newOrder: Block[]) => void;
};

export const usePageStore = create<PageState>((set) => ({
  page: [],
  selectedId: null,

  addBlock: (type: string) =>
    set((state) => {
      return {
        page: [
          ...state.page,
          { id: nanoid(), type, props: DEFAULT_PROPS_MAP[type] || {} },
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
      selectedId: null,
    })),

  reorderBlocks: (newOrder) => set({ page: newOrder }),
}));
