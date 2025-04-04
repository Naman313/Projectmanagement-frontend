import apiClient from './apiClient';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  organization: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  organization: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface ResetPasswordData {
  email: string;
}

export interface UpdatePasswordData {
  token: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => 
    apiClient.post<AuthResponse>('/auth/login', credentials),

  signup: async (userData: SignupData) => 
    apiClient.post<AuthResponse>('/auth/signup', userData),

  logout: async () => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
  },

  forgotPassword: async (data: ResetPasswordData) => 
    apiClient.post('/auth/forgot-password', data),

  resetPassword: async (data: UpdatePasswordData) => 
    apiClient.post('/auth/reset-password', data),

  verifyToken: async (token: string) => 
    apiClient.get(`/auth/verify-token/${token}`),

  getCurrentUser: async () => 
    apiClient.get<{ user: User }>('/auth/me')
};

export default authService;