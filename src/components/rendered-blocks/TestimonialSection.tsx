type Props = {
    text: string;
    customerName: string;
    company: string;
    position: string;
  };
  
  export function TestimonialSection({ text, customerName, company, position }: Props) {
    return (
      <div className="p-4 max-w-[600px] mx-auto flex-wrap">
        <div className="text-4xl font-bold text-center max-w-[600px] whitespace-normal break-words">{text}</div>
        {(customerName || company || position) && (
          <div className="p-4 text-center">
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
  