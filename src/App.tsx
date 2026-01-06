import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Canvas } from "./components/Canvas";
import { EditBlocksPanel } from "./components/EditBlocksPanel";
import { LeftPanel } from "./components/LeftPanel";
import { Preview } from "./components/Preview";
import { usePageStore } from "./store/usePageStore";
import "./App.css";

function Editor() {
  const undo = usePageStore((s) => s.undo);
  const redo = usePageStore((s) => s.redo);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      
      // Allow undo/redo in inputs for native behavior, but also support Ctrl+Shift+Z for redo
      if (e.ctrlKey || e.metaKey) {
        if (e.shiftKey && e.key === "Z") {
          // Ctrl+Shift+Z or Cmd+Shift+Z for redo
          e.preventDefault();
          redo();
        } else if (e.key === "z" && !isInput) {
          // Ctrl+Z or Cmd+Z for undo (only if not in input)
          e.preventDefault();
          undo();
        } else if (e.key === "y" && !isInput) {
          // Ctrl+Y or Cmd+Y for redo (only if not in input)
          e.preventDefault();
          redo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F0F1F1] p-2 gap-2">
      <LeftPanel />
      <div className="flex-1 flex flex-col relative overflow-hidden">
      <Canvas />
      </div>
      <EditBlocksPanel />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Editor />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
}

export default App;