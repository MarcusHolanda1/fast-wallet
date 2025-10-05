import {
  HttpClient,
  HttpError,
  HttpRequestConfig,
  HttpResponse
} from './types';

export class FetchHttpClient implements HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(
    url: string,
    query?: Record<string, string | number | boolean>
  ) {
    if (!query) return `${this.baseUrl}${url}`;
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    return `${this.baseUrl}${url}?${params.toString()}`;
  }

  private async request<T>(
    method: string,
    url: string,
    config?: HttpRequestConfig
  ): Promise<HttpResponse<T>> {
    const fullUrl = this.buildUrl(url, config?.query);

    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers
      },
      body: config?.body ? JSON.stringify(config.body) : undefined
    });

    const contentType = response.headers.get('Content-Type') || '';
    const isJson = contentType.includes('application/json');
    const data: unknown = isJson
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status, data);
    }

    return { data: data as T, status: response.status };
  }

  get<T>(url: string, config?: HttpRequestConfig) {
    return this.request<T>('GET', url, config);
  }

  post<T>(url: string, config?: HttpRequestConfig) {
    return this.request<T>('POST', url, config);
  }

  put<T>(url: string, config?: HttpRequestConfig) {
    return this.request<T>('PUT', url, config);
  }

  patch<T>(url: string, config?: HttpRequestConfig) {
    return this.request<T>('PATCH', url, config);
  }

  delete<T>(url: string, config?: HttpRequestConfig) {
    return this.request<T>('DELETE', url, config);
  }
}

export const httpClient = new FetchHttpClient('http://localhost:3000');
