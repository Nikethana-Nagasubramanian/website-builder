import { Canvas } from "./components/Canvas";
import { Panel } from "./components/Panel";

function App() {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Canvas />
      <Panel />
    </div>
  );
}

export default App;