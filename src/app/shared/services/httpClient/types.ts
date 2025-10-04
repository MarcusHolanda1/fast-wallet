export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
}

export interface HttpError extends Error {
  status: number;
  statusText: string;
  data?: unknown;
}
