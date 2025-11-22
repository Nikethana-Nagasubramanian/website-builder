type FeatureCardProps = {
    title: string;
    description: string;
    imageUrl: string;
  };
  
  export function FeatureCardBlock({ title, description, imageUrl }: FeatureCardProps) {
    return (
      <div className="flex gap-8 p-6 bg-white">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
        
        <div className="flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-64 h-48 object-cover rounded border border-gray-300" 
          />
        </div>
      </div>
    );
  }