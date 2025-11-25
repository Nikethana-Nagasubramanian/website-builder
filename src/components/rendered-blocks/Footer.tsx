type Props = {
  text?: string;
};

export function Footer({ text = "© 2024 Nike | Page Builder Demo" }: Props) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-4 w-full">
      <div className="text-center">
        <p className="text-sm">{text}</p>
      </div>
    </footer>
  );
}

