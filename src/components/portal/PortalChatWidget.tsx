"use client";

import { useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

const cannedReplies = [
  "Bạn có thể tìm theo từ khóa, địa điểm hoặc hình thức làm việc trên trang Jobs.",
  "Nếu bạn vào từ link campaign, nguồn ứng tuyển sẽ được ghi nhận khi nộp hồ sơ.",
  "Sau khi nộp CV, bạn có thể dùng mục Theo dõi hồ sơ để xem trạng thái.",
];

export function PortalChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Chào bạn, mình có thể giúp bạn tìm việc phù hợp tại VTT Careers.",
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const reply = cannedReplies[messages.length % cannedReplies.length];
    setMessages((prev) => [...prev, { role: "user", text }, { role: "assistant", text: reply }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-3 right-3 z-50 max-w-[calc(100vw-1.5rem)] sm:bottom-5 sm:right-5">
      {isOpen && (
        <section className="mb-4 w-[min(360px,calc(100vw-40px))] overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-2xl shadow-slate-900/20 backdrop-blur-xl">
          <div className="flex items-center justify-between bg-[#251913] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-[#f97316]">
                <Bot className="size-5" />
              </span>
              <div>
                <p className="text-sm font-black">VTT Assistant</p>
                <p className="text-xs font-semibold text-white/60">Career support</p>
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="grid size-8 place-items-center rounded-lg hover:bg-white/10">
              <span className="sr-only">Đóng hỗ trợ</span>
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm font-semibold leading-6 ${
                    message.role === "user" ? "bg-[#c2410c] text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 p-3">
            <input
              aria-label="Nội dung cần hỗ trợ"
              className="h-10 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none transition focus:border-[#f97316]/50 focus:ring-4 focus:ring-orange-500/10"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") send();
              }}
              placeholder="Hỏi về vị trí ứng tuyển..."
            />
            <button type="button" onClick={send} className="grid size-10 place-items-center rounded-xl bg-[#c2410c] text-white hover:bg-[#9a3412]">
              <span className="sr-only">Gửi câu hỏi hỗ trợ</span>
              <Send className="size-4" />
            </button>
          </div>
        </section>
      )}

      <button
        type="button"
        aria-label={isOpen ? "Đóng hỗ trợ" : "Mở hỗ trợ"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative grid size-14 place-items-center rounded-2xl bg-[#c2410c] text-white shadow-2xl shadow-orange-900/30 transition hover:-translate-y-1 hover:bg-[#9a3412] sm:size-16"
      >
        <span className="absolute -right-1 -top-1 size-4 rounded-full bg-[#6cf8bb] ring-4 ring-white" />
        <MessageCircle className="size-7" />
      </button>
    </div>
  );
}
