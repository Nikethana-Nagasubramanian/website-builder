type Props = {
    text: string;
    customerName: string;
    company: string;
    position: string;
  };
  
  export function TextBlock({ text, customerName, company, position }: Props) {
    return (
      <div className="p-4 max-w-[600px] mx-auto">
        <div className="text-4xl font-bold text-center">{text}</div>
        {(customerName || company || position) && (
          <div className="pt-4 text-center">
            {customerName && <h4 className="font-semibold">{customerName}</h4>}
            {(company || position) && (
              <p className="text-sm text-gray-600">
                {[company, position].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
  