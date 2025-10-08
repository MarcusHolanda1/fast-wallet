import { httpClient } from '@app/shared/services/httpClient/httpClient';
import { HttpResponse } from '@app/shared/services/httpClient/types';
import { cardApi } from '@app/shared/constants/endpoints';

import { Card } from '../../../shared/types/card';

export const getCards = async (): Promise<HttpResponse<Card[]>> => {
  const response = await httpClient.get<Card[]>(cardApi);

  return response;
};
