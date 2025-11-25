import { create } from "zustand";
import { nanoid } from "nanoid";
import { DEFAULT_PROPS_MAP } from "../blocks/blockDefinitions";

export type Block = {
  id: string;
  type: string;
  props: any;
};

type GlobalStyles = {
  fontFamily: string;
};

type PageState = {
  page: Block[];
  selectedId: string | null;
  globalStyles: GlobalStyles;
  addBlock: (type: string) => void;
  updateBlock: (id: string, props: any) => void;
  selectBlock: (id: string | null) => void;
  deleteBlock: (id: string) => void;
  reorderBlocks: (newOrder: Block[]) => void;
  setFontFamily: (fontFamily: string) => void;
};

const STORAGE_KEY = "page-builder-state";
const DEFAULT_GLOBAL_STYLES: GlobalStyles = {
  fontFamily: "'Inter', sans-serif",
};

// Load initial state from localStorage
const loadState = (): { page: Block[]; selectedId: string | null; globalStyles: GlobalStyles } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        page: parsed.page || [],
        selectedId: null,
        globalStyles: parsed.globalStyles || DEFAULT_GLOBAL_STYLES,
      };
    }
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
  }
  return { page: [], selectedId: null, globalStyles: DEFAULT_GLOBAL_STYLES };
};

// Save state to localStorage
const saveState = (page: Block[], globalStyles: GlobalStyles) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ page, globalStyles }));
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
};

const initialState = loadState();

export const usePageStore = create<PageState>((set, get) => ({
  page: initialState.page,
  selectedId: initialState.selectedId,
  globalStyles: initialState.globalStyles,

  addBlock: (type: string) =>
    set((state) => {
      const newPage = [
        ...state.page,
        { id: nanoid(), type, props: DEFAULT_PROPS_MAP[type] || {} },
      ];
      saveState(newPage, state.globalStyles);
      return { page: newPage };
    }),

  updateBlock: (id, props) =>
    set((state) => {
      const newPage = state.page.map((block) =>
        block.id === id ? { ...block, props: { ...block.props, ...props } } : block
      );
      saveState(newPage, state.globalStyles);
      return { page: newPage };
    }),

  selectBlock: (id) => set({ selectedId: id }),

  deleteBlock: (id) =>
    set((state) => {
      const newPage = state.page.filter((block) => block.id !== id);
      saveState(newPage, state.globalStyles);
      return { page: newPage, selectedId: null };
    }),

  reorderBlocks: (newOrder) => {
    saveState(newOrder, get().globalStyles);
    set({ page: newOrder });
  },

  setFontFamily: (fontFamily) =>
    set((state) => {
      const updatedStyles = { ...state.globalStyles, fontFamily };
      saveState(state.page, updatedStyles);
      return { globalStyles: updatedStyles };
    }),
}));

// Listen for storage changes to sync across tabs
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        usePageStore.setState({
          page: parsed.page || [],
          selectedId: null,
          globalStyles: parsed.globalStyles || DEFAULT_GLOBAL_STYLES,
        });
      } catch (error) {
        console.error("Failed to sync state from storage:", error);
      }
    }
  });
}
