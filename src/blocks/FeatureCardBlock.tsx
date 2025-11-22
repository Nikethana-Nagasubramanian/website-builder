type FeatureCardProps = {
    icon: string; // emoji or icon name
    title: string;
    description: string;
    imageUrl: string;
    layout: "left" | "right"; // image on left or right
  };
  
  export function FeatureCardBlock({ icon, title, description, imageUrl, layout }: FeatureCardProps) {
    const isLeft = layout === "left";
    
    return (
      <div className="flex gap-8 items-center p-6 bg-white rounded-lg shadow">
        {isLeft && (
          <img src={imageUrl} alt={title} className="w-64 h-48 object-cover rounded" />
        )}
        
        <div className="flex-1">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        
        {!isLeft && (
          <img src={imageUrl} alt={title} className="w-64 h-48 object-cover rounded" />
        )}
      </div>
    );
  }