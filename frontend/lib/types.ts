export type LoginInput = {
  email: string;
  password: string;
};
export type RegisterInput = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  timestamp: string;
  errors: {
    field: string;
    message: string;
  }[];
  data: T;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  authorities: { authority: string }[];
  isEnabled: boolean;
  enabled: boolean;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};
