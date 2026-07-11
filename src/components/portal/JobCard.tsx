import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, WalletCards } from "lucide-react";
import { PublicJobListItem } from "@/lib/public-types";
import { buildJobHref, formatDate, formatSalary, workTimeLabel } from "./portal-utils";

type JobCardProps = {
  job: PublicJobListItem;
  featured?: boolean;
};

export function JobCard({ job, featured = false }: JobCardProps) {
  return (
    <Link
      href={buildJobHref(job)}
      className={`group block rounded-2xl border bg-white/85 p-5 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:border-[#f97316]/40 hover:shadow-xl ${
        featured ? "border-[#f97316]/25" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#047857]">
            {job.categoryName ?? "Hiring"}
          </p>
          <h3 className="mt-2 line-clamp-2 text-xl font-black tracking-tight text-[#251913] transition group-hover:text-[#f97316]">
            {job.title}
          </h3>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#fff1eb] text-[#f97316]">
          <ArrowRight className="size-5 transition group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {workTimeLabel(job.workTime)}
        </span>
        <span className="rounded-lg bg-[#e8fff5] px-3 py-1 text-xs font-bold text-[#00714d]">
          {job.roundCount} vòng
        </span>
        {job.yoe !== null && (
          <span className="rounded-lg bg-[#fff1eb] px-3 py-1 text-xs font-bold text-[#783200]">{job.yoe}+ năm</span>
        )}
      </div>

      <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-600">
        <span className="flex min-w-0 items-center gap-2">
          <MapPin className="size-4 shrink-0 text-[#f97316]" />
          <span className="truncate">{job.location ?? "Remote / Hybrid"}</span>
        </span>
        <span className="flex min-w-0 items-center gap-2">
          <WalletCards className="size-4 shrink-0 text-[#f97316]" />
          <span className="truncate">{formatSalary(job.salaryFrom, job.salaryTo, job.unit ?? "VND")}</span>
        </span>
        <span className="flex min-w-0 items-center gap-2">
          <CalendarDays className="size-4 shrink-0 text-[#f97316]" />
          <span className="truncate">Hạn nộp {formatDate(job.deadline)}</span>
        </span>
      </div>
    </Link>
  );
}
