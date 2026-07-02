import { fetchData } from '../api';
import {
  ApplyRequest,
  ApplyResponse,
  CandidateApplicationTrackResponse,
  JobCommentDto,
  JobCommentRequest,
  PageResponse,
  PublicJobDetail,
  PublicJobPage,
  PublicJobListItem,
  PublicJobQuery,
} from '../public-types';
import {
  addMockComment,
  getMockApplicationTrack,
  getMockComments,
  getMockJobById,
  getMockJobBySlug,
  getMockJobs,
  mockApply,
} from '@/mocks/public-portal.mock';

function shouldUseMocks() {
  // Keep public mock mode for offline demos and golden-state UI reviews.
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isProductionHost = host === 'jobs.votrithuc.click' || host === 'candidate-portal-eight.vercel.app';
    if (isProductionHost && process.env.NEXT_PUBLIC_ALLOW_PRODUCTION_MOCKS !== 'true') {
      return false;
    }
  }
  if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') return true;
  if (typeof window === 'undefined') return false;
  return (
    window.location.search.includes('mock=1') ||
    window.localStorage.getItem('vtt-public-use-mocks') === 'true'
  );
}

function toPage(response: PageResponse<PublicJobListItem>): PublicJobPage {
  const content = response.data ?? response.content ?? [];
  return {
    content,
    totalPages: response.last_page ?? response.totalPages ?? 1,
    totalElements: response.total ?? response.totalElements ?? content.length,
  };
}

export class PublicJobService {
  static isMockMode() {
    return shouldUseMocks();
  }

  static async getJobs(params: PublicJobQuery = {}) {
    if (shouldUseMocks()) {
      return getMockJobs(params);
    }

    const query = new URLSearchParams({
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 20),
      sortBy: 'publishedAt',
      sortDir: 'desc',
    });
    if (params.keyword) query.set('keyword', params.keyword);
    if (params.location) query.set('location', params.location);
    if (params.workTime) query.set('workTime', params.workTime);
    if (params.categoryId) query.set('categoryId', params.categoryId);

    const response = await fetchData<PageResponse<PublicJobListItem>>(`/base/jobs/public?${query.toString()}`);
    return toPage(response);
  }

  static getJobBySlug(applyUrl: string) {
    if (shouldUseMocks()) {
      return getMockJobBySlug(applyUrl);
    }
    return fetchData<PublicJobDetail>(`/base/jobs/public/${encodeURIComponent(applyUrl)}`);
  }

  static getJobById(id: string) {
    if (shouldUseMocks()) {
      return getMockJobById(id);
    }
    return fetchData<PublicJobDetail>(`/base/jobs/public/id/${encodeURIComponent(id)}`);
  }

  static apply(jobId: string, request: ApplyRequest) {
    if (shouldUseMocks()) {
      return mockApply(jobId, request);
    }

    const formData = new FormData();
    formData.set('email', request.email.trim());
    formData.set('fullName', request.fullName.trim());
    if (request.phone) formData.set('phone', request.phone.trim());
    if (request.sourceCode) formData.set('sourceCode', request.sourceCode.trim());
    if (request.cvFile) formData.set('cvFile', request.cvFile);

    return fetchData<ApplyResponse>(`/api/public/jobs/${encodeURIComponent(jobId)}/apply`, {
      method: 'POST',
      body: formData,
    });
  }

  static trackApplications(params: { email: string; phone: string }) {
    if (shouldUseMocks()) {
      return getMockApplicationTrack();
    }

    const query = new URLSearchParams({ email: params.email });
    query.set('phone', params.phone);
    return fetchData<CandidateApplicationTrackResponse[]>(`/base/applications/public/track?${query.toString()}`);
  }

  static getComments(jobId: string) {
    if (shouldUseMocks()) {
      return getMockComments(jobId);
    }
    return fetchData<JobCommentDto[]>(`/public/jobs/${encodeURIComponent(jobId)}/comments`);
  }

  static addComment(jobId: string, request: JobCommentRequest) {
    if (shouldUseMocks()) {
      return addMockComment(jobId, request);
    }
    return fetchData<JobCommentDto>(`/public/jobs/${encodeURIComponent(jobId)}/comments`, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }
}
