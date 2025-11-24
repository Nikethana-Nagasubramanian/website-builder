import { Canvas } from "./components/Canvas";
import { Inspector } from "./components/Inspector";
import { LeftSidebar } from "./components/LeftSidebar";

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <LeftSidebar />
      <Canvas />
      <Inspector />
    </div>
  );
}

export default App;