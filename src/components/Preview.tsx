import { usePageStore } from "../store/usePageStore";
import { BLOCKS } from "./rendered-blocks/BlockRegistry";

export function Preview() {
  const page = usePageStore((s) => s.page);
  const fontFamily = usePageStore((s) => s.globalStyles.fontFamily);

  return (
    <div className="min-h-screen bg-white w-full" style={{ fontFamily }}>
      {page.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No content to preview.</p>
        </div>
      ) : (
        <div>
          {page.map((block) => {
            const Comp = BLOCKS[block.type];
            return (
              <div key={block.id} id={block.id} className="w-full scroll-mt-20">
                <Comp {...block.props} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

