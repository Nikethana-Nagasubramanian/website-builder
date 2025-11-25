import { usePageStore } from "../store/usePageStore";
import { BLOCKS } from "./rendered-blocks/BlockRegistry";

export function Canvas() {
  const page = usePageStore((s) => s.page);
  const selectBlock = usePageStore((s) => s.selectBlock);
  const selectedId = usePageStore((s) => s.selectedId);
  const fontFamily = usePageStore((s) => s.globalStyles.fontFamily);

  return (
    <div
      className="flex-1 overflow-y-auto p-6 bg-white"
      role="main"
      aria-label="Canvas area"
      style={{ fontFamily }}
    >
      {page.length === 0 ? (
        <div className="text-center py-12 text-gray-500" aria-live="polite">
          <p>No blocks added yet. Use the sidebar to add blocks.</p>
        </div>
      ) : (
        <div role="list" aria-label="Page blocks">
          {page.map((block) => {
            const Comp = BLOCKS[block.type];
            return (
              <div
                key={block.id}
                onClick={() => selectBlock(block.id)}
                role="button"
                tabIndex={0}
                aria-label={`${block.type} block${block.id === selectedId ? ", selected" : ""}`}
                aria-selected={block.id === selectedId}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectBlock(block.id);
                  }
                }}
                className={`mb-4 ${block.id === selectedId ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
              >
                <Comp {...block.props} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}