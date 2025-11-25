import { create } from "zustand";
import { nanoid } from "nanoid";
import { DEFAULT_PROPS_MAP } from "../components/rendered-blocks/blockDefinitions";

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

// Load initial state from localStorage - mimics auth flow
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

const saveState = (page: Block[], globalStyles: GlobalStyles) => {
  try {
    const dataToSave = JSON.stringify({ page, globalStyles });
    const dataSize = new Blob([dataToSave]).size;
    const dataSizeMB = (dataSize / 1024 / 1024).toFixed(2);
    
    console.log(`Saving to localStorage - Size: ${dataSizeMB}MB`);
    
    // Check localStorage quota before saving
    try {
      const testKey = '__quota_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
    } catch (e) {
      console.error("localStorage quota may be full:", e);
      // Don't alert here as it might be too frequent - let the actual save attempt handle it
    }
    
    localStorage.setItem(STORAGE_KEY, dataToSave);
    console.log("Successfully saved to localStorage");
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
    if (error instanceof DOMException) {
      if (error.code === 22 || error.name === 'QuotaExceededError') {
        const errorMessage = "Storage quota exceeded! The image is too large. Please use a smaller image or remove other content.";
        console.error(errorMessage);
        // Use setTimeout to avoid blocking the UI thread
        setTimeout(() => {
          alert(errorMessage);
        }, 100);
      } else {
        console.error(`Storage error: ${error.message}`);
      }
    }
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
      const newPage = state.page.map((block) => {
        if (block.id === id) {
          // For features array, we need to replace it entirely, not merge
          const updatedProps = { ...block.props };
          if (props.features) {
            updatedProps.features = props.features;
          }
          // Merge other props
          Object.keys(props).forEach(key => {
            if (key !== 'features') {
              updatedProps[key] = props[key];
            }
          });
          return { ...block, props: updatedProps };
        }
        return block;
      });
      saveState(newPage, state.globalStyles);
      return { page: newPage };
    }),

  selectBlock: (id) => set({ selectedId: id }),

  deleteBlock: (id) => {
    let newPage: Block[];
    let globalStyles: GlobalStyles;
    
    set((state) => {
      newPage = state.page.filter((block) => block.id !== id);
      globalStyles = state.globalStyles;
      return { page: newPage, selectedId: null };
    });
    
    // Save after state is updated
    saveState(newPage!, globalStyles!);
  },

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
