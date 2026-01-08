import { usePageStore } from "../../store/usePageStore";
import { TextField } from "../reusable-components/TextField";

export function TestimonialSectionEditor({ block }: { block: any }) {
  const updateBlock = usePageStore((s) => s.updateBlock);

  return (
    <div className="space-y-4">
        <TextField
          id="text-content-input"
          label="Text Content"
          value={block.props.text || ""}
          onChange={(value) => updateBlock(block.id, { text: value })}
          placeholder="Enter testimonial text content..."
          description="Enter the testimonial text content"
        />
        <TextField
          id="customer-name-input"
          label="Customer Name"
          value={block.props.customerName || ""}
          onChange={(value) => updateBlock(block.id, { customerName: value })}
          placeholder="Enter customer name..."
          description="Enter the customer's name for the testimonial"
        />
        <TextField
          id="company-input"
          label="Company"
          value={block.props.company || ""}
          onChange={(value) => updateBlock(block.id, { company: value })}
          placeholder="Enter company name..."
          description="Enter the company name"
        />
        <TextField
          id="position-input"
          label="Position"
          value={block.props.position || ""}
          onChange={(value) => updateBlock(block.id, { position: value })}
          placeholder="Enter position..."
          description="Enter the customer's position or job title"
        />
    </div>
  );
}

