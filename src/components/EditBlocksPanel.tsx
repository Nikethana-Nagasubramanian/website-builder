import { usePageStore } from "../store/usePageStore";
import { Sparkle } from "phosphor-react";
import { BLOCK_EDITOR_REGISTRY } from "./editor-blocks/BlockEditorRegistry";

export function EditBlocksPanel() {
  const { page, selectedId } = usePageStore();
  const block = page.find((b) => b.id === selectedId);

  return (
    <div className="w-80 border-l bg-white sticky top-0 h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Edit Block</h2>
        {!block ? (
          <div className="text-center py-12 text-gray-500">
            <Sparkle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No block selected</p>
          </div>
        ) : (
          (() => {
            const Editor = BLOCK_EDITOR_REGISTRY[block.type];
            if (!Editor) {
              return (
                <p className="text-sm text-gray-500">No editor found for this block type.</p>
              );
            }
            return <Editor block={block} />;
          })()
        )}
      </div>
    </div>
  );
}