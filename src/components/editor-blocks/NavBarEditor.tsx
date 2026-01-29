import { useEffect } from "react";
import { usePageStore } from "../../store/usePageStore";
import { TextField } from "../reusable-components/TextField";
import { ActionButton } from "../reusable-components/ActionButton";
import { Trash, Plus } from "@phosphor-icons/react";
import { BLOCK_DEFINITIONS } from "../rendered-blocks/blockDefinitions";

const DEFAULT_LINKS = [
  { label: "Features", url: "" },
  { label: "Testimonial", url: "" }
];

export function NavBarEditor({ block }: { block: any }) {
  const updateBlock = usePageStore((s) => s.updateBlock);
  const page = usePageStore((s) => s.page);
  
  // Initialize default links if they don't exist (only once)
  useEffect(() => {
    if (!block.props.links || block.props.links.length === 0) {
      updateBlock(block.id, { links: DEFAULT_LINKS });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.id]);

  const links = block.props.links && block.props.links.length > 0 
    ? block.props.links 
    : DEFAULT_LINKS;

  // Get all blocks except the current navBar for the dropdown
  const availableBlocks = page.filter(b => b.id !== block.id && b.type !== "navBar");

  const updateLink = (index: number, field: "label" | "url", value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    updateBlock(block.id, { links: updatedLinks });
  };

  const removeLink = (index: number) => {
    const updatedLinks = links.filter((_link: { label: string; url: string }, i: number) => i !== index);
    updateBlock(block.id, { links: updatedLinks });
  };

  const addLink = () => {
    const updatedLinks = [...links, { label: "", url: "" }];
    updateBlock(block.id, { links: updatedLinks });
  };

  return (
    <div className="space-y-4">
      <TextField 
        id="logo-input" 
        label="Logo" 
        value={block.props.logo || ""} 
        onChange={(value) => updateBlock(block.id, { logo: value })} 
        placeholder="Enter logo URL..." 
        description="Enter the logo URL" 
      />
      
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Navigation Links
        </label>
        
        {links.map((link: { label: string; url: string }, index: number) => (
          <div key={index} className="space-y-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Link {index + 1}
            </div>
            
            <div className="flex gap-2 items-start">
              <div className="flex-1">
                <label htmlFor={`link-${index}-section`} className="block text-sm font-medium text-gray-700 mb-2">
                  Section
                </label>
                <select
                  id={`link-${index}-section`}
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ fontSize: '14px' }}
                >
                  <option value="">Select a section...</option>
                  {availableBlocks.map((b) => (
                    <option key={b.id} value={`#${b.id}`}>
                      {BLOCK_DEFINITIONS[b.type]?.name || b.type}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => removeLink(index)}
                className="mt-7 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                aria-label={`Delete link ${index + 1}`}
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
        
        <ActionButton
          variant="secondary"
          label="Add more nav items"
          icon={<Plus size={16} />}
          onClick={addLink}
          showBorder={false}
          className="w-full"
        />
      </div>
    </div>
  );
}