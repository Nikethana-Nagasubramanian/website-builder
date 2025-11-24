type Props = {
    logo?: string;
    links: {
        label: string;
        url: string;
    }[];
};

export function NavBar({ logo, links = [] }: Props) {
    return (
        <div className="flex justify-between items-center">
            {logo && <img src={logo} alt="Logo" className="w-10 h-10" />}
            <nav className="flex gap-4">
                {links.map((link, index) => (
                    <a 
                        key={index} 
                        href={link.url || "#"} 
                        className="text-gray-700 hover:text-gray-900"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
        </div>
    );
}