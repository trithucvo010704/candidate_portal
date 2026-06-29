export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T | null;
  payload?: T | null;
}

export interface PageResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  total: number;
  content?: T[];
  totalPages?: number;
  totalElements?: number;
}

export type JobPostStatus = 'ACTIVE' | 'INACTIVE' | 'CLOSED' | 'EXPIRED';
export type ApplicationStatusEnum = 'NEW' | 'IN_PROCESS' | 'PASS' | 'FAIL';
export type RoundResult = 'PASS' | 'FAIL' | 'PENDING' | string;
export type CandidateResponse = 'CONFIRMED' | 'DECLINED' | 'PENDING' | string;

export interface JobRoundResponse {
  id: string;
  roundIndex: number;
  roundName: string;
  isConfirmed: boolean;
}

export interface PublicJobListItem {
  id: string;
  title: string;
  location: string | null;
  salaryFrom: number | null;
  salaryTo: number | null;
  workTime: string | null;
  yoe: number | null;
  unit: string | null;
  roundCount: number;
  status: JobPostStatus;
  publishedAt: string | null;
  deadline: string | null;
  applyUrl: string | null;
  categoryId: string | null;
  categoryName: string | null;
  createdAt: string | null;
}

export interface PublicJobDetail extends PublicJobListItem {
  description: string;
  roundCountLocked: boolean;
  updatedAt: string | null;
  rounds: JobRoundResponse[];
}

export interface ApplyResponse {
  applicationId: string;
  candidateId: string;
  jobTitle: string;
}

export interface PublicJobQuery {
  keyword?: string;
  location?: string;
  workTime?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
}

export interface PublicJobPage {
  content: PublicJobListItem[];
  totalPages: number;
  totalElements: number;
}

export interface ApplyRequest {
  email: string;
  fullName: string;
  phone?: string;
  cvFile?: File | null;
  sourceCode?: string;
}

export interface RoundStatusResponse {
  id: string;
  roundId: string;
  roundIndex: number;
  roundName: string;
  result: RoundResult | null;
  note: string | null;
  actionByName: string | null;
  confirmedAt: string | null;
  candidateResponse: CandidateResponse | null;
  candidateResponseAt: string | null;
}

export interface CandidateApplicationTrackResponse {
  applicationId: string;
  jobId: string;
  jobTitle: string;
  companyName: string | null;
  status: ApplicationStatusEnum;
  currentRoundIndex: number | null;
  totalRounds: number | null;
  submittedAt: string | null;
  roundHistory: RoundStatusResponse[];
}

export interface JobCommentDto {
  id: string;
  guestName: string;
  content: string;
  aiReply: string | null;
  createdAt: string | null;
  jobTitle: string | null;
}

export interface JobCommentRequest {
  guestName: string;
  guestEmail?: string;
  content: string;
}
