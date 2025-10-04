export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, unknown>;
}

export interface HttpRequest {
  url: string;
  config?: unknown;
}

export interface HttpClientInterface {
  get<T>(request: HttpRequest): Promise<HttpResponse<T>>;
  post<T>(request: HttpRequest): Promise<HttpResponse<T>>;
  put<T>(request: HttpRequest): Promise<HttpResponse<T>>;
  patch<T>(request: HttpRequest): Promise<HttpResponse<T>>;
  delete<T>(request: Omit<HttpRequest, 'data'>): Promise<HttpResponse<T>>;
}
