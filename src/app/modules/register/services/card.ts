import { httpClient } from '@app/shared/services/httpClient/httpClient';
import { HttpResponse } from '@app/shared/services/httpClient/types';

import { CARDS } from '../constants/endpoints';
import { Card } from '../types/card';

export const createCard = async (payload: {
  number: string;
  cvv: string;
  name: string;
}): Promise<HttpResponse<Card>> => {
  const response = await httpClient.post<Card>(CARDS, {
    body: payload
  });

  return response;
};
