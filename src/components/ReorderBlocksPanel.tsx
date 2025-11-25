import { usePageStore } from "../store/usePageStore";
import { DndContext, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { 
  SortableContext, 
  verticalListSortingStrategy, 
  useSortable 
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BLOCKS } from "./rendered-blocks/BlockRegistry";
import { DotsSixVertical } from "phosphor-react";

type SortableBlockItemProps = {
  block: { id: string; type: string; props: any };
};

function SortableBlockItem({ block }: SortableBlockItemProps) {
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
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Comp = BLOCKS[block.type];
  const blockTypeNames: Record<string, string> = {
    testimonialSection: "Testimonial",
    featureCard: "Feature Card",
    heroSection: "Hero Section",
    navBar: "Navigation Bar",
    footer: "Footer",
  };

  // Don't render the actual NavBar component in preview - it's fixed positioned
  const shouldRenderComponent = block.type !== "navBar";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-2 p-3 bg-white border border-gray-200 rounded-lg flex items-center gap-3 ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        aria-label="Drag to reorder"
      >
        <DotsSixVertical size={20} weight="bold" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900">
          {blockTypeNames[block.type] || block.type}
        </div>
        <div className="text-xs text-gray-500 truncate">
          {block.props.title || block.props.text?.substring(0, 50) || block.props.logo || "No content"}
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200 overflow-hidden flex items-center justify-center">
          {shouldRenderComponent && Comp ? (
            <Comp {...block.props} />
          ) : (
            <div className="text-xs text-gray-400">NavBar</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ReorderBlocksPanel() {
  const { page, reorderBlocks } = usePageStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
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

  if (page.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-sm">No blocks to reorder. Add blocks first.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Drag blocks to reorder
      </h3>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={page.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {page.map((block) => (
              <SortableBlockItem key={block.id} block={block} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}