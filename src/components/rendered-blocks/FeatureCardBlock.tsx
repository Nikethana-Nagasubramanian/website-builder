type FeatureItem = {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  linkText?: string;
};

type FeatureCardProps = {
  features?: FeatureItem[];
  title?: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
};

export function FeatureCardBlock({
  features,
  title,
  description,
  imageUrl,
  linkUrl,
  linkText,
}: FeatureCardProps) {
  const derivedFeatures: FeatureItem[] =
    features && features.length > 0
      ? features
      : [
          {
            title: title || "Feature title",
            description:
              description ||
              "Use the editor to customize this feature description with your own content.",
            imageUrl: imageUrl || "https://via.placeholder.com/256x192",
            linkUrl: linkUrl || "#",
            linkText: linkText || "Learn more",
          },
        ];

  return (
    <div className="w-full bg-white">
      <div className="px-6 py-8 mx-auto" style={{ maxWidth: "1200px" }}>
        <div
          className={`grid gap-6 justify-items-center ${
            derivedFeatures.length === 1
              ? "grid-cols-1"
              : derivedFeatures.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {derivedFeatures.map((feature, index) => (
            <div
              key={`${feature.title}-${index}`}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col w-full max-w-xs"
            >
              {feature.imageUrl && (
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600 flex-1">{feature.description}</p>
                <a
                  href={feature.linkUrl}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  {feature.linkText || "Learn more"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}