type Props = {
    title: string;
    description: string;
    bgImage: string;
}

export function HeroSection({ title, description, bgImage }: Props) {
    return (
        <div className="relative h-[800px] w-full">
            <img src={bgImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center">
                <h1 className="text-6xl font-bold">{title}</h1>
                <p className="text-2xl max-w-[600px] mx-auto">{description}</p>
            </div>
        </div>
    )
}