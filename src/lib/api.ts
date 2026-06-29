/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getStoredToken } from './auth';
import { ApiResponse } from './public-types';
import { getPublicLegacyMockResponse } from '@/mocks/mock-response-registry';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Public Portal routes are public by default; surface 401/403 to the UI instead of forcing dashboard login.
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

function getRequestData(body: unknown) {
  if (!body) return undefined;
  if (body instanceof FormData) return body;
  if (typeof body === 'string') return JSON.parse(body);
  return body;
}

function getRequestHeaders(headers: Record<string, string> = {}, body?: unknown) {
  if (!(body instanceof FormData)) return headers;
  const nextHeaders = { ...headers };
  delete nextHeaders['Content-Type'];
  delete nextHeaders['content-type'];
  return nextHeaders;
}

export async function apiFetch(url: string, options: any = {}) {
  const cleanedUrl = url.replace(/\/app\/\/app\//g, '/app/');
  const mockData = getPublicLegacyMockResponse(cleanedUrl);
  if (mockData !== null) {
    return {
      status: 200,
      json: async () => mockData,
    } as unknown as Response;
  }

  try {
    const headers = getRequestHeaders({ ...options.headers }, options.body);
    const method = options.method || 'GET';
    const data = getRequestData(options.body);

    const response = await api({
      url: cleanedUrl,
      method,
      headers,
      data,
    });

    return {
      status: response.status,
      json: async () => response.data,
    } as unknown as Response;
  } catch (error: any) {
    console.error('apiFetch failed:', error);
    throw error;
  }
}

export async function fetchData<T>(url: string, options: any = {}): Promise<T> {
  const cleanedUrl = url.replace(/\/app\/\/app\//g, '/app/');
  const mockData = getPublicLegacyMockResponse(cleanedUrl);
  if (mockData !== null) {
    return mockData as T;
  }

  try {
    const headers = getRequestHeaders({ ...options.headers }, options.body);
    const method = options.method || 'GET';
    const data = getRequestData(options.body);

    const response = await api({
      url: cleanedUrl,
      method,
      headers,
      data,
    });

    const result: ApiResponse<T> = response.data;

    if (result.status === 1) {
      return result.data as T;
    }
    throw new Error(result.message || 'API Error');
  } catch (error) {
    console.error('fetchData failed:', error);
    throw error;
  }
}
