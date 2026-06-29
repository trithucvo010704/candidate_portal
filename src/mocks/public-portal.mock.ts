import {
  ApplyRequest,
  ApplyResponse,
  CandidateApplicationTrackResponse,
  JobCommentDto,
  PublicJobDetail,
  PublicJobPage,
  PublicJobQuery,
} from "@/lib/public-types";

const now = new Date();
const day = 24 * 60 * 60 * 1000;

const isoDaysFromNow = (days: number) => new Date(now.getTime() + days * day).toISOString();

export const mockJobs: PublicJobDetail[] = [
  {
    id: "mock-job-1",
    title: "Frontend Platform Engineer",
    location: "Hồ Chí Minh",
    salaryFrom: 28000000,
    salaryTo: 45000000,
    workTime: "HYBRID",
    yoe: 3,
    unit: "VND",
    roundCount: 3,
    status: "ACTIVE",
    publishedAt: isoDaysFromNow(-4),
    deadline: isoDaysFromNow(21),
    applyUrl: "frontend-platform-engineer",
    categoryId: "engineering",
    categoryName: "Engineering",
    createdAt: isoDaysFromNow(-6),
    description:
      "Tham gia xây dựng nền tảng tuyển dụng VTT Careers cho doanh nghiệp.\n\n" +
      "Bạn sẽ phát triển trải nghiệm public portal, dashboard HR và các workflow tuyển dụng realtime. Vai trò phù hợp với người thích sản phẩm SaaS vận hành thực tế, quan tâm hiệu năng UI và trải nghiệm ứng viên.\n\n" +
      "Yêu cầu chính:\n" +
      "- 3+ năm kinh nghiệm React hoặc Next.js.\n" +
      "- Thành thạo TypeScript, component architecture và state management.\n" +
      "- Có tư duy UI vận hành, biết xử lý loading, empty, error state.\n" +
      "- Ưu tiên kinh nghiệm với dashboard, career site hoặc workflow automation.\n\n" +
      "Quyền lợi:\n" +
      "- Review lương 2 lần/năm.\n" +
      "- Làm việc hybrid, thiết bị làm việc đầy đủ.\n" +
      "- Có cơ hội tham gia xây dựng sản phẩm AI HRM từ sớm.",
    roundCountLocked: true,
    updatedAt: isoDaysFromNow(-2),
    rounds: [
      { id: "round-1-1", roundIndex: 1, roundName: "CV Screening", isConfirmed: true },
      { id: "round-1-2", roundIndex: 2, roundName: "Technical Interview", isConfirmed: true },
      { id: "round-1-3", roundIndex: 3, roundName: "Culture Fit", isConfirmed: true },
    ],
  },
  {
    id: "mock-job-2",
    title: "AI Recruitment Product Analyst",
    location: "Đà Nẵng",
    salaryFrom: 22000000,
    salaryTo: 36000000,
    workTime: "FULL_TIME",
    yoe: 2,
    unit: "VND",
    roundCount: 2,
    status: "ACTIVE",
    publishedAt: isoDaysFromNow(-2),
    deadline: isoDaysFromNow(18),
    applyUrl: "ai-recruitment-product-analyst",
    categoryId: "product",
    categoryName: "Product",
    createdAt: isoDaysFromNow(-5),
    description:
      "Phân tích dữ liệu tuyển dụng, hành vi ứng viên và hiệu quả nguồn lead để giúp HR ra quyết định tốt hơn.\n\n" +
      "Bạn sẽ phối hợp với engineering để định nghĩa dashboard, source analytics, lead scoring và các tính năng AI hỗ trợ tuyển dụng.\n\n" +
      "Yêu cầu:\n" +
      "- Có kinh nghiệm product analytics hoặc business analysis.\n" +
      "- Biết đọc dữ liệu funnel, conversion và retention.\n" +
      "- Giao tiếp tốt với HR, sales và engineering.",
    roundCountLocked: true,
    updatedAt: isoDaysFromNow(-1),
    rounds: [
      { id: "round-2-1", roundIndex: 1, roundName: "Portfolio Review", isConfirmed: true },
      { id: "round-2-2", roundIndex: 2, roundName: "Product Interview", isConfirmed: true },
    ],
  },
  {
    id: "mock-job-3",
    title: "Backend Java Spring Boot Developer",
    location: "Hà Nội",
    salaryFrom: 30000000,
    salaryTo: 52000000,
    workTime: "REMOTE",
    yoe: 4,
    unit: "VND",
    roundCount: 3,
    status: "ACTIVE",
    publishedAt: isoDaysFromNow(-1),
    deadline: isoDaysFromNow(24),
    applyUrl: "backend-java-spring-boot-developer",
    categoryId: "engineering",
    categoryName: "Engineering",
    createdAt: isoDaysFromNow(-3),
    description:
      "Xây dựng backend Spring Boot cho VTT Careers HRM: job campaign, candidate lead, worker pairing, tracking và analytics.\n\n" +
      "Yêu cầu:\n" +
      "- Java/Spring Boot vững, hiểu security filter chain.\n" +
      "- Có kinh nghiệm JPA, PostgreSQL/MySQL và test service/controller.\n" +
      "- Ưu tiên đã làm hệ thống multi-tenant hoặc automation workflow.",
    roundCountLocked: true,
    updatedAt: isoDaysFromNow(-1),
    rounds: [
      { id: "round-3-1", roundIndex: 1, roundName: "Technical Screening", isConfirmed: true },
      { id: "round-3-2", roundIndex: 2, roundName: "System Design", isConfirmed: true },
      { id: "round-3-3", roundIndex: 3, roundName: "Final Interview", isConfirmed: true },
    ],
  },
  {
    id: "mock-job-4",
    title: "Talent Acquisition Specialist",
    location: "Hồ Chí Minh",
    salaryFrom: 16000000,
    salaryTo: 26000000,
    workTime: "FULL_TIME",
    yoe: 2,
    unit: "VND",
    roundCount: 2,
    status: "ACTIVE",
    publishedAt: isoDaysFromNow(-7),
    deadline: isoDaysFromNow(12),
    applyUrl: "talent-acquisition-specialist",
    categoryId: "hr",
    categoryName: "Human Resources",
    createdAt: isoDaysFromNow(-10),
    description:
      "Vận hành pipeline tuyển dụng, phối hợp với hiring manager và đo hiệu quả từng nguồn ứng viên.\n\n" +
      "Bạn sẽ dùng VTT Careers hằng ngày để tạo campaign, theo dõi lead và chăm sóc ứng viên từ click tới interview.",
    roundCountLocked: true,
    updatedAt: isoDaysFromNow(-3),
    rounds: [
      { id: "round-4-1", roundIndex: 1, roundName: "HR Screening", isConfirmed: true },
      { id: "round-4-2", roundIndex: 2, roundName: "Hiring Manager", isConfirmed: true },
    ],
  },
];

