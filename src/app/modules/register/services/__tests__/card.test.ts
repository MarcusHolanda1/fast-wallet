import { createCard } from '../card';
import { CARDS } from '../../../../shared/constants/endpoints';

jest.mock('@app/shared/services/httpClient/httpClient', () => ({
  httpClient: {
    post: jest.fn()
  }
}));

import { httpClient } from '@app/shared/services/httpClient/httpClient';

describe('createCard service', () => {
  const payload = {
    number: '4111111111111111',
    cvv: '123',
    name: 'MH FAKE'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call httpClient.post with correct params', async () => {
    (httpClient.post as jest.Mock).mockResolvedValueOnce({
      statusCode: 201,
      body: { id: 'card-id', ...payload }
    });

    await createCard(payload);

    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith(CARDS, { body: payload });
  });

  test('should return http response', async () => {
    const mockedResponse = {
      statusCode: 201,
      body: { id: 'card-id', ...payload }
    };
    (httpClient.post as jest.Mock).mockResolvedValueOnce(mockedResponse);

    const result = await createCard(payload);

    expect(result).toEqual(mockedResponse);
  });

  test('should return errors', async () => {
    (httpClient.post as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    await expect(createCard(payload)).rejects.toThrow('Network error');
  });
});
