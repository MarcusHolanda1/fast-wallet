import type { RequestConfig, HttpError } from './types';

interface HttpConfig {
  baseURL: string;
  timeout: number;
}

const getConfig = (): HttpConfig => {
  return {
    baseURL: 'http://localhost:3000',
    timeout: 30000
  };
};
const httpConfig = getConfig();

class HttpClient {
  private async handleError(error: unknown): Promise<never> {
    let httpError: HttpError;

    if (error instanceof Response) {
      httpError = {
        name: 'HttpError',
        message: error.statusText || 'Request failed',
        status: error.status,
        statusText: error.statusText,
        data: await error.json().catch(() => null)
      } as HttpError;
    } else {
      httpError = {
        name: 'HttpError',
        message: error instanceof Error ? error.message : 'Unknown error',
        status: 0,
        statusText: 'Network Error'
      } as HttpError;
    }

    throw httpError;
  }

  private async makeRequest<T>(
    path: string,
    options: RequestInit & RequestConfig = {}
  ): Promise<T> {
    const { ...config } = options;

    const url = new URL(path, httpConfig.baseURL).toString();

    const requestOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    };

    try {
      const controller = new AbortController();

      const response = await fetch(url, {
        ...requestOptions,
        signal: controller.signal
      });

      if (!response.ok) {
        await this.handleError(response);
      }

      return (await response.json()) as T;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private buildUrl(
    path: string,
    params?: Record<string, string | number>
  ): string {
    const url = new URL(path, httpConfig.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  async get<T>(
    path: string,
    params?: Record<string, string | number>,
    config?: RequestConfig
  ): Promise<T> {
    const url = this.buildUrl(path, params);
    return this.makeRequest<T>(url, { method: 'GET', ...config });
  }

  async post<T>(
    path: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.makeRequest<T>(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      ...config
    });
  }

  async put<T>(
    path: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.makeRequest<T>(path, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      ...config
    });
  }

  async delete<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>(path, { method: 'DELETE', ...config });
  }
}

export const httpClient = new HttpClient();
