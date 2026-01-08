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

type StateSnapshot = {
  page: Block[];
  globalStyles: GlobalStyles;
};

type HistoryState = {
  past: StateSnapshot[];
  present: StateSnapshot;
  future: StateSnapshot[];
};

const MAX_HISTORY_SIZE = 50;

type PageState = {
  page: Block[];
  selectedId: string | null;
  globalStyles: GlobalStyles;
  history: HistoryState;
  addBlock: (type: string) => void;
  updateBlock: (id: string, props: any) => void;
  selectBlock: (id: string | null) => void;
  deleteBlock: (id: string) => void;
  reorderBlocks: (newOrder: Block[]) => void;
  setFontFamily: (fontFamily: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ page, globalStyles }));
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
    if (error instanceof DOMException) {
      if (error.code === 22 || error.name === 'QuotaExceededError') {
        const errorMessage = "Storage quota exceeded! The image is too large. Please use a smaller image or remove other content.";
        console.error(errorMessage);
        setTimeout(() => {
          alert(errorMessage);
        }, 100);
      }
    }
  }
};

const initialState = loadState();

// Helper function to create a state snapshot
const createSnapshot = (page: Block[], globalStyles: GlobalStyles): StateSnapshot => ({
  page: JSON.parse(JSON.stringify(page)), // Deep clone
  globalStyles: JSON.parse(JSON.stringify(globalStyles)), // Deep clone
});

// Helper function to apply a snapshot to state
const applySnapshot = (snapshot: StateSnapshot) => {
  return {
    page: snapshot.page,
    globalStyles: snapshot.globalStyles,
  };
};

// Helper to push current state to history before mutation
const pushToHistory = (
  currentPage: Block[],
  currentGlobalStyles: GlobalStyles,
  currentHistory: HistoryState
): HistoryState => {
  const currentSnapshot = createSnapshot(currentPage, currentGlobalStyles);
  const { past, present } = currentHistory;
  
  // Add current present to past (limit size)
  const newPast = [...past, present];
  if (newPast.length > MAX_HISTORY_SIZE) {
    newPast.shift(); // Remove oldest entry
  }
  
  return {
    past: newPast,
    present: currentSnapshot,
    future: [], // Clear future on new action
  };
};

// Initialize history with current state
const initialSnapshot = createSnapshot(initialState.page, initialState.globalStyles);
const initialHistory: HistoryState = {
  past: [],
  present: initialSnapshot,
  future: [],
};

// Debounce utility for history updates - ensures only one history entry per typing session
// This prevents creating a separate undo state for each keystroke (e.g., "Hello" = 1 undo, not 5)
let historyDebounceTimer: ReturnType<typeof setTimeout> | null = null;
// Store the state snapshot BEFORE the first update in a typing session
let pendingHistorySnapshot: StateSnapshot | null = null;

const debounceHistoryUpdate = (beforeSnapshot: StateSnapshot, callback: () => void, delay: number = 800) => {
  // On the first update in a typing session, capture the "before" state
  if (pendingHistorySnapshot === null) {
    pendingHistorySnapshot = beforeSnapshot;
  }
  
  // Clear any existing timer - this resets the countdown on each keystroke
  if (historyDebounceTimer) {
    clearTimeout(historyDebounceTimer);
  }
  
  // Start a new timer - only executes after delay ms of no typing
  historyDebounceTimer = setTimeout(() => {
    callback();
    historyDebounceTimer = null;
    pendingHistorySnapshot = null; // Reset after saving
  }, delay);
};

// Flush any pending history update (used when non-debounced actions occur)
const flushPendingHistoryUpdate = (getState: () => PageState) => {
  if (historyDebounceTimer) {
    clearTimeout(historyDebounceTimer);
    historyDebounceTimer = null;
    
    // If there's a pending snapshot, save it to history now
    if (pendingHistorySnapshot) {
      const currentState = getState();
      const { past, present } = currentState.history;
      
      const newPast = [...past, present];
      if (newPast.length > MAX_HISTORY_SIZE) {
        newPast.shift();
      }
      
      const finalSnapshot = createSnapshot(currentState.page, currentState.globalStyles);
      const finalHistory: HistoryState = {
        past: newPast,
        present: finalSnapshot,
        future: [],
      };
      
      usePageStore.setState({ history: finalHistory });
      saveState(currentState.page, currentState.globalStyles);
      
      pendingHistorySnapshot = null;
    }
  }
};

