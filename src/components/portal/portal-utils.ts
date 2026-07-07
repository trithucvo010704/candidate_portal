import { PublicJobListItem } from "@/lib/public-types";

export function formatSalary(from: number | null, to: number | null, unit = "VND") {
  const normalizedUnit = unit?.toUpperCase() === "VND" ? "VNĐ" : unit || "VNĐ";
  const hasFrom = typeof from === "number" && Number.isFinite(from) && from > 0;
  const hasTo = typeof to === "number" && Number.isFinite(to) && to > 0;
  const formatAmount = (value: number) => {
    if (normalizedUnit === "VNĐ" && value < 1000) {
      return `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 }).format(value)} triệu VNĐ/tháng`;
    }
    return `${new Intl.NumberFormat("vi-VN").format(value)} ${normalizedUnit}`;
  };

  if (!hasFrom && !hasTo) return "Lương thỏa thuận";
  if (hasFrom && hasTo) return `${formatAmount(from as number)} - ${formatAmount(to as number)}`;
  if (hasFrom) return `Lương từ ${formatAmount(from as number)}`;
  return `Lương đến ${formatAmount(to ?? 0)}`;
}

export function formatDate(value: string | null) {
  if (!value) return "Đang mở";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Đang mở";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value: string | null) {
  if (!value) return "Chưa cập nhật";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Chưa cập nhật";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Có lỗi xảy ra";
}

export function isUsableSlug(slug: string | null | undefined) {
  return Boolean(slug && !slug.includes("/") && !slug.includes("?"));
}

export function buildJobHref(job: PublicJobListItem) {
  const params = new URLSearchParams({ id: job.id });
  if (isUsableSlug(job.applyUrl)) params.set("slug", job.applyUrl as string);
  if (typeof window !== "undefined" && window.location.search.includes("mock=1")) {
    params.set("mock", "1");
  }
  return `/candidate/job-detail?${params.toString()}`;
}

export function workTimeLabel(value: string | null) {
  switch (value) {
    case "FULL_TIME":
      return "Full-time";
    case "PART_TIME":
      return "Part-time";
    case "REMOTE":
      return "Remote";
    case "HYBRID":
      return "Hybrid";
    default:
      return value || "Linh hoạt";
  }
}
