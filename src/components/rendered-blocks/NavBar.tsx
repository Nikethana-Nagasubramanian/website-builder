type Props = {
    logo?: string;
    links: {
        label: string;
        url: string;
    }[];
};

export function NavBar({ logo, links = [] }: Props) {
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        // Only handle smooth scrolling for hash links (section links)
        if (url && url.startsWith('#')) {
            e.preventDefault();
            const targetId = url.substring(1); // Remove the #
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
        // For other links (external URLs), let the default behavior handle it
    };

    return (
        <div className="flex justify-between items-center">
            {logo && <img src={logo} alt="Logo" className="w-10 h-10" />}
            <nav className="flex gap-4 h-[48px] w-full items-center justify-end p-6">
                {links.map((link, index) => (
                    <a 
                        key={index} 
                        href={link.url || "#"} 
                        onClick={(e) => handleLinkClick(e, link.url)}
                        className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
        </div>
    );
}
  