import { usePageStore } from "../store/usePageStore";
import { Sparkle } from "@phosphor-icons/react";
import { BLOCK_EDITOR_REGISTRY } from "./rendered-blocks/blockDefinitions";

export function EditBlocksPanel() {
  const { page, selectedId } = usePageStore();
  const block = page.find((b) => b.id === selectedId);

  return (
    <div className="w-80 bg-white rounded-[6px] shadow-md overflow-hidden flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-6">Edit Block</h2>
        {!block ? (
          <div className="text-center py-12 text-gray-400">
            <Sparkle className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-sm font-medium">Select a block to edit its properties</p>
          </div>
        ) : (
          (() => {
            const Editor = BLOCK_EDITOR_REGISTRY[block.type];
            if (!Editor) {
              return (
                <p className="text-sm text-gray-500 italic">No editor found for this block type.</p>
              );
            }
            return <Editor block={block} />;
          })()
        )}
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100 flex-shrink-0">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Keyboard Shortcuts</div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium">Delete block</span>
            <kbd className="px-1.5 py-1 bg-white border border-gray-200 rounded text-gray-700 font-sans shadow-sm text-[10px] font-bold min-w-[32px] text-center">Del</kbd>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium">Undo action</span>
            <kbd className="px-1.5 py-1 bg-white border border-gray-200 rounded text-gray-700 font-sans shadow-sm text-[10px] font-bold min-w-[32px] text-center">⌘ Z</kbd>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium">Redo action</span>
            <kbd className="px-1.5 py-1 bg-white border border-gray-200 rounded text-gray-700 font-sans shadow-sm text-[10px] font-bold min-w-[32px] text-center">⌘ ⇧ Z</kbd>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium">Reorder block</span>
            <span className="text-[10px] text-gray-400 font-medium italic">Drag handle</span>
          </div>
        </div>
      </div>
    </div>
  );
}