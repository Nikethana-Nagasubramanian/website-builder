import { usePageStore } from "../../store/usePageStore";
import { InlineTextEditor } from "../reusable-components/InlineTextEditor";

type Props = {
    text: string;
    customerName: string;
    company: string;
    position: string;
    id?: string;
  };
  
  export function TestimonialSection({ text, customerName, company, position, id }: Props) {
    const updateBlock = usePageStore((s) => s.updateBlock);

    return (
      <div className="p-4 max-w-[600px] mx-auto flex-wrap">
        <InlineTextEditor
          value={text}
          tagName="div"
          className="text-4xl font-bold text-center max-w-[600px] whitespace-normal break-words"
          onSave={(newVal) => id && updateBlock(id, { text: newVal })}
        />
        {(customerName || company || position) && (
          <div className="p-4 text-center">
            <InlineTextEditor
              value={customerName}
              tagName="h4"
              className="font-semibold"
              onSave={(newVal) => id && updateBlock(id, { customerName: newVal })}
            />
            <div className="flex justify-center gap-1 text-sm text-gray-600">
              <InlineTextEditor
                value={company}
                tagName="span"
                onSave={(newVal) => id && updateBlock(id, { company: newVal })}
              />
              <span>, </span>
              <InlineTextEditor
                value={position}
                tagName="span"
                onSave={(newVal) => id && updateBlock(id, { position: newVal })}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
  