let mockComments: Record<string, JobCommentDto[]> = {
  "mock-job-1": [
    {
      id: "comment-1",
      guestName: "Minh Anh",
      content: "Vị trí này có yêu cầu làm onsite mấy ngày mỗi tuần không?",
      aiReply: "Vai trò này đang theo mô hình hybrid, thường 2-3 ngày tại văn phòng tùy sprint.",
      createdAt: isoDaysFromNow(-1),
      jobTitle: "Frontend Platform Engineer",
    },
  ],
};

const normalize = (value: string | null | undefined) => value?.trim().toLowerCase() ?? "";

const matches = (job: PublicJobDetail, params: PublicJobQuery) => {
  const keyword = normalize(params.keyword);
  const location = normalize(params.location);
  const workTime = normalize(params.workTime);
  const categoryId = normalize(params.categoryId);
  const haystack = [job.title, job.description, job.categoryName, job.location, job.workTime].map(normalize).join(" ");

  return (
    (!keyword || haystack.includes(keyword)) &&
    (!location || normalize(job.location).includes(location)) &&
    (!workTime || normalize(job.workTime) === workTime) &&
    (!categoryId || normalize(job.categoryId) === categoryId)
  );
};

export async function getMockJobs(params: PublicJobQuery = {}): Promise<PublicJobPage> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const filtered = mockJobs.filter((job) => matches(job, params));
  const start = (page - 1) * limit;
  return {
    content: filtered.slice(start, start + limit),
    totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
    totalElements: filtered.length,
  };
}

export async function getMockJobBySlug(applyUrl: string): Promise<PublicJobDetail> {
  const job = mockJobs.find((item) => item.applyUrl === applyUrl);
  if (!job) throw new Error("Không tìm thấy công việc demo.");
  return job;
}

export async function getMockJobById(id: string): Promise<PublicJobDetail> {
  const job = mockJobs.find((item) => item.id === id);
  if (!job) throw new Error("Không tìm thấy công việc demo.");
  return job;
}

export async function mockApply(jobId: string, request: ApplyRequest): Promise<ApplyResponse> {
  const job = await getMockJobById(jobId);
  const idSuffix = Math.random().toString(36).slice(2, 8);
  return {
    applicationId: `mock-app-${idSuffix}${request.sourceCode ? "-src" : ""}`,
    candidateId: `mock-candidate-${idSuffix}`,
    jobTitle: job.title,
  };
}

export async function getMockApplicationTrack(): Promise<CandidateApplicationTrackResponse[]> {
  return [
    {
      applicationId: "mock-app-active",
      jobId: "mock-job-1",
      jobTitle: "Frontend Platform Engineer",
      companyName: "VTT Careers",
      status: "IN_PROCESS",
      currentRoundIndex: 2,
      totalRounds: 3,
      submittedAt: isoDaysFromNow(-3),
      roundHistory: [
        {
          id: "track-round-1",
          roundId: "round-1-1",
          roundIndex: 1,
          roundName: "CV Screening",
          result: "PASS",
          note: "Hồ sơ phù hợp với yêu cầu nền tảng.",
          actionByName: "HR Team",
          confirmedAt: isoDaysFromNow(-2),
          candidateResponse: "CONFIRMED",
          candidateResponseAt: isoDaysFromNow(-2),
        },
        {
          id: "track-round-2",
          roundId: "round-1-2",
          roundIndex: 2,
          roundName: "Technical Interview",
          result: null,
          note: null,
          actionByName: null,
          confirmedAt: null,
          candidateResponse: "PENDING",
          candidateResponseAt: null,
        },
      ],
    },
  ];
}

export async function getMockComments(jobId: string): Promise<JobCommentDto[]> {
  return mockComments[jobId] ?? [];
}

export async function addMockComment(jobId: string, request: { guestName: string; guestEmail?: string; content: string }) {
  const job = await getMockJobById(jobId);
  const comment: JobCommentDto = {
    id: `comment-${Date.now()}`,
    guestName: request.guestName,
    content: request.content,
    aiReply: "Cảm ơn bạn đã đặt câu hỏi. HR sẽ kiểm tra và phản hồi thêm nếu cần.",
    createdAt: new Date().toISOString(),
    jobTitle: job.title,
  };
  mockComments = {
    ...mockComments,
    [jobId]: [...(mockComments[jobId] ?? []), comment],
  };
  return comment;
}
