import { Canvas } from "./components/Canvas";
import { Panel } from "./components/Panel";

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <Canvas />
      <Panel />
    </div>
  );
}

export default App;