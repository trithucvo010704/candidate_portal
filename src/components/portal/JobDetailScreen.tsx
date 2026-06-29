"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
  Share2,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { PublicJobDetail, PublicJobListItem } from "@/lib/public-types";
import { PublicJobService } from "@/lib/services/public-job.service";
import { ApplyForm } from "./ApplyForm";
import { CommentsPanel } from "./CommentsPanel";
import { JobCard } from "./JobCard";
import { PortalChatWidget } from "./PortalChatWidget";
import { PortalNav } from "./PortalNav";
import { formatDate, formatSalary, getErrorMessage, isUsableSlug, workTimeLabel } from "./portal-utils";

type JobDetailScreenProps = {
  slug?: string;
  id?: string;
  sourceCode?: string;
};

export function JobDetailScreen({ slug, id, sourceCode }: JobDetailScreenProps) {
  const [job, setJob] = useState<PublicJobDetail | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<PublicJobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadJob = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let detail: PublicJobDetail;
      if (isUsableSlug(slug)) {
        try {
          detail = await PublicJobService.getJobBySlug(slug as string);
        } catch (slugError) {
          if (!id) throw slugError;
          detail = await PublicJobService.getJobById(id);
        }
      } else if (id) {
        detail = await PublicJobService.getJobById(id);
      } else {
        throw new Error("Thiếu thông tin công việc.");
      }

      setJob(detail);
      const jobs = await PublicJobService.getJobs({ limit: 4 });
      setRelatedJobs(jobs.content.filter((item) => item.id !== detail.id).slice(0, 3));
    } catch (loadError) {
      setError(getErrorMessage(loadError));
      setJob(null);
    } finally {
      setIsLoading(false);
    }
  }, [id, slug]);

  useEffect(() => {
    void loadJob();
  }, [loadJob]);

  const meta = useMemo(() => {
    if (!job) return [];
    return [
      { icon: MapPin, label: job.location ?? "Remote / Hybrid" },
      { icon: Clock3, label: workTimeLabel(job.workTime) },
      { icon: WalletCards, label: formatSalary(job.salaryFrom, job.salaryTo, job.unit ?? "VND") },
      { icon: CalendarDays, label: `Hạn nộp ${formatDate(job.deadline)}` },
    ];
  }, [job]);

  const descriptionBlocks = useMemo(() => {
    if (!job?.description) return [];
    return job.description.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  }, [job]);

  return (
    <main className="min-h-screen bg-[#fff8f6] text-[#251913]">
      <PortalNav compact />

      {isLoading ? (
        <div className="grid min-h-[70vh] place-items-center">
          <Loader2 className="size-10 animate-spin text-[#f97316]" />
        </div>
      ) : error ? (
        <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-red-600">Không tải được công việc</p>
            <h1 className="mt-3 text-3xl font-black text-[#251913]">{error}</h1>
            <Link href="/candidate" className="portal-button mx-auto mt-6 w-fit">
              <ArrowLeft className="size-4" />
              Quay lại danh sách
            </Link>
          </div>
        </section>
      ) : job ? (
        <>
          <section className="portal-mesh px-5 py-10 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl">
              <Link href="/candidate#jobs" className="inline-flex items-center gap-2 text-sm font-black text-slate-600 transition hover:text-[#f97316]">
                <ArrowLeft className="size-4" />
                Quay lại danh sách
              </Link>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-black text-[#00714d] shadow-sm backdrop-blur-md">
                    <Sparkles className="size-4 text-[#10b981]" />
                    {job.categoryName ?? "Hiring"}
                  </div>
                  <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#251913] sm:text-6xl">
                    {job.title}
                  </h1>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {meta.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur-md">
                        <Icon className="size-5 shrink-0 text-[#f97316]" />
                        <span className="truncate text-sm font-bold text-slate-700">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-2xl shadow-slate-200/80 backdrop-blur-xl">
                  <div
                    className="aspect-video rounded-2xl bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, rgba(249,115,22,0.22), rgba(16,185,129,0.18)), url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80')",
                    }}
                  />
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <a href="#apply" className="portal-button justify-center">
                      Ứng tuyển ngay
                    </a>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard?.writeText(window.location.href)}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:border-[#f97316]/40 hover:text-[#f97316]"
                    >
                      <Share2 className="size-4" />
                      Chia sẻ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_380px] lg:px-10">
            <div className="space-y-6">
              <article className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
                <h2 className="border-l-4 border-[#f97316] pl-4 text-2xl font-black tracking-tight text-[#251913]">
                  Mô tả công việc
                </h2>
                <div className="mt-6 space-y-5 text-base font-medium leading-8 text-slate-700">
                  {descriptionBlocks.length > 0 ? (
                    descriptionBlocks.map((block) => (
                      <p key={block} className="whitespace-pre-wrap">
                        {block}
                      </p>
                    ))
                  ) : (
                    <p>Thông tin chi tiết sẽ được cập nhật sớm.</p>
                  )}
                </div>
              </article>

              <article className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-[#e8fff5] text-[#00714d]">
                    <Users className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#10b981]">Vòng tuyển dụng</p>
                    <h2 className="text-2xl font-black tracking-tight text-[#251913]">Quy trình tuyển dụng</h2>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {job.rounds.length > 0 ? (
                    job.rounds.map((round) => (
                      <div key={round.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fff1eb] text-sm font-black text-[#f97316]">
                          {round.roundIndex}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-black text-[#251913]">{round.roundName}</p>
                          <p className="mt-1 text-xs font-semibold text-slate-500">
                            {round.isConfirmed ? "Đã xác nhận" : "Sẽ cập nhật"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm font-semibold text-slate-500">Thông tin vòng tuyển dụng sẽ được cập nhật sớm.</p>
                  )}
                </div>
              </article>

              <CommentsPanel jobId={job.id} />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <ApplyForm jobId={job.id} jobTitle={job.title} sourceCode={sourceCode} />

              <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#10b981]">Thông tin nhanh</p>
                <div className="mt-4 grid gap-3">
                  {[
                    ["Nhóm", job.categoryName ?? "Tổng quát"],
                    ["Hình thức", workTimeLabel(job.workTime)],
                    ["Kinh nghiệm", job.yoe !== null ? `${job.yoe}+ năm` : "Linh hoạt"],
                    ["Đăng ngày", formatDate(job.publishedAt)],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
                      <span className="text-sm font-bold text-slate-500">{label}</span>
                      <span className="truncate text-sm font-black text-[#251913]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </section>

          {relatedJobs.length > 0 && (
            <section className="border-t border-white/70 bg-white/45 px-5 py-12 sm:px-8 lg:px-10">
              <div className="mx-auto max-w-7xl">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-6 text-[#10b981]" />
                  <h2 className="text-3xl font-black tracking-tight text-[#251913]">Vị trí liên quan</h2>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-3">
                  {relatedJobs.map((item) => (
                    <JobCard key={item.id} job={item} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : null}

      <PortalChatWidget />
    </main>
  );
}
