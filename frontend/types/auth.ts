export interface SignupData {
  username: string;
  email: string;
  password: string;
  code: string;  
}

export interface LoginData {
  email: string;
  password: string;
  code: string;  
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "tenant";
  stayId: string;  
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
