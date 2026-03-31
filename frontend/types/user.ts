export interface RoomInfo {
    _id: string;
    roomNumber: string;
    floor?: number;
    rentAmount?: number;
    capacity?: number;
}

export interface Tenant {
    _id: string;
    username: string;
    email: string;
    name?: string;
    phone?: string;
    roomId?: string | RoomInfo | null;
    role: "tenant" | "admin";
}

export interface UpdateProfileData {
    name: string;
    email: string;
    phone?: string;
}
