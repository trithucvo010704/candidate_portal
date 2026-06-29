# VTT Public Portal

App này là career site public cho ứng viên của hệ thống VTT Careers HRM.

## Vai Trò

- Hiển thị danh sách job public.
- Hiển thị chi tiết job.
- Cho ứng viên apply job.
- Cho ứng viên theo dõi trạng thái hồ sơ.
- Hiển thị comments/Q&A public cho từng job.

Không dùng repo này làm HR/Admin dashboard. Dashboard nằm ở `../vtt-hrm-dashboard`.

## Chạy Local

Port đề xuất:

- Backend Spring Boot: `http://localhost:8080` hoặc `http://localhost:8081`
- Public Portal: `http://localhost:3002`

Env thường dùng:

```powershell
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_USE_MOCKS=false
```

Chạy app:

```powershell
npm run dev -- --port 3002
```

Kiểm tra kỹ thuật:

```powershell
npm run lint
npm run build
```

## Contract API

Public Portal chỉ dùng wrapper:

- `fetchData<T>()`: dùng cho `BaseResponse`.

Các flow chính:

- Public job list: `GET /base/jobs/public`
- Job detail by slug: `GET /base/jobs/public/{applyUrl}`
- Job detail by id: `GET /base/jobs/public/id/{id}`
- Apply: `POST /api/public/jobs/{jobId}/apply`
- Track application: `GET /base/applications/public/track`
- Comments/Q&A: `/public/jobs/{jobId}/comments`

Public Portal không nên dùng `fetchAgentData` nếu chưa gọi trực tiếp Agent API.

Backend contract chi tiết nằm ở:

- `../../DATN_backend/docs/API_CONTRACT.md`
- `../../DATN_backend/docs/FE_INTEGRATION_GUIDE.md`

## Mock Mode

Mock vẫn được giữ để demo offline.

Bật mock bằng env:

```powershell
NEXT_PUBLIC_USE_MOCKS=true
```

Hoặc trên browser:

- thêm query `?mock=1`
- hoặc localStorage `vtt-public-use-mocks=true`

Mock chính nằm ở:

- `src/mocks/public-portal.mock.ts`

## Cấu Trúc Chính

- `src/app/candidate`: route ứng viên.
- `src/components/portal`: UI public portal.
- `src/lib/services/public-job.service.ts`: service gọi backend hoặc mock.
- `src/lib/public-types.ts`: type public portal.

## Nguyên Tắc Khi Sửa

- Public API không bắt buộc dashboard JWT.
- Không redirect login chỉ vì public endpoint trả lỗi.
- Không kéo logic dashboard hoặc worker vào app này.
- Không xóa mock nếu chưa có quyết định riêng.
