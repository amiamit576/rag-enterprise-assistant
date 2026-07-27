import { Upload, Loader2 } from "lucide-react";
import { useRef } from "react";

import { useUploadDocument } from "../documents/useUploadDocument";

interface UploadAreaProps {
  collapsed?: boolean;
}

export default function UploadArea({ collapsed = false }: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadDocument();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    uploadMutation.mutate(file);

    // Allow selecting the same file again
    event.target.value = "";
  };

  return (
    <>
      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
      />

      <button
        onClick={handleClick}
        disabled={uploadMutation.isPending}
        className={`flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 ${collapsed ? "px-3 py-3" : "px-4 py-3"}`}
      >
        {uploadMutation.isPending ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Uploading...
          </>
        ) : (
          <>
            <Upload size={18} />
            {!collapsed && "Upload Document"}
          </>
        )}
      </button>
    </>
  );
}
