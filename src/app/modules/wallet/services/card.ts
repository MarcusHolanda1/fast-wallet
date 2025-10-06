import { httpClient } from '@app/shared/services/httpClient/httpClient';
import { HttpResponse } from '@app/shared/services/httpClient/types';
import { CARDS } from '@app/shared/constants/endpoints';

import { Card } from '../../../shared/types/card';

export const getCards = async (): Promise<HttpResponse<Card[]>> => {
  const response = await httpClient.get<Card[]>(CARDS);

  return response;
};
