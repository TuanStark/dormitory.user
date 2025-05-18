import { Room } from "@/lib/type";

export interface RoomResponse {
    data: Room[];
    status: string;
    message: string;
}

export async function fetchRoomsByBuildingId(buildingId: number, limit: number): Promise<RoomResponse> {
    try {
      // Gọi API NestJS với revalidate để hỗ trợ ISR
      const response = await fetch(
        `${process.env.NESTJS_API_URL}/room/building/${buildingId}?limit=${limit}`,
        { next: { revalidate: 5000000 } } // ISR - Cập nhật mỗi 5 giây
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch room");
      }
      
      return response.json();
    } catch (error) {
      console.error("Error fetching room:", error);
      // Trả về dữ liệu mặc định khi có lỗi
      return {
        data: [],
        status: "error",
        message: "Failed to fetch room"
      };
    }
  }