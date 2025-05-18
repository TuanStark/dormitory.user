// Định nghĩa interface cho Dormitory dựa trên dữ liệu API
export interface Dormitory {
    id: string;
    name: string;
    address: string;
    description: string;
    image: string | null;
    latitude: number;
    longitude: number;
    floors: number;
    averageRating: number;
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
    rooms: Room[];
    createAt: string;
    updateAt: string;
    faqs: FAQ[];
}

export interface Building {
    id: string;
    name: string;
    address: string;
    description: string;
    image: string | null;
    latitude: number;
    longitude: number;
    floors: number;
    averageRating: number;
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
    rooms: Room[];
    createAt: string;
    updateAt: string;
    faqs: FAQ[];
}
  
  
export interface Room {
    id: string;
    roomNumber: string;
    capacity: number;
    price: number;
    area: number;
    status: string;
    amenities: Amenity[];
    images: Image[];
    createAt: string;
    updateAt: string;
}
  
export interface Amenity {
    id: number;
    roomId: number;
    amenityName: string;
    description: string;
    createAt: string;
    updateAt: string;
}
  
export interface Image {
    id: number;
    roomId: number;
    url: string;
    description: string;
    uploadedAt: string;
    createAt: string;
    updateAt: string;
}

export interface FAQ {
    question: string;
    answer: string;
}