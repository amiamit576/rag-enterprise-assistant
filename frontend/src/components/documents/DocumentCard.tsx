import { FileText, CheckCircle2 } from "lucide-react";

type Props = {
  filename: string;
  pages: number;
  status: string;
};

export default function DocumentCard({
  filename,
  pages,
}: Props) {
  return (
    <div className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800 p-4 transition hover:border-blue-500">

      <div className="flex items-start gap-3">

        <div className="rounded-lg bg-blue-600/20 p-2">
          <FileText
            className="text-blue-400"
            size={20}
          />
        </div>

        <div className="flex-1">
          <p className="truncate font-medium">
            {filename}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {pages} Pages
          </p>
        </div>

        <CheckCircle2
          className="text-green-400"
          size={18}
        />

      </div>

    </div>
  );
}