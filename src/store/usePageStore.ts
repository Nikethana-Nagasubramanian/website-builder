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

const STORAGE_KEY = "page-builder-state";

// Load initial state from localStorage
const loadState = (): { page: Block[]; selectedId: string | null } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { page: parsed.page || [], selectedId: null };
    }
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
  }
  return { page: [], selectedId: null };
};

// Save state to localStorage
const saveState = (page: Block[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ page }));
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
};

const initialState = loadState();

export const usePageStore = create<PageState>((set) => ({
  page: initialState.page,
  selectedId: initialState.selectedId,

  addBlock: (type: string) =>
    set((state) => {
      const newPage = [
        ...state.page,
        { id: nanoid(), type, props: DEFAULT_PROPS_MAP[type] || {} },
      ];
      saveState(newPage);
      return { page: newPage };
    }),

  updateBlock: (id, props) =>
    set((state) => {
      const newPage = state.page.map((block) =>
        block.id === id ? { ...block, props: { ...block.props, ...props } } : block
      );
      saveState(newPage);
      return { page: newPage };
    }),

  selectBlock: (id) => set({ selectedId: id }),

  deleteBlock: (id) =>
    set((state) => {
      const newPage = state.page.filter((block) => block.id !== id);
      saveState(newPage);
      return { page: newPage, selectedId: null };
    }),

  reorderBlocks: (newOrder) => {
    saveState(newOrder);
    set({ page: newOrder });
  },
}));

// Listen for storage changes to sync across tabs
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        usePageStore.setState({ page: parsed.page || [], selectedId: null });
      } catch (error) {
        console.error("Failed to sync state from storage:", error);
      }
    }
  });
}
