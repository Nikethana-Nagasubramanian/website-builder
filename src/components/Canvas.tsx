import { usePageStore } from "../store/usePageStore";
import { BLOCKS } from "../blocks/BlockRegistry";

export function Canvas() {
  const { page, selectBlock, selectedId } = usePageStore();

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {page.map((block) => {
        const Comp = BLOCKS[block.type];
        return (
          <div
            key={block.id}
            onClick={() => selectBlock(block.id)}
            className={`border mb-4 p-2 rounded ${
              block.id === selectedId ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <Comp {...block.props} />
          </div>
        );
      })}
    </div>
  );
}
