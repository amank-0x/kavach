/**
 * Auth API Service
 * Handles user signup, signin, logout, and session verification.
 */

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface ApiError {
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Helper to handle fetch requests with credentials and JSON parsing
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    credentials: "include", // Required for receiving and sending httpOnly JWT cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data: any;
  try {
    data = await response.json();
  } catch {
    data = { message: response.statusText || "Network request failed" };
  }

  if (!response.ok) {
    const errorMessage = data?.message || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return data as T;
}

/**
 * Register a new user
 * POST /api/v1/user/signup
 */
export async function signup(payload: SignUpPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/api/v1/user/signup", {
    method: "POST",
    body: JSON.stringify({
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
    }),
  });
}

/**
 * Sign in an existing user
 * POST /api/v1/user/signin
 */
export async function signin(payload: SignInPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/api/v1/user/signin", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
    }),
  });
}

/**
 * Log out user (clears httpOnly cookie)
 * POST /api/v1/user/logout
 */
export async function logout(): Promise<{ message: string }> {
  return request<{ message: string }>("/api/v1/user/logout", {
    method: "POST",
  });
}

/**
 * Get currently authenticated user profile
 * GET /api/v1/user/
 */
export async function getCurrentUser(): Promise<User> {
  return request<User>("/api/v1/user/", {
    method: "GET",
  });
}
