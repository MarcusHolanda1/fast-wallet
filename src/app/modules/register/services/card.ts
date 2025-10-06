import { httpClient } from '@app/shared/services/httpClient/httpClient';
import { HttpResponse } from '@app/shared/services/httpClient/types';

import { CARDS } from '../../../shared/constants/endpoints';
import { Card } from '../../../shared/types/card';

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
