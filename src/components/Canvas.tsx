import { useEffect, useRef, useState } from "react";
import { usePageStore } from "../store/usePageStore";
import { BLOCKS } from "./rendered-blocks/blockDefinitions";
import { DndContext, closestCorners, DragOverlay, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { 
  SortableContext, 
  verticalListSortingStrategy, 
  useSortable 
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DotsSixVertical } from "@phosphor-icons/react";

type SortableBlockWrapperProps = {
  block: { id: string; type: string; props: any };
  isLast: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  lastBlockRef: React.RefObject<HTMLDivElement | null>;
};

function SortableBlockWrapper({ 
  block, 
  isLast, 
  selectedId, 
  onSelect,
  lastBlockRef 
}: SortableBlockWrapperProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition, // Disable transition when dragging for smoother feel
    opacity: isDragging ? 0.3 : 1,
  };

  const Comp = BLOCKS[block.type];

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (isLast && lastBlockRef && node) {
          lastBlockRef.current = node;
        }
      }}
      style={style}
      onClick={() => onSelect(block.id)}
      role="button"
      tabIndex={0}
      aria-label={`${block.type} block${
        block.id === selectedId ? ", selected" : ""
      }`}
      aria-selected={block.id === selectedId}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(block.id);
        }
      }}
      className={`relative group mb-4 transition-colors ${
        block.id === selectedId 
          ? "ring-2 ring-blue-500 ring-offset-2" 
          : "hover:bg-gray-50/50"
      }`}
    >
      {/* Always render content to preserve height during drag */}
      <Comp {...block.props} />
      {/* Drag handle - appears on hover, hidden when dragging */}
      {!isDragging && (
        <div
          {...attributes}
          {...listeners}
          className="absolute -right-3 top-4 z-50
        flex h-8 w-6 cursor-grab items-center justify-center 
        rounded-r-md bg-gray-200 text-white shadow-md
        opacity-0 group-hover:opacity-100 transition-opacity
        active:cursor-grabbing"
          aria-label="Drag to reorder"
          onClick={(e) => e.stopPropagation()}
        >
          <DotsSixVertical size={20} weight="bold" className="text-gray-700 hover:text-gray-900" />
        </div>
      )}
    </div>
  );
}

export function Canvas() {
  const page = usePageStore((s) => s.page);
  const selectBlock = usePageStore((s) => s.selectBlock);
  const selectedId = usePageStore((s) => s.selectedId);
  const deleteBlock = usePageStore((s) => s.deleteBlock);
  const reorderBlocks = usePageStore((s) => s.reorderBlocks);
  const fontFamily = usePageStore((s) => s.globalStyles.fontFamily);
  
  const lastBlockRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Configure sensors for better drag experience
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px of movement before drag starts
      },
    })
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        deleteBlock(selectedId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, deleteBlock]);

  useEffect(() => {
    console.log("scrolling to last block");
    if (!lastBlockRef.current) return;
    lastBlockRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  }, [page.length]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);
    
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = page.findIndex((block) => block.id === active.id);
    const newIndex = page.findIndex((block) => block.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newOrder = [...page];
      const [movedItem] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, movedItem);
      reorderBlocks(newOrder);
    }
  };

  const activeBlock = activeId ? page.find((b) => b.id === activeId) : null;
  const ActiveBlockComponent = activeBlock ? BLOCKS[activeBlock.type] : null;

  return (
    <div
      className="flex-1 overflow-y-auto p-5 bg-[#F0F1F1]"
      role="main"
      aria-label="Canvas area"
      style={{ fontFamily }}
    >
      <div className="bg-white min-h-full shadow-md rounded-sm p-4">
        {page.length === 0 ? (
          <div className="text-center py-12 text-gray-500" aria-live="polite">
            <p>No blocks added yet. Use the sidebar to add blocks.</p>
          </div>
        ) : (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCorners} 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={page.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div role="list" aria-label="Page blocks">
                {page.map((block, index) => {
                  const isLast = index === page.length - 1;

                  return (
                    <div key={block.id} data-id={block.id}>
                      <SortableBlockWrapper
                        block={block}
                        isLast={isLast}
                        selectedId={selectedId}
                        onSelect={selectBlock}
                        lastBlockRef={lastBlockRef}
                      />
                    </div>
                  );
                })}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeBlock && ActiveBlockComponent && (
                <div 
                  className="opacity-90 rotate-2 shadow-2xl"
                  style={{ 
                    width: '100%',
                    minWidth: '400px',
                    maxWidth: '100%'
                  }}
                >
                  <ActiveBlockComponent {...activeBlock.props} />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  );
}