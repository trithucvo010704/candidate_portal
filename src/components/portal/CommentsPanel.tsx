"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Loader2, MessageCircle, RefreshCw, Send } from "lucide-react";
import { JobCommentDto } from "@/lib/public-types";
import { PublicJobService } from "@/lib/services/public-job.service";
import { formatDateTime, getErrorMessage } from "./portal-utils";

type CommentsPanelProps = {
  jobId: string;
};

export function CommentsPanel({ jobId }: CommentsPanelProps) {
  const [comments, setComments] = useState<JobCommentDto[]>([]);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const response = await PublicJobService.getComments(jobId);
      setComments(response);
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setMessage(null);

    try {
      const savedComment = await PublicJobService.addComment(jobId, {
        guestName: guestName.trim() || "Candidate",
        guestEmail: guestEmail.trim() || undefined,
        content: content.trim(),
      });
      setComments((prev) => [...prev, savedComment]);
      setContent("");
      setMessage("Câu hỏi đã được gửi đến HR.");
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="qa" className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#10b981]">Web Q&A</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#251913]">Hỏi về vị trí này</h2>
        </div>
        <button
          type="button"
          onClick={() => void loadComments()}
          disabled={isLoading}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:border-[#f97316]/40 hover:text-[#f97316] disabled:opacity-60"
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
          Refresh
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {isLoading && comments.length === 0 ? (
          <div className="grid h-24 place-items-center rounded-xl bg-slate-50">
            <Loader2 className="size-5 animate-spin text-[#f97316]" />
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-5 text-sm font-semibold text-slate-500">
            Chưa có câu hỏi nào cho vị trí này.
          </div>
        ) : (
          comments.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[#251913]">{item.guestName}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{formatDateTime(item.createdAt)}</p>
                </div>
                <MessageCircle className="size-4 shrink-0 text-[#10b981]" />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.content}</p>
              {item.aiReply && (
                <div className="mt-3 rounded-xl bg-[#e8fff5] p-3 text-sm font-semibold leading-6 text-[#00714d]">
                  {item.aiReply}
                </div>
              )}
            </article>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="portal-input" value={guestName} onChange={(event) => setGuestName(event.target.value)} placeholder="Tên của bạn" />
          <input
            className="portal-input"
            type="email"
            value={guestEmail}
            onChange={(event) => setGuestEmail(event.target.value)}
            placeholder="Email để HR phản hồi"
          />
        </div>
        <textarea
          className="portal-input min-h-28 py-3"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Nhập câu hỏi về job, vòng tuyển dụng hoặc cách ứng tuyển"
          required
        />
        {message && <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600">{message}</div>}
        <button type="submit" disabled={isSending} className="portal-button w-fit bg-[#251913] shadow-slate-900/15 hover:bg-[#3b2a22]">
          {isSending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          Gửi câu hỏi
        </button>
      </form>
    </section>
  );
}
