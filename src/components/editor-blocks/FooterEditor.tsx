import { usePageStore } from "../../store/usePageStore";
import { TextField } from "../reusable-components/TextField";

export function FooterEditor({ block }: { block: any }) {
  const updateBlock = usePageStore((s) => s.updateBlock);

  return (
    <div className="space-y-4">
      <TextField
        id="footer-text-input"
        label="Footer Text"
        value={block.props.text || ""}
        onChange={(value) => updateBlock(block.id, { text: value })}
        placeholder="Enter footer text..."
        description="Enter the footer text content"
      />
    </div>
  );
}

