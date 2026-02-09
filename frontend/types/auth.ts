export interface SignupData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "tenant";
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
