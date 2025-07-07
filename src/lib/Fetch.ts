interface FetchOptions extends RequestInit {
  timeout?: number;
}

interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  status: number;
}

class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

// Default configuration
const DEFAULT_TIMEOUT = 10000; // 10 seconds
const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

/**
 * Custom fetch wrapper with timeout and error handling
 */
async function customFetch<T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;

  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Prepare the full URL
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

    // Make the request
    const response = await fetch(fullUrl, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    clearTimeout(timeoutId);

    // Handle non-2xx responses
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }

      throw new FetchError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }

    // Parse response
    let data: T;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text() as T;
    }

    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof FetchError) {
      return {
        data: null,
        error: error.message,
        status: error.status,
      };
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          data: null,
          error: 'Request timeout',
          status: 408,
        };
      }
      return {
        data: null,
        error: error.message,
        status: 0,
      };
    }

    return {
      data: null,
      error: 'Unknown error occurred',
      status: 0,
    };
  }
}

/**
 * GET request
 */
export async function get<T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  return customFetch<T>(url, {
    method: 'GET',
    ...options,
  });
}

/**
 * POST request
 */
export async function post<T = unknown>(
  url: string,
  data?: unknown,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  return customFetch<T>(url, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });
}

/**
 * PUT request
 */
export async function put<T = unknown>(
  url: string,
  data?: unknown,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  return customFetch<T>(url, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });
}

/**
 * PATCH request
 */
export async function patch<T = unknown>(
  url: string,
  data?: unknown,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  return customFetch<T>(url, {
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });
}

/**
 * DELETE request
 */
export async function del<T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  return customFetch<T>(url, {
    method: 'DELETE',
    ...options,
  });
}

/**
 * Upload file with FormData
 */
export async function uploadFile<T = unknown>(
  url: string,
  file: File,
  additionalData?: Record<string, unknown>,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const formData = new FormData();
  formData.append('file', file);

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      if (typeof value === 'string' || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });
  }

  return customFetch<T>(url, {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type for FormData, let browser set it with boundary
      ...options.headers,
    },
    ...options,
  });
}

/**
 * Create authenticated request headers
 */
export function createAuthHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Utility to check if response is successful
 */
export function isSuccessResponse(response: ApiResponse): boolean {
  return response.error === null && response.status >= 200 && response.status < 300;
}

// Export types for external use
export type { FetchOptions, ApiResponse };
export { FetchError, customFetch };
