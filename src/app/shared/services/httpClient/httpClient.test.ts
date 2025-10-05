import { httpClient } from './httpClient';

jest.mock('../../config/http.config', () => ({
  httpConfig: {
    baseURL: 'https://api.example.com'
  }
}));

global.fetch = jest.fn();

describe('HttpClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get method', () => {
    it('should make GET request successfully', async () => {
      const mockData = { id: 1, name: 'Test' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData)
      });

      const result = await httpClient.get('/users/1');

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
      );
      expect(result).toEqual(mockData);
    });

    it('should handle query parameters', async () => {
      const mockData = [{ id: 1 }];
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData)
      });

      await httpClient.get('/users', { page: 1, limit: 10 });

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users?page=1&limit=10',
        expect.any(Object)
      );
    });
  });

  describe('post method', () => {
    it('should make POST request with body', async () => {
      const requestBody = { name: 'New User' };
      const mockResponse = { id: 1, ...requestBody };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse)
      });

      const result = await httpClient.post('/users', requestBody);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' }
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('error handling', () => {
    it('should throw HttpError on failed response', async () => {
      const errorData = { message: 'Not found' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: jest.fn().mockResolvedValue(errorData)
      });

      await expect(httpClient.get('/users/999')).rejects.toEqual({
        name: 'HttpError',
        message: 'Unknown error',
        status: 0,
        statusText: 'Network Error'
      });
    });

    it('should handle network errors', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(httpClient.get('/users')).rejects.toEqual({
        name: 'HttpError',
        message: 'Network error',
        status: 0,
        statusText: 'Network Error'
      });
    });
  });
});
