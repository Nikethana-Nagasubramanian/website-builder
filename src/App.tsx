import { Routes, Route } from "react-router-dom";
import { Canvas } from "./components/Canvas";
import { Inspector } from "./components/Inspector";
import { LeftSidebar } from "./components/LeftSidebar";
import { Preview } from "./components/Preview";

function Editor() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <LeftSidebar />
      <div className="flex-1 flex flex-col relative">
        <Canvas />
      </div>
      <Inspector />
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