import { usePageStore } from "../../store/usePageStore";
import { InlineTextEditor } from "../reusable-components/InlineTextEditor";

type Props = {
  text?: string;
  id?: string;
};

export function Footer({ text = "© 2024 Nike | Page Builder Demo", id }: Props) {
  const updateBlock = usePageStore((s) => s.updateBlock);

  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-4 w-full">
      <div className="text-center">
        <InlineTextEditor
          value={text}
          tagName="p"
          className="text-sm"
          onSave={(newVal) => id && updateBlock(id, { text: newVal })}
        />
      </div>
    </footer>
  );
}

