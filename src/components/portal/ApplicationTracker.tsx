"use client";

import { FormEvent, useState } from "react";
import { Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import { CandidateApplicationTrackResponse } from "@/lib/public-types";
import { PublicJobService } from "@/lib/services/public-job.service";
import { formatDateTime, getErrorMessage } from "./portal-utils";

type TrackState = {
  email: string;
  phone: string;
};

const statusLabel: Record<string, string> = {
  NEW: "Mới nộp",
  IN_PROCESS: "Đang xử lý",
  PASS: "Đã đạt",
  FAIL: "Chưa phù hợp",
};

const statusClassName: Record<string, string> = {
  NEW: "bg-slate-100 text-slate-700",
  IN_PROCESS: "bg-[#fff1eb] text-[#783200]",
  PASS: "bg-[#e8fff5] text-[#00714d]",
  FAIL: "bg-[#fff0f0] text-[#ba1a1a]",
};

export function ApplicationTracker() {
  const [track, setTrack] = useState<TrackState>({ email: "", phone: "" });
  const [results, setResults] = useState<CandidateApplicationTrackResponse[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await PublicJobService.trackApplications({
        email: track.email.trim(),
        phone: track.phone.trim(),
      });
      setResults(response);
      setMessage(response.length ? null : "Không tìm thấy hồ sơ nào với thông tin này.");
    } catch (error) {
      setResults([]);
      setMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="tracking" className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-[#e8fff5] text-[#00714d]">
          <ShieldCheck className="size-5" />
        </span>
        <div>
          <h2 className="text-lg font-black tracking-tight text-[#251913]">Theo dõi hồ sơ</h2>
          <p className="text-sm font-semibold text-slate-500">Kiểm tra trạng thái ứng tuyển bằng email và số điện thoại.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
        <input
          className="portal-input"
          type="email"
          value={track.email}
          onChange={(event) => setTrack((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="Email đã ứng tuyển"
          required
        />
        <input
          className="portal-input"
          value={track.phone}
          onChange={(event) => setTrack((prev) => ({ ...prev, phone: event.target.value }))}
          placeholder="Số điện thoại đã ứng tuyển"
          required
        />
        <button type="submit" disabled={isLoading} className="portal-button bg-[#10b981] shadow-emerald-500/20 hover:bg-[#0ea371]">
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
          Kiểm tra trạng thái
        </button>
      </form>

      {message && <div className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600">{message}</div>}

      {results.length > 0 && (
        <div className="mt-5 grid gap-3">
          {results.map((item) => (
            <div key={item.applicationId} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[#251913]">{item.jobTitle}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{item.companyName ?? "Hiring business"}</p>
                </div>
                <span className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-black ${statusClassName[item.status] ?? statusClassName.NEW}`}>
                  {statusLabel[item.status] ?? item.status}
                </span>
              </div>

              <div className="mt-4 grid gap-2 text-xs font-semibold text-slate-500">
                <span>Ngày nộp: {formatDateTime(item.submittedAt)}</span>
                <span>
                  Vòng hiện tại: {item.currentRoundIndex ?? 1}/{item.totalRounds ?? "-"}
                </span>
              </div>

              {item.roundHistory.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {item.roundHistory.map((round) => (
                    <div key={round.id} className="flex items-start gap-3 text-sm">
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#fff1eb] text-xs font-black text-[#f97316]">
                        {round.roundIndex + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-bold text-slate-700">{round.roundName}</p>
                        <p className="mt-0.5 text-xs font-semibold text-slate-500">
                          {round.result ?? "Đang chờ"} - {formatDateTime(round.confirmedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
