type Props = {
    title: string;
    description: string;
    bgImage: string;
    textColor?: string;
    padding?: string;
    spacing?: string;
    textAlign?: "left" | "center" | "right";
    sectionHeight?: "short" | "medium" | "tall" | "full";
}

const PADDING_MAP: Record<string, string> = {
    "0": "p-0",
    "4": "p-4",
    "8": "p-8",
    "12": "p-12",
    "16": "p-16",
};

const SPACING_MAP: Record<string, string> = {
    "0": "gap-0",
    "4": "gap-4",
    "8": "gap-8",
    "12": "gap-12",
    "16": "gap-16",
};

const HEIGHT_MAP: Record<string, string> = {
    short: "h-[450px]",
    medium: "h-[600px]",
    tall: "h-[800px]",
    full: "min-h-screen",
};

export function HeroSection({ 
    title, 
    description, 
    bgImage, 
    textColor = "text-white",
    padding = "8",
    spacing = "4",
    textAlign = "center",
    sectionHeight = "tall",
}: Props) {
    const paddingClass = PADDING_MAP[padding] || "p-8";
    const spacingClass = SPACING_MAP[spacing] || "gap-4";
    const alignmentClass = textAlign === "left" ? "items-start text-left" : 
                          textAlign === "right" ? "items-end text-right" : 
                          "items-center text-center";
    const heightClass = HEIGHT_MAP[sectionHeight] || HEIGHT_MAP.tall;

    return (
        <div className={`relative w-full ${heightClass}`}>
            <img src={bgImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            <div className={`absolute inset-0 z-10 flex flex-col justify-center ${alignmentClass} ${paddingClass}`}>
                <div className={`flex flex-col ${spacingClass} max-w-[600px] ${textAlign === "center" ? "mx-auto" : textAlign === "right" ? "ml-auto" : ""}`}>
                    <h1 className={`text-6xl font-bold ${textColor}`}>{title}</h1>
                    <p className={`text-2xl ${textColor}`}>{description}</p>
                </div>
            </div>
        </div>
    )
}