type FileUploadFieldProps = {
  id: string;
  label: string;
  accept?: string;
  onChange: (file: File) => void;
  description?: string;
};

export function FileUploadField({
  id,
  label,
  accept = "image/*",
  onChange,
  description,
}: FileUploadFieldProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <label htmlFor={id} className="block">
        <span className="sr-only">{description || label}</span>
        <input
          id={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
          aria-label={description || label}
        />
      </label>
    </div>
  );
}

