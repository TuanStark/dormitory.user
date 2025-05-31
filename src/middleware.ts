import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Danh sách các đường dẫn không cần xác thực
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/dormitories',
  '/about',
  '/contact',
];

// Hàm kiểm tra đường dẫn có thuộc danh sách công khai không
const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => 
    path === publicPath || 
    path.startsWith('/api/auth/') ||
    path.startsWith('/dormitories/') ||
    path.startsWith('/_next/') ||
    path.startsWith('/images/') ||
    path.endsWith('.jpg') ||
    path.endsWith('.png') ||
    path.endsWith('.svg') ||
    path.endsWith('.ico')
  );
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('Middleware: Checking path', pathname);
  
  // Nếu là đường dẫn công khai, cho phép truy cập
  if (isPublicPath(pathname)) {
    console.log('Middleware: Public path, allowing access');
    return NextResponse.next();
  }

  // Kiểm tra token xác thực
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  console.log('Middleware: Token check result', { 
    hasToken: !!token, 
    tokenId: token?.id,
    tokenName: token?.name,
    tokenEmail: token?.email,
    tokenRole: token?.role,
    tokenExpires: token?.accessTokenExpires ? new Date(token.accessTokenExpires * 1000).toISOString() : 'N/A'
  });

  // Nếu không có token và đường dẫn cần xác thực, chuyển hướng đến trang đăng nhập
  if (!token) {
    console.log('Middleware: No token, redirecting to login');
    // Lưu URL hiện tại để quay lại sau khi đăng nhập
    const url = new URL('/login', request.url);
    url.searchParams.set('returnUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // Các đường dẫn cần xác thực
  const protectedPaths = {
    booking: true,      // Đặt phòng
    profile: true,      // Trang cá nhân
    payment: true,      // Thanh toán
    admin: 'ADMIN',     // Trang quản trị - cần quyền ADMIN
    manager: 'MANAGER', // Trang quản lý - cần quyền MANAGER hoặc ADMIN
  };

  // Kiểm tra quyền truy cập vào các trang bảo vệ
  for (const [path, requiredRole] of Object.entries(protectedPaths)) {
    if (pathname.startsWith(`/${path}`)) {
      console.log(`Middleware: Checking protected path /${path}`);
      
      // Nếu đường dẫn yêu cầu role cụ thể
      if (typeof requiredRole === 'string' && token.role !== requiredRole) {
        // Kiểm tra thêm nếu là ADMIN thì có thể truy cập trang MANAGER
        if (!(path === 'manager' && token.role === 'ADMIN')) {
          console.log(`Middleware: Access denied - Required role: ${requiredRole}, User role: ${token.role}`);
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
      break;
    }
  }

  // Kiểm tra token hết hạn
  if (token.accessTokenExpires && Date.now() > token.accessTokenExpires * 1000) {
    console.log('Middleware: Token expired, redirecting to login');
    // Token hết hạn, chuyển hướng đến trang đăng nhập để làm mới
    const url = new URL('/login', request.url);
    url.searchParams.set('returnUrl', encodeURI(request.url));
    url.searchParams.set('expired', 'true');
    return NextResponse.redirect(url);
  }

  // Cho phép truy cập nếu đã xác thực
  console.log('Middleware: Access granted');
  return NextResponse.next();
}

// Cấu hình middleware chỉ áp dụng cho các đường dẫn cụ thể
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 