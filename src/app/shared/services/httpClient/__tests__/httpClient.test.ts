import { FetchHttpClient } from '../httpClient';

global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('FetchHttpClient', () => {
  let sut: FetchHttpClient;
  const mockBaseUrl = 'https://api.example.com';

  beforeEach(() => {
    sut = new FetchHttpClient(mockBaseUrl);
    mockFetch.mockClear();
  });

  it('should set the base URL', () => {
    expect(sut).toBeInstanceOf(FetchHttpClient);
  });

  it('should build URL with query parameters', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );

    await sut.get('/test', {
      query: { param1: 'value1', param2: 2, param3: true }
    });

    expect(mockFetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/test?param1=value1&param2=2&param3=true`,
      expect.any(Object)
    );
  });

  it('should handle GET requests', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ data: 'test' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );

    const response = await sut.get('/resource');

    expect(response.data).toEqual({ data: 'test' });
    expect(response.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/resource`,
      expect.objectContaining({
        method: 'GET'
      })
    );
  });

  it('should handle POST requests', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ created: true }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      })
    );

    const response = await sut.post('/resource', {
      body: { name: 'New Resource' }
    });

    expect(response.data).toEqual({ created: true });
    expect(response.status).toBe(201);
    expect(mockFetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/resource`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'New Resource' })
      })
    );
  });

  it('should handle PUT requests', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ updated: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );

    const response = await sut.put('/resource/1', {
      body: { name: 'Updated Resource' }
    });

    expect(response.data).toEqual({ updated: true });
    expect(response.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/resource/1`,
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ name: 'Updated Resource' })
      })
    );
  });

  it('should handle DELETE requests', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(null, {
        status: 204
      })
    );

    const response = await sut.delete('/resource/1');

    expect(response.status).toBe(204);
    expect(mockFetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/resource/1`,
      expect.objectContaining({
        method: 'DELETE'
      })
    );
  });

  it('should handle custom headers', async () => {
    const customHeaders = { Authorization: 'Bearer token123' };
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );

    await sut.get('/resource', {
      headers: customHeaders
    });

    expect(mockFetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/resource`,
      expect.objectContaining({
        headers: expect.objectContaining(customHeaders) as Record<
          string,
          string
        >
      })
    );
  });
});
