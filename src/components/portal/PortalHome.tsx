"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Filter,
  Loader2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { PublicJobListItem } from "@/lib/public-types";
import { PublicJobService } from "@/lib/services/public-job.service";
import { ApplicationTracker } from "./ApplicationTracker";
import { JobCard } from "./JobCard";
import { PortalChatWidget } from "./PortalChatWidget";
import { PortalNav } from "./PortalNav";
import { getErrorMessage } from "./portal-utils";

type SearchState = {
  keyword: string;
  location: string;
  workTime: string;
};

const initialSearch: SearchState = {
  keyword: "",
  location: "",
  workTime: "",
};

export function PortalHome() {
  const [search, setSearch] = useState<SearchState>(initialSearch);
  const [jobs, setJobs] = useState<PublicJobListItem[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadJobs = useCallback(async (nextSearch: SearchState) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await PublicJobService.getJobs({
        keyword: nextSearch.keyword.trim() || undefined,
        location: nextSearch.location.trim() || undefined,
        workTime: nextSearch.workTime || undefined,
        limit: 12,
      });
      setJobs(response.content);
      setTotalElements(response.totalElements);
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadJobs(initialSearch);
  }, [loadJobs]);

  const featuredJobs = useMemo(() => jobs.slice(0, 6), [jobs]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void loadJobs(search);
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#fff8f6] text-[#251913]">
      <PortalNav />

      <section className="portal-mesh relative overflow-hidden px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 pt-6 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/65 px-4 py-2 text-sm font-black text-[#783200] shadow-sm backdrop-blur-md">
              <Sparkles className="size-4 text-[#f97316]" />
              Powered by VTT Intelligence
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight text-[#251913] sm:text-6xl lg:text-7xl">
              Khám phá cơ hội nghề nghiệp mới
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-600">
              Tìm việc, nộp CV, hỏi đáp với HR và theo dõi trạng thái ứng tuyển trên một portal công khai kết nối trực tiếp với hệ thống VTT Careers.
            </p>

            <form onSubmit={handleSearch} className="mt-8 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-2xl shadow-orange-100/80 backdrop-blur-xl">
              <div className="grid gap-3 lg:grid-cols-[1fr_220px_180px_auto]">
                <label className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  <input
                    className="portal-input h-14 pl-12"
                    value={search.keyword}
                    onChange={(event) => setSearch((prev) => ({ ...prev, keyword: event.target.value }))}
                    placeholder="Từ khóa công việc, kỹ năng..."
                  />
                </label>
                <label className="relative">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  <input
                    className="portal-input h-14 pl-12"
                    value={search.location}
                    onChange={(event) => setSearch((prev) => ({ ...prev, location: event.target.value }))}
                    placeholder="Địa điểm"
                  />
                </label>
                <label className="relative">
                  <Filter className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  <select
                    className="portal-input h-14 pl-12"
                    value={search.workTime}
                    onChange={(event) => setSearch((prev) => ({ ...prev, workTime: event.target.value }))}
                  >
                    <option value="">Tất cả hình thức</option>
                    <option value="FULL_TIME">Full-time</option>
                    <option value="PART_TIME">Part-time</option>
                    <option value="REMOTE">Remote</option>
                    <option value="HYBRID">Hybrid</option>
                  </select>
                </label>
                <button type="submit" className="portal-button h-14 px-7">
                  {isLoading ? <Loader2 className="size-5 animate-spin" /> : <Search className="size-5" />}
                  Tìm kiếm
                </button>
              </div>
            </form>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { icon: BriefcaseBusiness, label: "Vị trí mở", value: String(totalElements || jobs.length) },
                { icon: Users, label: "Hành trình ứng viên", value: "Apply + Track" },
                { icon: Target, label: "Theo nguồn", value: "Campaign-ready" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl border border-white/70 bg-white/65 p-4 shadow-sm backdrop-blur-md">
                  <Icon className="size-5 text-[#f97316]" />
                  <p className="mt-3 text-xl font-black text-[#251913]">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-2xl shadow-slate-200/80 backdrop-blur-xl">
            <div
              className="aspect-[4/3] overflow-hidden rounded-2xl bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(249,115,22,0.18), rgba(16,185,129,0.16)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80')",
              }}
            />
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black text-[#10b981]">Live hiring workspace</p>
                <p className="mt-1 text-2xl font-black tracking-tight text-[#251913]">Ứng tuyển nhanh hơn, minh bạch hơn.</p>
              </div>
              <span className="grid size-12 place-items-center rounded-2xl bg-[#f97316] text-white">
                <ArrowRight className="size-5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="jobs" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#10b981]">Open roles</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-[#251913]">Kết quả tìm kiếm</h2>
            <p className="mt-2 text-base font-semibold text-slate-500">Chọn vị trí phù hợp và nộp hồ sơ trong vài phút.</p>
          </div>
          <Link href="#tracking" className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:border-[#f97316]/40 hover:text-[#f97316]">
            <ShieldCheck className="size-4" />
            Theo dõi hồ sơ
          </Link>
        </div>

        {error && <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

        {isLoading ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-72 animate-pulse rounded-2xl bg-white/80 shadow-sm" />
            ))}
          </div>
        ) : featuredJobs.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/80 p-10 text-center">
            <Building2 className="mx-auto size-10 text-slate-400" />
            <p className="mt-4 text-lg font-black text-[#251913]">Chưa có vị trí phù hợp</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">Thử đổi từ khóa hoặc địa điểm để tìm thêm cơ hội.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} featured={index === 0} />
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-white/70 bg-white/45 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[420px_1fr]">
          <ApplicationTracker />
          <div className="rounded-2xl border border-white/70 bg-[#251913] p-8 text-white shadow-xl shadow-slate-300/50">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#6cf8bb]">Source tracking ready</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight">Mỗi click từ social campaign có thể đi tiếp đến apply và analytics.</h2>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-white/70">
              Mỗi kênh tuyển dụng đều được ghi nhận rõ ràng, giúp HR biết ứng viên đến từ đâu và chăm sóc đúng thời điểm.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-white px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#fff1eb] text-[#f97316]">
              <BriefcaseBusiness className="size-5" />
            </span>
            <div>
              <p className="font-black text-[#251913]">VTT Careers</p>
              <p className="text-sm font-semibold text-slate-500">Public recruitment portal</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-500">© 2026 VTT Careers. All rights reserved.</p>
        </div>
      </footer>

      <PortalChatWidget />
    </main>
  );
}
