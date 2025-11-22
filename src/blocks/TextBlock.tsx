type Props = {
    text: string;
  };
  
export function TextBlock({ text }: Props) {
return (
    <div className="p-4 text-xl">
    {text}
    </div>
);
}
  