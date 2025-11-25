import { Routes, Route } from "react-router-dom";
import { Canvas } from "./components/Canvas";
import { EditBlocksPanel } from "./components/EditBlocksPanel";
import { LeftPanel } from "./components/LeftPanel";
import { Preview } from "./components/Preview";
import "./App.css";

function Editor() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <LeftPanel />
      <div className="flex-1 flex flex-col relative">
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