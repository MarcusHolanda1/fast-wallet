import { httpClient } from '@app/shared/services/httpClient/httpClient';

import { CARDS } from '../constants/endpoints';
import { Card } from '../types/card';

export const createCard = async (payload: {
  number: string;
  cvv: string;
  name: string;
}): Promise<Card> => {
  const response = await httpClient.post<Card>(CARDS, {
    body: payload
  });

  return response.data;
};
