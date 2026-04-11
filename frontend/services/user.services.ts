import API from "@/lib/axios";
import { Tenant, UpdateProfileData, ChangePasswordData } from "@/types/user";
import { AxiosResponse } from "axios";

export const getTenants = (): Promise<AxiosResponse<Tenant[]>> => {
  return API.get("/users/tenants");
};

export const updateProfile = (data: UpdateProfileData): Promise<AxiosResponse<{ message: string, user: Tenant }>> => {
  return API.put("/users/profile", data);
}

export const changePassword = (data: ChangePasswordData): Promise<AxiosResponse<{ message: string }>> => {
  return API.put("/users/password", data);
}

export const getProfile = (): Promise<AxiosResponse<Tenant>> => {
  return API.get("/users/profile");
}