import {
  Search,
  Bell,
  CircleCheck,
  Bot,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      {/* Left */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-600 p-2 text-white">
            <Bot size={20} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Enterprise RAG Assistant
            </h2>

            <p className="text-sm text-slate-500">
              Chat intelligently with your documents
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* Backend Status */}
        <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
          <CircleCheck
            size={16}
            className="text-green-600"
          />

          <span className="text-sm font-medium text-green-700">
            Connected
          </span>
        </div>

        {/* Notification */}
        <button className="rounded-xl bg-slate-100 p-2.5 transition hover:bg-slate-200">
          <Bell size={18} />
        </button>

        {/* Avatar */}
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-md">
          A
        </div>

      </div>
    </header>
  );
}