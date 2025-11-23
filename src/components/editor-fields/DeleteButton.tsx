import { usePageStore } from "../../store/usePageStore";

type DeleteButtonProps = {
  block: { id: string };
  label: string;
};

export function DeleteButton({ block, label }: DeleteButtonProps) {
  const deleteBlock = usePageStore((s) => s.deleteBlock);
  const selectBlock = usePageStore((s) => s.selectBlock);

  const handleDelete = () => {
    deleteBlock(block.id);
    selectBlock(null);
  };

  return (
    <div className="pt-4 border-t border-gray-200">
      <button
        onClick={handleDelete}
        className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 font-medium transition-colors"
        aria-label={`Delete ${label.toLowerCase()}`}
      >
        {label}
      </button>
    </div>
  );
}

