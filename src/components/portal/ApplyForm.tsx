"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, FileUp, Loader2, Send, ShieldCheck } from "lucide-react";
import { PublicJobService } from "@/lib/services/public-job.service";
import { getErrorMessage } from "./portal-utils";

type ApplyFormProps = {
  jobId: string;
  jobTitle: string;
  sourceCode?: string;
};

type CandidateState = {
  fullName: string;
  email: string;
  phone: string;
  cvFile: File | null;
};

const initialCandidate: CandidateState = {
  fullName: "",
  email: "",
  phone: "",
  cvFile: null,
};

export function ApplyForm({ jobId, jobTitle, sourceCode }: ApplyFormProps) {
  const [candidate, setCandidate] = useState<CandidateState>(initialCandidate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setIsSuccess(false);

    try {
      if (!candidate.cvFile) {
        setMessage("Vui lòng tải lên CV trước khi nộp hồ sơ.");
        return;
      }
      const response = await PublicJobService.apply(jobId, {
        ...candidate,
        sourceCode,
      });
      setCandidate(initialCandidate);
      setIsSuccess(true);
      setMessage(`Hồ sơ đã gửi cho ${response.jobTitle || jobTitle}. Mã hồ sơ: ${response.applicationId}`);
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="apply" onSubmit={handleSubmit} className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#10b981]">Ứng tuyển nhanh</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#251913]">Gửi hồ sơ của bạn</h2>
        </div>
        <span className="grid size-12 place-items-center rounded-xl bg-[#fff1eb] text-[#f97316]">
          <Send className="size-5" />
        </span>
      </div>

      {sourceCode && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#6cf8bb]/50 bg-[#e8fff5] p-3 text-sm font-semibold text-[#00714d]">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" />
          <span>Nguồn ứng tuyển từ campaign đã được ghi nhận.</span>
        </div>
      )}

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Họ và tên</span>
          <input
            className="portal-input"
            value={candidate.fullName}
            onChange={(event) => setCandidate((prev) => ({ ...prev, fullName: event.target.value }))}
            placeholder="Nguyễn Văn A"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Email</span>
          <input
            className="portal-input"
            type="email"
            value={candidate.email}
            onChange={(event) => setCandidate((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="example@email.com"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Số điện thoại</span>
          <input
            className="portal-input"
            value={candidate.phone}
            onChange={(event) => setCandidate((prev) => ({ ...prev, phone: event.target.value }))}
            placeholder="090 123 4567"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">CV của bạn</span>
          <span className="flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/80 px-4 text-sm font-semibold text-slate-600 transition hover:border-[#f97316]/50">
            <span className="min-w-0 truncate">{candidate.cvFile?.name ?? "Tải lên CV PDF, DOC hoặc DOCX"}</span>
            <FileUp className="size-5 shrink-0 text-[#f97316]" />
            <input
              type="file"
              className="sr-only"
              accept=".pdf,.doc,.docx"
              required
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                setCandidate((prev) => ({ ...prev, cvFile: file }));
              }}
            />
          </span>
        </label>
      </div>

      {message && (
        <div
          className={`mt-5 flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
            isSuccess ? "bg-[#e8fff5] text-[#00714d]" : "bg-[#fff0f0] text-[#ba1a1a]"
          }`}
        >
          {isSuccess && <CheckCircle2 className="mt-0.5 size-4 shrink-0" />}
          <span>{message}</span>
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="portal-button mt-5 w-full">
        {isSubmitting ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
        Nộp đơn ứng tuyển
      </button>

      <p className="mt-4 text-xs font-semibold text-slate-500">
        Thông tin của bạn được gửi trực tiếp đến hệ thống tuyển dụng VTT Careers.
      </p>
    </form>
  );
}