export const usePageStore = create<PageState>((set, get) => ({
  page: initialState.page,
  selectedId: initialState.selectedId,
  globalStyles: initialState.globalStyles,
  history: initialHistory,

  addBlock: (type: string) => {
    // Flush any pending history updates from typing
    flushPendingHistoryUpdate(get);
    
    const state = get();
    const newHistory = pushToHistory(state.page, state.globalStyles, state.history);
    
    set((currentState) => {
      const newPage = [
        ...currentState.page,
        { id: nanoid(), type, props: DEFAULT_PROPS_MAP[type] || {} },
      ];
      saveState(newPage, currentState.globalStyles);
      return { 
        page: newPage,
        history: newHistory,
      };
    });
  },

  updateBlock: (id, props) => {
    const state = get();
    // Capture the state BEFORE the update for history (only on first update in typing session)
    // If there's already a pending snapshot, reuse it (same typing session)
    const beforeSnapshot = pendingHistorySnapshot || createSnapshot(state.page, state.globalStyles);
    
    // 1. First, update the state immediately so the UI is fast
    set((currentState) => {
      const newPage = currentState.page.map((block) => {
        if (block.id === id) {
          return { ...block, props: { ...block.props, ...props } };
        }
        return block;
      });
      
      // 2. DEBOUNCE the history snapshot - only save after user stops typing
      // This ensures "Hello" is one undo action, not 5 separate ones
      // We capture the "before" state on the first update, then save it after debounce
      debounceHistoryUpdate(beforeSnapshot, () => {
        const currentState = get();
        const { past, present } = currentState.history;
        
        // Build new history:
        // - Move current present to past (this preserves the state before any updates)
        // - Current state (after all updates) becomes the new present
        const newPast = [...past, present];
        if (newPast.length > MAX_HISTORY_SIZE) {
          newPast.shift();
        }
        
        const finalSnapshot = createSnapshot(currentState.page, currentState.globalStyles);
        const finalHistory: HistoryState = {
          past: newPast,
          present: finalSnapshot, // Current state after all updates
          future: [], // Clear future on new action
        };
        
        set({ history: finalHistory });
        saveState(currentState.page, currentState.globalStyles);
      }, 800); // Wait 800ms of silence before saving to history
  
      return { page: newPage };
    });
  },

  selectBlock: (id) => set({ selectedId: id }),

  deleteBlock: (id) => {
    // Flush any pending history updates from typing
    flushPendingHistoryUpdate(get);
    
    const state = get();
    const newHistory = pushToHistory(state.page, state.globalStyles, state.history);
    
    let newPage: Block[];
    let globalStyles: GlobalStyles;
    
    set((currentState) => {
      newPage = currentState.page.filter((block) => block.id !== id);
      globalStyles = currentState.globalStyles;
      return { 
        page: newPage, 
        selectedId: null,
        history: newHistory,
      };
    });
    
    saveState(newPage!, globalStyles!);
  },

  reorderBlocks: (newOrder) => {
    // Flush any pending history updates from typing
    flushPendingHistoryUpdate(get);
    
    const state = get();
    const newHistory = pushToHistory(state.page, state.globalStyles, state.history);
    
    saveState(newOrder, state.globalStyles);
    set({ 
      page: newOrder,
      history: newHistory,
    });
  },

  setFontFamily: (fontFamily) => {
    // Flush any pending history updates from typing
    flushPendingHistoryUpdate(get);
    
    const state = get();
    const newHistory = pushToHistory(state.page, state.globalStyles, state.history);
    
    set((currentState) => {
      const updatedStyles = { ...currentState.globalStyles, fontFamily };
      saveState(currentState.page, updatedStyles);
      return { 
        globalStyles: updatedStyles,
        history: newHistory,
      };
    });
  },

  undo: () => {
    const state = get();
    const { past, present, future } = state.history;
    
    if (past.length === 0) return; // Nothing to undo
    
    // Move present to future
    const newFuture = [present, ...future];
    // Pop from past
    const previousSnapshot = past[past.length - 1];
    const newPast = past.slice(0, -1);
    
    const newHistory: HistoryState = {
      past: newPast,
      present: previousSnapshot,
      future: newFuture,
    };
    
    const newState = applySnapshot(previousSnapshot);
    saveState(newState.page, newState.globalStyles);
    
    set({
      ...newState,
      selectedId: null, // Clear selection on undo
      history: newHistory,
    });
  },

  redo: () => {
    const state = get();
    const { past, present, future } = state.history;
    
    if (future.length === 0) return; // Nothing to redo
    
    // Move present to past
    const newPast = [...past, present];
    // Pop from future
    const nextSnapshot = future[0];
    const newFuture = future.slice(1);
    
    const newHistory: HistoryState = {
      past: newPast,
      present: nextSnapshot,
      future: newFuture,
    };
    
    const newState = applySnapshot(nextSnapshot);
    saveState(newState.page, newState.globalStyles);
    
    set({
      ...newState,
      selectedId: null, // Clear selection on redo
      history: newHistory,
    });
  },

  canUndo: () => {
    return get().history.past.length > 0;
  },

  canRedo: () => {
    return get().history.future.length > 0;
  },
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
