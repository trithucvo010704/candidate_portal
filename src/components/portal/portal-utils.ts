import { PublicJobListItem } from "@/lib/public-types";

export function formatSalary(from: number | null, to: number | null, unit = "VND") {
  if (!from && !to) return "Thỏa thuận";
  const formatter = new Intl.NumberFormat("vi-VN", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  if (from && to) return `${formatter.format(from)} - ${formatter.format(to)} ${unit}`;
  if (from) return `Từ ${formatter.format(from)} ${unit}`;
  return `Đến ${formatter.format(to ?? 0)} ${unit}`;
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
