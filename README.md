# Dormitory Management System - User Portal

![Dormitory Management System](https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80)

## Giới thiệu

Dormitory Management System (DMS) là hệ thống quản lý ký túc xá sinh viên hiện đại, giúp sinh viên dễ dàng tìm kiếm, đặt phòng và thanh toán trực tuyến. Hệ thống được phát triển với giao diện thân thiện, dễ sử dụng và đáp ứng đầy đủ các nhu cầu của người dùng.

## Tính năng chính

- **Tìm kiếm và lọc ký túc xá**: Tìm kiếm theo vị trí, giá cả, tiện ích
- **Xem chi tiết ký túc xá**: Thông tin chi tiết, hình ảnh, vị trí trên bản đồ
- **Đặt phòng trực tuyến**: Quy trình đặt phòng 3 bước đơn giản
- **Thanh toán linh hoạt**: Hỗ trợ thanh toán qua VNPay và chuyển khoản ngân hàng
- **Quản lý đặt phòng**: Xem lịch sử và trạng thái đặt phòng
- **Hồ sơ người dùng**: Quản lý thông tin cá nhân

## Công nghệ sử dụng

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: NestJS, PostgreSQL
- **Authentication**: NextAuth.js
- **Payment Integration**: VNPay
- **Maps**: OpenStreetMap

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js 18.0.0 trở lên
- npm hoặc yarn

### Các bước cài đặt

1. Clone dự án:
```bash
git clone https://github.com/your-username/dormitory-user.git
cd dormitory-user
```

2. Cài đặt các dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Tạo file môi trường:
```bash
cp .env.example .env.local
```

4. Cấu hình các biến môi trường trong file `.env.local`:
```
NEXT_PUBLIC_NESTJS_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key
```

5. Chạy dự án ở môi trường development:
```bash
npm run dev
# hoặc
yarn dev
```

6. Truy cập ứng dụng tại `http://localhost:3001`

## Cấu trúc dự án

```
dormitory-user/
├── public/                  # Static files
│   ├── payment/             # Payment QR codes and images
│   └── ...
├── src/
│   ├── app/                 # App router pages
│   │   ├── (auth)/          # Authentication pages
│   │   ├── (default)/       # Main application pages
│   │   └── api/             # API routes
│   ├── components/          # Shared components
│   ├── lib/                 # Utilities and helpers
│   │   ├── common/          # Common utilities
│   │   └── type/            # TypeScript types
│   └── ...
├── .env.example             # Example environment variables
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Quy trình đặt phòng

Hệ thống đặt phòng được thiết kế theo quy trình 3 bước:

1. **Nhập thông tin người dùng**: Thông tin cá nhân, ngày nhận phòng và thời gian lưu trú
2. **Chọn phương thức thanh toán**: VNPay hoặc chuyển khoản ngân hàng
3. **Xác nhận thanh toán**: Hoàn tất quá trình đặt phòng

## Đóng góp

Mọi đóng góp cho dự án đều được hoan nghênh. Vui lòng tạo issue hoặc pull request để cải thiện dự án.

## Giấy phép

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## Liên hệ

Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ:
- Email: support@dormitory.com
- Website: https://dormitory.com
