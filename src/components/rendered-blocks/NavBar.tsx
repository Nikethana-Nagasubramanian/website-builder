import { usePageStore } from "../../store/usePageStore";
import { InlineTextEditor } from "../reusable-components/InlineTextEditor";

type Props = {
    logo?: string;
    id?: string;
    links: {
        label: string;
        url: string;
    }[];
};

export function NavBar({ logo, id, links = [] }: Props) {
    const updateBlock = usePageStore((s) => s.updateBlock);

    const handleUpdateLink = (index: number, label: string) => {
        if (!id) return;
        const newLinks = [...links];
        newLinks[index] = { ...newLinks[index], label };
        updateBlock(id, { links: newLinks });
    };

    return (
        <div className="flex justify-between items-center">
            {logo && <img src={logo} alt="Logo" className="w-10 h-10" />}
            <nav className="flex gap-4 h-[48px] w-full items-center justify-end p-6">
                {links.map((link, index) => (
                    <div 
                        key={index} 
                        className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                        onClick={() => {
                            // If it's a hash link, handle smooth scroll
                            if (link.url && link.url.startsWith('#')) {
                                const targetId = link.url.substring(1);
                                const targetElement = document.getElementById(targetId);
                                if (targetElement) {
                                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            } else if (link.url) {
                                window.location.href = link.url;
                            }
                        }}
                    >
                        <InlineTextEditor
                            value={link.label}
                            tagName="span"
                            onSave={(newVal) => handleUpdateLink(index, newVal)}
                        />
                    </div>
                ))}
            </nav>
        </div>
    );
}
  