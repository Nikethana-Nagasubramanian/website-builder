import { usePageStore } from "../store/usePageStore";

export function TextBlockEditor({ block }: { block: any }) {
  const updateBlock = usePageStore((s) => s.updateBlock);
  const deleteBlock = usePageStore((s) => s.deleteBlock);
  const selectBlock = usePageStore((s) => s.selectBlock);

  const handleDelete = () => {
    deleteBlock(block.id);
    selectBlock(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="text-content-input" className="block text-sm font-medium text-gray-700 mb-2">
          Text Content
        </label>
        <textarea
          id="text-content-input"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
          value={block.props.text}
          onChange={(e) => updateBlock(block.id, { text: e.target.value })}
          aria-describedby="text-content-description"
        />
        <span id="text-content-description" className="sr-only">Enter the testimonial text content</span>
      </div>
      <div>
        <label htmlFor="customer-name-input" className="block text-sm font-medium text-gray-700 mb-2">
          Customer Name
        </label>
        <input
          id="customer-name-input"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={block.props.customerName || ""}
          onChange={(e) => updateBlock(block.id, { customerName: e.target.value })}
          placeholder="Customer name..."
          aria-describedby="customer-name-description"
        />
        <span id="customer-name-description" className="sr-only">Enter the customer's name for the testimonial</span>
      </div>

      <div>
        <label htmlFor="company-input" className="block text-sm font-medium text-gray-700 mb-2">
          Company & Position
        </label>
        <input
          id="company-input"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
          value={block.props.company || ""}
          onChange={(e) => updateBlock(block.id, { company: e.target.value })}
          placeholder="Company name..."
          aria-describedby="company-description"
        />
        <span id="company-description" className="sr-only">Enter the company name</span>
        <input
          id="position-input"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={block.props.position || ""}
          onChange={(e) => updateBlock(block.id, { position: e.target.value })}
          placeholder="Position..."
          aria-describedby="position-description"
        />
        <span id="position-description" className="sr-only">Enter the customer's position or job title</span>
      </div>
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={handleDelete}
          className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-2 font-medium transition-colors"
          aria-label="Delete text block"
        >
          Delete Text Block
        </button>
      </div>
    </div>
  );
}