// Định nghĩa kiểu dữ liệu cho Building
export interface Building {
  id: string;
  name: string;
  address: string;
  image: string;
  rating: number;
  price: number;
}

// Định nghĩa kiểu dữ liệu cho response
export interface BuildingResponse {
  data: Building[];
  status: string;
  message: string;
}

// Load data oustanding building
// Fetch danh sách ký túc xá nổi bật với ISR
export async function fetchDormitories(): Promise<BuildingResponse> {
  try {
    // Gọi API NestJS với revalidate để hỗ trợ ISR
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/building/top-rated?limit=3`,
      { next: { revalidate: 86400 } } // ISR - Cập nhật mỗi 24 giờ
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch dormitories");
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching dormitories:", error);
    // Trả về dữ liệu mặc định khi có lỗi
    return {
      data: [],
      status: "error",
      message: "Failed to fetch dormitories"
    };
  }
}