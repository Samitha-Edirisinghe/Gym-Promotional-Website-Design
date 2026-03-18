import axios from 'axios';

// API base URL - change this to match your backend server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: async (data: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    fitnessGoal?: string;
  }) => {
    const response = await apiClient.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },
};

// Programs API
export const programsAPI = {
  getAll: async () => {
    const response = await apiClient.get('/programs');
    return response.data;
  },

  search: async (params: {
    query?: string;
    goal?: string;
    level?: string;
    duration?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await apiClient.get('/programs/search', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/programs/${id}`);
    return response.data;
  },

  getFilterOptions: async () => {
    const response = await apiClient.get('/programs/filters/options');
    return response.data;
  },
};

// Trainers API
export const trainersAPI = {
  getAll: async () => {
    const response = await apiClient.get('/trainers');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/trainers/${id}`);
    return response.data;
  },
};

// Memberships API
export const membershipsAPI = {
  getPlans: async () => {
    const response = await apiClient.get('/memberships/plans');
    return response.data;
  },

  subscribe: async (data: { planId: number; billingCycle: 'monthly' | 'yearly' }) => {
    const response = await apiClient.post('/memberships/subscribe', data);
    return response.data;
  },

  getMyMembership: async () => {
    const response = await apiClient.get('/memberships/my-membership');
    return response.data;
  },
};

// Contact API
export const contactAPI = {
  submit: async (data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) => {
    const response = await apiClient.post('/contact', data);
    return response.data;
  },
};

// Testimonials API
export const testimonialsAPI = {
  getAll: async () => {
    const response = await apiClient.get('/testimonials');
    return response.data;
  },
};

export default apiClient;