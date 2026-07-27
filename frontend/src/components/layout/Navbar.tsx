import {
  Menu,
  Search,
  Bell,
  CircleCheck,
} from "lucide-react";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function Navbar({
  collapsed,
  setCollapsed,
}: Props) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Sidebar Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 transition hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Enterprise AI Assistant
          </h2>

          <p className="text-xs text-slate-500">
            RAG • ChromaDB • Multi-LLM
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search documents..."
            className="w-72 rounded-xl border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Backend Status */}
        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-2">

          <CircleCheck
            size={16}
            className="text-green-600"
          />

          <span className="text-sm font-medium text-green-700">
            Connected
          </span>

        </div>

        {/* Notification */}
        <button className="rounded-xl border border-slate-200 bg-white p-2.5 transition hover:bg-slate-100">
          <Bell size={18} />
        </button>

        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow">
          AK
        </div>

      </div>

    </header>
  );
}