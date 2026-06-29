import Link from "next/link";
import { BriefcaseBusiness, Search, ShieldCheck } from "lucide-react";

type PortalNavProps = {
  compact?: boolean;
};

export function PortalNav({ compact = false }: PortalNavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/candidate" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[#f97316] text-white shadow-lg shadow-orange-500/20">
            <BriefcaseBusiness className="size-5" />
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight text-[#251913]">VTT Careers</span>
            {!compact && <span className="block text-xs font-semibold text-slate-500">AI hiring portal</span>}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
          <Link href="/candidate#jobs" className="transition hover:text-[#f97316]">
            Jobs
          </Link>
          <Link href="/candidate#tracking" className="transition hover:text-[#f97316]">
            Tracking
          </Link>
          <Link href="/candidate#qa" className="transition hover:text-[#f97316]">
            Q&A
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/candidate#jobs"
            className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 text-sm font-bold text-slate-700 transition hover:border-[#f97316]/40 hover:text-[#f97316] sm:inline-flex"
          >
            <Search className="size-4" />
            Tìm kiếm
          </Link>
          <Link
            href="/candidate#tracking"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#f97316] px-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-105"
          >
            <ShieldCheck className="size-4" />
            Theo dõi
          </Link>
        </div>
      </div>
    </header>
  );
}
